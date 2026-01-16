export type CompoundingFrequency = 'daily' | 'monthly' | 'quarterly' | 'semiannually' | 'annually';

export interface CDInput {
  principal: number;
  rate: number; // APY or APR as a percentage (e.g. 5.0)
  rateType: 'apy' | 'apr';
  termMonths: number;
  compounding: CompoundingFrequency;
  isPayout?: boolean; // New: If true, interest is paid out periodically (simple interest logic)
}

export interface CDResult {
  maturityValue: number;
  totalInterest: number;
  effectiveYield: number;
  periodicPayout?: number; // Amount paid out per period if isPayout is true
}

export const FREQUENCY_MAP: Record<CompoundingFrequency, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  semiannually: 2,
  annually: 1,
};

/**
 * Calculates CD interest with support for compounding or periodic payout.
 */
export function calculateCD(input: CDInput): CDResult {
  const { principal, rate, rateType, termMonths, compounding, isPayout = false } = input;
  
  if (principal < 0 || rate < 0 || termMonths < 0) {
    return { maturityValue: 0, totalInterest: 0, effectiveYield: 0 };
  }

  const n = FREQUENCY_MAP[compounding];
  const t = termMonths / 12; // Time in years
  let r = rate / 100; // Decimal rate

  // If input is APY, convert to APR for calculation
  // Formula: APY = (1 + r/n)^n - 1  =>  r = n * ((1 + APY)^(1/n) - 1)
  if (rateType === 'apy') {
    r = n * (Math.pow(1 + r, 1 / n) - 1);
  }

  let maturityValue = 0;
  let totalInterest = 0;
  let periodicPayout = 0;

  if (isPayout) {
    // Simple Interest / Payout Mode
    // Interest is calculated on the principal each period and paid out.
    // It does not compound.
    // Total Interest = Principal * Rate * Time
    totalInterest = principal * r * t;
    maturityValue = principal; // Principal is returned at end
    
    // Calculate payout per compounding period (e.g. monthly check)
    // Note: Usually payouts align with compounding, or are monthly. 
    // For simplicity, we assume payout frequency = compounding frequency.
    periodicPayout = (principal * r) / n; 
  } else {
    // Compound Interest Mode
    // A = P(1 + r/n)^(nt)
    maturityValue = principal * Math.pow(1 + r / n, n * t);
    totalInterest = maturityValue - principal;
  }

  // Calculate Effective Annual Yield (APY) based on the calculated APR
  const effectiveYield = (Math.pow(1 + r / n, n) - 1) * 100;

  return {
    maturityValue,
    totalInterest,
    effectiveYield,
    periodicPayout: isPayout ? periodicPayout : undefined,
  };
}
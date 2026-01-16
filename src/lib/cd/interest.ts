import type { CDInput, CDResult, Compounding } from './types';

function periodsPerYear(compounding: Compounding): number {
  switch (compounding) {
    case 'daily':
      return 365;
    case 'monthly':
      return 12;
    case 'quarterly':
      return 4;
    case 'semiannually':
      return 2;
    case 'annually':
      return 1;
    default:
      return 12;
  }
}

export function apyToPeriodicRate(apy: number, compounding: Compounding): number {
  const n = periodsPerYear(compounding);
  // APY = (1 + r_per_period)^n - 1
  // => r_per_period = (1 + APY)^(1/n) - 1
  return Math.pow(1 + apy, 1 / n) - 1;
}

export function nominalToApy(nominalRate: number, compounding: Compounding): number {
  const n = periodsPerYear(compounding);
  // nominal is the stated APR (nominal annual rate) compounded n times
  // APY = (1 + nominal/n)^n - 1
  return Math.pow(1 + nominalRate / n, n) - 1;
}

function roundToCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateMaturity(input: CDInput): CDResult {
  const { principal, apy, termMonths, compounding, isPayout = false } = input;

  if (!isFinite(principal) || principal < 0) throw new Error('Invalid principal');
  if (!isFinite(apy) || apy < 0) throw new Error('Invalid APY');
  if (!isFinite(termMonths) || termMonths < 0) throw new Error('Invalid term');

  const n = periodsPerYear(compounding);
  const r = apyToPeriodicRate(apy, compounding); // This is the effective periodic rate
  const periods = (termMonths / 12) * n; // may be fractional

  let maturityValue = 0;
  let interestEarned = 0;
  let periodicPayout = 0;

  if (isPayout) {
    // Simple Interest / Payout Mode
    // We calculate interest per period based on the rate and pay it out.
    // Periodic Interest = P * r
    // Total Interest = Periodic Interest * periods
    // Maturity = Principal (since interest is withdrawn)
    
    // Note: r here is derived from APY. 
    // If input was APY=5.12% (monthly), r = (1.0512)^(1/12) - 1 approx 0.00416...
    // Payout = P * r
    
    periodicPayout = roundToCents(principal * r);
    interestEarned = roundToCents(periodicPayout * periods); 
    maturityValue = principal; 
  } else {
    // Compound Growth
    const growth = Math.pow(1 + r, periods);
    const maturityUnrounded = principal * growth;
    maturityValue = roundToCents(maturityUnrounded);
    interestEarned = roundToCents(maturityValue - principal);
  }

  return {
    maturityValue,
    interestEarned,
    effectiveAnnualYield: apy,
    periodicRate: r,
    periods,
    periodicPayout: isPayout ? periodicPayout : undefined,
  };
}
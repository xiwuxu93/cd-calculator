export type Compounding = 'daily' | 'monthly' | 'quarterly' | 'semiannually' | 'annually';

export interface CDInput {
  principal: number; // initial deposit
  apy: number; // e.g., 0.05 for 5%
  termMonths: number; // e.g., 12
  compounding: Compounding;
}

export interface CDResult {
  maturityValue: number; // principal + interest
  interestEarned: number; // maturityValue - principal
  effectiveAnnualYield: number; // equals input APY
  periodicRate: number; // effective rate per compounding period derived from APY
  periods: number; // total (may be fractional)
}

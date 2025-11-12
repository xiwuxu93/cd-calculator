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
  const { principal, apy, termMonths, compounding } = input;

  if (!isFinite(principal) || principal < 0) throw new Error('Invalid principal');
  if (!isFinite(apy) || apy < 0) throw new Error('Invalid APY');
  if (!isFinite(termMonths) || termMonths < 0) throw new Error('Invalid term');

  const n = periodsPerYear(compounding);
  const r = apyToPeriodicRate(apy, compounding);
  const periods = (termMonths / 12) * n; // may be fractional

  // Growth factor for possibly fractional periods:
  const growth = Math.pow(1 + r, periods);
  const maturityUnrounded = principal * growth;
  const maturityValue = roundToCents(maturityUnrounded);
  const interestEarned = roundToCents(maturityValue - principal);

  return {
    maturityValue,
    interestEarned,
    effectiveAnnualYield: apy,
    periodicRate: r,
    periods,
  };
}

import { apyToPeriodicRate } from './interest';
import type { CDInput, Compounding } from './types';

export type PenaltyPolicy =
  | { type: 'threeMonths' }
  | { type: 'sixMonths' }
  | { type: 'strictAllEarned' }
  | { type: 'days'; days: number };

export interface PenaltyInput extends CDInput {
  monthsHeld: number;
  policy: PenaltyPolicy;
}

export interface PenaltyResult {
  earnedInterest: number;
  penaltyAmount: number;
  netInterest: number;
  refundAmount: number; // principal + netInterest
  breakEvenRate: number; // decimal; rate needed for remainder to break even if switching
}

function roundToCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function periodsPerYear(compounding: Compounding): number {
  switch (compounding) {
    case 'monthly':
      return 12;
    case 'quarterly':
      return 4;
    case 'annually':
      return 1;
    default:
      return 12;
  }
}

export function analyzeEarlyWithdrawal(input: PenaltyInput): PenaltyResult {
  const { principal, apy, termMonths, compounding, monthsHeld, policy } = input;
  if (principal <= 0 || apy < 0 || termMonths <= 0 || monthsHeld < 0) {
    throw new Error('Invalid inputs');
  }

  const n = periodsPerYear(compounding);
  const r = apyToPeriodicRate(apy, compounding);
  const heldPeriods = (monthsHeld / 12) * n;

  const accruedValue = principal * Math.pow(1 + r, heldPeriods);
  const earnedInterest = roundToCents(accruedValue - principal);

  // Penalty approximations
  let penaltyAmount = 0;
  if (policy.type === 'strictAllEarned') {
    penaltyAmount = earnedInterest;
  } else if (policy.type === 'threeMonths') {
    // Approximate three months of interest using monthly compounding equivalence
    const months = 3;
    const monthsRate = Math.pow(1 + r, (months / 12) * n) - 1;
    penaltyAmount = roundToCents(principal * monthsRate);
  } else if (policy.type === 'sixMonths') {
    const months = 6;
    const monthsRate = Math.pow(1 + r, (months / 12) * n) - 1;
    penaltyAmount = roundToCents(principal * monthsRate);
  } else if (policy.type === 'days') {
    const days = Math.max(0, policy.days);
    // Daily approximation from APY
    const dailyRate = Math.pow(1 + apy, 1 / 365) - 1;
    penaltyAmount = roundToCents(principal * (Math.pow(1 + dailyRate, days) - 1));
  }

  // Net and refund
  const netInterest = roundToCents(Math.max(0, earnedInterest - penaltyAmount));
  const refundAmount = roundToCents(principal + netInterest);

  // Break-even rate for remainder of term
  const remainingMonths = Math.max(0, termMonths - monthsHeld);
  const remainingYears = remainingMonths / 12;
  let breakEvenRate = 0;
  if (remainingYears > 0) {
    breakEvenRate = (penaltyAmount) / (principal * remainingYears);
  }

  return {
    earnedInterest,
    penaltyAmount,
    netInterest,
    refundAmount,
    breakEvenRate,
  };
}


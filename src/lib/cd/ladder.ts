import { calculateMaturity } from './interest';
import type { Compounding } from './types';

export type LadderRung = {
  id: number;
  termMonths: number;
  principal: number;
  apy: number;
  maturityValue: number;
  interestEarned: number;
  maturityDate: Date;
};

export type LadderResult = {
  rungs: LadderRung[];
  totalPrincipal: number;
  totalInterest: number;
  totalMaturity: number;
  blendedApy: number;
};

/**
 * Calculates a CD Ladder strategy.
 * Assumes equal distribution of principal across rungs.
 * 
 * @param totalAmount Total investment amount
 * @param numRungs Number of rungs (e.g., 5 for a 5-year ladder)
 * @param maxTermYears The longest term in years (e.g., 5)
 * @param apy The Annual Percentage Yield (decimal, e.g., 0.05 for 5%)
 * @param compounding Compounding frequency
 */
export function calculateLadder(
  totalAmount: number,
  numRungs: number,
  maxTermYears: number,
  apy: number,
  compounding: Compounding = 'monthly'
): LadderResult {
  const rungs: LadderRung[] = [];
  const amountPerRung = totalAmount / numRungs;
  const intervalMonths = (maxTermYears * 12) / numRungs;

  let totalInterest = 0;
  let totalMaturity = 0;

  const today = new Date();

  for (let i = 1; i <= numRungs; i++) {
    const termMonths = Math.round(intervalMonths * i);
    
    // In a real scenario, longer terms might have higher APYs.
    // For this MVP, we use the provided APY for all rungs.
    // Future improvement: accept an APY curve or map.
    
    const result = calculateMaturity({
      principal: amountPerRung,
      apy,
      termMonths,
      compounding
    });

    const maturityDate = new Date(today);
    maturityDate.setMonth(today.getMonth() + termMonths);

    rungs.push({
      id: i,
      termMonths,
      principal: amountPerRung,
      apy,
      maturityValue: result.maturityValue,
      interestEarned: result.interestEarned,
      maturityDate,
    });

    totalInterest += result.interestEarned;
    totalMaturity += result.maturityValue;
  }

  // Blended APY calculation is complex because terms differ.
  // A simple approximation is the weighted average of APYs, but since APY is constant here, it's just the input APY.
  // However, "Blended APY" usually refers to the effective return of the whole portfolio over the longest term.
  // Let's stick to returning the input APY as the "Average APY" for now, 
  // or calculate Total Interest / Total Principal / Max Years (Simple Annualized Return).
  
  // Simple Annualized Return = (Total Interest / Total Principal) / MaxTermYears
  const simpleAnnualizedReturn = (totalInterest / totalAmount) / maxTermYears;

  return {
    rungs,
    totalPrincipal: totalAmount,
    totalInterest,
    totalMaturity,
    blendedApy: apy, // For this simple version
  };
}

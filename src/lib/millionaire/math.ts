export interface GrowthYear {
  year: number;
  deposits: number;
  interest: number;
  balance: number;
}

/**
 * Calculates the number of years required to reach the target amount.
 * Formula: t = ln((FV + PMT/Rm) / (PV + Rm/Rm)) / (12 * ln(1 + Rm))
 *
 * @param pv Present value (initial savings)
 * @param pmt Monthly contribution
 * @param annualRate Expected annual rate of return (as percentage, e.g. 8 for 8%)
 * @param target Target amount (e.g. 1000000)
 */
export function calculateTimeToTarget(
  pv: number,
  pmt: number,
  annualRate: number,
  target: number
): number {
  if (pv >= target) return 0;

  const rate = annualRate / 100;
  const rm = rate / 12;

  // If return rate is 0
  if (rate === 0) {
    if (pmt <= 0) return Infinity; // Will never reach target
    return (target - pv) / (12 * pmt);
  }

  // If rate is positive but contribution and pv cannot grow to target
  // e.g. if pv=0 and pmt=0
  if (pv === 0 && pmt === 0) return Infinity;

  // Standard compound formula solver
  // K = 1 + rm
  const k = 1 + rm;
  const numerator = target + pmt / rm;
  const denominator = pv + pmt / rm;

  if (denominator <= 0 || numerator <= 0) {
    return Infinity;
  }

  const t = Math.log(numerator / denominator) / (12 * Math.log(k));
  return t;
}

/**
 * Calculates the required monthly contribution to reach the target amount in a set number of years.
 * Formula: PMT = (FV - PV * K^(12t)) / ((K^(12t) - 1) / Rm)
 *
 * @param pv Present value (initial savings)
 * @param years Target duration in years
 * @param annualRate Expected annual rate of return (as percentage, e.g. 8 for 8%)
 * @param target Target amount (e.g. 1000000)
 */
export function calculateRequiredPmt(
  pv: number,
  years: number,
  annualRate: number,
  target: number
): number {
  if (pv >= target) return 0;
  if (years <= 0) return 0;

  const rate = annualRate / 100;
  const rm = rate / 12;
  const months = years * 12;

  if (rate === 0) {
    return (target - pv) / months;
  }

  const k = 1 + rm;
  const compoundMultiplier = Math.pow(k, months);

  const pvFutureValue = pv * compoundMultiplier;
  if (pvFutureValue >= target) return 0; // Initial savings alone will grow past target

  const annuityFactor = (compoundMultiplier - 1) / rm;
  const requiredPmt = (target - pvFutureValue) / annuityFactor;

  return Math.max(0, requiredPmt);
}

/**
 * Generates a year-by-year list of balances, deposits, and interest values.
 * Performs month-by-month compounding to ensure absolute precision.
 *
 * @param pv Present value (initial savings)
 * @param pmt Monthly contribution
 * @param annualRate Expected annual rate of return (as percentage, e.g. 8 for 8%)
 * @param years Duration to simulate
 */
export function generateGrowthSchedule(
  pv: number,
  pmt: number,
  annualRate: number,
  years: number
): GrowthYear[] {
  const rate = annualRate / 100;
  const rm = rate / 12;
  const totalMonths = Math.ceil(years * 12);
  const schedule: GrowthYear[] = [];

  // Year 0 (Starting point)
  schedule.push({
    year: 0,
    deposits: Math.round(pv),
    interest: 0,
    balance: Math.round(pv),
  });

  if (years <= 0) return schedule;

  let currentBalance = pv;
  let currentDeposits = pv;

  for (let month = 1; month <= totalMonths; month++) {
    // Add monthly interest and contribution
    // Compounded monthly
    currentBalance = currentBalance * (1 + rm) + pmt;
    currentDeposits += pmt;

    // Record data at the end of each year
    if (month % 12 === 0) {
      const year = month / 12;
      const roundedDeposits = Math.round(currentDeposits);
      const roundedBalance = Math.round(currentBalance);
      const roundedInterest = Math.max(0, roundedBalance - roundedDeposits);

      schedule.push({
        year,
        deposits: roundedDeposits,
        interest: roundedInterest,
        balance: roundedBalance,
      });
    }
  }

  // Handle fractional year end if totalMonths is not divisible by 12
  const finalYear = totalMonths / 12;
  if (totalMonths % 12 !== 0) {
    const roundedDeposits = Math.round(currentDeposits);
    const roundedBalance = Math.round(currentBalance);
    const roundedInterest = Math.max(0, roundedBalance - roundedDeposits);

    schedule.push({
      year: finalYear,
      deposits: roundedDeposits,
      interest: roundedInterest,
      balance: roundedBalance,
    });
  }

  return schedule;
}

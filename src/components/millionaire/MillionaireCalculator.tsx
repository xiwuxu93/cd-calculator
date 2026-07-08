'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  calculateTimeToTarget,
  calculateRequiredPmt,
  generateGrowthSchedule,
} from '@/lib/millionaire/math';
import MillionaireChart from './MillionaireChart';

export default function MillionaireCalculator() {
  const t = useTranslations('millionairePage');

  // Input states
  const [mode, setMode] = useState<'time' | 'contribution'>('time');
  const [pv, setPv] = useState<number>(10000);
  const [pmt, setPmt] = useState<number>(500);
  const [rate, setRate] = useState<number>(8); // 8% expected annual return
  const [target, setTarget] = useState<number>(1000000);
  const [years, setYears] = useState<number>(15); // target years in contribution mode
  const [currentAge, setCurrentAge] = useState<number>(25);

  // Sync manual input values (as strings to allow partial typing)
  const [pvStr, setPvStr] = useState<string>('10,000');
  const [pmtStr, setPmtStr] = useState<string>('500');
  const [rateStr, setRateStr] = useState<string>('8');
  const [targetStr, setTargetStr] = useState<string>('1,000,000');
  const [yearsStr, setYearsStr] = useState<string>('15');
  const [currentAgeStr, setCurrentAgeStr] = useState<string>('25');

  // Helper to parse currency strings to numbers
  const parseNumber = (str: string): number => {
    const cleaned = str.replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  // Helper to format numbers with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  // Update states on manual typing
  const handlePvChange = (val: string) => {
    setPvStr(val);
    const num = parseNumber(val);
    setPv(Math.min(num, 10000000));
  };

  const handlePmtChange = (val: string) => {
    setPmtStr(val);
    const num = parseNumber(val);
    setPmt(Math.min(num, 100000));
  };

  const handleRateChange = (val: string) => {
    setRateStr(val);
    const num = parseFloat(val);
    setRate(isNaN(num) ? 0 : Math.min(num, 100));
  };

  const handleTargetChange = (val: string) => {
    setTargetStr(val);
    const num = parseNumber(val);
    setTarget(Math.min(num, 100000000));
  };

  const handleYearsChange = (val: string) => {
    setYearsStr(val);
    const num = parseInt(val, 10);
    setYears(isNaN(num) ? 1 : Math.min(Math.max(num, 1), 60));
  };

  const handleAgeChange = (val: string) => {
    setCurrentAgeStr(val);
    const num = parseInt(val, 10);
    setCurrentAge(isNaN(num) ? 0 : Math.min(Math.max(num, 0), 100));
  };

  // Calculations based on mode
  const calculationResults = useMemo(() => {
    if (mode === 'time') {
      const calculatedYears = calculateTimeToTarget(pv, pmt, rate, target);
      const schedule =
        calculatedYears > 0 && isFinite(calculatedYears)
          ? generateGrowthSchedule(pv, pmt, rate, calculatedYears)
          : [];

      const finalYearData = schedule[schedule.length - 1];
      const totalDeposited = finalYearData ? finalYearData.deposits : pv;
      const totalInterest = finalYearData ? finalYearData.interest : 0;
      const finalAge = isFinite(calculatedYears) ? currentAge + calculatedYears : null;

      return {
        yearsNeeded: calculatedYears,
        requiredPmt: pmt,
        schedule,
        totalDeposited,
        totalInterest,
        finalAge,
        isPossible: calculatedYears !== Infinity,
      };
    } else {
      const requiredMonthly = calculateRequiredPmt(pv, years, rate, target);
      const schedule = generateGrowthSchedule(pv, requiredMonthly, rate, years);
      const finalYearData = schedule[schedule.length - 1];
      const totalDeposited = finalYearData ? finalYearData.deposits : pv;
      const totalInterest = finalYearData ? finalYearData.interest : 0;
      const finalAge = currentAge + years;

      return {
        yearsNeeded: years,
        requiredPmt: requiredMonthly,
        schedule,
        totalDeposited,
        totalInterest,
        finalAge,
        isPossible: true,
      };
    }
  }, [mode, pv, pmt, rate, target, years, currentAge]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Input panel (Left) */}
      <div className="lg:col-span-5 space-y-6 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {t('calculatorTitle')}
        </h2>

        {/* Mode Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {t('modeLabel')}
          </label>
          <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setMode('time')}
              className={`py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                mode === 'time'
                  ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100/50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('modeTime')}
            </button>
            <button
              onClick={() => setMode('contribution')}
              className={`py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                mode === 'contribution'
                  ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100/50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('modeContribution')}
            </button>
          </div>
        </div>

        {/* Target Goal Amount */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="target-input" className="text-sm font-semibold text-gray-700">
              {t('targetAmount')}
            </label>
            <input
              id="target-input"
              type="text"
              value={targetStr}
              onChange={(e) => handleTargetChange(e.target.value)}
              onBlur={() => setTargetStr(formatNumber(target))}
              className="w-32 text-right font-medium text-emerald-700 border-b border-gray-300 focus:border-emerald-600 outline-none pb-0.5 text-sm"
            />
          </div>
          <input
            type="range"
            min="10000"
            max="5000000"
            step="10000"
            value={target}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setTarget(val);
              setTargetStr(formatNumber(val));
            }}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>$10K</span>
            <span>$2.5M</span>
            <span>$5M</span>
          </div>
        </div>

        {/* Starting Savings (PV) */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="pv-input" className="text-sm font-semibold text-gray-700">
              {t('initialSavings')}
            </label>
            <input
              id="pv-input"
              type="text"
              value={pvStr}
              onChange={(e) => handlePvChange(e.target.value)}
              onBlur={() => setPvStr(formatNumber(pv))}
              className="w-28 text-right font-medium text-gray-800 border-b border-gray-300 focus:border-emerald-600 outline-none pb-0.5 text-sm"
            />
          </div>
          <input
            type="range"
            min="0"
            max="1000000"
            step="5000"
            value={pv}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setPv(val);
              setPvStr(formatNumber(val));
            }}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>$0</span>
            <span>$500K</span>
            <span>$1M</span>
          </div>
        </div>

        {/* Mode dependent input (Monthly Contribution vs Years) */}
        {mode === 'time' ? (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="pmt-input" className="text-sm font-semibold text-gray-700">
                {t('monthlyContribution')}
              </label>
              <input
                id="pmt-input"
                type="text"
                value={pmtStr}
                onChange={(e) => handlePmtChange(e.target.value)}
                onBlur={() => setPmtStr(formatNumber(pmt))}
                className="w-24 text-right font-medium text-gray-800 border-b border-gray-300 focus:border-emerald-600 outline-none pb-0.5 text-sm"
              />
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={pmt}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setPmt(val);
                setPmtStr(formatNumber(val));
              }}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>$0</span>
              <span>$5K</span>
              <span>$10K</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="years-input" className="text-sm font-semibold text-gray-700">
                {t('targetYears')}
              </label>
              <input
                id="years-input"
                type="number"
                value={yearsStr}
                onChange={(e) => handleYearsChange(e.target.value)}
                onBlur={() => setYearsStr(String(years))}
                className="w-16 text-right font-medium text-gray-800 border-b border-gray-300 focus:border-emerald-600 outline-none pb-0.5 text-sm"
              />
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={years}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setYears(val);
                setYearsStr(String(val));
              }}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>1 Year</span>
              <span>25 Years</span>
              <span>50 Years</span>
            </div>
          </div>
        )}

        {/* Expected Return Rate */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="rate-input" className="text-sm font-semibold text-gray-700">
              {t('annualReturn')}
            </label>
            <input
              id="rate-input"
              type="number"
              step="0.1"
              value={rateStr}
              onChange={(e) => handleRateChange(e.target.value)}
              onBlur={() => setRateStr(String(rate))}
              className="w-16 text-right font-medium text-gray-800 border-b border-gray-300 focus:border-emerald-600 outline-none pb-0.5 text-sm"
            />
          </div>
          <input
            type="range"
            min="0"
            max="20"
            step="0.25"
            value={rate}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setRate(val);
              setRateStr(String(val));
            }}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>0%</span>
            <span>10%</span>
            <span>20%</span>
          </div>
        </div>

        {/* Current Age */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="age-input" className="text-sm font-semibold text-gray-700">
              {t('currentAge')}
            </label>
            <input
              id="age-input"
              type="number"
              value={currentAgeStr}
              onChange={(e) => handleAgeChange(e.target.value)}
              onBlur={() => setCurrentAgeStr(String(currentAge))}
              className="w-16 text-right font-medium text-gray-800 border-b border-gray-300 focus:border-emerald-600 outline-none pb-0.5 text-sm"
            />
          </div>
          <input
            type="range"
            min="10"
            max="80"
            step="1"
            value={currentAge}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setCurrentAge(val);
              setCurrentAgeStr(String(val));
            }}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>Age 10</span>
            <span>Age 45</span>
            <span>Age 80</span>
          </div>
        </div>
      </div>

      {/* Output Panel & Chart (Right) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Banner Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
          {pv >= target ? (
            <div className="text-center py-4">
              <span className="text-3xl">🎉</span>
              <p className="mt-3 text-emerald-800 font-semibold">{t('alreadyReached')}</p>
            </div>
          ) : !calculationResults.isPossible ? (
            <div className="text-center py-4 text-red-600 font-semibold text-sm">
              {t('neverReach')}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {/* Primary metric */}
              {mode === 'time' ? (
                <div>
                  <span className="block text-xs font-semibold text-emerald-700/60 uppercase tracking-wider">
                    {t('yearsToTarget')}
                  </span>
                  <span className="block text-3xl font-extrabold text-emerald-800 mt-1">
                    {calculationResults.yearsNeeded.toFixed(1)}{' '}
                    <span className="text-lg font-bold">Yrs</span>
                  </span>
                  {calculationResults.finalAge !== null && (
                    <span className="block text-[11px] text-emerald-600 mt-0.5">
                      {t('ageAchieved')}:{' '}
                      <span className="font-bold">{Math.round(calculationResults.finalAge)}</span>
                    </span>
                  )}
                </div>
              ) : (
                <div>
                  <span className="block text-xs font-semibold text-emerald-700/60 uppercase tracking-wider">
                    {t('requiredMonthly')}
                  </span>
                  <span className="block text-3xl font-extrabold text-emerald-800 mt-1">
                    ${Math.round(calculationResults.requiredPmt).toLocaleString()}
                    <span className="text-lg font-bold">/mo</span>
                  </span>
                  {calculationResults.finalAge !== null && (
                    <span className="block text-[11px] text-emerald-600 mt-0.5">
                      {t('ageAchieved')}:{' '}
                      <span className="font-bold">{Math.round(calculationResults.finalAge)}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Goal parameters */}
              <div className="border-l border-emerald-100/70 pl-4 flex flex-col justify-center">
                <span className="block text-[10px] font-bold text-emerald-700/60 uppercase">
                  Target Amount
                </span>
                <span className="block text-xl font-bold text-emerald-800 mt-0.5">
                  ${formatNumber(target)}
                </span>
                <span className="block text-[11px] text-emerald-600 mt-0.5">
                  At <span className="font-bold">{rate}%</span> Expected Yield
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic stacked breakdown */}
        {calculationResults.isPossible && pv < target && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <span className="block text-xs text-gray-500">{t('totalDeposited')}</span>
              <span className="block text-lg font-bold text-slate-700 mt-1">
                ${formatNumber(calculationResults.totalDeposited)}
              </span>
              <span className="block text-[10px] text-gray-400 mt-0.5">
                ({Math.round((calculationResults.totalDeposited / target) * 100)}% of goal)
              </span>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <span className="block text-xs text-gray-500">{t('interestEarned')}</span>
              <span className="block text-lg font-bold text-emerald-600 mt-1">
                ${formatNumber(calculationResults.totalInterest)}
              </span>
              <span className="block text-[10px] text-emerald-500 mt-0.5 font-medium">
                ({Math.round((calculationResults.totalInterest / target) * 100)}% of goal)
              </span>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <span className="block text-xs text-gray-500">{t('finalBalance')}</span>
              <span className="block text-lg font-bold text-gray-900 mt-1">
                ${formatNumber(Math.max(target, calculationResults.totalDeposited + calculationResults.totalInterest))}
              </span>
              <span className="block text-[10px] text-gray-400 mt-0.5">
                Target Met 🎉
              </span>
            </div>
          </div>
        )}

        {/* Compounding Chart */}
        {calculationResults.isPossible && pv < target && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Compound Growth Timeline Chart
            </h3>
            <MillionaireChart schedule={calculationResults.schedule} />
          </div>
        )}
      </div>
    </div>
  );
}

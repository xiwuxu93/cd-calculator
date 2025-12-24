"use client";

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateLadder, type LadderResult } from '@/lib/cd/ladder';
import { trackEvent } from '@/lib/analytics';

function parseNum(v: string): number | null {
  const s = v.replace(/,/g, '').trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export default function LadderCalculator() {
  // We'll reuse the 'calculator' namespace for common terms, and add 'ladder' namespace later.
  // For now, I'll hardcode some labels or use a new namespace if I add it.
  // Let's assume I'll add a 'ladder' namespace to messages.
  
  // To avoid breaking, I will use a local map or wait until I update messages.
  // I will update messages in the next step.
  const t = useTranslations('ladder'); 

  const [amountStr, setAmountStr] = useState('25000');
  const [rungsStr, setRungsStr] = useState('5');
  const [apyStr, setApyStr] = useState('4.50');
  
  const amount = parseNum(amountStr) ?? 0;
  const rungs = Math.max(1, Math.min(10, Math.floor(parseNum(rungsStr) ?? 0)));
  const apy = (parseNum(apyStr) ?? 0) / 100;
  // Defaulting max term to match rungs (e.g. 5 rungs = 5 years). 
  // In a more advanced version, max term could be independent.
  const maxTermYears = rungs; 

  const result: LadderResult | null = useMemo(() => {
    if (amount <= 0 || rungs <= 0 || apy < 0) return null;
    return calculateLadder(amount, rungs, maxTermYears, apy);
  }, [amount, rungs, maxTermYears, apy]);

  const handleCalculate = () => {
    trackEvent('calculate', { tool: 'cd_ladder', amount, rungs });
  };

  return (
    <section className="mx-auto max-w-3xl" aria-label="CD Ladder Calculator">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('totalInvestment')}</label>
            <input
              type="text"
              inputMode="decimal"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('numberOfRungs')}</label>
            <select
              value={rungsStr}
              onChange={(e) => setRungsStr(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            >
              {[2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} ({n} Years)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('apyLabel')}</label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={apyStr}
                onChange={(e) => setApyStr(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <span className="absolute right-3 top-2 text-gray-500">%</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleCalculate}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('calculate')}
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="text-sm text-blue-700 mb-1">{t('totalInterest')}</div>
              <div className="text-2xl font-bold text-blue-900">
                ${result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <div className="text-sm text-green-700 mb-1">{t('totalValue')}</div>
              <div className="text-2xl font-bold text-green-900">
                ${result.totalMaturity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
              <div className="text-sm text-purple-700 mb-1">{t('annualLiquidity')}</div>
              <div className="text-2xl font-bold text-purple-900">
                ${(result.totalPrincipal / rungs).toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr
              </div>
            </div>
          </div>

          {/* Visual Ladder */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('ladderSchedule')}</h3>
            <div className="space-y-4">
              {result.rungs.map((rung) => (
                <div key={rung.id} className="relative">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>CD #{rung.id} ({rung.termMonths}mo)</span>
                    <span>{t('maturity')}: {rung.maturityDate.toLocaleDateString()}</span>
                  </div>
                  <div className="h-8 bg-gray-100 rounded-full overflow-hidden flex items-center relative">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${(rung.id / rungs) * 100}%` }}
                    />
                    <div className="absolute right-4 text-xs font-medium text-gray-700">
                      +${rung.interestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t('invested')}: ${rung.principal.toLocaleString()} @ {(rung.apy * 100).toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

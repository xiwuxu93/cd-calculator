"use client";

import { useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateMaturity, nominalToApy, generateCDGrowthSchedule } from '@/lib/cd/interest';
import { trackEvent } from '@/lib/analytics';
import type { Compounding } from '@/lib/cd/types';
import CDChart from './CDChart';

function parseNumber(value: string): number | null {
  const v = value.replace(/,/g, '').trim();
  if (v === '') return null;
  const num = Number(v);
  return Number.isFinite(num) ? num : null;
}

type CDCalculatorProps = {
  initialTerm?: number;
  initialPrincipal?: number;
  initialApy?: number;
  defaultShowAfterTax?: boolean;
  defaultIsPayout?: boolean;
  defaultCompounding?: Compounding;
};

export default function CDCalculator({
  initialTerm = 12,
  initialPrincipal = 10000,
  initialApy = 5.00,
  defaultShowAfterTax = false,
  defaultIsPayout = false,
  defaultCompounding = 'monthly'
}: CDCalculatorProps = {}) {
  const t = useTranslations('calculator');

  const [principalStr, setPrincipalStr] = useState(String(initialPrincipal));
  const [rateStr, setRateStr] = useState(initialApy.toFixed(2));
  const [rateMode, setRateMode] = useState<'apy' | 'nominal'>('apy');
  const [termStr, setTermStr] = useState(String(initialTerm));
  const [compounding, setCompounding] = useState<Compounding>(defaultCompounding);
  const [isPayout, setIsPayout] = useState(defaultIsPayout); // New Payout Mode
  const [errors, setErrors] = useState<{ principal?: string; apy?: string; term?: string }>({});
  const [showAfterTax, setShowAfterTax] = useState(defaultShowAfterTax);
  const [taxRateStr, setTaxRateStr] = useState('22.0');

  const principalRef = useRef<HTMLInputElement>(null);
  const apyRef = useRef<HTMLInputElement>(null);
  const termRef = useRef<HTMLInputElement>(null);

  const principal = parseNumber(principalStr) ?? 0;
  const apy = (parseNumber(rateStr) ?? 0) / 100; // percent -> decimal (when mode=apy)
  const rate = apy; // alias
  const termMonths = Math.max(0, Math.floor(parseNumber(termStr) ?? 0));
  const effectiveApy = rateMode === 'apy' ? rate : nominalToApy(rate, compounding);
  const taxRate = (parseNumber(taxRateStr) ?? 0) / 100;

  const result = useMemo(() => {
    try {
      if (principal <= 0 || rate < 0 || termMonths <= 0) return null;
      return calculateMaturity({
        principal,
        apy: effectiveApy,
        termMonths,
        compounding,
        isPayout
      });
    } catch {
      return null;
    }
  }, [principal, rate, termMonths, compounding, effectiveApy, isPayout]);

  const schedule = useMemo(() => {
    if (principal <= 0 || rate < 0 || termMonths <= 0) return [];
    return generateCDGrowthSchedule({
      principal,
      apy: effectiveApy,
      termMonths,
      compounding,
      isPayout
    });
  }, [principal, rate, termMonths, compounding, effectiveApy, isPayout]);

  const copyToClipboard = async () => {
    if (!result) return;
    const summary = `CD Results\nPrincipal: $${principal.toLocaleString()}\nAPY: ${(effectiveApy * 100).toFixed(2)}%\nTerm: ${termMonths} months\nCompounding: ${compounding}\nMaturity: $${result.maturityValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}\nInterest: $${result.interestEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    try {
      await navigator.clipboard.writeText(summary);
      trackEvent('copy_result', { tool: 'cd_calculator' });
    } catch {}
  };

  const onReset = () => {
    setPrincipalStr(String(initialPrincipal));
    setRateStr(initialApy.toFixed(2));
    setTermStr(String(initialTerm));
    setCompounding(defaultCompounding);
    setRateMode('apy');
    setIsPayout(defaultIsPayout);
    setShowAfterTax(defaultShowAfterTax);
    setErrors({});
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (principal <= 0) newErrors.principal = t('error.principalPositive');
    if (rate < 0 || rate > 2) newErrors.apy = t('error.apyRange');
    if (termMonths <= 0) newErrors.term = t('error.termPositive');
    setErrors(newErrors);
    const firstKey = ['principal', 'apy', 'term'].find((k) => (newErrors as any)[k]);
    if (firstKey === 'principal') principalRef.current?.focus();
    else if (firstKey === 'apy') apyRef.current?.focus();
    else if (firstKey === 'term') termRef.current?.focus();
    return Object.keys(newErrors).length === 0;
  };

  return (
    <section aria-label={t('title')} className="mx-auto max-w-2xl">

      {/* Form */}
      <div className="rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm bg-white">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Principal */}
          <div>
            <label htmlFor="principal" className="block text-sm font-medium text-gray-700">
              {t('principalLabel')}
            </label>
            <input
              id="principal"
              inputMode="decimal"
              pattern="[0-9.,]*"
              aria-invalid={!!errors.principal}
              aria-describedby={errors.principal ? 'principal-error' : undefined}
              ref={principalRef}
              value={principalStr}
              onChange={(e) => setPrincipalStr(e.target.value)}
              placeholder={t('principalPlaceholder')}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.principal && (
              <p id="principal-error" className="mt-1 text-xs text-red-600">{errors.principal}</p>
            )}
          </div>

          {/* Rate (APY or nominal APR) */}
          <div>
            <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
              {rateMode === 'apy' ? t('apyLabel') : t('aprLabel')}
            </label>
            <div className="relative mt-1">
              <input
                id="rate"
                inputMode="decimal"
                pattern="[0-9.,]*"
                aria-invalid={!!errors.apy}
                aria-describedby={errors.apy ? 'apy-error' : undefined}
                ref={apyRef}
                value={rateStr}
                onChange={(e) => setRateStr(e.target.value)}
                placeholder={rateMode === 'apy' ? t('apyPlaceholder') : t('aprPlaceholder')}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">%</span>
            </div>
            {errors.apy && (
              <p id="apy-error" className="mt-1 text-xs text-red-600">{errors.apy}</p>
            )}
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="rate-mode" checked={rateMode==='apy'} onChange={()=>setRateMode('apy')} />
                {t('rateModeApy')}
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="rate-mode" checked={rateMode==='nominal'} onChange={()=>setRateMode('nominal')} />
                {t('rateModeApr')}
              </label>
            </div>
          </div>

          {/* Term */}
          <div>
            <label htmlFor="term" className="block text-sm font-medium text-gray-700">
              {t('termLabel')}
            </label>
            <input
              id="term"
              inputMode="numeric"
              pattern="[0-9]*"
              aria-invalid={!!errors.term}
              aria-describedby={errors.term ? 'term-error' : undefined}
              ref={termRef}
              value={termStr}
              onChange={(e) => setTermStr(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder={t('termPlaceholder')}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.term && (
              <p id="term-error" className="mt-1 text-xs text-red-600">{errors.term}</p>
            )}
          </div>

          {/* Compounding */}
          <div>
            <label htmlFor="compounding" className="block text-sm font-medium text-gray-700">
              {t('compoundingLabel')}
            </label>
            <select
              id="compounding"
              value={compounding}
              onChange={(e) => setCompounding(e.target.value as Compounding)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="daily">{t('compoundingDaily')}</option>
              <option value="monthly">{t('compoundingMonthly')}</option>
              <option value="quarterly">{t('compoundingQuarterly')}</option>
              <option value="semiannually">{t('compoundingSemi')}</option>
              <option value="annually">{t('compoundingAnnually')}</option>
            </select>
          </div>
        </div>

        {/* Payout Mode Toggle */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('payoutModeLabel')}
          </label>
          <div className="flex flex-col sm:flex-row gap-3 text-sm">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="payout-mode" 
                checked={!isPayout} 
                onChange={()=>setIsPayout(false)}
                className="text-blue-600 focus:ring-blue-600"
              />
              {t('payoutModeCompound')}
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="payout-mode" 
                checked={isPayout} 
                onChange={()=>setIsPayout(true)}
                className="text-blue-600 focus:ring-blue-600"
              />
              {t('payoutModeWithdraw')}
            </label>
          </div>
        </div>

        {/* Quick term chips */}
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {[3,6,9,12,18,24,36,48,60].map((m)=> (
            <button key={m} type="button" onClick={()=>setTermStr(String(m))} className={`rounded-full border px-3 py-1 ${Number(termStr)===m? 'border-blue-600 text-blue-700':'border-gray-300 text-gray-700 hover:border-blue-600'}`}>
              {m}m
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => {
              const ok = validate();
              if (ok) {
                trackEvent('calculate', {
                  tool: 'cd_calculator',
                  apy: Number.isFinite(effectiveApy) ? Number((effectiveApy * 100).toFixed(2)) : undefined,
                  termMonths,
                  compounding,
                  isPayout,
                });
              }
            }}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {t('calculateButton')}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-gray-800 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {t('resetButton')}
          </button>
          {result && (
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-gray-800 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              {t('copyResults')}
            </button>
          )}
        </div>

        <p className="mt-3 text-xs text-gray-500">{t('inputHelp')}</p>
        {/* After-tax toggle */}
        <div className="mt-3 flex items-center gap-3 text-sm">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={showAfterTax} onChange={(e)=>setShowAfterTax(e.target.checked)} />
            {t('afterTaxToggle')}
          </label>
          {showAfterTax && (
            <div className="flex items-center gap-2">
              <label htmlFor="tax-rate" className="text-gray-700">{t('taxRateLabel')}</label>
              <div className="relative">
                <input id="tax-rate" inputMode="decimal" pattern="[0-9.,]*" value={taxRateStr} onChange={(e)=>setTaxRateStr(e.target.value)} className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-base pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div aria-live="polite" role="status" className="sr-only">
        {result ? 'Results updated' : ''}
      </div>
      {result && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-4 bg-white">
            <div className="text-sm text-gray-600">{t('maturityValue')}</div>
            <div className="mt-1 text-xl font-semibold text-gray-900">
              ${result.maturityValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 bg-white">
            <div className="text-sm text-gray-600">{t('interestEarned')}</div>
            <div className={`mt-1 text-xl font-semibold ${result.interestEarned > 0 ? 'text-green-700' : result.interestEarned < 0 ? 'text-red-700' : 'text-gray-900'}`}>
              ${result.interestEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          
          {/* Conditional 3rd Box: Effective Yield OR Periodic Payout */}
          {isPayout && result.periodicPayout ? (
             <div className="rounded-lg border border-gray-200 p-4 bg-white ring-2 ring-blue-500">
               <div className="text-sm text-gray-600">{t('periodicPayout')}</div>
               <div className="mt-1 text-xl font-semibold text-blue-700">
                 ${result.periodicPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                 <span className="text-xs font-normal text-gray-500 ml-1">/{compounding.replace('ly','')}</span>
               </div>
             </div>
          ) : (
            <div className="rounded-lg border border-gray-200 p-4 bg-white">
              <div className="text-sm text-gray-600">{t('effectiveYield')}</div>
              <div className="mt-1 text-xl font-semibold text-blue-700">
                {(result.effectiveAnnualYield * 100).toFixed(2)}%
              </div>
            </div>
          )}
        </div>
      )}

      {/* After-tax summary */}
      {result && showAfterTax && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-4 bg-white">
            <div className="text-sm text-gray-600">{t('afterTaxInterest')}</div>
            <div className="mt-1 text-xl font-semibold text-purple-700">
              {(result.interestEarned * (1 - taxRate)).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 bg-white">
            <div className="text-sm text-gray-600">{t('afterTaxMaturity')}</div>
            <div className="mt-1 text-xl font-semibold text-gray-900">
              {(result.maturityValue - (result.interestEarned * taxRate)).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}
            </div>
          </div>
        </div>
      )}

      {result && schedule.length > 0 && (
        <CDChart schedule={schedule} isPayout={isPayout} />
      )}

      {/* Schedule - on demand */}
      {result && (
        <Schedule 
          principal={principal} 
          apy={effectiveApy} 
          termMonths={termMonths} 
          compounding={compounding} 
          isPayout={isPayout}
        />
      )}
    </section>
  );
}

type ScheduleProps = { principal: number; apy: number; termMonths: number; compounding: Compounding; isPayout: boolean };

function perYear(comp: Compounding) {
  switch (comp) {
    case 'daily': return 365;
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'semiannually': return 2;
    case 'annually': return 1;
    default: return 12;
  }
}

function Schedule({ principal, apy, termMonths, compounding, isPayout }: ScheduleProps) {
  const t = useTranslations('calculator');
  const [open, setOpen] = useState(false);
  const n = perYear(compounding);
  
  // r is periodic rate
  const r = Math.pow(1 + apy, 1 / n) - 1;
  
  const total = (termMonths / 12) * n;
  const full = Math.floor(total);
  const frac = total - full;

  const rows: { index: string; start: number; interest: number; end: number; paidOut: boolean }[] = [];
  let bal = principal;
  
  for (let i = 1; i <= full; i++) {
    const interest = bal * r;
    const end = isPayout ? bal : bal + interest; // if payout, balance stays same
    rows.push({ index: String(i), start: bal, interest, end, paidOut: isPayout });
    bal = end;
  }
  if (frac > 0) {
    // Fractional period interest
    const growth = Math.pow(1 + r, frac);
    const interest = bal * (growth - 1);
    const end = isPayout ? bal : bal + interest;
    rows.push({ index: `${full + 1}*`, start: bal, interest, end, paidOut: isPayout });
  }

  const exportCSV = () => {
    const header = ['Period','Start Balance','Interest','End Balance', isPayout ? 'Paid Out' : 'Reinvested'];
    const lines = rows.map(r=>[r.index,r.start.toFixed(2),r.interest.toFixed(2),r.end.toFixed(2), isPayout ? 'Yes' : 'No'].join(','));
    const csv = [header.join(','), ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cd-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6">
      <button type="button" onClick={()=>setOpen(!open)} className="rounded-lg border px-3 py-2 text-sm text-gray-800 hover:bg-gray-50">
        {open ? t('hideSchedule') : t('showSchedule')}
      </button>
      {open && (
        <div className="mt-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">{t('scheduleTitle')}</h3>
            <button type="button" onClick={exportCSV} className="rounded-lg border px-3 py-1 text-sm text-gray-800 hover:bg-gray-50">{t('exportCSV')}</button>
          </div>
          <div className="overflow-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-3 py-2 text-left">#</th>
                  <th className="px-3 py-2 text-right">Start</th>
                  <th className="px-3 py-2 text-right">Interest</th>
                  <th className="px-3 py-2 text-right">End</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 365).map((r)=> (
                  <tr key={r.index} className="odd:bg-white even:bg-gray-50">
                    <td className="px-3 py-2">{r.index}</td>
                    <td className="px-3 py-2 text-right">${r.start.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                    <td className="px-3 py-2 text-right">${r.interest.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                    <td className="px-3 py-2 text-right">${r.end.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length > 365 && (
            <p className="mt-2 text-xs text-gray-500">Showing first 365 rows. Export CSV for full schedule.</p>
          )}
        </div>
      )}
    </div>
  );
}
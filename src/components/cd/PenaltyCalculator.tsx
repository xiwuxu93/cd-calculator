"use client";

import { useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { analyzeEarlyWithdrawal, type PenaltyPolicy } from '@/lib/cd/penalty';
import { trackEvent } from '@/lib/analytics';
import type { Compounding } from '@/lib/cd/types';

function parseNum(v: string): number | null {
  const s = v.replace(/,/g, '').trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export default function PenaltyCalculator() {
  const t = useTranslations('penalty');
  const [principalStr, setPrincipalStr] = useState('10000');
  const [apyStr, setApyStr] = useState('5.00');
  const [termStr, setTermStr] = useState('12');
  const [heldStr, setHeldStr] = useState('6');
  const [compounding] = useState<Compounding>('monthly');
  const [policy, setPolicy] = useState<PenaltyPolicy>({ type: 'threeMonths' });
  const [customDaysStr, setCustomDaysStr] = useState('90');
  const [errors, setErrors] = useState<{ principal?: string; apy?: string; term?: string; held?: string }>({});

  const principalRef = useRef<HTMLInputElement>(null);
  const apyRef = useRef<HTMLInputElement>(null);
  const termRef = useRef<HTMLInputElement>(null);
  const heldRef = useRef<HTMLInputElement>(null);

  const principal = parseNum(principalStr) ?? 0;
  const apy = (parseNum(apyStr) ?? 0) / 100;
  const termMonths = Math.max(0, Math.floor(parseNum(termStr) ?? 0));
  const monthsHeld = Math.max(0, Math.floor(parseNum(heldStr) ?? 0));

  const effectivePolicy: PenaltyPolicy = policy.type === 'days'
    ? { type: 'days', days: Math.max(0, Math.floor(parseNum(customDaysStr) ?? 0)) }
    : policy;

  const res = useMemo(() => {
    try {
      if (principal <= 0 || termMonths <= 0 || apy < 0 || monthsHeld < 0 || monthsHeld > termMonths) return null;
      return analyzeEarlyWithdrawal({ principal, apy, termMonths, compounding, monthsHeld, policy: effectivePolicy });
    } catch {
      return null;
    }
  }, [principal, apy, termMonths, monthsHeld, compounding, effectivePolicy]);

  const selectPolicy = (type: PenaltyPolicy['type']) => {
    if (type === 'days') setPolicy({ type: 'days', days: Math.max(0, Math.floor(parseNum(customDaysStr) ?? 0)) });
    else setPolicy({ type } as PenaltyPolicy);
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (principal <= 0) newErrors.principal = t('error.principalPositive');
    if (apy < 0 || apy > 2) newErrors.apy = t('error.apyRange');
    if (termMonths <= 0) newErrors.term = t('error.termPositive');
    if (monthsHeld < 0 || monthsHeld > termMonths) newErrors.held = t('error.heldRange');
    setErrors(newErrors);
    const firstKey = ['principal','apy','term','held'].find((k) => (newErrors as any)[k]);
    if (firstKey==='principal') principalRef.current?.focus();
    else if (firstKey==='apy') apyRef.current?.focus();
    else if (firstKey==='term') termRef.current?.focus();
    else if (firstKey==='held') heldRef.current?.focus();
    return Object.keys(newErrors).length===0;
  };

  return (
    <section className="mx-auto max-w-2xl" aria-label={t('title')}>

      <div className="rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm bg-white">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="pen-principal" className="block text-sm font-medium text-gray-700">{t('principalLabel')}</label>
            <input
              id="pen-principal"
              inputMode="decimal"
              pattern="[0-9.,]*"
              aria-invalid={!!errors.principal}
              aria-describedby={errors.principal ? 'pen-principal-error' : undefined}
              ref={principalRef}
              value={principalStr}
              onChange={(e) => setPrincipalStr(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.principal && (<p id="pen-principal-error" className="mt-1 text-xs text-red-600">{errors.principal}</p>)}
          </div>
          <div>
            <label htmlFor="pen-apy" className="block text-sm font-medium text-gray-700">{t('apyLabel')}</label>
            <div className="relative mt-1">
              <input
                id="pen-apy"
                inputMode="decimal"
                pattern="[0-9.,]*"
                aria-invalid={!!errors.apy}
                aria-describedby={errors.apy ? 'pen-apy-error' : undefined}
                ref={apyRef}
                value={apyStr}
                onChange={(e) => setApyStr(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">%</span>
            </div>
            {errors.apy && (<p id="pen-apy-error" className="mt-1 text-xs text-red-600">{errors.apy}</p>)}
          </div>
          <div>
            <label htmlFor="pen-term" className="block text-sm font-medium text-gray-700">{t('termLabel')}</label>
            <input
              id="pen-term"
              inputMode="numeric"
              pattern="[0-9]*"
              aria-invalid={!!errors.term}
              aria-describedby={errors.term ? 'pen-term-error' : undefined}
              ref={termRef}
              value={termStr}
              onChange={(e) => setTermStr(e.target.value.replace(/[^0-9]/g, ''))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.term && (<p id="pen-term-error" className="mt-1 text-xs text-red-600">{errors.term}</p>)}
          </div>
          <div>
            <label htmlFor="pen-held" className="block text-sm font-medium text-gray-700">{t('heldLabel')}</label>
            <input
              id="pen-held"
              inputMode="numeric"
              pattern="[0-9]*"
              aria-invalid={!!errors.held}
              aria-describedby={errors.held ? 'pen-held-error' : undefined}
              ref={heldRef}
              value={heldStr}
              onChange={(e) => setHeldStr(e.target.value.replace(/[^0-9]/g, ''))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.held && (<p id="pen-held-error" className="mt-1 text-xs text-red-600">{errors.held}</p>)}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('policyLabel')}</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button type="button" onClick={() => selectPolicy('threeMonths')} className={`rounded-lg border px-3 py-2 text-sm ${policy.type==='threeMonths'?'border-blue-600 bg-blue-50':'border-gray-300 bg-white'}`}>{t('policyThree')}</button>
            <button type="button" onClick={() => selectPolicy('sixMonths')} className={`rounded-lg border px-3 py-2 text-sm ${policy.type==='sixMonths'?'border-blue-600 bg-blue-50':'border-gray-300 bg-white'}`}>{t('policySix')}</button>
            <button type="button" onClick={() => selectPolicy('strictAllEarned')} className={`rounded-lg border px-3 py-2 text-sm ${policy.type==='strictAllEarned'?'border-blue-600 bg-blue-50':'border-gray-300 bg-white'}`}>{t('policyStrict')}</button>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => selectPolicy('days')} className={`rounded-lg border px-3 py-2 text-sm ${policy.type==='days'?'border-blue-600 bg-blue-50':'border-gray-300 bg-white'}`}>{t('policyDays')}</button>
              {policy.type==='days' && (
                <input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={customDaysStr}
                  onChange={(e) => setCustomDaysStr(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder={t('daysPlaceholder')}
                  className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button type="button" onClick={() => { if (validate()) { trackEvent('calculate', { tool: 'cd_penalty', policy: policy.type, termMonths, monthsHeld }); } }} className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
            {t('calculateButton')}
          </button>
        </div>
      </div>

      {res && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-5">
          <div className="rounded-lg border border-gray-200 p-4 bg-white sm:col-span-1">
            <div className="text-sm text-gray-600">{t('earned')}</div>
            <div className="mt-1 text-xl font-semibold text-green-700">${res.earnedInterest.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 bg-white sm:col-span-1">
            <div className="text-sm text-gray-600">{t('penalty')}</div>
            <div className="mt-1 text-xl font-semibold text-red-700">-${res.penaltyAmount.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 bg-white sm:col-span-1">
            <div className="text-sm text-gray-600">{t('net')}</div>
            <div className={`mt-1 text-xl font-semibold ${res.netInterest > 0 ? 'text-green-700' : res.netInterest < 0 ? 'text-red-700' : 'text-gray-900'}`}>${res.netInterest.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 bg-white sm:col-span-1">
            <div className="text-sm text-gray-600">{t('refund')}</div>
            <div className="mt-1 text-xl font-semibold text-blue-700">${res.refundAmount.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 bg-white sm:col-span-1">
            <div className="text-sm text-gray-600">{t('breakeven')}</div>
            <div className="mt-1 text-xl font-semibold text-purple-700">{(res.breakEvenRate*100).toFixed(2)}%</div>
          </div>
        </div>
      )}

      {res && (
        <p className="mt-3 text-sm text-gray-700">
          {res.netInterest > 0 ? t('recommendationHold') : t('recommendationMove')}
        </p>
      )}
    </section>
  );
}

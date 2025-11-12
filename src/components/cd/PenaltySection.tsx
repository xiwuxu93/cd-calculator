"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const PenaltyCalculator = dynamic(() => import('@/components/cd/PenaltyCalculator'), {
  ssr: false,
});

export default function PenaltySection() {
  const t = useTranslations('penalty');
  const [open, setOpen] = useState(false);

  return (
    <section aria-labelledby="penalty-heading" className="mx-auto max-w-5xl">
      <div className="mb-4 text-center">
        <h2 id="penalty-heading" className="text-2xl font-semibold text-gray-900">
          {t('title')}
        </h2>
        <p className="text-gray-600 text-sm mt-1">{t('description')}</p>
      </div>

      <div className="text-center">
        {!open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Open Calculator
          </button>
        ) : null}
      </div>

      {open && (
        <div className="mt-6">
          <PenaltyCalculator />
        </div>
      )}
    </section>
  );
}


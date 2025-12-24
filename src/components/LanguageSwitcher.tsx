'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { defaultLocale, locales } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const t = useTranslations('locales');
  const pathname = usePathname();
  
  // Derive active locale from pathname to ensure immediate update on client navigation
  const activeLocale = locales.find((l) => 
    pathname === `/${l}` || pathname?.startsWith(`/${l}/`)
  ) || defaultLocale;

  const strippedPath =
    pathname?.replace(new RegExp(`^/(?:${locales.join('|')})(?=/|$)`), '') ?? '/';
  const normalizedPath = strippedPath === '' ? '/' : strippedPath;

  return (
    locales.length > 1 && (
      <div className="flex items-center gap-2">
      {locales.map((targetLocale) => {
        const isActive = targetLocale === activeLocale;
        const href =
          targetLocale === defaultLocale
            ? normalizedPath
            : `/${targetLocale}${normalizedPath === '/' ? '' : normalizedPath}`;

        return (
          <Link
            key={targetLocale}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`rounded-full border px-3 py-1 text-sm transition ${
              isActive
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
            }`}
          >
            {t(`${targetLocale}.short`)}
          </Link>
        );
      })}
    </div>
    )
  );
}

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Locale, getLocalePrefix, resolveLocale } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type HeaderProps = {
  locale: Locale;
};

export default async function Header({ locale }: HeaderProps) {
  const resolvedLocale = resolveLocale(locale);
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'common' });
  const homeHref = getLocalePrefix(resolvedLocale) || '/';

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link href={homeHref} className="flex flex-col gap-1">
          <span className="text-lg font-semibold tracking-tight text-gray-900 md:text-xl">
            {t('siteName')}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500 md:text-sm">
            {t('professionalUseOnly')}
          </span>
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

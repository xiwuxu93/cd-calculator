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
  const navT = await getTranslations({ locale: resolvedLocale, namespace: 'navigation' });

  // Simple navigation items
  const navItems = [
    { label: navT('calculators'), href: homeHref === '/' ? '/#tool' : `${homeHref}/#tool` },
    { label: navT('learn'), href: `${homeHref === '/' ? '' : homeHref}/how-to-calculate-cd-interest` },
  ];

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
        
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

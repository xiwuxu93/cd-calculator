import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import CurrentYear from '@/components/CurrentYear';
import { defaultLocale } from '@/lib/i18n';

const getLocalePrefix = (locale: string, fallbackLocale: string) =>
  locale === fallbackLocale ? '' : `/${locale}`;

type PartnerLink = {
  name: string;
  href: string;
  badgeSrc?: string;
  badgeAlt?: string;
  badgeWidth?: number;
  badgeHeight?: number;
};

const partnerLinks: PartnerLink[] = [
  {
    name: 'Findly.tools',
    href: 'https://findly.tools/cd-calculator?utm_source=cd-calculator',
    badgeSrc: 'https://findly.tools/badges/findly-tools-badge-light.svg',
    badgeAlt: 'Featured on Findly.tools',
    badgeWidth: 175,
    badgeHeight: 55,
  }
];

export default async function Footer() {
  const [t, locale] = await Promise.all([getTranslations('common'), getLocale()]);
  const basePath = getLocalePrefix(locale, defaultLocale);
  const withPrefix = (path: string) => `${basePath}${path}`;

  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t('siteName')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('footer.brandDescription')}
            </p>
          </div>

          {/* Calculators Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t('footer.calculatorsSection')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={withPrefix('/')} className="text-gray-600 hover:text-gray-900 transition">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link href={withPrefix('/early-withdrawal-penalty-calculator')} className="text-gray-600 hover:text-gray-900 transition">
                  {t('footer.penaltyCalculator')}
                </Link>
              </li>
              <li>
                <Link href={withPrefix('/cd-ladder-calculator')} className="text-gray-600 hover:text-gray-900 transition">
                  {t('footer.ladderCalculator')}
                </Link>
              </li>
              <li>
                <Link href={withPrefix('/jumbo-cd-calculator')} className="text-gray-600 hover:text-gray-900 transition">
                  Jumbo CD Calculator
                </Link>
              </li>
              <li>
                <Link href={withPrefix('/6-month-cd-calculator')} className="text-gray-600 hover:text-gray-900 transition">
                  6-Month CD Calculator
                </Link>
              </li>
              <li>
                <Link href={withPrefix('/1-year-cd-calculator')} className="text-gray-600 hover:text-gray-900 transition">
                  1-Year CD Calculator
                </Link>
              </li>
              <li>
                <Link href={withPrefix('/ira-cd-calculator')} className="text-gray-600 hover:text-gray-900 transition">
                  IRA CD Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Banks (Dynamic) */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t('footer.popularBanks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={withPrefix('/bank/chase-cd-calculator')} className="text-gray-600 hover:text-gray-900 transition">
                  Chase Bank
                </Link>
              </li>
              <li>
                <Link href={withPrefix('/bank/wells-fargo-cd-calculator')} className="text-gray-600 hover:text-gray-900 transition">
                  Wells Fargo
                </Link>
              </li>
              <li>
                <Link href={withPrefix('/bank/navy-federal-cd-calculator')} className="text-gray-600 hover:text-gray-900 transition">
                  Navy Federal
                </Link>
              </li>
              <li>
                <Link href={withPrefix('/bank/bank-of-america-cd-calculator')} className="text-gray-600 hover:text-gray-900 transition">
                  Bank of America
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn & Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t('footer.learnSection')}</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link href={withPrefix('/how-to-calculate-cd-interest')} className="text-gray-600 hover:text-gray-900 transition">
                  {t('footer.howToCalculate')}
                </Link>
              </li>
              <li>
                <Link href={withPrefix('/about')} className="text-gray-600 hover:text-gray-900 transition">
                  {t('footer.about')}
                </Link>
              </li>
            </ul>
            
            <h3 className="font-semibold text-gray-900 mb-3">{t('footer.legalSection')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={withPrefix('/privacy')} className="text-gray-600 hover:text-gray-900 transition">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href={withPrefix('/terms')} className="text-gray-600 hover:text-gray-900 transition">
                  {t('termsOfService')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
            <p className="text-center md:text-left">
              © <CurrentYear /> {t('siteName')}. {t('allRightsReserved')}
            </p>
            {partnerLinks.length > 0 && (
              <div className="flex items-center justify-center">
                <ul className="flex flex-wrap items-center justify-center gap-4">
                  {partnerLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        className="inline-flex items-center justify-center"
                      >
                        {link.badgeSrc ? (
                          <img
                            src={link.badgeSrc}
                            alt={link.badgeAlt || link.name}
                            width={link.badgeWidth}
                            height={link.badgeHeight}
                            className="w-auto"
                            style={link.badgeHeight ? { height: `${link.badgeHeight}px` } : undefined}
                          />
                        ) : (
                          <span className="text-gray-600 hover:text-gray-900 transition">
                            {link.name}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

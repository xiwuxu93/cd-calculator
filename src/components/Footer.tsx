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
  badgeHeight?: number;
};

const partnerLinks: PartnerLink[] = [
  {
    name: 'Appa List',
    href: 'https://appalist.com',
    badgeSrc: 'https://appalist.com/assets/images/badge.png',
    badgeAlt: 'Appa List',
    badgeHeight: 54,
  },
  {
    name: 'Hunt for Tools',
    href: 'https://huntfortools.com',
    badgeSrc: 'https://huntfortools.com/assets/images/badge.png',
    badgeAlt: 'Hunt for Tools',
    badgeHeight: 54,
  },
];

export default async function Footer() {
  const [t, locale] = await Promise.all([getTranslations('common'), getLocale()]);
  const basePath = getLocalePrefix(locale, defaultLocale);
  const withPrefix = (path: string) => `${basePath}${path}`;

  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t('siteName')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('footer.brandDescription')}
            </p>
          </div>

          {/* Legal Links */}
          <div>
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
              <li>
                <Link href={withPrefix('/disclaimer')} className="text-gray-600 hover:text-gray-900 transition">
                  {t('disclaimer')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t('footer.resourcesSection')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={withPrefix('/')} className="text-gray-600 hover:text-gray-900 transition">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <a href="#main-content" className="text-gray-600 hover:text-gray-900 transition">
                  {t('footer.getStarted')}
                </a>
              </li>
              <li>
                <Link href={withPrefix('/about')} className="text-gray-600 hover:text-gray-900 transition">
                  {t('footer.about')}
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
                            height={link.badgeHeight ?? 54}
                            className="h-14 w-auto"
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

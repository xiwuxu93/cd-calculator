import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import CurrentYear from '@/components/CurrentYear';
import { defaultLocale } from '@/lib/i18n';

const getLocalePrefix = (locale: string, fallbackLocale: string) =>
  locale === fallbackLocale ? '' : `/${locale}`;

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
          <p className="text-center text-sm text-gray-500">
            © <CurrentYear /> {t('siteName')}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}

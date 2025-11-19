import Link from 'next/link';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const metadata = await getTranslations({ locale, namespace: 'metadata' });
  const about = await getTranslations({ locale, namespace: 'about' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/about`;
  const imageUrl = `${SITE_URL}/og-image.png`;

  return {
    title: `${about('title')} | ${metadata('siteName')}`,
    description: about('description'),
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    },
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: `${SITE_URL}/about`,
        es: `${SITE_URL}/es/about`,
        'x-default': `${SITE_URL}/about`,
      },
    },
    openGraph: {
      type: 'article',
      locale,
      url: localizedUrl,
      title: about('title'),
      description: about('description'),
      siteName: metadata('siteName'),
      images: [{ url: imageUrl, width: 1200, height: 630, alt: about('title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: about('title'),
      description: about('description'),
      images: [imageUrl],
    },
    robots: { index: true, follow: true },
    keywords: [about('title'), metadata('siteName'), 'about', 'contact'],
  };
}

export default async function AboutContactPage({ params }: PageProps) {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const about = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />
      <main className="flex-1 px-4 py-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-10">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              {about('title')}
            </h1>
            <p className="text-base text-gray-600 md:text-lg">{about('description')}</p>
          </div>

          <section className="space-y-3 rounded-lg bg-white p-6 shadow-lg md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">{about('missionTitle')}</h2>
            <p className="text-gray-700">{about('missionContent')}</p>
          </section>

          <section className="space-y-3 rounded-lg bg-white p-6 shadow-lg md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">{about('methodologyTitle')}</h2>
            <p className="whitespace-pre-line text-gray-700">{about('methodologyContent')}</p>
          </section>

          <section id="contact" className="space-y-3 rounded-lg bg-white p-6 shadow-lg md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">{about('contactTitle')}</h2>
            <p className="text-gray-700">{about('contactContent')}</p>
            <p className="text-gray-700">
              <a href="mailto:support@mycdcalc.com" className="text-blue-700 underline hover:text-blue-900">
                support@mycdcalc.com
              </a>
            </p>
          </section>

          <div>
            <Link
              href={locale === defaultLocale ? '/' : `/${locale}`}
              className="inline-flex items-center gap-2 rounded-full border border-gray-900 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              {about('backToHome')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


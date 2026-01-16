import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CDCalculator from '@/components/cd/Calculator';
import MarkdownContent from '@/components/MarkdownContent';
import ToolGrid from '@/components/ToolGrid';
import CTA from '@/components/CTA';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'jumboPage' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/jumbo-cd-calculator`;
  const imageUrl = `${SITE_URL}/og-image.png`;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: `${SITE_URL}/jumbo-cd-calculator`,
        es: `${SITE_URL}/es/jumbo-cd-calculator`,
        'x-default': `${SITE_URL}/jumbo-cd-calculator`,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: localizedUrl,
      title: t('title'),
      description: t('description'),
      siteName: 'CD Calculator',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [imageUrl],
    },
  };
}

export default async function JumboPage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'jumboPage' });
  const nav = await getTranslations({ locale, namespace: 'navigation' });
  const home = await getTranslations({ locale, namespace: 'home' });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: nav('breadcrumbHome'),
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('title'),
        item: `${SITE_URL}/jumbo-cd-calculator`,
      },
    ],
  };

  const contentMarkdown = `
## ${t('aboutTitle')}

${t('aboutContent')}

## ${t('insuranceTitle')}

${t('insuranceContent')}
`;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6 md:py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>

          <div className="mb-12">
            <CDCalculator initialPrincipal={100000} />
          </div>

          <div className="mb-12">
            <MarkdownContent content={contentMarkdown} />
          </div>

          <ToolGrid />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />

          <CTA
            title={home('ctaTitle')}
            description={home('ctaDescription')}
            primaryButton={{
              text: home('ctaButton'),
              href: "#",
            }}
            variant="gradient"
            size="md"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

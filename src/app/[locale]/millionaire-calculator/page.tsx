import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarkdownContent from '@/components/MarkdownContent';
import FAQ from '@/components/FAQ';
import ToolGrid from '@/components/ToolGrid';
import { Locale, defaultLocale, locales } from '@/lib/i18n';
import MillionaireCalculator from '@/components/millionaire/MillionaireCalculator';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mycdcalc.com';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'millionairePage' });
  const siteName = "CD Calculator";
  const localePrefix = locale === defaultLocale ? '' : '/' + locale;
  const localizedUrl = `${SITE_URL}${localePrefix}/millionaire-calculator`;
  const imageUrl = `${SITE_URL}/og-image.png`;

  return {
    title: `${t('title')} | ${siteName}`,
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: `${SITE_URL}/millionaire-calculator`,
        es: `${SITE_URL}/es/millionaire-calculator`,
        'x-default': `${SITE_URL}/millionaire-calculator`,
      },
    },
    openGraph: {
      type: 'article',
      locale,
      url: localizedUrl,
      title: t('title'),
      description: t('description'),
      siteName,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: t('title') }],
    },
  };
}

export default async function MillionaireCalculatorPage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'millionairePage' });

  const contentMarkdown = `
## ${t('aboutTitle')}

${t('aboutContent')}

## ${t('howItWorksTitle')}

${t('howItWorksContent')}
`;

  const faqItems = (t.raw('faq') || []) as Array<{ question: string; answer: string }>;

  // JSON-LD Schemas
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t('title'),
    description: t('description'),
    url: `${SITE_URL}${locale === defaultLocale ? '' : '/' + locale}/millionaire-calculator`,
    inLanguage: locale,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    featureList: [
      'Compound Savings Projection',
      'Time to Reach $1 Million Calculator',
      'Required Monthly Contribution Calculator',
      'Interactive SVG Compounding Chart'
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
          {/* Hero Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
              {t('title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Calculator Tool section */}
          <div className="mb-16">
            <MillionaireCalculator />
          </div>

          {/* Detailed Informational Guide */}
          <div className="mb-16">
            <MarkdownContent content={contentMarkdown} />
          </div>

          {/* FAQ Accordions */}
          {faqItems.length > 0 && (
            <div className="mb-16">
              <FAQ
                items={faqItems}
                title={t('faqTitle')}
                defaultOpenIndex={0}
              />
            </div>
          )}

          {/* Tool Grid section for Internal Links */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Explore More Financial Calculators
            </h2>
            <ToolGrid />
          </div>
        </div>
      </main>
      <Footer />

      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </div>
  );
}

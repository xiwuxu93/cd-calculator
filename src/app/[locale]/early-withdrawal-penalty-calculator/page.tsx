import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PenaltyCalculator from '@/components/cd/PenaltyCalculator';
import MarkdownContent from '@/components/MarkdownContent';
import CTA from '@/components/CTA';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'penaltyPage' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/early-withdrawal-penalty-calculator`;
  const imageUrl = `${SITE_URL}/og-image.png`;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: `${SITE_URL}/early-withdrawal-penalty-calculator`,
        es: `${SITE_URL}/es/early-withdrawal-penalty-calculator`,
        'x-default': `${SITE_URL}/early-withdrawal-penalty-calculator`,
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

export default async function PenaltyPage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'penaltyPage' });
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
        item: `${SITE_URL}/early-withdrawal-penalty-calculator`,
      },
    ],
  };

  const faqItems = [
    {
      question: "What is an early withdrawal penalty?",
      answer: "A fee charged by banks if you withdraw money from a CD before its maturity date. It's usually calculated as a few months of interest."
    },
    {
      question: "How is the penalty calculated?",
      answer: "Most banks take a set number of months of interest (e.g., 3, 6, or 12 months) from your account. If you haven't earned that much interest yet, the penalty may reduce your principal."
    },
    {
      question: "Can I avoid the penalty?",
      answer: "Generally, no, unless you wait until maturity. Some 'No-Penalty CDs' allow early withdrawal but often offer lower interest rates."
    },
    {
      question: "Is it worth breaking a CD for a higher rate?",
      answer: "It depends. Use our calculator to find the 'break-even rate.' If the new CD's rate is higher than this break-even rate, switching might be profitable despite the penalty."
    }
  ];

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

  const contentMarkdown = `
## ${t('aboutTitle')}

${t('aboutContent')}

## ${t('howToTitle')}

${t('howToContent')}

## ${t('strategiesTitle')}

${t('strategiesContent')}
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
            <PenaltyCalculator />
          </div>

          <div className="mb-12">
            <MarkdownContent content={contentMarkdown} />
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />

          <div className="mb-12 bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {faqItems.map((item, idx) => (
                <details key={idx} className="px-6 py-4">
                  <summary className="cursor-pointer list-none font-semibold text-gray-900 text-base md:text-lg">
                    {item.question}
                  </summary>
                  <div className="mt-2 text-gray-700 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          </div>

          <CTA
            title={home('ctaTitle')}
            description={home('ctaDescription')}
            primaryButton={{
              text: home('ctaButton'),
              href: "/",
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

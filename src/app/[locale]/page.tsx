import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContentPlaceholder from '@/components/ContentPlaceholder';
import CDCalculator from '@/components/cd/Calculator';
import PenaltySection from '@/components/cd/PenaltySection';
import MarkdownContent from '@/components/MarkdownContent';
import CTA from '@/components/CTA';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}`;
  const imageUrl = `${SITE_URL}/og-image.png`;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
    },
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: SITE_URL,
        es: `${SITE_URL}/es`,
        'x-default': SITE_URL,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: localizedUrl,
      title: t('title'),
      description: t('description'),
      siteName: t('siteName'),
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const home = await getTranslations({ locale, namespace: 'home' });
  const metadata = await getTranslations({ locale, namespace: 'metadata' });
  const calc = await getTranslations({ locale, namespace: 'calculator' });

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: metadata('siteName'),
    description: metadata('description'),
    url: SITE_URL,
    inLanguage: locale,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: home('howToUseTitle'),
    description: home('aboutContent'),
    step: [
      { '@type': 'HowToStep', text: home('howToUseStep1') },
      { '@type': 'HowToStep', text: home('howToUseStep2') },
      { '@type': 'HowToStep', text: home('howToUseStep3') },
    ],
    tool: [{ '@type': 'WebApplication', name: metadata('siteName') }],
  };

  // Example markdown content for documentation
  const exampleMarkdown = `
# ${home('aboutTitle')}

${home('aboutContent')}

## ${home('howToUseTitle')}

1. ${home('howToUseStep1')}
2. ${home('howToUseStep2')}
3. ${home('howToUseStep3')}

## ${home('formulaTitle')}

${home('formulaContent')}

## ${home('exampleTitle')}

${home('exampleContent')}

## ${home('whyUseTitle')}

- **${home('whyUseFree')}**: ${home('whyUseFreeDesc')}
- **${home('whyUsePrivate')}**: ${home('whyUsePrivateDesc')}
- **${home('whyUseFast')}**: ${home('whyUseFastDesc')}
- **${home('whyUseSimple')}**: ${home('whyUseSimpleDesc')}
- **${home('whyUseMobile')}**: ${home('whyUseMobileDesc')}

## ${home('technicalTitle')}

${home('technicalContent')}

## ${home('pitfallsTitle')}

${home('pitfallsContent')}

## ${home('penaltyHowToTitle')}

${home('penaltyHowToContent')}
`;

  const faqItems = [
    {
      question: home('faqQ1'),
      answer: home('faqA1'),
    },
    {
      question: home('faqQ2'),
      answer: home('faqA2'),
    },
    {
      question: home('faqQ3'),
      answer: home('faqA3'),
    },
    {
      question: home('faqQ4'),
      answer: home('faqA4'),
    },
    {
      question: home('faqQ5'),
      answer: home('faqA5'),
    },
    {
      question: home('faqQ6'),
      answer: home('faqA6'),
    },
    {
      question: home('faqQ7'),
      answer: home('faqA7'),
    },
    {
      question: home('faqQ8'),
      answer: home('faqA8'),
    },
    {
      question: home('faqQ9'),
      answer: home('faqA9'),
    },
    {
      question: home('faqQ10'),
      answer: home('faqA10'),
    },
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

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale={locale} />
      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6 md:py-10">
          {/* Hero + Tool Section */}
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {home('title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {home('description')}
            </p>
          </div>

          {/* Main Tool Area */}
          <div id="tool" className="mb-16">
            <CDCalculator />
          </div>

          {/* Documentation Section */}
          <div id="howto" className="mb-4">
            <MarkdownContent
              content={exampleMarkdown}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
          </div>
          <div className="mb-12 text-right">
            <a href="#main-content" aria-label="Back to top" className="text-sm text-blue-600 hover:underline">{home('backToTop') ?? 'Back to top'} ↑</a>
          </div>

          {/* Early Withdrawal Penalty Section */}
          <div id="penalty" className="mb-4">
            <PenaltySection />
          </div>
          <div className="mb-12 text-right">
            <a href="#main-content" aria-label="Back to top" className="text-sm text-blue-600 hover:underline">{home('backToTop') ?? 'Back to top'} ↑</a>
          </div>

          {/* FAQ Section (SSR, zero JS via details/summary) */}
          <div id="faq" className="mb-4 bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-8 border-b border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{home('faqTitle')}</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {faqItems.map((item, idx) => (
                <details key={idx} className="px-6 py-4" {...(idx===0?{open:true}: {})}>
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
          <div className="mb-12 text-right">
            <a href="#main-content" aria-label="Back to top" className="text-sm text-blue-600 hover:underline">{home('backToTop') ?? 'Back to top'} ↑</a>
          </div>

          {/* CTA Section */}
          <CTA
            title={home('ctaTitle')}
            description={home('ctaDescription')}
            primaryButton={{
              text: home('ctaButton'),
              href: "#tool",
            }}
            variant="gradient"
            size="md"
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

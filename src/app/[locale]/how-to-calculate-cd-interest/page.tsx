import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarkdownContent from '@/components/MarkdownContent';
import CDCalculator from '@/components/cd/Calculator';
import ToolGrid from '@/components/ToolGrid';
import CTA from '@/components/CTA';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'howToPage' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/how-to-calculate-cd-interest`;
  const imageUrl = `${SITE_URL}/og-image.png`;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: `${SITE_URL}/how-to-calculate-cd-interest`,
        es: `${SITE_URL}/es/how-to-calculate-cd-interest`,
        'x-default': `${SITE_URL}/how-to-calculate-cd-interest`,
      },
    },
    openGraph: {
      type: 'article',
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

export default async function HowToPage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'howToPage' });
  const home = await getTranslations({ locale, namespace: 'home' });

  const contentMarkdown = `
## ${t('introTitle')}

${t('introContent')}

## ${t('formulaSectionTitle')}

${t('formulaExplanation')}

> ${t('formulaBox')}

- ${t('variableP')}
- ${t('variableR')}
- ${t('variableN')}
- ${t('variableT')}

## ${t('exampleSectionTitle')}

${t('exampleContent')}

${t('step1')}
${t('step2')}
${t('step3')}
${t('step4')}

## ${t('excelSectionTitle')}

${t('excelContent')}

\`${t('excelFormula')}\`

${t('excelExample')}

## ${t('compoundingTitle')}

${t('compoundingContent')}

### Beyond Basic Calculations

Once you understand how to calculate CD interest, you might want to explore advanced strategies. Consider building a **[CD ladder strategy](/${locale}/cd-ladder-calculator)** to maximize long-term yields while maintaining liquidity. Or, if you need to break a CD early, use our **[early withdrawal penalty calculator](/${locale}/early-withdrawal-penalty-calculator)** to estimate the costs.

## People Also Ask (FAQ)

**Can I calculate CD interest with simple interest?**
Most CDs use compound interest. Simple interest is rarely used for CDs today, but if yours does, the formula is simply \`Interest = P * r * t\`.

**How often does a CD compound?**
The majority of modern high-yield CDs compound daily and credit the interest monthly.

**Do I pay taxes on CD interest before it matures?**
Yes, usually you owe taxes on the interest credited to your account each year, even if you don't withdraw it. Consider an **[IRA CD](/${locale}/ira-cd-calculator)** if you want tax-deferred growth.
`;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>

          <div className="prose prose-lg mx-auto mb-12">
            <MarkdownContent content={contentMarkdown} />
          </div>

          <div className="mb-12 border-t pt-8">
             <h3 className="text-2xl font-bold text-center mb-6">Verify with the Calculator</h3>
             <CDCalculator />
          </div>

          <ToolGrid />

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

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CDCalculator from '@/components/cd/Calculator';
import MarkdownContent from '@/components/MarkdownContent';
import ToolGrid from '@/components/ToolGrid';
import CTA from '@/components/CTA';
import { Locale, defaultLocale, locales } from '@/lib/i18n';
import { getBankData, getAllBankSlugs } from '@/lib/banks';
import { getTranslations } from 'next-intl/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string; bankId: string };
};

export async function generateStaticParams() {
  const paths = [];
  for (const locale of locales) {
    const bankSlugs = getAllBankSlugs();
    for (const bankId of bankSlugs) {
      paths.push({ locale, bankId });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const bank = getBankData(params.bankId);
  if (!bank) return {};

  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/bank/${params.bankId}`;
  const imageUrl = `${SITE_URL}/og-image.png`;

  const title = `${bank.name} CD Calculator - Interest & Rates 2025`;
  const description = bank.description;

  return {
    title,
    description,
    keywords: `${bank.name} cd calculator, ${bank.name} cd rates, ${bank.name} cd interest, ${bank.name} early withdrawal penalty`,
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: `${SITE_URL}/bank/${params.bankId}`,
        es: `${SITE_URL}/es/bank/${params.bankId}`,
        'x-default': `${SITE_URL}/bank/${params.bankId}`,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: localizedUrl,
      title,
      description,
      siteName: 'CD Calculator',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BankPage({ params }: PageProps) {
  const bank = getBankData(params.bankId);
  if (!bank) {
    notFound();
  }

  const locale = params.locale as Locale;
  const home = await getTranslations({ locale, namespace: 'home' });

  // Generate dynamic markdown content
  const contentMarkdown = `
## How to Calculate ${bank.name} CD Interest

Calculating your earnings with **${bank.name}** is straightforward using our tool. ${bank.name} typically uses **${bank.compounding} compounding** for its certificates of deposit.

1.  **Enter your deposit amount.**
2.  **Input the APY.** (We've pre-filled a common rate of **${bank.defaultApy.toFixed(2)}%**, but check your specific account terms).
3.  **Select the term length.**

## ${bank.name} Early Withdrawal Penalty

It is important to know the cost if you need to access your funds early.

> **Typical Policy:** ${bank.penaltyPolicy}

*Note: Penalty policies can vary by specific CD term and account agreement. Always check your official ${bank.name} disclosure documents.*

## Why Choose a ${bank.name} CD?

${bank.name} is one of the leading financial institutions. Their CDs are FDIC/NCUA insured (up to legal limits), offering a safe place to grow your savings with a guaranteed return, unlike variable savings accounts.
`;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6 md:py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {bank.name} CD Calculator
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {bank.description}
            </p>
          </div>

          <div className="mb-12">
            <CDCalculator 
              initialPrincipal={10000} 
              initialApy={bank.defaultApy} 
              // We could pass compounding prop if the component supported setting initial state for it,
              // but currently CDCalculator defaults to 'monthly'. 
              // For now, the user can change it, or we can update the component later.
            /> 
          </div>

          <div className="mb-12">
            <MarkdownContent content={contentMarkdown} />
          </div>

          <ToolGrid />

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

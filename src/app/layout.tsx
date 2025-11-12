import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { Locale, resolveLocale } from '@/lib/i18n';
import ResourceHints from '@/components/ResourceHints';
import ThirdPartyScripts from '@/components/ThirdPartyScripts';
import '@/styles/globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

type RootLayoutProps = {
  children: ReactNode;
  params?: { locale?: string };
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const requestedLocale = params?.locale ?? (await getLocale());
  const locale = resolveLocale(requestedLocale) as Locale;
  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <ResourceHints />
      </head>
      <body className="bg-gray-100 text-gray-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          Skip to main content
        </a>
        <ThirdPartyScripts />
        <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

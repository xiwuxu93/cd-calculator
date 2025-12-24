import { defaultLocale } from '@/lib/i18n';
import Page, { generateMetadata as generateLocaleMetadata } from '../[locale]/early-withdrawal-penalty-calculator/page';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function RootPage() {
  return <Page params={{ locale: defaultLocale }} />;
}

import { defaultLocale } from '@/lib/i18n';
import HomePage, { generateMetadata as generateLocaleMetadata } from './[locale]/page';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <HomePage params={{ locale: defaultLocale }} />;
}

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale="en" />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

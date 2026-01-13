import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ToolGrid() {
  const t = useTranslations('home');

  const tools = [
    {
      title: t('toolPenalty'),
      desc: t('toolPenaltyDesc'),
      href: '/early-withdrawal-penalty-calculator',
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t('toolLadder'),
      desc: t('toolLadderDesc'),
      href: '/cd-ladder-calculator',
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: t('toolSixMonth'),
      desc: '', // Often short-term specific descriptions can be omitted for cleaner grid or added later
      href: '/6-month-cd-calculator',
      icon: (
        <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t('toolOneYear'),
      desc: '',
      href: '/1-year-cd-calculator',
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('exploreToolsTitle')}</h2>
        <p className="text-gray-600 mt-2">{t('exploreToolsDescription')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link 
            key={tool.href} 
            href={tool.href}
            className="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200"
          >
            <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg mr-4">
              {tool.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{tool.title}</h3>
              {tool.desc && <p className="text-sm text-gray-500 mt-1">{tool.desc}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

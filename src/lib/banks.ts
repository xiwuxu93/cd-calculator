export interface BankData {
  id: string;
  name: string;
  shortName?: string; // e.g. "BoA" for Bank of America
  defaultApy: number; // A representative rate (e.g. promotional rate)
  compounding: 'daily' | 'monthly'; // Typical compounding frequency
  penaltyPolicy: string; // Brief description of their penalty policy
  description: string; // SEO description for the page
}

export const banks: Record<string, BankData> = {
  'chase-cd-calculator': {
    id: 'chase-cd-calculator',
    name: 'Chase Bank',
    defaultApy: 4.00, // Example relationship rate for featured CDs
    compounding: 'monthly',
    penaltyPolicy: 'Typically 90 days of interest for terms under 24 months, and 180 days for terms 24 months or longer.',
    description: 'Calculate your Chase CD earnings accurately. Accounts for Chase\'s monthly compounding and helps you estimate early withdrawal penalties.'
  },
  'wells-fargo-cd-calculator': {
    id: 'wells-fargo-cd-calculator',
    name: 'Wells Fargo',
    defaultApy: 4.25, // Example special fixed rate
    compounding: 'daily', // Often daily for business, can vary for personal
    penaltyPolicy: 'Usually 3 months interest for terms < 12 months, 6 months for 12-24 months, and 12 months for > 24 months.',
    description: 'Estimate your returns with Wells Fargo CDs. Our calculator supports their specific compounding frequency and penalty structures.'
  },
  'bank-of-america-cd-calculator': {
    id: 'bank-of-america-cd-calculator',
    name: 'Bank of America',
    shortName: 'BoA',
    defaultApy: 3.50, // Standard term
    compounding: 'monthly',
    penaltyPolicy: 'Standard penalty is typically 90 days interest for terms less than 12 months, and 180 days for 12 months or more.',
    description: 'See how much interest you will earn with a Bank of America CD. Customize terms and rates to match your specific BoA account.'
  },
  'navy-federal-cd-calculator': {
    id: 'navy-federal-cd-calculator',
    name: 'Navy Federal Credit Union',
    shortName: 'NFCU',
    defaultApy: 4.80, // Often has high easy start certs
    compounding: 'daily',
    penaltyPolicy: 'Generally the lesser of all interest earned or 90 days interest for terms ≤ 12 months. For > 12 months, it is 180 days.',
    description: 'Specialized calculator for Navy Federal certificates. Navy Federal often offers daily compounding and competitive rates for military families.'
  },
  'citibank-cd-calculator': {
    id: 'citibank-cd-calculator',
    name: 'Citibank',
    defaultApy: 4.30,
    compounding: 'daily',
    penaltyPolicy: 'Citibank typically imposes a penalty of 90 days simple interest for terms of 1 year or less, and 180 days for terms over 1 year.',
    description: 'Calculate Citi CD interest with precision. Includes support for Citibank\'s daily compounding logic and No-Penalty CD analysis.'
  }
};

export function getBankData(slug: string): BankData | null {
  return banks[slug] || null;
}

export function getAllBankSlugs(): string[] {
  return Object.keys(banks);
}

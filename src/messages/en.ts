const en = {
  consent: {
    title: "We use cookies for ads and analytics",
    desc:
      "With your permission, we use cookies to support Google AdSense and basic analytics. You can review details in our Privacy Policy.",
    accept: "Accept",
    reject: "Reject",
    learnMore: "Learn more",
  },
  metadata: {
    title: "CD Calculator - Free Certificate of Deposit Interest Calculator",
    description: "Calculate CD interest, total maturity value, and effective annual yield in seconds. Clean, accurate, mobile-friendly.",
    keywords: "cd calculator, certificate of deposit calculator, cd interest calculator, cd apy calculator",
    siteName: "CD Calculator",
  },
  penalty: {
    title: "Early Withdrawal Penalty Calculator",
    description: "Estimate penalty and break-even rate if you cash out before maturity.",
    principalLabel: "Initial Deposit",
    apyLabel: "APY (%)",
    termLabel: "Term (months)",
    heldLabel: "Months Held",
    policyLabel: "Penalty Policy",
    policyThree: "3 months of interest",
    policySix: "6 months of interest",
    policyStrict: "Forfeit all earned interest",
    policyDays: "Custom days",
    daysPlaceholder: "e.g., 90",
    calculateButton: "Recalculate",
    resultsTitle: "Analysis",
    earned: "Interest Earned",
    penalty: "Penalty",
    net: "Net Interest",
    refund: "Refund Amount",
    breakeven: "Break-even APY for remaining term",
    recommendationHold: "Recommendation: Hold the CD—net interest remains positive.",
    recommendationMove: "Recommendation: Consider moving only if new APY exceeds break-even.",
    error: {
      principalPositive: "Please enter a positive amount",
      apyRange: "Please enter a valid APY (0–200%)",
      termPositive: "Please enter a positive number of months",
      heldRange: "Months held must be between 0 and total term",
    },
  },
  locales: {
    en: {
      name: "English",
      short: "EN",
    },
    zh: {
      name: "Chinese",
      short: "中文",
    },
    es: {
      name: "Español",
      short: "ES",
    },
  },
  common: {
    siteName: "CD Calculator",
    allRightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    disclaimer: "Disclaimer",
    backToHome: "Back to Home",
    backToTop: "Back to top",
    professionalUseOnly: "Informational tool only",
    viewFullDisclaimer: "View full disclaimer",
    footer: {
      brandDescription: "Free, accurate CD interest calculator with clean, mobile-first design.",
      legalSection: "Legal",
      resourcesSection: "Resources",
      home: "Home",
      getStarted: "Get Started",
      about: "About / Contact",
    },
  },
  header: {
    siteName: "CD Calculator",
    subtitle: "Simple • Accurate • Fast",
  },
  footer: {
    brandDescription: "Free, accurate CD interest calculator with clean, mobile-first design.",
    legalSection: "Legal",
    resourcesSection: "Resources",
    home: "Home",
    getStarted: "Get Started",
    about: "About / Contact",
  },
  calculator: {
    title: "CD Calculator",
    description: "Estimate your maturity value and total interest.",
    principalLabel: "Initial Deposit",
    principalPlaceholder: "e.g., 10,000",
    apyLabel: "APY (%)",
    aprLabel: "Nominal rate (APR, %)",
    apyPlaceholder: "e.g., 5.00",
    aprPlaceholder: "e.g., 5.00",
    termLabel: "Term (months)",
    termPlaceholder: "e.g., 12",
    compoundingLabel: "Compounding",
    compoundingDaily: "Daily",
    compoundingMonthly: "Monthly",
    compoundingQuarterly: "Quarterly",
    compoundingSemi: "Semiannually",
    compoundingAnnually: "Annually",
    rateModeApy: "APY",
    rateModeApr: "Rate (APR)",
    calculateButton: "Calculate",
    resetButton: "Reset",
    showSchedule: "Show schedule",
    hideSchedule: "Hide schedule",
    scheduleTitle: "Accrual Schedule",
    exportCSV: "Export CSV",
    afterTaxToggle: "Show after-tax estimate",
    taxRateLabel: "Tax bracket (%)",
    resultsTitle: "Results",
    maturityValue: "Maturity Value",
    interestEarned: "Total Interest",
    afterTaxInterest: "After-tax Interest",
    afterTaxMaturity: "After-tax Maturity",
    effectiveYield: "Effective Annual Yield",
    copied: "Copied",
    copyResults: "Copy Results",
    inputHelp: "Values are estimates for informational purposes only.",
    error: {
      principalPositive: "Please enter a positive amount",
      apyRange: "Please enter a valid APY (0–200%)",
      termPositive: "Please enter a positive number of months",
    },
  },
  home: {
    title: "CD Calculator",
    description: "Calculate certificate of deposit (CD) interest and maturity value in seconds.",
    backToTop: "Back to top",
    aboutTitle: "About This Calculator",
    aboutContent: "Use this free CD interest calculator to estimate your maturity value based on principal, APY, term length, and compounding frequency. All calculations run locally in your browser.",
    howToUseTitle: "How to Calculate CD Interest",
    howToUseStep1: "Enter your initial deposit (principal), APY, term in months, and compounding (monthly/quarterly/annual)",
    howToUseStep2: "Click Calculate or adjust inputs to see instant results",
    howToUseStep3: "Review maturity value, total interest earned, and effective annual yield",
    formulaTitle: "Formula and Method",
    formulaContent: `
We use your APY and compounding to estimate maturity value.

- Periods per year (n): Monthly = 12, Quarterly = 4, Annually = 1
- Periodic rate (r): r = (1 + APY)^(1/n) - 1
- Total periods: periods = (months / 12) * n (can be fractional)
- Maturity value: M = P * (1 + r)^(periods)
- Interest earned: I = M - P

We round currency to the nearest cent to reflect real-world statements.
`,
    exampleTitle: "Worked Example",
    exampleContent: `
Principal P = $10,000; APY = 5.00%; Term = 12 months; Compounding = Monthly.

- n = 12; r = (1 + 0.05)^(1/12) - 1 ≈ 0.004074
- periods = (12 / 12) * 12 = 12
- Maturity: M = 10000 * (1 + 0.004074)^12 ≈ $10,511.62
- Interest: I ≈ $511.62

Note: Daily compounding would yield slightly more, but APY already summarizes compounding.
`,
    pitfallsTitle: "Common Pitfalls",
    pitfallsContent: `
- APY vs APR: APY includes compounding and is appropriate for CDs.
- Partial months/years: We prorate using fractional periods for a closer estimate.
- Daily compounding: Actual results may differ slightly; APY normalizes most differences.
- Taxes and penalties: This tool shows pre-tax estimates and excludes early withdrawal penalties.
`,
    methodologyTitle: "Methodology & Calculation Notes",
    methodologyContent: `
- Compounding formula: M = P × (1 + r/m)^(m×t), with APY normalized to frequency.
- APR → APY: When APR mode is selected, we convert to APY using the chosen compounding frequency.
- Rounding: Monetary values round to the nearest cent; rates shown to two decimals by default.
- Fractional periods: For non-integer terms, we use fractional exponents for compounding.
- Schedule: The accrual schedule is derived period-by-period and may differ slightly from bank statements.
- Taxes: After-tax figures use your input tax rate as a simple estimate and are not tax advice.
`,
    penaltyHowToTitle: "Early Withdrawal: Should You Cash Out?",
    penaltyHowToContent: `
1) Estimate what you've earned so far and the penalty per your bank's policy (e.g., 3 or 6 months of interest).
2) Compute net interest (earned minus penalty) and your refund amount.
3) For the remaining term, calculate the break-even APY: if a new CD's APY exceeds this, switching could make sense. Otherwise, holding likely yields more.

Tip: Penalties are often based on interest, not principal—our calculator approximates typical policies.
`,
    whyUseTitle: "Why Use This CD Calculator?",
    whyUseFree: "Free",
    whyUseFreeDesc: "Completely free—no signup, no ads required to calculate",
    whyUsePrivate: "Private",
    whyUsePrivateDesc: "Runs 100% in your browser. We don’t store your inputs",
    whyUseFast: "Fast",
    whyUseFastDesc: "Instant results as you type",
    whyUseSimple: "Simple",
    whyUseSimpleDesc: "Clean, mobile-first UI",
    whyUseMobile: "Mobile-Friendly",
    whyUseMobileDesc: "Optimized for small screens and touch",
    technicalTitle: "What’s Calculated",
    technicalContent: "We estimate maturity value using your APY and compounding frequency. For non-integer months, the calculation prorates the final period. Results are rounded to the nearest cent for clarity.",
    faqTitle: "CD Calculator: Frequently Asked Questions",
    faqQ1: "What is APY and how does it affect my CD?",
    faqA1: "APY (Annual Percentage Yield) includes compounding. Higher APY or more frequent compounding generally yields more interest.",
    faqQ2: "Which compounding should I choose?",
    faqA2: "Most CDs compound monthly. If unsure, select Monthly for a realistic estimate.",
    faqQ3: "Can I calculate partial-year terms?",
    faqA3: "Yes. Enter months (e.g., 7 months). The calculator prorates interest for partial years.",
    faqQ4: "Do you support early withdrawal penalties?",
    faqA4: "Not in the initial release. We may add an early-withdrawal penalty calculator if it delivers clear value.",
    faqQ5: "Do you store any of my data?",
    faqA5: "No. All calculations run in your browser and are not sent to our servers.",
    faqQ6: "Is this financial advice?",
    faqA6: "No. Results are for informational purposes only. Consult a qualified professional for financial advice.",
    faqQ7: "Do you support additional deposits or monthly contributions?",
    faqA7: "Not in the initial release. Many CDs do not allow additional deposits after opening. We may add scenarios for add-on CDs later.",
    faqQ8: "How do taxes affect my CD returns?",
    faqA8: "This calculator shows pre-tax estimates. Actual after-tax returns depend on your tax situation. Consult a tax professional.",
    faqQ9: "What if my bank compounds daily?",
    faqA9: "APY already reflects compounding. Selecting Monthly gives a close estimate for most CDs. Daily compounding yields slightly higher results.",
    faqQ10: "Can I export or share my results?",
    faqA10: "Not yet. We plan to add copy and export options if they add clear value without cluttering the interface.",
    ctaTitle: "Ready to calculate your CD interest?",
    ctaDescription: "Enter your deposit, APY, and term to see your maturity value.",
    ctaButton: "Calculate Now",
    placeholderTitle: "CD Calculator UI Coming Next",
    placeholderDescription: "We’re setting up the calculation engine and mobile-first inputs.",
  },
  about: {
    title: "About / Contact",
    description: "Who we are, how the calculator works, and how to reach us.",
    missionTitle: "Mission",
    missionContent:
      "Provide a clean, accurate, and mobile-first CD interest calculator with transparent methodology and strong privacy by default.",
    methodologyTitle: "Methodology (Summary)",
    methodologyContent:
      "- Compounding formula: M = P × (1 + r/m)^(m×t)\n\n- APR → APY conversion by selected compounding frequency\n\n- Currency rounded to nearest cent; yields to two decimals\n\n- Fractional periods for non-integer terms\n\n- Schedule derived period-by-period; may differ slightly from bank statements",
    contactTitle: "Contact",
    contactContent: "Questions, feedback, or corrections? Email our team:",
    backToHome: "Back to Home",
  },
  privacy: {
    title: "Privacy Policy",
    description: "Learn how we handle and protect your data when using the CD Calculator.",
    intro: "The CD Calculator runs locally in your browser. We do not collect or transmit the values you enter.",
    dataCollectionTitle: "Data Collection",
    dataCollectionContent: "We do not collect, store, sell, or share the values you enter. All calculations run locally on your device and are never sent to our servers.",
    analyticsTitle: "Analytics",
    analyticsContent: "We may use privacy-friendly analytics to observe aggregate usage (e.g., calculator button clicks). These analytics never contain personal identifiers or your input values. You can use browser controls or extensions to limit analytics if you prefer.",
    cookiesTitle: "Cookies",
    cookiesContent: "We use Google Consent Mode so that advertising and analytics cookies remain denied by default until you grant consent.",
    thirdPartiesTitle: "Third-Party Services",
    thirdPartiesContent: "If third-party resources (e.g., fonts, analytics, or ads) are used, they are chosen with privacy in mind. Ad placement will not obstruct core calculator usage.",
    adsTitle: "Advertising and Google AdSense",
    adsVendorContent:
      "Third‑party vendors, including Google, use cookies to serve ads based on a user's prior visits to this or other websites.",
    adsPersonalizedContent:
      "Google's use of advertising cookies enables Google and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.",
    adsOptOutIntro:
      "You can opt out of personalized advertising via Google's Ads Settings, or opt out of some third‑party vendors' uses of cookies for personalized advertising at aboutads.info.",
    adsOtherVendorsContent:
      "If we do not opt out of third‑party ad serving, the cookies of other third‑party vendors or ad networks may also be used to serve ads on this site. We will list such vendors and provide opt‑out links when applicable.",
    changesTitle: "Policy Updates",
    changesContent: "We may update this policy to reflect product changes or legal requirements. Significant updates will be clearly communicated on this page.",
    contactTitle: "Contact",
    contactContent: "For privacy questions or requests, contact us at support@mycdcalc.com.",
  },
  terms: {
    title: "Terms of Service",
    description: "Review the terms governing your use of the CD Calculator.",
    intro: "By using this calculator, you agree to the terms described below.",
    acceptableUseTitle: "Acceptable Use",
    acceptableUseContent: "Use the calculator for informational estimates only. Do not attempt to disrupt the service or misrepresent results as professional advice. If ads are enabled, placement follows Google policies and will not obstruct core use.",
    medicalDisclaimerTitle: "Disclaimer",
    medicalDisclaimerContent: "This calculator does not provide financial, investment, tax, or legal advice. Verify results and consult qualified professionals before making decisions.",
    limitationsTitle: "Service Limitations",
    limitationsContent: 'The tool is provided "as is" without warranties of accuracy or availability. We may modify or discontinue the service without notice.',
    liabilityTitle: "Limitation of Liability",
    liabilityContent: "We are not liable for damages arising from the use or inability to use this tool. Use is at your own risk.",
    changesTitle: "Changes to Terms",
    changesContent: "We may update these terms periodically. Continued use after changes take effect constitutes acceptance of the new terms.",
    contactTitle: "Contact",
    contactContent: "Questions about these terms? Email support@mycdcalc.com.",
  },
  disclaimer: {
    title: "Disclaimer",
    description: "Understand how to interpret results for financial decisions.",
    intro: "This calculator is for informational purposes only. Do not use it as the sole basis for financial decisions.",
    lastUpdatedLabel: "Last updated:",
    lastUpdatedValue: "2025-11-07",
    educationHeading: "Informational Use Only",
    educationContent: "The tool and accompanying explanations are intended solely for general information and education. They should not be used as the sole basis for important decisions.",
    noAdviceHeading: "Not Financial Advice",
    noAdviceContent: "Nothing on this site constitutes financial, investment, tax, or legal advice. Consult qualified professionals before taking action.",
    emergencyHeading: "Risks and Limitations",
    emergencyContent: "Interest rates, penalties, and bank policies vary and can change. Results are estimates and may not match your institution’s calculations.",
    audienceHeading: "Intended Users",
    audienceList1: "General public seeking informational tools",
    audienceList2: "Students and educators for learning purposes",
    audienceList3: "Professionals using as a quick reference",
    audienceExclusionHeading: "Not Intended For",
    audienceExclusionList1: "Critical decision-making without professional verification",
    audienceExclusionList2: "Use as a substitute for professional evaluation",
    audienceExclusionList3: "Decisions made without appropriate consultation",
    clinicalJudgmentHeading: "Professional Guidance Takes Priority",
    clinicalJudgmentContent: "Calculator outputs support—but do not replace—professional guidance. If results conflict with your financial advisor’s guidance, defer to their advice.",
    accuracyHeading: "Accuracy and Completeness",
    accuracyContent: "While we strive for accuracy, inputs and assumptions affect results. Verify calculations with your bank’s disclosures and current policies.",
    liabilityHeading: "Limitation of Liability",
    liabilityContent: "To the fullest extent permitted by law, the site owners and contributors disclaim liability for any losses or decisions arising from the use of this site.",
    noRelationshipHeading: "No Professional Relationship",
    noRelationshipContent: "Using this tool does not establish a professional relationship with the site owners or contributors.",
    thirdPartyHeading: "Third-Party References",
    thirdPartyContent: "Links to external resources are provided for convenience. We do not endorse or control third-party content and are not responsible for its accuracy.",
    complianceHeading: "User Responsibility",
    complianceContent: "Users are responsible for ensuring their use of this tool complies with all applicable laws and regulations in their jurisdiction.",
    updatesHeading: "Policy Updates",
    updatesContent: "We may update this disclaimer as standards or site features evolve. Continued use signifies acceptance of the latest version.",
    contactHeading: "Contact",
    contactContent: "For questions about this disclaimer, contact us.",
  },
} as const;

export default en;

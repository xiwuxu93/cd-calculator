# 🚀 SEO Growth Action Plan: "Rural Encircling Urban" Strategy

Based on the latest GSC and Semrush analysis, `mycdcalc.com` is in the early growth phase. To breakthrough, we will shift from a "Single Page" strategy to a **"Multi-Landing Page" strategy** to capture specific search intents.

## 🎯 Strategic Core
1.  **Split Features**: Move distinct tools (Penalty, Ladder) to dedicated URLs to rank for specific terms.
2.  **Content Hub**: Create "How-to" content pages to capture informational traffic.
3.  **Spanish Focus**: Double down on Spanish content where competition is lower.

---

## ✅ Phase 1: Structure Splitting (High Priority)
*Goal: Create dedicated entry points for specific user intents.*

### 1.1 Dedicated Penalty Calculator Page
**Target Keyword:** `cd early withdrawal penalty calculator` (Vol: 1000, KD: 26)
- [ ] **Create Page:** `src/app/[locale]/early-withdrawal-penalty-calculator/page.tsx`
- [ ] **Content:**
    - Reuse `<PenaltyCalculator />` as the main hero component.
    - Add unique copy describing "How penalties are calculated" (Bank policies: 3-month vs 6-month interest).
    - Add specific FAQ section for penalties.
- [ ] **Metadata:**
    - Title: "CD Early Withdrawal Penalty Calculator - Estimate Your Fees"
    - Desc: "Calculate the interest penalty for withdrawing your CD early. Compare break-even rates and decide if you should switch banks."

### 1.2 Dedicated CD Ladder Page (New Feature)
**Target Keyword:** `cd ladder calculator` (Vol: 1600, KD: 27)
- [ ] **Create Page:** `src/app/[locale]/cd-ladder-calculator/page.tsx`
- [ ] **Implementation:**
    - Create new `<LadderCalculator />` component.
    - Inputs: Total Investment, Number of Rungs (e.g., 1-5 years), Frequency.
    - Output: Visual timeline of maturity dates and blended APY.
- [ ] **Metadata:**
    - Title: "CD Ladder Calculator - Build a High-Yield Strategy"

### 1.3 Pre-configured Duration Pages
**Target Keyword:** `6 month cd calculator` (KD 33), `1 year cd calculator` (KD 25)
- [ ] **Create Page:** `src/app/[locale]/6-month-cd-calculator/page.tsx`
    - Pre-set the Main Calculator term to 6 months.
    - Customize H1 to "6 Month CD Interest Calculator".
- [ ] **Create Page:** `src/app/[locale]/1-year-cd-calculator/page.tsx`
    - Pre-set term to 12 months.

---

## 📝 Phase 2: "How-To" Content Expansion
*Goal: Capture high-volume informational queries.*

### 2.1 The "Manual Calculation" Guide
**Target Keyword:** `how to calculate cd interest` (Vol: 1900, KD: 21)
- [ ] **Create Page:** `src/app/[locale]/how-to-calculate-cd-interest/page.tsx`
- [ ] **Content Strategy:**
    - **Not just a blog post**: An interactive article.
    - Section 1: The Formula (MathJax/Latex formatted).
    - Section 2: Step-by-step Daily vs Monthly compounding examples.
    - Section 3: Embedded "Mini Calculator" (simplified version) for quick checks.
    - Section 4: Excel formula guide (`=FV(...)`).

---

## 🌍 Phase 3: Internationalization (Spanish)
*Goal: Leverage existing GSC traction in Spanish queries.*

### 3.1 Localized Landing Pages
- [ ] Ensure all new pages (Penalty, Ladder) have full `es` translations in `src/messages/es.ts`.
- [ ] **Keyword Optimization**:
    - Update `es` metadata to target: `calculadora de cd de 6 meses` (Rank 18!), `calculadora penalizacion cd`.

### 3.2 Cultural Adaptation
- [ ] Check number formatting (comma vs decimal points) for ES locale if not already handled by `Intl.NumberFormat`.

---

## ⚙️ Phase 4: Technical & On-Page SEO
*Goal: Improve Click-Through Rate (CTR).*

### 4.1 Homepage Optimization
- [ ] **Update Title**: Currently maybe generic. Change to:
    - *EN:* "Free CD Interest Calculator 2025 | Calculate APY & Compound Interest"
    - *ES:* "Calculadora de CD Gratis | Interés Compuesto y Retiro Anticipado"
- [ ] **Meta Description**: Add "Tax" and "Compound Frequency" to description to match long-tail intent.

### 4.2 Technical SEO
- [ ] **Sitemap**: Ensure `sitemap.ts` dynamically generates URLs for all new routes (`/early-withdrawal...`, etc.).
- [ ] **Breadcrumbs**: Add JSON-LD BreadcrumbList to all sub-pages.
- [ ] **Internal Linking**:
    - Add a "Tools" dropdown or section in the Footer/Header linking to all specific calculators.
    - Link from "How-to" pages back to the specific Calculator tools.

---

## 🗓️ Immediate To-Do List (Next 24 Hours)

1.  [ ] **Refactor**: Extract `PenaltyCalculator` from the Home page components if it's tightly coupled, making it reusable for a standalone page.
2.  [ ] **Scaffold**: Create the route `src/app/[locale]/early-withdrawal-penalty-calculator/`.
3.  [ ] **Content**: Write the specific metadata and introductory copy for the Penalty page in `messages/en.ts`.
4.  [ ] **Verify**: Ensure the existing Home page still works but perhaps links to this new detailed tool.

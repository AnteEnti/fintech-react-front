import { Sitemap, PageData, PageType } from './types';

export const SITEMAP_DATA: Sitemap = {
  learn: [
    {
      name: { en: 'Money Basics', te: 'డబ్బు ప్రాథమికాలు' },
      pages: [
        {
          path: '/learn/money-basics/what-is-budgeting',
          type: PageType.LEARN,
          title: { en: 'What is Budgeting?', te: 'బడ్జెటింగ్ అంటే ఏమిటి?' },
          description: { en: 'Learn the fundamentals of budgeting, why it is important for financial health, and how to create a personal budget that works for you.', te: 'బడ్జెటింగ్ యొక్క ప్రాథమికాలను, ఆర్థిక ఆరోగ్యానికి ఇది ఎందుకు ముఖ్యమో మరియు మీ కోసం పనిచేసే వ్యక్తిగత బడ్జెట్‌ను ఎలా సృష్టించాలో తెలుసుకోండి.' },
          category: { en: 'Money Basics', te: 'డబ్బు ప్రాథమికాలు' },
          interlinks: [
            { path: '/tips/daily-saving-tips', title: { en: 'Daily Saving Tips', te: 'రోజువారీ పొదుపు చిట్కాలు' } },
            { path: '/calculators/personal-finance/emergency-fund', title: { en: 'Emergency Fund Calculator', te: 'అత్యవసర నిధి కాలిక్యులేటర్' } },
          ],
        },
        {
          path: '/learn/money-basics/emergency-fund',
          type: PageType.LEARN,
          title: { en: 'Why an Emergency Fund is Crucial', te: 'అత్యవసర నిధి ఎందుకు ముఖ్యం' },
          description: { en: 'Discover the importance of having an emergency fund, how much you should save, and where to keep it for unexpected financial shocks.', te: 'అత్యవసర నిధిని కలిగి ఉండటం యొక్క ప్రాముఖ్యతను, మీరు ఎంత పొదుపు చేయాలో మరియు ఊహించని ఆర్థిక షాక్‌ల కోసం దానిని ఎక్కడ ఉంచాలో కనుగొనండి.' },
          category: { en: 'Money Basics', te: 'డబ్బు ప్రాథమికాలు' },
          interlinks: [
            { path: '/calculators/personal-finance/emergency-fund', title: { en: 'Emergency Fund Calculator', te: 'అత్యవసర నిధి కాలిక్యులేటర్' } },
          ],
        },
      ],
    },
    {
      name: { en: 'Investing', te: 'పెట్టుబడి' },
      pages: [
        {
          path: '/learn/investing/what-is-sip',
          type: PageType.LEARN,
          title: { en: 'What is a SIP?', te: 'SIP అంటే ఏమిటి?' },
          description: { en: 'Understand what a Systematic Investment Plan (SIP) is, how it works, its benefits for long-term wealth creation, and how to start one.', te: 'సిస్టమాటిక్ ఇన్వెస్ట్‌మెంట్ ప్లాన్ (SIP) అంటే ఏమిటో, అది ఎలా పనిచేస్తుందో, దీర్ఘకాలిక సంపద సృష్టికి దాని ప్రయోజనాలు మరియు దానిని ఎలా ప్రారంభించాలో అర్థం చేసుకోండి.' },
          category: { en: 'Investing', te: 'పెట్టుబడి' },
          interlinks: [
            { path: '/calculators/investment/sip', title: { en: 'SIP Calculator', te: 'SIP కాలిక్యులేటర్' } },
          ],
        },
      ],
    },
  ],
  calculators: [
    {
      name: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' },
      pages: [
        { path: '/calculators/investment/sip', type: PageType.CALCULATOR, title: { en: 'SIP Calculator', te: 'SIP కాలిక్యులేటర్' }, description: { en: 'Calculate the future value of your monthly SIP investments based on expected return rate and tenure. Visualize your investment growth.', te: 'అంచనా వేసిన రాబడి రేటు మరియు కాలపరిమితి ఆధారంగా మీ నెలవారీ SIP పెట్టుబడుల భవిష్యత్ విలువను లెక్కించండి. మీ పెట్టుబడి వృద్ధిని దృశ్యమానం చేయండి.' }, group: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' }, interlinks: [{ path: '/calculators/investment/lumpsum', title: { en: 'Lump Sum Calculator', te: 'లంప్ సమ్ కాలిక్యులేటర్' } }], componentName: 'SIPCalculator', icon: 'plant' },
        { path: '/calculators/investment/step-up-sip', type: PageType.CALCULATOR, title: { en: 'Step-Up SIP Calculator', te: 'స్టెప్-అప్ SIP కాలిక్యులేటర్' }, description: { en: 'Calculate returns for SIPs with yearly increases.', te: 'వార్షిక పెరుగుదలతో SIPల రాబడిని లెక్కించండి.' }, group: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' }, interlinks: [], componentName: 'StepUpSIPCalculator', icon: 'plant' },
        { path: '/calculators/investment/lumpsum', type: PageType.CALCULATOR, title: { en: 'Lump Sum Calculator', te: 'లంప్ సమ్ కాలిక్యులేటర్' }, description: { en: 'Estimate the maturity value of a one-time lump sum investment. See how your money can grow over time with the power of compounding.', te: 'ఒకేసారి చేసే ఏకమొత్తం పెట్టుబడి యొక్క మెచ్యూరిటీ విలువను అంచనా వేయండి. కాలక్రమేణా మీ డబ్బు కాంపౌండింగ్ శక్తితో ఎలా పెరుగుతుందో చూడండి.' }, group: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' }, interlinks: [{ path: '/calculators/investment/sip', title: { en: 'SIP Calculator', te: 'SIP కాలిక్యులేటర్' } }], componentName: 'LumpSumInvestmentCalculator', icon: 'wallet' },
        { path: '/calculators/investment/rd', type: PageType.CALCULATOR, title: { en: 'RD Calculator', te: 'RD కాలిక్యులేటర్' }, description: { en: 'Calculate the maturity amount and interest earned on your Recurring Deposit (RD). Plan your regular savings effectively.', te: 'మీ రికరింగ్ డిపాజిట్ (RD) పై మెచ్యూరిటీ మొత్తం మరియు సంపాదించిన వడ్డీని లెక్కించండి. మీ క్రమబద్ధమైన పొదుపును సమర్థవంతంగా ప్లాన్ చేసుకోండి.' }, group: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' }, interlinks: [{ path: '/calculators/investment/fd', title: { en: 'FD Calculator', te: 'FD కాలిక్యులేటర్' } }], componentName: 'RDCalculator', icon: 'piggy-bank' },
        { path: '/calculators/investment/fd', type: PageType.CALCULATOR, title: { en: 'FD Calculator', te: 'FD కాలిక్యులేటర్' }, description: { en: 'Find out the maturity value and total interest earned on your Fixed Deposit (FD) investment. Ideal for planning secure investments.', te: 'మీ ఫిక్స్‌డ్ డిపాజిట్ (FD) పెట్టుబడిపై మెచ్యూరిటీ విలువ మరియు సంపాదించిన మొత్తం వడ్డీని కనుగొనండి. సురక్షితమైన పెట్టుబడులను ప్లాన్ చేయడానికి అనువైనది.' }, group: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' }, interlinks: [{ path: '/calculators/investment/rd', title: { en: 'RD Calculator', te: 'RD కాలిక్యులేటర్' } }], componentName: 'FDCalculator', icon: 'piggy-bank' },
        { path: '/calculators/investment/ppf', type: PageType.CALCULATOR, title: { en: 'PPF Calculator', te: 'PPF కాలిక్యులేటర్' }, description: { en: 'Calculate the maturity amount of your Public Provident Fund (PPF) investment. A great tool for long-term, tax-saving goals.', te: 'మీ పబ్లిక్ ప్రావిడెంట్ ఫండ్ (PPF) పెట్టుబడి యొక్క మెచ్యూరిటీ మొత్తాన్ని లెక్కించండి. దీర్ఘకాలిక, పన్ను ఆదా లక్ష్యాల కోసం ఒక గొప్ప సాధనం.' }, group: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' }, interlinks: [], componentName: 'PPFCalculator', icon: 'wallet' },
        { path: '/calculators/investment/gold-sip', type: PageType.CALCULATOR, title: { en: 'Gold SIP Calculator', te: 'గోల్డ్ SIP కాలిక్యులేటర్' }, description: { en: 'Estimate returns on your digital gold or Gold ETF investments.', te: 'మీ డిజిటల్ గోల్డ్ లేదా గోల్డ్ ETF పెట్టుబడులపై రాబడిని అంచనా వేయండి.' }, group: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' }, interlinks: [], componentName: 'GoldSIPCalculator', icon: 'wallet' },
        { path: '/calculators/investment/mf-xirr', type: PageType.CALCULATOR, title: { en: 'Mutual Fund XIRR Calculator', te: 'మ్యూచువల్ ఫండ్ XIRR కాలిక్యులేటర్' }, description: { en: 'Calculate returns for irregular investments using the XIRR method.', te: 'XIRR పద్ధతిని ఉపయోగించి క్రమరహిత పెట్టుబడుల రాబడిని లెక్కించండి.' }, group: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' }, interlinks: [], componentName: 'MutualFundXIRRCalculator', icon: 'chart-up' },
        { path: '/calculators/investment/stock-average', type: PageType.CALCULATOR, title: { en: 'Stock Average Price Calculator', te: 'స్టాక్ సగటు ధర కాలిక్యులేటర్' }, description: { en: 'Track the average buy price of a stock after multiple purchases.', te: 'బహుళ కొనుగోళ్ల తర్వాత స్టాక్ యొక్క సగటు కొనుగోలు ధరను ట్రాక్ చేయండి.' }, group: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' }, interlinks: [], componentName: 'StockAveragePriceCalculator', icon: 'chart-up' },
        { path: '/calculators/investment/dividend-yield', type: PageType.CALCULATOR, title: { en: 'Dividend Yield Calculator', te: 'డివిడెండ్ యీల్డ్ కాలిక్యులేటర్' }, description: { en: 'Evaluate returns from dividend-paying stocks.', te: 'డివిడెండ్ చెల్లించే స్టాక్స్ నుండి రాబడిని మూల్యాంకనం చేయండి.' }, group: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' }, interlinks: [], componentName: 'DividendYieldCalculator', icon: 'chart-up' },
        { path: '/calculators/investment/crypto', type: PageType.CALCULATOR, title: { en: 'Crypto Investment Calculator', te: 'క్రిప్టో ఇన్వెస్ట్‌మెంట్ కాలిక్యులేటర్' }, description: { en: 'Calculate profit or loss based on cryptocurrency buy and sell prices.', te: 'క్రిప్టోకరెన్సీ కొనుగోలు మరియు అమ్మకం ధరల ఆధారంగా లాభం లేదా నష్టాన్ని లెక్కించండి.' }, group: { en: 'Investment & Wealth', te: 'పెట్టుబడి & సంపద' }, interlinks: [], componentName: 'CryptoInvestmentCalculator', icon: 'default' },
      ],
    },
    {
      name: { en: 'Loans & Credit', te: 'రుణాలు & క్రెడిట్' },
      pages: [
        { path: '/calculators/loans/emi', type: PageType.CALCULATOR, title: { en: 'EMI Calculator', te: 'EMI కాలిక్యులేటర్' }, description: { en: 'Calculate your Equated Monthly Installment (EMI) for home, car, or personal loans. Understand your loan repayment schedule.', te: 'గృహ, కారు లేదా వ్యక్తిగత రుణాల కోసం మీ ఈక్వేటెడ్ మంత్లీ ఇన్‌స్టాల్‌మెంట్ (EMI)ని లెక్కించండి. మీ లోన్ రీపేమెంట్ షెడ్యూల్‌ను అర్థం చేసుకోండి.' }, group: { en: 'Loans & Credit', te: 'రుణాలు & క్రెడిట్' }, interlinks: [], componentName: 'EMICalculator', icon: 'calculator' },
        { path: '/calculators/loans/eligibility', type: PageType.CALCULATOR, title: { en: 'Loan Eligibility Calculator', te: 'లోన్ అర్హత కాలిక్యులేటర్' }, description: { en: 'Estimate the maximum loan you can avail based on your salary and other factors.', te: 'మీ జీతం మరియు ఇతర కారకాల ఆధారంగా మీరు పొందగల గరిష్ట రుణాన్ని అంచనా వేయండి.' }, group: { en: 'Loans & Credit', te: 'రుణాలు & క్రెడిట్' }, interlinks: [], componentName: 'LoanEligibilityCalculator', icon: 'calculator' },
        { path: '/calculators/loans/prepayment', type: PageType.CALCULATOR, title: { en: 'Loan Prepayment Calculator', te: 'లోన్ ప్రీపేమెంట్ కాలిక్యులేటర్' }, description: { en: 'See how early repayment can save you a significant amount of interest.', te: 'ముందస్తు చెల్లింపు మీకు ఎంత వడ్డీని ఆదా చేస్తుందో చూడండి.' }, group: { en: 'Loans & Credit', te: 'రుణాలు & క్రెడిట్' }, interlinks: [], componentName: 'LoanPrepaymentCalculator', icon: 'calculator' },
        { path: '/calculators/loans/balance-transfer', type: PageType.CALCULATOR, title: { en: 'Balance Transfer Calculator', te: 'బ్యాలెన్స్ ట్రాన్స్‌ఫర్ కాలిక్యులేటర్' }, description: { en: 'Compare savings when shifting your loan to another lender with a lower interest rate.', te: 'తక్కువ వడ్డీ రేటుతో మీ రుణాన్ని మరో రుణదాతకు మార్చినప్పుడు పొదుపులను పోల్చండి.' }, group: { en: 'Loans & Credit', te: 'రుణాలు & క్రెడిట్' }, interlinks: [], componentName: 'BalanceTransferCalculator', icon: 'calculator' },
        { path: '/calculators/loans/credit-card-interest', type: PageType.CALCULATOR, title: { en: 'Credit Card Interest Calculator', te: 'క్రెడిట్ కార్డ్ వడ్డీ కాలిక్యులేటర్' }, description: { en: 'Understand the cost of rolling over your credit card balances.', te: 'మీ క్రెడిట్ కార్డ్ బ్యాలెన్స్‌లను రోల్ ఓవర్ చేయడం వల్ల అయ్యే ఖర్చును అర్థం చేసుకోండి.' }, group: { en: 'Loans & Credit', te: 'రుణాలు & క్రెడిట్' }, interlinks: [], componentName: 'CreditCardInterestCalculator', icon: 'calculator' },
        { path: '/calculators/loans/education-loan', type: PageType.CALCULATOR, title: { en: 'Education Loan Repayment Calculator', te: 'విద్యా రుణ తిరిగి చెల్లింపు కాలిక్యులేటర్' }, description: { en: 'Plan your EMIs for an education loan, factoring in the moratorium period.', te: 'మారటోరియం కాలాన్ని పరిగణనలోకి తీసుకుని, విద్యా రుణం కోసం మీ EMIలను ప్లాన్ చేసుకోండి.' }, group: { en: 'Loans & Credit', te: 'రుణాలు & క్రెడిట్' }, interlinks: [], componentName: 'EducationLoanRepaymentCalculator', icon: 'calculator' },
        { path: '/calculators/loans/car-lease-vs-loan', type: PageType.CALCULATOR, title: { en: 'Car Lease vs Loan Calculator', te: 'కారు లీజు vs లోన్ కాలిక్యులేటర్' }, description: { en: 'Compare the financial implications of leasing a car versus financing it with a loan.', te: 'కారును లీజుకు తీసుకోవడం మరియు రుణంతో ఫైనాన్సింగ్ చేయడం వల్ల కలిగే ఆర్థిక చిక్కులను పోల్చండి.' }, group: { en: 'Loans & Credit', te: 'రుణాలు & క్రెడిట్' }, interlinks: [], componentName: 'CarLeaseVsLoanCalculator', icon: 'calculator' },
      ],
    },
    {
      name: { en: 'Tax & Compliance', te: 'పన్ను & వర్తింపు' },
      pages: [
        { path: '/calculators/tax/income-tax', type: PageType.CALCULATOR, title: { en: 'Income Tax Calculator', te: 'ఆదాయపు పన్ను కాలిక్యులేటర్' }, description: { en: 'Estimate your income tax liability based on the latest tax slabs. Calculate your tax payable under the new tax regime.', te: 'తాజా పన్ను స్లాబుల ఆధారంగా మీ ఆదాయపు పన్ను బాధ్యతను అంచనా వేయండి. కొత్త పన్ను విధానం కింద మీరు చెల్లించవలసిన పన్నును లెక్కించండి.' }, group: { en: 'Tax & Compliance', te: 'పన్ను & వర్తింపు' }, interlinks: [{ path: '/calculators/tax/hra', title: { en: 'HRA Calculator', te: 'HRA కాలిక్యులేటర్' } }], componentName: 'IncomeTaxCalculator', icon: 'calculator' },
        { path: '/calculators/tax/hra', type: PageType.CALCULATOR, title: { en: 'HRA Calculator', te: 'HRA కాలిక్యులేటర్' }, description: { en: 'Calculate how much of your House Rent Allowance (HRA) is exempt from tax. Optimize your tax savings on rent.', te: 'మీ ఇంటి అద్దె భత్యం (HRA)లో ఎంత పన్ను నుండి మినహాయింపు పొందవచ్చో లెక్కించండి. అద్దెపై మీ పన్ను ఆదాను ఆప్టిమైజ్ చేయండి.' }, group: { en: 'Tax & Compliance', te: 'పన్ను & వర్తింపు' }, interlinks: [{ path: '/calculators/tax/income-tax', title: { en: 'Income Tax Calculator', te: 'ఆదాయపు పన్ను కాలిక్యులేటర్' } }], componentName: 'HRACalculator', icon: 'calculator' },
        { path: '/calculators/tax/capital-gains', type: PageType.CALCULATOR, title: { en: 'Capital Gains Calculator', te: 'మూలధన లాభాల కాలిక్యులేటర్' }, description: { en: 'Estimate the tax on your capital gains from selling assets like stocks or property. Understand short-term and long-term gains.', te: 'స్టాక్స్ లేదా ఆస్తి వంటి ఆస్తులను అమ్మడం ద్వారా మీ మూలధన లాభాలపై పన్నును అంచనా వేయండి. స్వల్పకాలిక మరియు దీర్ఘకాలిక లాభాలను అర్థం చేసుకోండి.' }, group: { en: 'Tax & Compliance', te: 'పన్ను & వర్తింపు' }, interlinks: [], componentName: 'CapitalGainsCalculator', icon: 'calculator' },
        { path: '/calculators/tax/gst', type: PageType.CALCULATOR, title: { en: 'GST Calculator', te: 'GST కాలిక్యులేటర్' }, description: { en: 'Calculate the Goods and Services Tax (GST) for businesses and freelancers.', te: 'వ్యాపారాలు మరియు ఫ్రీలాన్సర్ల కోసం వస్తువులు మరియు సేవల పన్ను (GST)ని లెక్కించండి.' }, group: { en: 'Tax & Compliance', te: 'పన్ను & వర్తింపు' }, interlinks: [], componentName: 'GSTCalculator', icon: 'calculator' },
        { path: '/calculators/tax/section-80c', type: PageType.CALCULATOR, title: { en: 'Section 80C Calculator', te: 'సెక్షన్ 80C కాలిక్యులేటర్' }, description: { en: 'Check your potential tax savings on eligible instruments under Section 80C.', te: 'సెక్షన్ 80C కింద అర్హత ఉన్న సాధనాలపై మీ సంభావ్య పన్ను ఆదాను తనిఖీ చేయండి.' }, group: { en: 'Tax & Compliance', te: 'పన్ను & వర్తింపు' }, interlinks: [], componentName: 'Section80CCalculator', icon: 'calculator' },
        { path: '/calculators/tax/tds', type: PageType.CALCULATOR, title: { en: 'TDS Calculator', te: 'TDS కాలిక్యులేటర్' }, description: { en: 'Calculate the Tax Deducted at Source (TDS) on your salary or fixed deposit interest.', te: 'మీ జీతం లేదా ఫిక్స్‌డ్ డిపాజిట్ వడ్డీపై మూలం వద్ద పన్ను మినహాయింపు (TDS)ని లెక్కించండి.' }, group: { en: 'Tax & Compliance', te: 'పన్ను & వర్తింపు' }, interlinks: [], componentName: 'TDSCalculator', icon: 'calculator' },
        { path: '/calculators/tax/advance-tax', type: PageType.CALCULATOR, title: { en: 'Advance Tax Calculator', te: 'అడ్వాన్స్ టాక్స్ కాలిక్యులేటర్' }, description: { en: 'Plan your quarterly advance tax payments to avoid penalties.', te: 'జరిమానాలను నివారించడానికి మీ త్రైమాసిక అడ్వాన్స్ పన్ను చెల్లింపులను ప్లాన్ చేసుకోండి.' }, group: { en: 'Tax & Compliance', te: 'పన్ను & వర్తింపు' }, interlinks: [], componentName: 'AdvanceTaxCalculator', icon: 'calculator' },
        { path: '/calculators/tax/house-property-income', type: PageType.CALCULATOR, title: { en: 'House Property Income Tax Calculator', te: 'గృహ ఆస్తి ఆదాయపు పన్ను కాలిక్యులేటర్' }, description: { en: 'Calculate tax on rental income versus deductions.', te: 'అద్దె ఆదాయంపై పన్ను మరియు మినహాయింపులను లెక్కించండి.' }, group: { en: 'Tax & Compliance', te: 'పన్ను & వర్తింపు' }, interlinks: [], componentName: 'HousePropertyIncomeTaxCalculator', icon: 'calculator' },
      ],
    },
    {
        name: { en: 'Insurance & Protection', te: 'బీమా & రక్షణ' },
        pages: [
            { path: '/calculators/insurance/health-premium', type: PageType.CALCULATOR, title: { en: 'Health Insurance Premium Calculator', te: 'ఆరోగ్య బీమా ప్రీమియం కాలిక్యులేటర్' }, description: { en: 'Estimate your health insurance premium based on age, cover amount, and other factors.', te: 'వయస్సు, కవర్ మొత్తం మరియు ఇతర కారకాల ఆధారంగా మీ ఆరోగ్య బీమా ప్రీమియంను అంచనా వేయండి.' }, group: { en: 'Insurance & Protection', te: 'బీమా & రక్షణ' }, interlinks: [], componentName: 'HealthInsurancePremiumCalculator', icon: 'document' },
            { path: '/calculators/insurance/term-plan', type: PageType.CALCULATOR, title: { en: 'Term Plan Calculator', te: 'టర్మ్ ప్లాన్ కాలిక్యులేటర్' }, description: { en: 'Determine the required life cover amount and estimate the premium for a term plan.', te: 'అవసరమైన జీవిత బీమా కవర్ మొత్తాన్ని నిర్ధారించండి మరియు టర్మ్ ప్లాన్ కోసం ప్రీమియంను అంచనా వేయండి.' }, group: { en: 'Insurance & Protection', te: 'బీమా & రక్షణ' }, interlinks: [], componentName: 'TermPlanCalculator', icon: 'document' },
            { path: '/calculators/insurance/child-education-insurance', type: PageType.CALCULATOR, title: { en: 'Child Education Insurance Calculator', te: 'పిల్లల విద్యా బీమా కాలిక్యులేటర్' }, description: { en: 'Calculate the corpus needed to secure your child\'s educational future.', te: 'మీ పిల్లల విద్యా భవిష్యత్తును సురక్షితం చేయడానికి అవసరమైన నిధిని లెక్కించండి.' }, group: { en: 'Insurance & Protection', te: 'బీమా & రక్షణ' }, interlinks: [], componentName: 'ChildEducationInsuranceCalculator', icon: 'document' },
            { path: '/calculators/insurance/accident-insurance', type: PageType.CALCULATOR, title: { en: 'Accident Insurance Coverage Calculator', te: 'ప్రమాద బీమా కవరేజ్ కాలిక్యులేటర్' }, description: { en: 'Estimate your required accident insurance cover based on your risk profile.', te: 'మీ రిస్క్ ప్రొఫైల్ ఆధారంగా మీకు అవసరమైన ప్రమాద బీమా కవర్‌ను అంచనా వేయండి.' }, group: { en: 'Insurance & Protection', te: 'బీమా & రక్షణ' }, interlinks: [], componentName: 'AccidentInsuranceCoverageCalculator', icon: 'document' },
        ],
    },
    {
        name: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' },
        pages: [
            { path: '/calculators/planning/retirement-corpus', type: PageType.CALCULATOR, title: { en: 'Retirement Corpus Calculator', te: 'పదవీ విరమణ నిధి కాలిక్యులేటర్' }, description: { en: 'Calculate the total corpus you need to accumulate for a comfortable retirement based on your current expenses and lifestyle.', te: 'మీ ప్రస్తుత ఖర్చులు మరియు జీవనశైలి ఆధారంగా సౌకర్యవంతమైన పదవీ విరమణ కోసం మీరు సమీకరించాల్సిన మొత్తం నిధిని లెక్కించండి.' }, group: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' }, interlinks: [], componentName: 'RetirementCorpusCalculator', icon: 'piggy-bank' },
            { path: '/calculators/planning/emergency-fund', type: PageType.CALCULATOR, title: { en: 'Emergency Fund Calculator', te: 'అత్యవసర నిధి కాలిక్యులేటర్' }, description: { en: 'Determine the ideal size of your emergency fund to cover unexpected expenses for 3 to 12 months. Secure your finances.', te: '3 నుండి 12 నెలల పాటు ఊహించని ఖర్చులను కవర్ చేయడానికి మీ అత్యవసర నిధి యొక్క ఆదర్శ పరిమాణాన్ని నిర్ధారించండి. మీ ఆర్థిక వ్యవహారాలను సురక్షితం చేసుకోండి.' }, group: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' }, interlinks: [], componentName: 'EmergencyFundCalculator', icon: 'piggy-bank' },
            { path: '/calculators/planning/life-insurance-needs', type: PageType.CALCULATOR, title: { en: 'Life Insurance Needs Calculator', te: 'జీవిత బీమా అవసరాల కాలిక్యులేటర్' }, description: { en: 'Estimate the amount of life insurance cover you need to financially protect your family and their future goals.', te: 'మీ కుటుంబాన్ని మరియు వారి భవిష్యత్ లక్ష్యాలను ఆర్థికంగా రక్షించడానికి మీకు అవసరమైన జీవిత బీమా కవర్ మొత్తాన్ని అంచనా వేయండి.' }, group: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' }, interlinks: [], componentName: 'LifeInsuranceNeedsCalculator', icon: 'document' },
            { path: '/calculators/planning/savings-goal', type: PageType.CALCULATOR, title: { en: 'Savings Goal Tracker', te: 'పొదుపు లక్ష్య ట్రాకర్' }, description: { en: 'Plan and track your savings for any goal, like a vacation or a new car. Find out how much you need to save monthly.', te: 'విహారయాత్ర లేదా కొత్త కారు వంటి ఏదైనా లక్ష్యం కోసం మీ పొదుపును ప్లాన్ చేయండి మరియు ట్రాక్ చేయండి. మీరు నెలవారీగా ఎంత ఆదా చేయాలో కనుగొనండి.' }, group: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' }, interlinks: [{ path: '/calculators/investment/sip', title: { en: 'SIP Calculator', te: 'SIP కాలిక్యులేటర్' } }], componentName: 'SavingsGoalTracker', icon: 'chart-up' },
            { path: '/calculators/planning/comprehensive-retirement', type: PageType.CALCULATOR, title: { en: 'Comprehensive Retirement Planner', te: 'సమగ్ర పదవీ విరమణ ప్లానర్' }, description: { en: 'A detailed, multi-step planner to forecast your retirement needs, factoring in assets, inflation, and life expectancy.', te: 'ఆస్తులు, ద్రవ్యోల్బణం మరియు ఆయుర్దాయం వంటి అంశాలను పరిగణనలోకి తీసుకుని, మీ పదవీ విరమణ అవసరాలను అంచనా వేయడానికి ఒక వివరణాత్మక, బహుళ-దశల ప్లానర్.' }, group: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' }, interlinks: [], componentName: 'ComprehensiveRetirementPlanner', icon: 'piggy-bank' },
            { path: '/calculators/planning/wedding-budget', type: PageType.CALCULATOR, title: { en: 'Wedding Budget Calculator', te: 'వివాహ బడ్జెట్ కాలిక్యులేటర్' }, description: { en: 'Plan and track costs for your wedding and calculate the savings required.', te: 'మీ వివాహం కోసం ఖర్చులను ప్లాన్ చేయండి మరియు ట్రాక్ చేయండి మరియు అవసరమైన పొదుపులను లెక్కించండి.' }, group: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' }, interlinks: [], componentName: 'WeddingBudgetCalculator', icon: 'calculator' },
            { path: '/calculators/planning/child-education-cost', type: PageType.CALCULATOR, title: { en: 'Child Education Cost Calculator', te: 'పిల్లల విద్యా ఖర్చు కాలిక్యులేటర్' }, description: { en: 'Project the future cost of your child\'s education and plan your investments accordingly.', te: 'మీ పిల్లల విద్య యొక్క భవిష్యత్ వ్యయాన్ని అంచనా వేయండి మరియు దానికి అనుగుణంగా మీ పెట్టుబడులను ప్లాన్ చేసుకోండి.' }, group: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' }, interlinks: [], componentName: 'ChildEducationCostCalculator', icon: 'calculator' },
            { path: '/calculators/planning/vacation-goal', type: PageType.CALCULATOR, title: { en: 'Vacation/Travel Goal Calculator', te: 'విహారయాత్ర/ప్రయాణ లక్ష్య కాలిక్యులేటర్' }, description: { en: 'Calculate the monthly savings needed to fund your dream trip.', te: 'మీ కలల యాత్రకు నిధులు సమకూర్చడానికి అవసరమైన నెలవారీ పొదుపులను లెక్కించండి.' }, group: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' }, interlinks: [], componentName: 'VacationGoalCalculator', icon: 'default' },
            { path: '/calculators/planning/net-worth', type: PageType.CALCULATOR, title: { en: 'Net Worth Calculator', te: 'నికర విలువ కాలిక్యులేటర్' }, description: { en: 'Get an overview of your financial health by calculating your assets minus liabilities.', te: 'మీ ఆస్తుల నుండి అప్పులను తీసివేయడం ద్వారా మీ ఆర్థిక ఆరోగ్యం యొక్క అవలోకనాన్ని పొందండి.' }, group: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' }, interlinks: [], componentName: 'NetWorthCalculator', icon: 'wallet' },
            { path: '/calculators/planning/monthly-budget', type: PageType.CALCULATOR, title: { en: 'Monthly Budget Planner', te: 'నెలవారీ బడ్జెట్ ప్లానర్' }, description: { en: 'Track your monthly income versus expenses to manage your finances better.', te: 'మీ ఆర్థిక వ్యవహారాలను మెరుగ్గా నిర్వహించడానికి మీ నెలవారీ ఆదాయం మరియు ఖర్చులను ట్రాక్ చేయండి.' }, group: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' }, interlinks: [], componentName: 'MonthlyBudgetPlanner', icon: 'calculator' },
            { path: '/calculators/planning/inflation-impact', type: PageType.CALCULATOR, title: { en: 'Inflation Impact Calculator', te: 'ద్రవ్యోల్బణ ప్రభావ కాలిక్యులేటర్' }, description: { en: 'Understand the future value erosion of your money due to inflation.', te: 'ద్రవ్యోల్బణం కారణంగా మీ డబ్బు యొక్క భవిష్యత్ విలువ క్షీణతను అర్థం చేసుకోండి.' }, group: { en: 'Personal Finance & Planning', te: 'వ్యక్తిగత ఫైనాన్స్ & ప్రణాళిక' }, interlinks: [], componentName: 'InflationImpactCalculator', icon: 'chart-up' },
        ],
    },
    {
        name: { en: 'Business & Freelancers', te: 'వ్యాపారం & ఫ్రీలాన్సర్లు' },
        pages: [
            { path: '/calculators/business/freelancer-tax', type: PageType.CALCULATOR, title: { en: 'Freelancer Income Tax Calculator', te: 'ఫ్రీలాన్సర్ ఆదాయపు పన్ను కాలిక్యులేటర్' }, description: { en: 'Specialized tax planning and calculation for gig workers and freelancers.', te: 'గిగ్ వర్కర్లు మరియు ఫ్రీలాన్సర్ల కోసం ప్రత్యేక పన్ను ప్రణాళిక మరియు గణన.' }, group: { en: 'Business & Freelancers', te: 'వ్యాపారం & ఫ్రీలాన్సర్లు' }, interlinks: [], componentName: 'FreelancerIncomeTaxCalculator', icon: 'calculator' },
            { path: '/calculators/business/hourly-rate', type: PageType.CALCULATOR, title: { en: 'Hourly Rate Calculator', te: 'గంట రేటు కాలిక్యులేటర్' }, description: { en: 'Determine your ideal hourly rate as a freelancer based on your income goals and expenses.', te: 'మీ ఆదాయ లక్ష్యాలు మరియు ఖర్చుల ఆధారంగా ఫ్రీలాన్సర్‌గా మీ ఆదర్శ గంట రేటును నిర్ధారించండి.' }, group: { en: 'Business & Freelancers', te: 'వ్యాపారం & ఫ్రీలాన్సర్లు' }, interlinks: [], componentName: 'HourlyRateCalculator', icon: 'calculator' },
            { path: '/calculators/business/profit-margin', type: PageType.CALCULATOR, title: { en: 'Profit Margin Calculator', te: 'లాభ మార్జిన్ కాలిక్యులేటర్' }, description: { en: 'Analyze your business profitability by comparing cost versus selling price.', te: 'వ్యయం మరియు అమ్మకం ధరను పోల్చడం ద్వారా మీ వ్యాపార లాభదాయకతను విశ్లేషించండి.' }, group: { en: 'Business & Freelancers', te: 'వ్యాపారం & ఫ్రీలాన్సర్లు' }, interlinks: [], componentName: 'ProfitMarginCalculator', icon: 'chart-up' },
            { path: '/calculators/business/break-even', type: PageType.CALCULATOR, title: { en: 'Break-Even Point Calculator', te: 'బ్రేక్-ఈవెన్ పాయింట్ కాలిక్యులేటర్' }, description: { en: 'Calculate the number of units you need to sell to cover your fixed costs.', te: 'మీ స్థిర ఖర్చులను కవర్ చేయడానికి మీరు అమ్మాల్సిన యూనిట్ల సంఖ్యను లెక్కించండి.' }, group: { en: 'Business & Freelancers', te: 'వ్యాపారం & ఫ్రీలాన్సర్లు' }, interlinks: [], componentName: 'BreakEvenPointCalculator', icon: 'chart-up' },
        ],
    }
  ],
  comparisons: [],
  tips: [
    {
      path: '/tips/daily-saving-tips',
      type: PageType.TIP,
      title: { en: 'Daily Saving Tips', te: 'రోజువారీ పొదుపు చిట్కాలు' },
      description: { en: 'Discover simple and practical tips you can use every day to save more money, cut expenses, and build a healthy saving habit.', te: 'ప్రతిరోజూ ఎక్కువ డబ్బు ఆదా చేయడానికి, ఖర్చులను తగ్గించడానికి మరియు ఆరోగ్యకరమైన పొదుపు అలవాటును పెంచుకోవడానికి మీరు ఉపయోగించగల సరళమైన మరియు ఆచరణాత్మక చిట్కాలను కనుగొనండి.' },
      interlinks: [
        { path: '/learn/money-basics/what-is-budgeting', title: { en: 'What is Budgeting?', te: 'బడ్జెటింగ్ అంటే ఏమిటి?' } }
      ],
    },
  ],
  interactiveGuides: [
    {
        path: '/guides/choosing-first-mutual-fund',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Guide: Choosing Your First Mutual Fund', te: 'గైడ్: మీ మొదటి మ్యూచువల్ ఫండ్‌ను ఎంచుకోవడం' },
        description: { en: 'An interactive, step-by-step guide to help you understand your risk profile and select the right type of mutual fund for your investment journey.', te: 'మీ రిస్క్ ప్రొఫైల్‌ను అర్థం చేసుకోవడంలో మరియు మీ పెట్టుబడి ప్రయాణానికి సరైన రకమైన మ్యూచువల్ ఫండ్‌ను ఎంచుకోవడంలో మీకు సహాయపడటానికి ఒక ఇంటరాక్టివ్, దశల వారీ గైడ్.' },
        interlinks: [], componentName: 'ChoosingMutualFundGuide', icon: 'plant'
    },
    {
        path: '/guides/financial-health-checkup',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Financial Health Check-up', te: 'ఆర్థిక ఆరోగ్య తనిఖీ' },
        description: { en: 'Get a "financial health score" and identify areas for improvement based on your income, expenses, and savings.', te: 'మీ ఆదాయం, ఖర్చులు మరియు పొదుపుల ఆధారంగా "ఆర్థిక ఆరోగ్య స్కోరు" పొందండి మరియు మెరుగుదల కోసం ప్రాంతాలను గుర్తించండి.' },
        interlinks: [], componentName: 'FinancialHealthCheckupGuide', icon: 'default'
    },
    {
        path: '/guides/debt-reduction-strategy',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Debt Reduction Strategy Guide', te: 'అప్పుల తగ్గింపు వ్యూహ గైడ్' },
        description: { en: 'Recommends the best strategy (Snowball vs. Avalanche) to pay off multiple loans or credit card debts.', te: 'బహుళ రుణాలు లేదా క్రెడిట్ కార్డ్ అప్పులను చెల్లించడానికి ఉత్తమ వ్యూహాన్ని (స్నోబాల్ vs. అవలాంచ్) సిఫార్సు చేస్తుంది.' },
        interlinks: [], componentName: 'DebtReductionGuide', icon: 'calculator'
    },
    {
        path: '/guides/savings-placement-guide',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: '"Where Should I Put My Savings?" Guide', te: 'నా పొదుపును ఎక్కడ పెట్టాలి? గైడ్' },
        description: { en: 'Helps users choose between a Savings Account, Fixed Deposit (FD), or a Liquid Mutual Fund for their short-term savings.', te: 'వినియోగదారులు తమ స్వల్పకాలిక పొదుపుల కోసం సేవింగ్స్ ఖాతా, ఫిక్స్‌డ్ డిపాజిట్ (FD), లేదా లిక్విడ్ మ్యూచువల్ ఫండ్ మధ్య ఎంచుకోవడానికి సహాయపడుతుంది.' },
        interlinks: [], componentName: 'SavingsPlacementGuide', icon: 'wallet'
    },
    {
        path: '/guides/asset-allocation-planner',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Asset Allocation Planner', te: 'ఆస్తి కేటాయింపు ప్లానర్' },
        description: { en: 'Creates a personalized investment portfolio mix based on age and risk tolerance.', te: 'వయస్సు మరియు రిస్క్ సహనం ఆధారంగా వ్యక్తిగతీకరించిన పెట్టుబడి పోర్ట్‌ఫోలియో మిశ్రమాన్ని సృష్టిస్తుంది.' },
        interlinks: [], componentName: 'AssetAllocationPlanner', icon: 'chart-up'
    },
    {
        path: '/guides/stocks-vs-mutual-funds',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Direct Stocks vs. Mutual Funds Selector', te: 'డైరెక్ట్ స్టాక్స్ vs. మ్యూచువల్ ఫండ్స్ సెలెక్టర్' },
        description: { en: 'Helps a beginner decide whether to start with individual stocks or mutual funds.', te: 'ఒక ప్రారంభకుడు వ్యక్తిగత స్టాక్స్‌తోనా లేదా మ్యూచువల్ ఫండ్స్‌తోనా ప్రారంభించాలా అని నిర్ణయించుకోవడానికి సహాయపడుతుంది.' },
        interlinks: [], componentName: 'StocksVsMutualFundsGuide', icon: 'chart-up'
    },
    {
        path: '/guides/gold-investment-guide',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Physical Gold vs. SGB vs. Gold ETF Guide', te: 'భౌతిక బంగారం vs. SGB vs. గోల్డ్ ETF గైడ్' },
        description: { en: 'Recommends the best way to invest in gold based on the user\'s goal.', te: 'వినియోగదారు లక్ష్యం ఆధారంగా బంగారంలో పెట్టుబడి పెట్టడానికి ఉత్తమ మార్గాన్ని సిఫార్సు చేస్తుంది.' },
        interlinks: [], componentName: 'GoldInvestmentGuide', icon: 'wallet'
    },
    {
        path: '/guides/nps-suitability-guide',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'National Pension System (NPS) Suitability Guide', te: 'NPS అనుకూలత గైడ్' },
        description: { en: 'Helps the user decide if NPS is the right retirement tool for them.', te: 'NPS తమకు సరైన పదవీ విరమణ సాధనమా అని వినియోగదారు నిర్ణయించుకోవడానికి సహాయపడుతుంది.' },
        interlinks: [], componentName: 'NpsSuitabilityGuide', icon: 'piggy-bank'
    },
    {
        path: '/guides/post-office-scheme-selector',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Post Office Scheme Selector', te: 'పోస్ట్ ఆఫీస్ పథకం సెలెక్టర్' },
        description: { en: 'Recommends the best Post Office scheme for a specific need (e.g., for a girl child, senior citizen).', te: 'ఒక నిర్దిష్ట అవసరం కోసం (ఉదా., ఆడపిల్ల, సీనియర్ సిటిజన్ కోసం) ఉత్తమ పోస్ట్ ఆఫీస్ పథకాన్ని సిఫార్సు చేస్తుంది.' },
        interlinks: [], componentName: 'PostOfficeSchemeSelector', icon: 'document'
    },
    {
        path: '/guides/home-loan-prepayment-vs-investment',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Home Loan: Pre-payment vs. New Investment Guide', te: 'గృహ రుణం: ముందస్తు చెల్లింపు vs. కొత్త పెట్టుబడి గైడ్' },
        description: { en: 'Helps decide whether to use a lump sum amount to pre-pay a home loan or invest it elsewhere.', te: 'ఒక ఏకమొత్తం డబ్బును గృహ రుణం ముందస్తుగా చెల్లించడానికా లేదా మరెక్కడైనా పెట్టుబడి పెట్టడానికా అని నిర్ణయించుకోవడానికి సహాయపడుతుంది.' },
        interlinks: [], componentName: 'HomeLoanPrepaymentGuide', icon: 'calculator'
    },
    {
        path: '/guides/buy-vs-rent-house',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Buy vs. Rent a House Decision Maker', te: 'ఇల్లు కొనాలా? అద్దెకు ఉండాలా? నిర్ణయ సాధనం' },
        description: { en: 'A comprehensive guide to help with one of the biggest financial decisions.', te: 'అతిపెద్ద ఆర్థిక నిర్ణయాలలో ఒకదానితో సహాయపడటానికి ఒక సమగ్ర గైడ్.' },
        interlinks: [], componentName: 'BuyVsRentGuide', icon: 'calculator'
    },
    {
        path: '/guides/should-i-take-personal-loan',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Personal Loan: "Should I Take It?" Guide', te: 'వ్యక్తిగత రుణం: "నేను తీసుకోవాలా?" గైడ్' },
        description: { en: 'A checklist to determine if taking a high-interest personal loan is a sensible decision.', te: 'అధిక-వడ్డీ వ్యక్తిగత రుణం తీసుకోవడం ఒక తెలివైన నిర్ణయమా అని నిర్ధారించడానికి ఒక చెక్‌లిస్ట్.' },
        interlinks: [], componentName: 'PersonalLoanGuide', icon: 'calculator'
    },
    {
        path: '/guides/old-vs-new-tax-regime',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Old vs. New Tax Regime Selector', te: 'పాత vs. కొత్త పన్ను విధానం సెలెక్టర్' },
        description: { en: 'Calculates the user\'s tax liability under both regimes to show which is better for them.', te: 'వినియోగదారు పన్ను బాధ్యతను రెండు విధానాల కింద లెక్కించి, వారికి ఏది ఉత్తమమో చూపిస్తుంది.' },
        interlinks: [], componentName: 'TaxRegimeSelectorGuide', icon: 'calculator'
    },
    {
        path: '/guides/personalized-80c-guide',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Personalized 80C Investment Guide', te: 'వ్యక్తిగతీకరించిన 80C పెట్టుబడి గైడ్' },
        description: { en: 'Recommends the best 80C instruments to fill the ₹1.5 Lakh limit based on risk profile.', te: 'రిస్క్ ప్రొఫైల్ ఆధారంగా ₹1.5 లక్షల పరిమితిని పూరించడానికి ఉత్తమ 80C సాధనాలను సిఫార్సు చేస్తుంది.' },
        interlinks: [], componentName: 'Personalized80cGuide', icon: 'wallet'
    },
    {
        path: '/guides/first-time-tax-filer',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'First-Time Tax Filer\'s Guide', te: 'మొదటిసారి పన్ను చెల్లింపుదారుల గైడ్' },
        description: { en: 'An interactive checklist to guide a young professional through the tax filing process.', te: 'ఒక యువ వృత్తి నిపుణుడిని పన్ను ఫైలింగ్ ప్రక్రియ ద్వారా మార్గనిర్దేశం చేయడానికి ఒక ఇంటరాక్టివ్ చెక్‌లిస్ట్.' },
        interlinks: [], componentName: 'FirstTimeTaxFilerGuide', icon: 'document'
    },
    {
        path: '/guides/health-insurance-sum-insured',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Health Insurance "Sum Insured" Guide', te: 'ఆరోగ్య బీమా "సమ్ ఇన్సూర్డ్" గైడ్' },
        description: { en: 'Recommends an appropriate health insurance coverage amount based on family size and city.', te: 'కుటుంబ పరిమాణం మరియు నగరం ఆధారంగా తగిన ఆరోగ్య బీమా కవరేజ్ మొత్తాన్ని సిఫార్సు చేస్తుంది.' },
        interlinks: [], componentName: 'HealthInsuranceSumInsuredGuide', icon: 'document'
    },
    {
        path: '/guides/term-vs-ulip-vs-endowment',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Term vs. ULIP vs. Endowment Plan Selector', te: 'టర్మ్ vs. యులిప్ vs. ఎండోమెంట్ ప్లాన్ సెలెక్టర్' },
        description: { en: 'Clarifies the confusion between different life insurance products based on user goals.', te: 'వినియోగదారు లక్ష్యాల ఆధారంగా వివిధ జీవిత బీమా ఉత్పత్తుల మధ్య గందరగోళాన్ని స్పష్టం చేస్తుంది.' },
        interlinks: [], componentName: 'InsuranceTypeSelectorGuide', icon: 'document'
    },
    {
        path: '/guides/child-university-fund-planner',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: "Child's University Fund Planner", te: 'పిల్లల యూనివర్శిటీ ఫండ్ ప్లానర్' },
        description: { en: 'Calculates the future cost of higher education and the monthly SIP required to reach that goal.', te: 'ఉన్నత విద్య యొక్క భవిష్యత్ వ్యయాన్ని మరియు ఆ లక్ష్యాన్ని చేరుకోవడానికి అవసరమైన నెలవారీ SIPని లెక్కిస్తుంది.' },
        interlinks: [], componentName: 'ChildUniversityFundPlanner', icon: 'calculator'
    },
    {
        path: '/guides/early-retirement-simulator',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: '"Can I Retire Early?" Simulator', te: '"నేను ముందుగా పదవీ విరమణ చేయగలనా?" సిమ్యులేటర్' },
        description: { en: 'Simulates if a user can achieve Financial Independence, Retire Early (FIRE) based on their savings.', te: 'ఒక వినియోగదారు తమ పొదుపుల ఆధారంగా ఆర్థిక స్వాతంత్ర్యం, ముందుగా పదవీ విరమణ (FIRE) సాధించగలరా అని అనుకరిస్తుంది.' },
        interlinks: [], componentName: 'EarlyRetirementSimulator', icon: 'chart-up'
    },
    {
        path: '/guides/car-purchase-planner',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Car Purchase Planner (Loan vs. Down Payment)', te: 'కారు కొనుగోలు ప్లానర్ (లోన్ vs. డౌన్ పేమెంట్)' },
        description: { en: 'Helps decide how much down payment to make vs. how much loan to take for a car.', te: 'ఒక కారు కోసం ఎంత డౌన్ పేమెంట్ చేయాలో వర్సెస్ ఎంత రుణం తీసుకోవాలో నిర్ణయించుకోవడానికి సహాయపడుతుంది.' },
        interlinks: [], componentName: 'CarPurchasePlanner', icon: 'calculator'
    },
    {
        path: '/guides/nri-investment-starter',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'NRI Investment Starter Guide', te: 'NRI పెట్టుబడి స్టార్టర్ గైడ్' },
        description: { en: 'Helps Non-Resident Indians (NRIs) choose the right bank account and initial investments in India.', te: 'భారతదేశంలో ప్రవాస భారతీయులు (NRIలు) సరైన బ్యాంకు ఖాతా మరియు ప్రారంభ పెట్టుబడులను ఎంచుకోవడానికి సహాయపడుతుంది.' },
        interlinks: [], componentName: 'NriInvestmentStarterGuide', icon: 'wallet'
    },
    {
        path: '/guides/small-business-tax-planner',
        type: PageType.INTERACTIVE_GUIDE,
        title: { en: 'Small Business / Freelancer Tax Planner', te: 'చిన్న వ్యాపారం / ఫ్రీలాన్సర్ టాక్స్ ప్లానర్' },
        description: { en: 'Helps choose between the Presumptive scheme (44ADA) and filing regular books.', te: 'ప్రిజంప్టివ్ పథకం (44ADA) మరియు సాధారణ పుస్తకాలను ఫైల్ చేయడం మధ్య ఎంచుకోవడానికి సహాయపడుతుంది.' },
        interlinks: [], componentName: 'SmallBusinessTaxPlanner', icon: 'calculator'
    },
  ],
};

const dashboardPage: PageData = {
    path: '/dashboard',
    type: PageType.DASHBOARD,
    title: { en: 'My Dashboard', te: 'నా డాష్‌బోర్డ్' },
    description: { en: 'Your personal space to manage saved calculations and bookmarked articles.', te: 'సేవ్ చేసిన గణనలు మరియు బుక్‌మార్క్ చేసిన కథనాలను నిర్వహించడానికి మీ వ్యక్తిగత స్థలం.' },
    interlinks: [],
    isProtected: true,
};

const allPages: PageData[] = [
  ...SITEMAP_DATA.learn.flatMap(c => c.pages),
  ...SITEMAP_DATA.calculators.flatMap(c => c.pages),
  ...SITEMAP_DATA.tips,
  ...SITEMAP_DATA.interactiveGuides,
  dashboardPage,
];

export const findPageDataByPath = (path: string): PageData | undefined => {
  // Normalize path to handle potential differences in routing logic
  const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
  return allPages.find(page => page.path === normalizedPath);
};
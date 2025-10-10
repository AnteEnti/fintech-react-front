import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PageData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SITEMAP_DATA } from '../constants';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedLinks from '../components/RelatedLinks';
import BookmarkButton from '../components/BookmarkButton';
import SaveCalculationButton from '../components/SaveCalculationButton';

// Import all calculators
import SIPCalculator from '../components/calculators/SIPCalculator';
import EMICalculator from '../components/calculators/EMICalculator';
import FDCalculator from '../components/calculators/FDCalculator';
import IncomeTaxCalculator from '../components/calculators/IncomeTaxCalculator';
import CapitalGainsCalculator from '../components/calculators/CapitalGainsCalculator';
import PPFCalculator from '../components/calculators/PPFCalculator';
import HRACalculator from '../components/calculators/HRACalculator';
import RetirementCorpusCalculator from '../components/calculators/RetirementCorpusCalculator';
import LumpSumInvestmentCalculator from '../components/calculators/LumpSumInvestmentCalculator';
import RDCalculator from '../components/calculators/RDCalculator';
import EmergencyFundCalculator from '../components/calculators/EmergencyFundCalculator';
import LifeInsuranceNeedsCalculator from '../components/calculators/LifeInsuranceNeedsCalculator';
import SavingsGoalTracker from '../components/calculators/SavingsGoalTracker';
import ComprehensiveRetirementPlanner from '../components/calculators/ComprehensiveRetirementPlanner';
import StepUpSIPCalculator from '../components/calculators/StepUpSIPCalculator';
import GoldSIPCalculator from '../components/calculators/GoldSIPCalculator';
import MutualFundXIRRCalculator from '../components/calculators/MutualFundXIRRCalculator';
import StockAveragePriceCalculator from '../components/calculators/StockAveragePriceCalculator';
import DividendYieldCalculator from '../components/calculators/DividendYieldCalculator';
import CryptoInvestmentCalculator from '../components/calculators/CryptoInvestmentCalculator';
import LoanEligibilityCalculator from '../components/calculators/LoanEligibilityCalculator';
import LoanPrepaymentCalculator from '../components/calculators/LoanPrepaymentCalculator';
import BalanceTransferCalculator from '../components/calculators/BalanceTransferCalculator';
import CreditCardInterestCalculator from '../components/calculators/CreditCardInterestCalculator';
import EducationLoanRepaymentCalculator from '../components/calculators/EducationLoanRepaymentCalculator';
import CarLeaseVsLoanCalculator from '../components/calculators/CarLeaseVsLoanCalculator';
import GSTCalculator from '../components/calculators/GSTCalculator';
import Section80CCalculator from '../components/calculators/Section80CCalculator';
import TDSCalculator from '../components/calculators/TDSCalculator';
import AdvanceTaxCalculator from '../components/calculators/AdvanceTaxCalculator';
import HousePropertyIncomeTaxCalculator from '../components/calculators/HousePropertyIncomeTaxCalculator';
import HealthInsurancePremiumCalculator from '../components/calculators/HealthInsurancePremiumCalculator';
import TermPlanCalculator from '../components/calculators/TermPlanCalculator';
import ChildEducationInsuranceCalculator from '../components/calculators/ChildEducationInsuranceCalculator';
import AccidentInsuranceCoverageCalculator from '../components/calculators/AccidentInsuranceCoverageCalculator';
import WeddingBudgetCalculator from '../components/calculators/WeddingBudgetCalculator';
import ChildEducationCostCalculator from '../components/calculators/ChildEducationCostCalculator';
import VacationGoalCalculator from '../components/calculators/VacationGoalCalculator';
import NetWorthCalculator from '../components/calculators/NetWorthCalculator';
import MonthlyBudgetPlanner from '../components/calculators/MonthlyBudgetPlanner';
import InflationImpactCalculator from '../components/calculators/InflationImpactCalculator';
import FreelancerIncomeTaxCalculator from '../components/calculators/FreelancerIncomeTaxCalculator';
import HourlyRateCalculator from '../components/calculators/HourlyRateCalculator';
import ProfitMarginCalculator from '../components/calculators/ProfitMarginCalculator';
import BreakEvenPointCalculator from '../components/calculators/BreakEvenPointCalculator';


interface CalculatorPageProps {
  pageData: PageData;
}

// HOC to inject saved props
const withInitialState = (WrappedComponent: React.FC<any>) => {
  return (props: any) => {
    const [searchParams] = useSearchParams();
    const savedInputs = searchParams.get('inputs');
    let initialState = {};
    if (savedInputs) {
        try {
            initialState = JSON.parse(decodeURIComponent(savedInputs));
        } catch (e) {
            console.error("Failed to parse saved inputs from URL", e);
        }
    }
    return <WrappedComponent {...props} initialState={initialState} />;
  };
};

const calculatorComponents: { [key: string]: React.FC<any> } = {
    SIPCalculator: withInitialState(SIPCalculator),
    EMICalculator: withInitialState(EMICalculator),
    FDCalculator: withInitialState(FDCalculator),
    IncomeTaxCalculator: withInitialState(IncomeTaxCalculator),
    CapitalGainsCalculator: withInitialState(CapitalGainsCalculator),
    PPFCalculator: withInitialState(PPFCalculator),
    HRACalculator: withInitialState(HRACalculator),
    RetirementCorpusCalculator: withInitialState(RetirementCorpusCalculator),
    LumpSumInvestmentCalculator: withInitialState(LumpSumInvestmentCalculator),
    RDCalculator: withInitialState(RDCalculator),
    EmergencyFundCalculator: withInitialState(EmergencyFundCalculator),
    LifeInsuranceNeedsCalculator: withInitialState(LifeInsuranceNeedsCalculator),
    SavingsGoalTracker: withInitialState(SavingsGoalTracker),
    ComprehensiveRetirementPlanner: withInitialState(ComprehensiveRetirementPlanner),
    StepUpSIPCalculator: withInitialState(StepUpSIPCalculator),
    GoldSIPCalculator: withInitialState(GoldSIPCalculator),
    MutualFundXIRRCalculator: withInitialState(MutualFundXIRRCalculator),
    StockAveragePriceCalculator: withInitialState(StockAveragePriceCalculator),
    DividendYieldCalculator: withInitialState(DividendYieldCalculator),
    CryptoInvestmentCalculator: withInitialState(CryptoInvestmentCalculator),
    LoanEligibilityCalculator: withInitialState(LoanEligibilityCalculator),
    LoanPrepaymentCalculator: withInitialState(LoanPrepaymentCalculator),
    BalanceTransferCalculator: withInitialState(BalanceTransferCalculator),
    CreditCardInterestCalculator: withInitialState(CreditCardInterestCalculator),
    EducationLoanRepaymentCalculator: withInitialState(EducationLoanRepaymentCalculator),
    CarLeaseVsLoanCalculator: withInitialState(CarLeaseVsLoanCalculator),
    GSTCalculator: withInitialState(GSTCalculator),
    Section80CCalculator: withInitialState(Section80CCalculator),
    TDSCalculator: withInitialState(TDSCalculator),
    AdvanceTaxCalculator: withInitialState(AdvanceTaxCalculator),
    HousePropertyIncomeTaxCalculator: withInitialState(HousePropertyIncomeTaxCalculator),
    HealthInsurancePremiumCalculator: withInitialState(HealthInsurancePremiumCalculator),
    TermPlanCalculator: withInitialState(TermPlanCalculator),
    ChildEducationInsuranceCalculator: withInitialState(ChildEducationInsuranceCalculator),
    AccidentInsuranceCoverageCalculator: withInitialState(AccidentInsuranceCoverageCalculator),
    WeddingBudgetCalculator: withInitialState(WeddingBudgetCalculator),
    ChildEducationCostCalculator: withInitialState(ChildEducationCostCalculator),
    VacationGoalCalculator: withInitialState(VacationGoalCalculator),
    NetWorthCalculator: withInitialState(NetWorthCalculator),
    MonthlyBudgetPlanner: withInitialState(MonthlyBudgetPlanner),
    InflationImpactCalculator: withInitialState(InflationImpactCalculator),
    FreelancerIncomeTaxCalculator: withInitialState(FreelancerIncomeTaxCalculator),
    HourlyRateCalculator: withInitialState(HourlyRateCalculator),
    ProfitMarginCalculator: withInitialState(ProfitMarginCalculator),
    BreakEvenPointCalculator: withInitialState(BreakEvenPointCalculator),
};

const CalculatorPage: React.FC<CalculatorPageProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const location = useLocation();
  const [calculatorState, setCalculatorState] = useState({});

  const CalculatorComponent = useMemo(() => {
    if (pageData.componentName && calculatorComponents[pageData.componentName]) {
      return calculatorComponents[pageData.componentName];
    }
    return () => <div>Calculator not found.</div>;
  }, [pageData.componentName]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      <Sidebar
        title={language === 'en' ? 'Calculators' : 'కాలిక్యులేటర్లు'}
        categories={SITEMAP_DATA.calculators}
        currentPath={location.pathname}
      />
      <div className="flex-grow">
        <Breadcrumbs pageData={pageData} />
        <article className="bg-white dark:bg-dark p-6 sm:p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-blue-300">{pageData.title[language]}</h1>
            <div className="flex items-center space-x-2 flex-shrink-0">
                <BookmarkButton pagePath={pageData.path} />
                <SaveCalculationButton pageData={pageData} calculatorState={calculatorState} />
            </div>
          </div>
          <CalculatorComponent onStateChange={setCalculatorState} />
          <RelatedLinks links={pageData.interlinks} />
        </article>
      </div>
    </div>
  );
};

export default CalculatorPage;
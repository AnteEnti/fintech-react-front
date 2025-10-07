import React, { useMemo } from 'react';
import { PageData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedLinks from '../components/RelatedLinks';
import BookmarkButton from '../components/BookmarkButton';

// Import all guide components
import ChoosingMutualFundGuide from '../components/interactive/ChoosingMutualFundGuide';
import FinancialHealthCheckupGuide from '../components/interactive/guides/FinancialHealthCheckupGuide';
import DebtReductionGuide from '../components/interactive/guides/DebtReductionGuide';
import SavingsPlacementGuide from '../components/interactive/guides/SavingsPlacementGuide';
import AssetAllocationPlanner from '../components/interactive/guides/AssetAllocationPlanner';
import StocksVsMutualFundsGuide from '../components/interactive/guides/StocksVsMutualFundsGuide';
import GoldInvestmentGuide from '../components/interactive/guides/GoldInvestmentGuide';
import NpsSuitabilityGuide from '../components/interactive/guides/NpsSuitabilityGuide';
import PostOfficeSchemeSelector from '../components/interactive/guides/PostOfficeSchemeSelector';
import HomeLoanPrepaymentGuide from '../components/interactive/guides/HomeLoanPrepaymentGuide';
import BuyVsRentGuide from '../components/interactive/guides/BuyVsRentGuide';
import PersonalLoanGuide from '../components/interactive/guides/PersonalLoanGuide';
import TaxRegimeSelectorGuide from '../components/interactive/guides/TaxRegimeSelectorGuide';
import Personalized80cGuide from '../components/interactive/guides/Personalized80cGuide';
import FirstTimeTaxFilerGuide from '../components/interactive/guides/FirstTimeTaxFilerGuide';
import HealthInsuranceSumInsuredGuide from '../components/interactive/guides/HealthInsuranceSumInsuredGuide';
import InsuranceTypeSelectorGuide from '../components/interactive/guides/InsuranceTypeSelectorGuide';
import ChildUniversityFundPlanner from '../components/interactive/guides/ChildUniversityFundPlanner';
import EarlyRetirementSimulator from '../components/interactive/guides/EarlyRetirementSimulator';
import CarPurchasePlanner from '../components/interactive/guides/CarPurchasePlanner';
import NriInvestmentStarterGuide from '../components/interactive/guides/NriInvestmentStarterGuide';
import SmallBusinessTaxPlanner from '../components/interactive/guides/SmallBusinessTaxPlanner';


interface InteractiveGuidePageProps {
  pageData: PageData;
}

const guideComponents: { [key: string]: React.FC } = {
    ChoosingMutualFundGuide,
    FinancialHealthCheckupGuide,
    DebtReductionGuide,
    SavingsPlacementGuide,
    AssetAllocationPlanner,
    StocksVsMutualFundsGuide,
    GoldInvestmentGuide,
    NpsSuitabilityGuide,
    PostOfficeSchemeSelector,
    HomeLoanPrepaymentGuide,
    BuyVsRentGuide,
    PersonalLoanGuide,
    TaxRegimeSelectorGuide,
    Personalized80cGuide,
    FirstTimeTaxFilerGuide,
    HealthInsuranceSumInsuredGuide,
    InsuranceTypeSelectorGuide,
    ChildUniversityFundPlanner,
    EarlyRetirementSimulator,
    CarPurchasePlanner,
    NriInvestmentStarterGuide,
    SmallBusinessTaxPlanner,
};

const InteractiveGuidePage: React.FC<InteractiveGuidePageProps> = ({ pageData }) => {
  const { language } = useLanguage();

  const GuideComponent = useMemo(() => {
    if (pageData.componentName && guideComponents[pageData.componentName]) {
      return guideComponents[pageData.componentName];
    }
    return () => <div>Guide not found.</div>;
  }, [pageData.componentName]);

  return (
    <div className="max-w-4xl mx-auto">
        <Breadcrumbs pageData={pageData} />
        <article className="bg-white dark:bg-dark p-6 sm:p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-blue-300">{pageData.title[language]}</h1>
            <BookmarkButton pagePath={pageData.path} />
          </div>
          <GuideComponent />
          <RelatedLinks links={pageData.interlinks} />
        </article>
      </div>
  );
};

export default InteractiveGuidePage;
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const HealthInsuranceSumInsuredGuide: React.FC = () => {
    const { language } = useLanguage();
    const [age, setAge] = useState('30');
    const [members, setMembers] = useState('2');
    const [city, setCity] = useState('metro');

    const recommendedCover = useMemo(() => {
        let base = 500000;
        if (Number(age) > 40) base += 500000;
        if (Number(members) > 2) base += (Number(members) - 2) * 200000;
        if (city === 'metro') base *= 1.5;

        // Round to nearest lakh
        return Math.round(base / 100000) * 100000;
    }, [age, members, city]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    
    const introContent = {
        what: { en: "The 'Sum Insured' is the maximum amount your health insurance provider will pay for your medical expenses in a policy year. This guide helps you estimate an appropriate Sum Insured for your family.", te: "'సమ్ ఇన్సూర్డ్' అనేది ఒక పాలసీ సంవత్సరంలో మీ వైద్య ఖర్చుల కోసం మీ ఆరోగ్య బీమా ప్రొవైడర్ చెల్లించే గరిష్ట మొత్తం. ఈ గైడ్ మీ కుటుంబానికి తగిన సమ్ ఇన్సూర్డ్‌ను అంచనా వేయడంలో మీకు సహాయపడుతుంది." },
        why: { en: "Choosing an adequate Sum Insured is critical. Under-insuring can leave you with large out-of-pocket expenses during a medical emergency, while over-insuring can lead to unnecessarily high premiums.", te: "తగినంత సమ్ ఇన్సూర్డ్‌ను ఎంచుకోవడం చాలా ముఖ్యం. తక్కువ బీమా చేయడం వైద్య అత్యవసర సమయంలో మీకు పెద్ద మొత్తంలో సొంత ఖర్చులను మిగిల్చవచ్చు, అయితే ఎక్కువ బీమా చేయడం అనవసరంగా అధిక ప్రీమియంలకు దారితీస్తుంది." },
        who: { en: "Anyone looking to buy a new health insurance policy or review their existing coverage to ensure it's sufficient for their family's needs, considering rising medical costs.", te: "పెరుగుతున్న వైద్య ఖర్చులను పరిగణనలోకి తీసుకుని, కొత్త ఆరోగ్య బీమా పాలసీని కొనాలని లేదా తమ ప్రస్తుత కవరేజ్ తమ కుటుంబ అవసరాలకు సరిపోతుందో లేదో సమీక్షించాలని చూస్తున్న ఎవరైనా." },
        how: { en: "This tool provides a quick and simple estimation. By considering key factors like the age of the eldest member, family size, and city of residence (which affects medical costs), it calculates a sensible minimum coverage amount to start with.", te: "ఈ సాధనం శీఘ్ర మరియు సరళమైన అంచనాను అందిస్తుంది. పెద్ద సభ్యుని వయస్సు, కుటుంబ పరిమాణం మరియు నివాస నగరం (ఇది వైద్య ఖర్చులను ప్రభావితం చేస్తుంది) వంటి కీలక కారకాలను పరిగణనలోకి తీసుకోవడం ద్వారా, ఇది ప్రారంభించడానికి ఒక తెలివైన కనీస కవరేజ్ మొత్తాన్ని గణిస్తుంది." }
    };

    return (
        <div className="space-y-8">
            <details className="bg-light dark:bg-slate-800 p-4 rounded-lg cursor-pointer group" open>
                <summary className="font-semibold text-lg text-primary dark:text-blue-300 list-none flex justify-between items-center">
                    <span>{language === 'en' ? 'About This Guide' : 'ఈ గైడ్ గురించి'}</span>
                    <span className="group-open:rotate-90 transition-transform duration-200">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </summary>
                <div className="mt-4 prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                    <h5 className="font-semibold">{language === 'en' ? 'What is it?' : 'ఇది ఏమిటి?'}</h5>
                    <p>{introContent.what[language]}</p>
                    <h5 className="font-semibold">{language === 'en' ? 'Why is it important?' : 'ఇది ఎందుకు ముఖ్యం?'}</h5>
                    <p>{introContent.why[language]}</p>
                    <h5 className="font-semibold">{language === 'en' ? 'Who should use this?' : 'దీనిని ఎవరు ఉపయోగించాలి?'}</h5>
                    <p>{introContent.who[language]}</p>
                    <h5 className="font-semibold">{language === 'en' ? 'How does this tool help?' : 'ఈ సాధనం ఎలా సహాయపడుతుంది?'}</h5>
                    <p>{introContent.how[language]}</p>
                </div>
            </details>

            <div>
                 <h3 className="text-2xl font-bold text-center mb-6 text-secondary dark:text-blue-400">
                    {language === 'en' ? 'Interactive Tool' : 'ఇంటరాక్టివ్ సాధనం'}
                </h3>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="eldestAge" className="block text-sm font-medium mb-1">{language === 'en' ? 'Age of Eldest Member' : 'అతి పెద్ద సభ్యుని వయస్సు'}</label>
                            <input id="eldestAge" value={age} onChange={e => setAge(e.target.value)} type="number" className="w-full p-2 border rounded"/>
                        </div>
                        <div>
                            <label htmlFor="memberCount" className="block text-sm font-medium mb-1">{language === 'en' ? 'Number of Members' : 'సభ్యుల సంఖ్య'}</label>
                            <input id="memberCount" value={members} onChange={e => setMembers(e.target.value)} type="number" className="w-full p-2 border rounded"/>
                        </div>
                        <div>
                            <label htmlFor="cityResidence" className="block text-sm font-medium mb-1">{language === 'en' ? 'City of Residence' : 'నివాస నగరం'}</label>
                            <select id="cityResidence" value={city} onChange={e => setCity(e.target.value)} className="w-full p-2 border rounded">
                                <option value="metro">{language === 'en' ? 'Metro City' : 'మెట్రో నగరం'}</option>
                                <option value="non_metro">{language === 'en' ? 'Non-Metro City' : 'నాన్-మెట్రో నగరం'}</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 text-center bg-light dark:bg-slate-800 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">{language === 'en' ? 'Recommended Health Cover' : 'సిఫార్సు చేయబడిన ఆరోగ్య కవర్'}</h3>
                        <p className="text-4xl font-bold text-secondary dark:text-blue-400 mb-2">{formatCurrency(recommendedCover)}</p>
                        <p className="text-sm text-gray-500">{language === 'en' ? 'This is a suggested minimum. Consider a higher cover for more comprehensive protection.' : 'ఇది సూచించబడిన కనీస మొత్తం. మరింత సమగ్ర రక్షణ కోసం అధిక కవర్‌ను పరిగణించండి.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthInsuranceSumInsuredGuide;
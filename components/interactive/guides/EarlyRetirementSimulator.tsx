import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import Tooltip from '../../Tooltip';

const EarlyRetirementSimulator: React.FC = () => {
    const { language } = useLanguage();
    const [age, setAge] = useState('30');
    const [expenses, setExpenses] = useState('600000'); // Annual
    const [corpus, setCorpus] = useState('1000000');
    const [sip, setSip] = useState('50000');
    const [roi, setRoi] = useState('12');

    const { fireCorpus, yearsToFire, ageAtFire } = useMemo(() => {
        const required = Number(expenses) * 25;
        let years = 0;
        let currentCorpus = Number(corpus);
        const monthlySip = Number(sip);
        const monthlyRoi = (Number(roi) / 100) / 12;
        const maxYears = 50;

        while (currentCorpus < required && years < maxYears) {
            for (let i = 0; i < 12; i++) {
                currentCorpus = currentCorpus * (1 + monthlyRoi) + monthlySip;
            }
            years++;
        }

        return { fireCorpus: required, yearsToFire: years >= maxYears ? -1 : years, ageAtFire: years >= maxYears ? -1 : Number(age) + years };
    }, [age, expenses, corpus, sip, roi]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    
    const introContent = {
        what: { en: "FIRE stands for 'Financial Independence, Retire Early'. This simulator helps you see if you're on track to achieve this goal, which means having enough investment income to cover your living expenses without having to work.", te: "FIRE అంటే 'ఆర్థిక స్వాతంత్ర్యం, ముందుగా పదవీ విరమణ'. మీరు ఈ లక్ష్యాన్ని సాధించడానికి సరైన మార్గంలో ఉన్నారో లేదో చూడటానికి ఈ సిమ్యులేటర్ మీకు సహాయపడుతుంది, అంటే పని చేయకుండానే మీ జీవన వ్యయాలను కవర్ చేయడానికి తగినంత పెట్టుబడి ఆదాయాన్ని కలిగి ఉండటం." },
        why: { en: "Early retirement is a dream for many. Understanding the numbers behind it is the first step to making it a reality. It highlights the importance of a high savings rate and consistent investing.", te: "ముందుగా పదవీ విరమణ చాలా మందికి ఒక కల. దాని వెనుక ఉన్న సంఖ్యలను అర్థం చేసుకోవడం దానిని వాస్తవికతగా మార్చడానికి మొదటి అడుగు. ఇది అధిక పొదుపు రేటు మరియు స్థిరమైన పెట్టుబడి యొక్క ప్రాముఖ్యతను హైలైట్ చేస్తుంది." },
        who: { en: "Anyone who is curious about early retirement and wants to check their progress. It's for ambitious savers and investors who are planning for a work-optional future.", te: "ముందుగా పదవీ విరమణ గురించి ఆసక్తిగా ఉన్న మరియు వారి పురోగతిని తనిఖీ చేయాలనుకుంటున్న ఎవరైనా. ఇది పని-ఐచ్ఛిక భవిష్యత్తు కోసం ప్రణాళిక వేస్తున్న ఆశావహ పొదుపుదారులు మరియు పెట్టుబడిదారుల కోసం." },
        how: { en: "This tool uses the '25x rule' to calculate your target FIRE corpus (25 times your annual expenses). It then projects your current savings and monthly investments into the future to estimate how many years it will take you to reach that target, and at what age.", te: "ఈ సాధనం మీ లక్ష్య FIRE కార్పస్‌ను లెక్కించడానికి '25x నియమం' ఉపయోగిస్తుంది (మీ వార్షిక ఖర్చులకు 25 రెట్లు). ఇది మీ ప్రస్తుత పొదుపులు మరియు నెలవారీ పెట్టుబడులను భవిష్యత్తులోకి అంచనా వేసి, ఆ లక్ష్యాన్ని చేరుకోవడానికి మీకు ఎన్ని సంవత్సరాలు పడుతుందో మరియు ఏ వయస్సులో అని అంచనా వేస్తుంది." }
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label htmlFor="currentAge" className="block text-sm font-medium mb-1">{language==='en'?'Current Age':'ప్రస్తుత వయస్సు'}</label><input id="currentAge" value={age} onChange={e => setAge(e.target.value)} type="number" className="p-2 border rounded w-full"/></div>
                        <div>
                            <label htmlFor="annualExpenses" className="flex items-center text-sm font-medium mb-1">
                                {language==='en'?'Annual Expenses':'వార్షిక ఖర్చులు'}
                                <Tooltip text={language === 'en' ? 'Your total estimated expenses for one year in retirement.' : 'పదవీ విరమణలో ఒక సంవత్సరానికి మీ మొత్తం అంచనా ఖర్చులు.'} />
                            </label>
                            <input id="annualExpenses" value={expenses} onChange={e => setExpenses(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                        <div>
                            <label htmlFor="existingCorpus" className="flex items-center text-sm font-medium mb-1">
                                {language==='en'?'Existing Corpus':'ఇప్పటికే ఉన్న కార్పస్'}
                                <Tooltip text={language === 'en' ? 'The total value of all your current investments dedicated to retirement.' : 'పదవీ విరమణ కోసం కేటాయించిన మీ ప్రస్తుత అన్ని పెట్టుబడుల మొత్తం విలువ.'} />
                            </label>
                            <input id="existingCorpus" value={corpus} onChange={e => setCorpus(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                        <div>
                            <label htmlFor="monthlySip" className="flex items-center text-sm font-medium mb-1">
                                {language==='en'?'Monthly SIP':'నెలవారీ SIP'}
                                <Tooltip text={language === 'en' ? 'The total amount you are investing for retirement every month.' : 'ప్రతి నెలా పదవీ విరమణ కోసం మీరు పెట్టుబడి పెడుతున్న మొత్తం.'} />
                            </label>
                            <input id="monthlySip" value={sip} onChange={e => setSip(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="expectedReturn" className="flex items-center text-sm font-medium mb-1">
                                {language==='en'?'Expected Return %':'అంచనా రాబడి %'}
                                <Tooltip text={language === 'en' ? 'The average annual return you expect from your investment portfolio.' : 'మీ పెట్టుబడి పోర్ట్‌ఫోలియో నుండి మీరు ఆశించే సగటు వార్షిక రాబడి.'} />
                            </label>
                            <input id="expectedReturn" value={roi} onChange={e => setRoi(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                    </div>
                    <div className="mt-6 text-center bg-light dark:bg-slate-800 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">{language==='en'?'Your FIRE Target Corpus':'మీ FIRE లక్ష్య కార్పస్'}</h3>
                        <p className="text-3xl font-bold text-secondary dark:text-blue-400 mb-4">{formatCurrency(fireCorpus)}</p>
                        {ageAtFire !== -1 ? (
                            <>
                                <h3 className="text-xl font-semibold mb-2">{language==='en'?'You can potentially retire in':'మీరు సంభావ్యంగా పదవీ విరమణ చేయవచ్చు'}</h3>
                                <p className="text-3xl font-bold text-green-600">{yearsToFire} {language==='en'?'Years (at age':'సంవత్సరాలు (వయస్సులో'} {ageAtFire})</p>
                            </>
                        ) : (
                            <p className="text-xl font-bold text-red-500">{language === 'en' ? 'Goal seems very far. Try increasing your SIP.' : 'లక్ష్యం చాలా దూరంగా ఉన్నట్లుంది. మీ SIPని పెంచడానికి ప్రయత్నించండి.'}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EarlyRetirementSimulator;
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import Tooltip from '../../Tooltip';

interface Debt {
    id: number;
    name: string;
    amount: string;
    rate: string;
    minPayment: string;
}

const DebtReductionGuide: React.FC = () => {
    const { language } = useLanguage();
    const [debts, setDebts] = useState<Debt[]>([
        { id: 1, name: language === 'en' ? 'Credit Card' : 'క్రెడిట్ కార్డ్', amount: '100000', rate: '36', minPayment: '5000' },
        { id: 2, name: language === 'en' ? 'Personal Loan' : 'వ్యక్తిగత రుణం', amount: '300000', rate: '14', minPayment: '8000' },
    ]);
    const [extraPayment, setExtraPayment] = useState('10000');

    const handleDebtChange = (id: number, field: keyof Omit<Debt, 'id'>, value: string) => {
        setDebts(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
    };

    const addDebt = () => setDebts(prev => [...prev, { id: Date.now(), name: '', amount: '', rate: '', minPayment: '' }]);
    const removeDebt = (id: number) => setDebts(prev => prev.length > 1 ? prev.filter(d => d.id !== id) : prev);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

    const calculatePayoff = (strategy: 'avalanche' | 'snowball') => {
        let currentDebts = debts.map(d => ({...d, amount: Number(d.amount) || 0, rate: Number(d.rate) || 0, minPayment: Number(d.minPayment) || 0}));
        const snowballAmount = Number(extraPayment) || 0;
        let months = 0;
        let totalInterest = 0;
        const maxMonths = 600; // 50 years cap

        while(currentDebts.some(d => d.amount > 0) && months < maxMonths) {
            months++;
            let availableSnowball = snowballAmount;

            let totalPaidThisMonth = 0;
            for(const debt of currentDebts) {
                if(debt.amount > 0) {
                    const interest = (debt.amount * (debt.rate / 100)) / 12;
                    totalInterest += interest;
                    debt.amount += interest;
                    const payment = Math.min(debt.amount, debt.minPayment);
                    debt.amount -= payment;
                    totalPaidThisMonth += payment;
                }
            }
            
            let sortedDebts;
            if (strategy === 'avalanche') {
                sortedDebts = currentDebts.filter(d => d.amount > 0).sort((a, b) => b.rate - a.rate);
            } else { // snowball
                sortedDebts = currentDebts.filter(d => d.amount > 0).sort((a, b) => a.amount - b.amount);
            }
            
            for(const debt of sortedDebts) {
                const payment = Math.min(availableSnowball, debt.amount);
                debt.amount -= payment;
                availableSnowball -= payment;
                totalPaidThisMonth += payment;
                if (availableSnowball <= 0) break;
            }

            currentDebts = currentDebts.map(d => ({ ...d, amount: Math.max(0, d.amount) }));
        }

        const totalInitialDebt = debts.reduce((s: number, d: Debt) => s + (Number(d.amount) || 0), 0);

        return { months, totalInterest, totalPayment: totalInitialDebt + totalInterest };
    };

    const avalancheResult = useMemo(() => calculatePayoff('avalanche'), [debts, extraPayment]);
    const snowballResult = useMemo(() => calculatePayoff('snowball'), [debts, extraPayment]);

    const ResultCard: React.FC<{ title: string; result: { months: number; totalPayment: number }; isWinner: boolean }> = ({ title, result, isWinner }) => (
        <div className={`p-4 rounded-lg text-center ${isWinner ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500' : 'bg-gray-100 dark:bg-slate-700'}`}>
            <h4 className="text-lg font-bold">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Time to be Debt-Free' : 'అప్పుల నుండి విముక్తికి సమయం'}</p>
            <p className="text-2xl font-semibold my-1">{`${Math.floor(result.months / 12)} ${language === 'en' ? 'Yrs' : 'సం'} ${result.months % 12} ${language === 'en' ? 'Mos' : 'నెల'}`}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Amount Paid' : 'చెల్లించిన మొత్తం'}</p>
            <p className="text-lg font-semibold">{formatCurrency(result.totalPayment)}</p>
        </div>
    );
    
    const introContent = {
        what: { en: "This guide compares two popular debt payoff strategies: the 'Avalanche' method (paying off highest interest rate debts first) and the 'Snowball' method (paying off smallest balance debts first).", te: "ఈ గైడ్ రెండు ప్రసిద్ధ అప్పుల చెల్లింపు వ్యూహాలను పోలుస్తుంది: 'అవలాంచ్' పద్ధతి (అత్యధిక వడ్డీ రేటు ఉన్న అప్పులను ముందుగా చెల్లించడం) మరియు 'స్నోబాల్' పద్ధతి (అత్యల్ప బ్యాలెన్స్ ఉన్న అప్పులను ముందుగా చెల్లించడం)." },
        why: { en: "Having a clear strategy can provide motivation and a clear path to becoming debt-free. It helps you understand how even small extra payments can save you significant time and money.", te: "స్పష్టమైన వ్యూహాన్ని కలిగి ఉండటం ప్రేరణను మరియు అప్పుల నుండి విముక్తి పొందడానికి ఒక స్పష్టమైన మార్గాన్ని అందిస్తుంది. చిన్న అదనపు చెల్లింపులు కూడా మీకు గణనీయమైన సమయం మరియు డబ్బును ఎలా ఆదా చేస్తాయో అర్థం చేసుకోవడానికి ఇది సహాయపడుతుంది." },
        who: { en: "Anyone juggling multiple debts like credit card bills, personal loans, or other consumer loans who wants an efficient plan to pay them off.", te: "క్రెడిట్ కార్డ్ బిల్లులు, వ్యక్తిగత రుణాలు లేదా ఇతర వినియోగదారుల రుణాల వంటి బహుళ అప్పులతో సతమతమవుతున్న ఎవరైనా వాటిని సమర్థవంతంగా చెల్లించడానికి ఒక ప్రణాళికను కోరుకుంటారు." },
        how: { en: "By entering your debt details and any extra amount you can pay each month, this tool simulates both strategies. It provides a clear side-by-side comparison, showing which method gets you out of debt faster and which one saves you more money in interest.", te: "మీ అప్పు వివరాలు మరియు మీరు ప్రతి నెలా చెల్లించగల అదనపు మొత్తాన్ని నమోదు చేయడం ద్వారా, ఈ సాధనం రెండు వ్యూహాలను అనుకరిస్తుంది. ఇది స్పష్టమైన పక్కపక్క పోలికను అందిస్తుంది, ఏ పద్ధతి మిమ్మల్ని అప్పుల నుండి వేగంగా బయటపడేస్తుందో మరియు ఏది మీకు వడ్డీలో ఎక్కువ డబ్బు ఆదా చేస్తుందో చూపిస్తుంది." }
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
                    <h3 className="text-xl font-semibold">{language === 'en' ? 'Your Debts' : 'మీ అప్పులు'}</h3>
                    {debts.map((debt, index) => (
                        <div key={debt.id} className="grid grid-cols-1 md:grid-cols-9 gap-2 items-end">
                            <div className="md:col-span-2">
                                <label htmlFor={`debt-name-${debt.id}`} className="text-xs font-medium">{language === 'en' ? 'Debt Name' : 'అప్పు పేరు'}</label>
                                <input id={`debt-name-${debt.id}`} value={debt.name} onChange={e => handleDebtChange(debt.id, 'name', e.target.value)} className="p-2 border rounded-lg bg-gray-50 dark:bg-slate-700 w-full"/>
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor={`debt-amount-${debt.id}`} className="flex items-center text-xs font-medium">
                                    {language === 'en' ? 'Amount' : 'మొత్తం'}
                                    <Tooltip text={language === 'en' ? 'The current outstanding principal amount of the debt.' : 'అప్పు యొక్క ప్రస్తుత బాకీ ఉన్న అసలు మొత్తం.'} />
                                </label>
                                <input id={`debt-amount-${debt.id}`} value={debt.amount} onChange={e => handleDebtChange(debt.id, 'amount', e.target.value)} type="number" className="p-2 border rounded-lg bg-gray-50 dark:bg-slate-700 w-full"/>
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor={`debt-rate-${debt.id}`} className="flex items-center text-xs font-medium">
                                    {language === 'en' ? 'Rate (%)' : 'రేటు (%)'}
                                    <Tooltip text={language === 'en' ? 'The annual interest rate for this debt.' : 'ఈ అప్పు కోసం వార్షిక వడ్డీ రేటు.'} />
                                </label>
                                <input id={`debt-rate-${debt.id}`} value={debt.rate} onChange={e => handleDebtChange(debt.id, 'rate', e.target.value)} type="number" className="p-2 border rounded-lg bg-gray-50 dark:bg-slate-700 w-full"/>
                            </div>
                            <div className="flex items-center md:col-span-3">
                                <div className="flex-grow">
                                  <label htmlFor={`debt-minpay-${debt.id}`} className="flex items-center text-xs font-medium">
                                    {language === 'en' ? 'Min. Payment' : 'కనీస చెల్లింపు'}
                                    <Tooltip text={language === 'en' ? 'The minimum monthly payment required for this debt.' : 'ఈ అప్పు కోసం అవసరమైన కనీస నెలవారీ చెల్లింపు.'} />
                                  </label>
                                  <input id={`debt-minpay-${debt.id}`} value={debt.minPayment} onChange={e => handleDebtChange(debt.id, 'minPayment', e.target.value)} type="number" className="p-2 border rounded-lg bg-gray-50 dark:bg-slate-700 w-full"/>
                                </div>
                                <button onClick={() => removeDebt(debt.id)} disabled={debts.length <= 1} className="ml-2 p-1 text-red-500 hover:text-red-700 disabled:opacity-50">&times;</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={addDebt} className="text-sm text-primary dark:text-blue-300">+ {language === 'en' ? 'Add Debt' : 'అప్పును జోడించు'}</button>

                    <div className="mt-4">
                        <label htmlFor="extraPayment" className="flex items-center text-sm font-medium mb-1">
                            {language === 'en' ? 'Extra Monthly Payment' : 'అదనపు నెలవారీ చెల్లింపు'}
                            <Tooltip text={language === 'en' ? 'The extra amount you can afford to pay towards your debts each month, over and above the minimum payments.' : 'కనీస చెల్లింపులకు అదనంగా, ప్రతి నెలా మీ అప్పుల కోసం మీరు చెల్లించగల అదనపు మొత్తం.'} />
                        </label>
                        <input id="extraPayment" value={extraPayment} onChange={e => setExtraPayment(e.target.value)} type="number" className="p-2 border rounded-lg bg-gray-50 dark:bg-slate-700 w-full max-w-xs"/>
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-semibold mb-4 text-center">{language === 'en' ? 'Your Payoff Plan' : 'మీ చెల్లింపు ప్రణాళిక'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ResultCard title={language === 'en' ? 'Avalanche Method' : 'అవలాంచ్ పద్ధతి'} result={avalancheResult} isWinner={avalancheResult.totalPayment <= snowballResult.totalPayment} />
                            <ResultCard title={language === 'en' ? 'Snowball Method' : 'స్నోబాల్ పద్ధతి'} result={snowballResult} isWinner={snowballResult.totalPayment < avalancheResult.totalPayment} />
                        </div>
                        <p className="text-xs text-center mt-4 text-gray-500">{language === 'en' ? 'Avalanche saves more money. Snowball gives psychological wins sooner.' : 'అవలాంచ్ ఎక్కువ డబ్బు ఆదా చేస్తుంది. స్నోబాల్ ముందుగా మానసిక విజయాలను ఇస్తుంది.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebtReductionGuide;
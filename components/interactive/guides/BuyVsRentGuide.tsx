import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const BuyVsRentGuide: React.FC = () => {
    const { language } = useLanguage();
    const [rent, setRent] = useState('25000');
    const [price, setPrice] = useState('7500000');
    const [downPayment, setDownPayment] = useState('1500000');
    const [rate, setRate] = useState('9');
    const [tenure, setTenure] = useState('20');
    const [appreciation, setAppreciation] = useState('5');

    const { rentCost, buyCost } = useMemo(() => {
        const N = 5 * 12; // 5 year comparison
        const rentTotal = Number(rent) * N;

        const P = Number(price) - Number(downPayment);
        const R = (Number(rate) / 100) / 12;
        const T = Number(tenure) * 12;
        
        if(P <= 0 || R <= 0 || T <= 0) return { rentCost: rentTotal, buyCost: Number(downPayment) };

        const emi = (P * R * Math.pow(1 + R, T)) / (Math.pow(1 + R, T) - 1);
        const buyTotal = Number(downPayment) + (emi * N);
        
        const futureValue = Number(price) * Math.pow(1 + (Number(appreciation)/100), 5);
        const netBuyCost = buyTotal - (futureValue - P); // Simplified net cost

        return { rentCost: rentTotal, buyCost: buyTotal, netBuyCost };
    }, [rent, price, downPayment, rate, tenure, appreciation]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    
    const introContent = {
        what: { en: "This guide provides a financial comparison between buying a house with a home loan versus renting a similar property over a 5-year period.", te: "ఈ గైడ్ గృహ రుణంతో ఇల్లు కొనడం మరియు 5 సంవత్సరాల కాలానికి అదే విధమైన ఆస్తిని అద్దెకు తీసుకోవడం మధ్య ఆర్థిక పోలికను అందిస్తుంది." },
        why: { en: "Buying a home is one of the biggest financial decisions in life. While it builds an asset, it also comes with high costs like down payment, EMIs, and maintenance. Renting offers flexibility but no asset creation. This comparison helps quantify the financial impact.", te: "ఇల్లు కొనడం జీవితంలో అతిపెద్ద ఆర్థిక నిర్ణయాలలో ఒకటి. ఇది ఒక ఆస్తిని నిర్మిస్తుంది, కానీ ఇది డౌన్ పేమెంట్, EMIలు మరియు నిర్వహణ వంటి అధిక ఖర్చులతో కూడా వస్తుంది. అద్దెకు ఉండటం సౌలభ్యాన్ని అందిస్తుంది కానీ ఆస్తి సృష్టి లేదు. ఈ పోలిక ఆర్థిక ప్రభావాన్ని లెక్కించడంలో సహాయపడుతుంది." },
        who: { en: "Anyone who is deciding whether to continue renting or to take the plunge and buy a home. It's especially useful for first-time homebuyers.", te: "అద్దెకు కొనసాగాలా లేదా సాహసించి ఇల్లు కొనాలా అని నిర్ణయించుకుంటున్న ఎవరైనా. ఇది ముఖ్యంగా మొదటిసారి ఇల్లు కొనుగోలు చేసేవారికి ఉపయోగపడుతుంది." },
        how: { en: "By inputting details about the property price, rent, and loan terms, this tool calculates the total cash outflow for both scenarios over a 5-year period. This allows you to see a clear, side-by-side financial picture to help you make a more informed choice.", te: "ఆస్తి ధర, అద్దె మరియు రుణ నిబంధనల గురించి వివరాలను నమోదు చేయడం ద్వారా, ఈ సాధనం 5 సంవత్సరాల కాలానికి రెండు దృశ్యాలకు మొత్తం నగదు బయటకు వెళ్లేదాన్ని గణిస్తుంది. ఇది మీకు మరింత సమాచారంతో కూడిన ఎంపిక చేసుకోవడంలో సహాయపడటానికి స్పష్టమైన, పక్కపక్క ఆర్థిక చిత్రాన్ని చూడటానికి అనుమతిస్తుంది." }
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
                        <div><label htmlFor="monthlyRent" className="block text-sm font-medium mb-1">{language === 'en' ? 'Monthly Rent' : 'నెలవారీ అద్దె'}</label><input id="monthlyRent" value={rent} onChange={e => setRent(e.target.value)} type="number" className="p-2 border rounded w-full"/></div>
                        <div><label htmlFor="propertyPrice" className="block text-sm font-medium mb-1">{language === 'en' ? 'Property Price' : 'ఆస్తి ధర'}</label><input id="propertyPrice" value={price} onChange={e => setPrice(e.target.value)} type="number" className="p-2 border rounded w-full"/></div>
                        <div><label htmlFor="downPayment" className="block text-sm font-medium mb-1">{language === 'en' ? 'Down Payment' : 'డౌన్ పేమెంట్'}</label><input id="downPayment" value={downPayment} onChange={e => setDownPayment(e.target.value)} type="number" className="p-2 border rounded w-full"/></div>
                        <div><label htmlFor="loanRate" className="block text-sm font-medium mb-1">{language === 'en' ? 'Loan Rate (%)' : 'లోన్ రేటు (%)'}</label><input id="loanRate" value={rate} onChange={e => setRate(e.target.value)} type="number" className="p-2 border rounded w-full"/></div>
                        <div><label htmlFor="loanTenure" className="block text-sm font-medium mb-1">{language === 'en' ? 'Loan Tenure (Yrs)' : 'లోన్ కాలపరిమితి (సం)'}</label><input id="loanTenure" value={tenure} onChange={e => setTenure(e.target.value)} type="number" className="p-2 border rounded w-full"/></div>
                        <div><label htmlFor="appreciation" className="block text-sm font-medium mb-1">{language === 'en' ? 'Appreciation (% p.a.)' : 'అప్రిషియేషన్ (% p.a.)'}</label><input id="appreciation" value={appreciation} onChange={e => setAppreciation(e.target.value)} type="number" className="p-2 border rounded w-full"/></div>
                    </div>
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-semibold mb-4 text-center">{language === 'en' ? '5-Year Cost Comparison' : '5-సంవత్సరాల ఖర్చు పోలిక'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg text-center">
                                <h4 className="font-bold">{language === 'en' ? 'Renting' : 'అద్దెకు ఉండటం'}</h4>
                                <p>{language === 'en' ? 'Total Cash Outflow' : 'మొత్తం నగదు బయటకు వెళ్ళింది'}</p>
                                <p className="text-2xl font-bold">{formatCurrency(rentCost)}</p>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
                                <h4 className="font-bold">{language === 'en' ? 'Buying' : 'కొనడం'}</h4>
                                <p>{language === 'en' ? 'Total Cash Outflow' : 'మొత్తం నగదు బయటకు వెళ్ళింది'}</p>
                                <p className="text-2xl font-bold">{formatCurrency(buyCost)}</p>
                            </div>
                        </div>
                        <p className="text-xs text-center mt-4 text-gray-500">{language === 'en' ? 'Note: This is a simplified comparison and does not include maintenance, taxes, or the opportunity cost of the down payment.' : 'గమనిక: ఇది ఒక సరళీకృత పోలిక మరియు నిర్వహణ, పన్నులు లేదా డౌన్ పేమెంట్ యొక్క అవకాశ వ్యయాన్ని చేర్చదు.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyVsRentGuide;
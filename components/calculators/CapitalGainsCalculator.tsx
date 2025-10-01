import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import Tooltip from '../Tooltip';
import useBreakpoint from '../../hooks/useBreakpoint';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const CapitalGainsCalculator: React.FC = () => {
    const { language, theme } = useLanguage();
    const [purchasePrice, setPurchasePrice] = useState(100000);
    const [salePrice, setSalePrice] = useState(150000);
    const [period, setPeriod] = useState(13); // in months
    const [assetType, setAssetType] = useState('equity'); // 'equity' or 'other' for now
    const isMd = useBreakpoint('md');

    const { gain, gainType, tax } = useMemo(() => {
        const capitalGain = salePrice - purchasePrice;
        if (capitalGain <= 0) {
            return { gain: capitalGain, gainType: language === 'en' ? 'Loss' : 'నష్టం', tax: 0 };
        }

        let isLTCG = false;
        if (assetType === 'equity') {
            isLTCG = period > 12;
        } else { // Assuming 'other' is like property, debt funds
            isLTCG = period > 36;
        }

        const type = isLTCG 
            ? (language === 'en' ? 'Long-Term Capital Gain (LTCG)' : 'దీర్ఘకాలిక మూలధన లాభం (LTCG)')
            : (language === 'en' ? 'Short-Term Capital Gain (STCG)' : 'స్వల్పకాలిక మూలధన లాభం (STCG)');
        
        let calculatedTax = 0;
        if(isLTCG && assetType === 'equity'){
            const taxableGain = Math.max(0, capitalGain - 100000);
            calculatedTax = taxableGain * 0.10;
        } else if (!isLTCG && assetType === 'equity') {
            calculatedTax = capitalGain * 0.15;
        } else {
             // Simplified for others - assuming a flat rate for example purposes.
             // Real calculation needs indexation for LTCG which is too complex here.
            calculatedTax = isLTCG ? capitalGain * 0.20 : capitalGain * 0.30; // Placeholder rates
        }

        return { gain: capitalGain, gainType: type, tax: calculatedTax };
    }, [purchasePrice, salePrice, period, assetType, language]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const pieChartData = {
        labels: [
            language === 'en' ? 'Net Gain (Post-Tax)' : 'నికర లాభం (పన్ను తర్వాత)',
            language === 'en' ? 'Estimated Tax' : 'అంచనా పన్ను',
        ],
        datasets: [{
            data: [gain - tax, tax],
            backgroundColor: ['#22c55e', '#f97316'],
            hoverBackgroundColor: ['#16a34a', '#ea580c'],
            borderWidth: 1,
            borderColor: theme === 'dark' ? '#1e293b' : '#fff',
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: isMd ? 'right' : 'top',
                labels: { color: theme === 'dark' ? '#e2e8f0' : '#374151' }
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="purchasePrice" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Total Purchase Price' : 'మొత్తం కొనుగోలు ధర'}</label>
                         <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                            <input id="purchasePrice" type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="salePrice" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Total Sale Price' : 'మొత్తం అమ్మకం ధర'}</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                            <input id="salePrice" type="number" value={salePrice} onChange={e => setSalePrice(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="period" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                           {language === 'en' ? 'Holding Period (Months)' : 'హోల్డింగ్ వ్యవధి (నెలలు)'}
                           <Tooltip text={language === 'en' ? 'The duration between buying and selling the asset. This determines if the gain is short-term or long-term.' : 'ఆస్తిని కొనడం మరియు అమ్మడం మధ్య వ్యవధి. ఇది లాభం స్వల్పకాలికమా లేదా దీర్ఘకాలికమా అని నిర్ధారిస్తుంది.'} />
                        </label>
                        <input id="period" type="number" value={period} onChange={e => setPeriod(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                    </div>
                    <div>
                        <label htmlFor="assetType" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                           {language === 'en' ? 'Asset Type' : 'ఆస్తి రకం'}
                           <Tooltip text={language === 'en' ? 'Different assets have different tax rules and holding periods for LTCG.' : 'వివిధ ఆస్తులకు LTCG కోసం వేర్వేరు పన్ను నియమాలు మరియు హోల్డింగ్ వ్యవధులు ఉంటాయి.'} />
                        </label>
                        <select id="assetType" value={assetType} onChange={e => setAssetType(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition">
                            <option value="equity">{language === 'en' ? 'Equity' : 'ఈక్విటీ'}</option>
                            <option value="other">{language === 'en' ? 'Other' : 'ఇతర'}</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results and Chart Section */}
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite">
                    <div className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Capital Gain / Loss' : 'మూలధన లాభం / నష్టం'}</p>
                                <p className={`text-2xl font-bold ${gain >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>{formatCurrency(gain)}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Gain Type' : 'లాభం రకం'}</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{gainType}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Estimated Tax' : 'అంచనా పన్ను'}</p>
                                <p className="text-2xl font-bold text-primary dark:text-blue-400">{formatCurrency(tax)}</p>
                            </div>
                        </div>
                        {assetType === 'other' && <p className="text-xs text-gray-500 mt-4">{language === 'en' ? 'Note: Tax for "Other" assets is a simplified estimate. Real calculations for property/debt may involve indexation benefits not shown here.' : 'గమనిక: "ఇతర" ఆస్తుల కోసం పన్ను ఒక సరళీకృత అంచనా. ఆస్తి/రుణం కోసం నిజమైన గణనలు ఇక్కడ చూపని ఇండెక్సేషన్ ప్రయోజనాలను కలిగి ఉండవచ్చు.'}</p>}
                    </div>
                </div>

                {gain > 0 && tax > 0 && (
                     <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">
                            {language === 'en' ? 'Gain Breakdown' : 'లాభం విచ్ఛిన్నం'}
                        </h3>
                        <div className="h-64 mx-auto" style={{maxWidth: '400px'}} role="img" aria-label={language === 'en' ? 'Pie chart showing the breakdown of post-tax gain versus estimated tax.' : 'పన్ను తర్వాత లాభం మరియు అంచనా పన్ను యొక్క విచ్ఛిన్నం చూపే పై చార్ట్.'}>
                            <Pie data={pieChartData} options={chartOptions} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CapitalGainsCalculator;
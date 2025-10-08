import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

const BreakEvenPointCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [fixedCosts, setFixedCosts] = useState(initialState?.fixedCosts || 100000);
    const [variableCost, setVariableCost] = useState(initialState?.variableCost || 150);
    const [salePrice, setSalePrice] = useState(initialState?.salePrice || 250);

    useEffect(() => {
        onStateChange({ fixedCosts, variableCost, salePrice });
    }, [fixedCosts, variableCost, salePrice, onStateChange]);

    const { breakEvenUnits, breakEvenRevenue } = useMemo(() => {
        const contributionMargin = salePrice - variableCost;
        const units = contributionMargin > 0 ? fixedCosts / contributionMargin : Infinity;
        const revenue = units !== Infinity ? units * salePrice : Infinity;
        return { breakEvenUnits: units, breakEvenRevenue: revenue };
    }, [fixedCosts, variableCost, salePrice]);
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="fixedCosts" className="flex items-center text-sm font-medium mb-2">
                        {language === 'en' ? 'Total Fixed Costs' : 'మొత్తం స్థిర ఖర్చులు'}
                        <Tooltip text={language === 'en' ? 'Costs that do not change with the amount of goods produced (e.g., rent, salaries).' : 'ఉత్పత్తి చేసిన వస్తువుల మొత్తంతో మారని ఖర్చులు (ఉదా., అద్దె, జీతాలు).'} />
                    </label>
                    <input id="fixedCosts" type="number" value={fixedCosts} onChange={e => setFixedCosts(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="variableCost" className="flex items-center text-sm font-medium mb-2">
                        {language === 'en' ? 'Variable Cost per Unit' : 'ఒక యూనిట్‌కు చర వ్యయం'}
                        <Tooltip text={language === 'en' ? 'The cost to produce one unit of your product (e.g., raw materials).' : 'మీ ఉత్పత్తి యొక్క ఒక యూనిట్‌ను ఉత్పత్తి చేయడానికి అయ్యే ఖర్చు (ఉదా., ముడి పదార్థాలు).'} />
                    </label>
                    <input id="variableCost" type="number" value={variableCost} onChange={e => setVariableCost(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="salePrice" className="flex items-center text-sm font-medium mb-2">
                        {language === 'en' ? 'Sale Price per Unit' : 'ఒక యూనిట్‌కు అమ్మకం ధర'}
                        <Tooltip text={language === 'en' ? 'The price at which you sell one unit of your product.' : 'మీరు మీ ఉత్పత్తి యొక్క ఒక యూనిట్‌ను అమ్మే ధర.'} />
                    </label>
                    <input id="salePrice" type="number" value={salePrice} onChange={e => setSalePrice(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
            </div>

            <div className="lg:col-span-3">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24 text-center">
                    <h3 className="text-xl font-semibold text-primary dark:text-blue-300">{language === 'en' ? 'Break-Even Point' : 'బ్రేక్-ఈవెన్ పాయింట్'}</h3>
                    {isFinite(breakEvenUnits) ? (
                        <>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Units to Sell' : 'అమ్మాల్సిన యూనిట్లు'}</p>
                                <p className="text-4xl font-bold text-primary dark:text-blue-400">{Math.ceil(breakEvenUnits).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Sales Revenue' : 'అమ్మకాల ఆదాయం'}</p>
                                <p className="text-3xl font-semibold">{formatCurrency(breakEvenRevenue)}</p>
                            </div>
                        </>
                    ) : (
                        <p className="text-red-500">{language === 'en' ? 'Sale price must be greater than variable cost.' : 'అమ్మకం ధర చర వ్యయం కంటే ఎక్కువగా ఉండాలి.'}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BreakEvenPointCalculator;
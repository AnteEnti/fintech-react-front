import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

const ProfitMarginCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [revenue, setRevenue] = useState(initialState?.revenue || 500000);
    const [cogs, setCogs] = useState(initialState?.cogs || 300000); // Cost of Goods Sold

    useEffect(() => {
        onStateChange({ revenue, cogs });
    }, [revenue, cogs, onStateChange]);

    const { grossProfit, profitMargin } = useMemo(() => {
        const profit = revenue - cogs;
        const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
        return { grossProfit: profit, profitMargin: margin };
    }, [revenue, cogs]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="revenue" className="block text-sm font-medium mb-2">{language === 'en' ? 'Total Revenue' : 'మొత్తం ఆదాయం'}</label>
                    <input id="revenue" type="number" value={revenue} onChange={e => setRevenue(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="cogs" className="block text-sm font-medium mb-2">{language === 'en' ? 'Cost of Goods Sold (COGS)' : 'అమ్మిన వస్తువుల వ్యయం (COGS)'}</label>
                    <input id="cogs" type="number" value={cogs} onChange={e => setCogs(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
            </div>

            <div className="lg:col-span-3">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Gross Profit Margin' : 'స్థూల లాభ మార్జిన్'}</p>
                        <p className="text-5xl font-bold text-primary dark:text-blue-400">{profitMargin.toFixed(2)}%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Gross Profit' : 'స్థూల లాభం'}</p>
                        <p className="text-3xl font-semibold text-green-600 dark:text-green-500">{formatCurrency(grossProfit)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfitMarginCalculator;
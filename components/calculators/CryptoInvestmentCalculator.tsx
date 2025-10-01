import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { createValidator } from '../../utils/validation';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const CryptoInvestmentCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [buyPrice, setBuyPrice] = useState(initialState?.buyPrice || 2000000);
    const [sellPrice, setSellPrice] = useState(initialState?.sellPrice || 2500000);
    const [quantity, setQuantity] = useState(initialState?.quantity || 0.1);
    const [errors, setErrors] = useState({ buyPrice: '', sellPrice: '', quantity: '' });
    
    const validator = createValidator(language);

    useEffect(() => {
        onStateChange({ buyPrice, sellPrice, quantity });
    }, [buyPrice, sellPrice, quantity, onStateChange]);
    
    const handleValidation = (field: string, value: number) => {
        const error = validator.isPositive(value);
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const { totalCost, totalValue, profitLoss, returnPercentage } = useMemo(() => {
        const cost = buyPrice * quantity;
        const value = sellPrice * quantity;
        const pl = value - cost;
        const percentage = cost > 0 ? (pl / cost) * 100 : 0;
        
        return {
            totalCost: cost,
            totalValue: value,
            profitLoss: pl,
            returnPercentage: percentage,
        };
    }, [buyPrice, sellPrice, quantity]);
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                 <div>
                    <label htmlFor="buyPrice" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Buy Price (per coin)' : 'కొనుగోలు ధర (ఒక కాయిన్‌కు)'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="buyPrice" type="number" value={buyPrice} onChange={e => { setBuyPrice(Number(e.target.value)); handleValidation('buyPrice', Number(e.target.value)) }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.buyPrice ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="sellPrice" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Sell Price (per coin)' : 'అమ్మకం ధర (ఒక కాయిన్‌కు)'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="sellPrice" type="number" value={sellPrice} onChange={e => { setSellPrice(Number(e.target.value)); handleValidation('sellPrice', Number(e.target.value)) }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.sellPrice ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Quantity' : 'పరిమాణం'}</label>
                    <input id="quantity" type="number" value={quantity} onChange={e => { setQuantity(Number(e.target.value)); handleValidation('quantity', Number(e.target.value)) }} step="0.0001" className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.quantity ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Profit / Loss' : 'లాభం / నష్టం'}</p>
                        <p className={`text-5xl font-bold ${profitLoss >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                            {formatCurrency(profitLoss)}
                        </p>
                        <p className={`text-xl font-semibold ${profitLoss >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                            ({returnPercentage.toFixed(2)}%)
                        </p>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Cost' : 'మొత్తం ఖర్చు'}</p>
                            <p className="text-2xl font-semibold">{formatCurrency(totalCost)}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Sale Value' : 'మొత్తం అమ్మకం విలువ'}</p>
                            <p className="text-2xl font-semibold">{formatCurrency(totalValue)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoInvestmentCalculator;

import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';

interface Transaction {
    id: number;
    shares: string;
    price: string;
}

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const StockAveragePriceCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [transactions, setTransactions] = useState<Transaction[]>(
        initialState?.transactions || [
            { id: 1, shares: '10', price: '100' },
            { id: 2, shares: '5', price: '120' },
        ]
    );

    useEffect(() => {
        onStateChange({ transactions });
    }, [transactions, onStateChange]);

    const handleTransactionChange = (id: number, field: 'shares' | 'price', value: string) => {
        const newTransactions = transactions.map(t =>
            t.id === id ? { ...t, [field]: value } : t
        );
        setTransactions(newTransactions);
    };

    const addTransaction = () => {
        setTransactions([...transactions, { id: Date.now(), shares: '', price: '' }]);
    };

    const removeTransaction = (id: number) => {
        if (transactions.length > 1) {
            setTransactions(transactions.filter(t => t.id !== id));
        }
    };

    const { totalShares, totalCost, averagePrice } = useMemo(() => {
        let sharesSum = 0;
        let costSum = 0;

        transactions.forEach(t => {
            const shares = parseFloat(t.shares);
            const price = parseFloat(t.price);
            if (!isNaN(shares) && !isNaN(price) && shares > 0 && price > 0) {
                sharesSum += shares;
                costSum += shares * price;
            }
        });

        const avg = sharesSum > 0 ? costSum / sharesSum : 0;

        return {
            totalShares: sharesSum,
            totalCost: costSum,
            averagePrice: avg
        };
    }, [transactions]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Purchase Transactions' : 'కొనుగోలు లావాదేవీలు'}</h3>
                <div className="space-y-4">
                    {transactions.map((t, index) => (
                        <div key={t.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-5">
                                <label htmlFor={`shares-${t.id}`} className="sr-only">{language === 'en' ? 'Shares' : 'షేర్లు'}</label>
                                <input
                                    id={`shares-${t.id}`}
                                    type="number"
                                    value={t.shares}
                                    onChange={e => handleTransactionChange(t.id, 'shares', e.target.value)}
                                    placeholder={language === 'en' ? 'No. of Shares' : 'షేర్ల సంఖ్య'}
                                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"
                                />
                            </div>
                             <div className="col-span-5">
                                <label htmlFor={`price-${t.id}`} className="sr-only">{language === 'en' ? 'Price' : 'ధర'}</label>
                                <input
                                    id={`price-${t.id}`}
                                    type="number"
                                    value={t.price}
                                    onChange={e => handleTransactionChange(t.id, 'price', e.target.value)}
                                    placeholder={language === 'en' ? 'Price per Share' : 'ఒక షేరు ధర'}
                                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"
                                />
                            </div>
                            <div className="col-span-2 text-right">
                                <button
                                    onClick={() => removeTransaction(t.id)}
                                    className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                                    disabled={transactions.length <= 1}
                                    aria-label={language === 'en' ? 'Remove transaction' : 'లావాదేవీని తీసివేయండి'}
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={addTransaction}
                    className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-md hover:bg-blue-700 transition-colors"
                >
                    {language === 'en' ? 'Add Another Purchase' : 'మరో కొనుగోలును జోడించండి'}
                </button>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg space-y-6 sticky top-24">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Average Buy Price' : 'సగటు కొనుగోలు ధర'}</p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400">{formatCurrency(averagePrice)}</p>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Shares' : 'మొత్తం షేర్లు'}</span>
                            <span className="font-semibold">{totalShares.toLocaleString()}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Cost' : 'మొత్తం ఖర్చు'}</span>
                            <span className="font-semibold">{formatCurrency(totalCost)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockAveragePriceCalculator;
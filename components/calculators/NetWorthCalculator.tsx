import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

interface Item {
    id: number;
    name: string;
    value: string;
}

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

const NetWorthCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [assets, setAssets] = useState<Item[]>(initialState?.assets || [
        { id: 1, name: language === 'en' ? 'Savings Account' : 'పొదుపు ఖాతా', value: '200000' },
        { id: 2, name: language === 'en' ? 'Mutual Funds' : 'మ్యూచువల్ ఫండ్స్', value: '500000' },
    ]);
    const [liabilities, setLiabilities] = useState<Item[]>(initialState?.liabilities || [
        { id: 1, name: language === 'en' ? 'Credit Card Debt' : 'క్రెడిట్ కార్డ్ అప్పు', value: '50000' },
        { id: 2, name: language === 'en' ? 'Personal Loan' : 'వ్యక్తిగత రుణం', value: '100000' },
    ]);

    useEffect(() => {
        onStateChange({ assets, liabilities });
    }, [assets, liabilities, onStateChange]);

    const handleItemChange = (type: 'assets' | 'liabilities', id: number, field: 'name' | 'value', fieldValue: string) => {
        const updater = type === 'assets' ? setAssets : setLiabilities;
        updater(prev => prev.map(item => item.id === id ? { ...item, [field]: fieldValue } : item));
    };

    const addItem = (type: 'assets' | 'liabilities') => {
        const updater = type === 'assets' ? setAssets : setLiabilities;
        updater(prev => [...prev, { id: Date.now(), name: '', value: '' }]);
    };

    const removeItem = (type: 'assets' | 'liabilities', id: number) => {
        const updater = type === 'assets' ? setAssets : setLiabilities;
        updater(prev => prev.length > 1 ? prev.filter(item => item.id !== id) : prev);
    };

    const { totalAssets, totalLiabilities, netWorth } = useMemo(() => {
        const sumValues = (items: Item[]) => items.reduce((acc: number, item: Item) => acc + (Number(item.value) || 0), 0);
        const assetsSum = sumValues(assets);
        const liabilitiesSum = sumValues(liabilities);
        const net = assetsSum - liabilitiesSum;
        return { totalAssets: assetsSum, totalLiabilities: liabilitiesSum, netWorth: net };
    }, [assets, liabilities]);
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0,
        }).format(value);
    };

    const chartData = {
        labels: [language === 'en' ? 'Financials' : 'ఆర్థికాలు'],
        datasets: [
            {
                label: language === 'en' ? 'Assets' : 'ఆస్తులు',
                data: [totalAssets],
                backgroundColor: 'rgba(34, 197, 94, 0.6)',
                borderColor: '#22c55e',
                borderWidth: 1,
            },
            {
                label: language === 'en' ? 'Liabilities' : 'అప్పులు',
                data: [totalLiabilities],
                backgroundColor: 'rgba(239, 68, 68, 0.6)',
                borderColor: '#ef4444',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: { color: theme === 'dark' ? '#cbd5e1' : '#4b5563' },
                grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            },
            y: {
                ticks: { display: false },
                grid: { display: false }
            }
        },
        plugins: {
            legend: {
                labels: { color: theme === 'dark' ? '#e2e8f0' : '#374151' }
            }
        }
    };
    
    const ItemList: React.FC<{ type: 'assets' | 'liabilities' }> = ({ type }) => {
        const items = type === 'assets' ? assets : liabilities;
        const colorClass = type === 'assets' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500';
        const title = type === 'assets' ? { en: 'Assets', te: 'ఆస్తులు' } : { en: 'Liabilities', te: 'అప్పులు' };

        return (
            <div>
                <h3 className={`text-xl font-semibold mb-4 ${colorClass}`}>{title[language]}</h3>
                <div className="space-y-3">
                    {items.map(item => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-6">
                                <input type="text" value={item.name} onChange={e => handleItemChange(type, item.id, 'name', e.target.value)} placeholder={language === 'en' ? 'Item Name' : 'వస్తువు పేరు'} className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700"/>
                            </div>
                            <div className="col-span-5">
                                <input type="number" value={item.value} onChange={e => handleItemChange(type, item.id, 'value', e.target.value)} placeholder={language === 'en' ? 'Amount' : 'మొత్తం'} className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700"/>
                            </div>
                            <div className="col-span-1 text-right">
                                <button onClick={() => removeItem(type, item.id)} disabled={items.length <= 1} className="p-1 text-red-500 hover:text-red-700 disabled:opacity-50">&times;</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => addItem(type)} className="mt-4 px-3 py-1 text-sm text-primary dark:text-blue-300 border border-primary dark:border-blue-300 rounded-md hover:bg-blue-50 dark:hover:bg-slate-700">
                    + {language === 'en' ? 'Add' : 'జోడించు'}
                </button>
            </div>
        );
    };

    return (
        <div className="space-y-12">
            {/* Results Section */}
            <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg text-center">
                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Your Net Worth' : 'మీ నికర విలువ'}</p>
                <p className={`text-5xl font-extrabold my-2 ${netWorth >= 0 ? 'text-primary dark:text-blue-400' : 'text-red-500'}`}>
                    {formatCurrency(netWorth)}
                </p>
                <div className="flex justify-center gap-8 text-lg">
                    <span><span className="font-semibold text-green-600">{language === 'en' ? 'Assets:' : 'ఆస్తులు:'}</span> {formatCurrency(totalAssets)}</span>
                    <span><span className="font-semibold text-red-600">{language === 'en' ? 'Liabilities:' : 'అప్పులు:'}</span> {formatCurrency(totalLiabilities)}</span>
                </div>
            </div>
            
             <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Assets vs. Liabilities' : 'ఆస్తులు vs. అప్పులు'}</h3>
                <div className="h-24" role="img">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            {/* Input Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <ItemList type="assets" />
                <ItemList type="liabilities" />
            </div>
        </div>
    );
};

export default NetWorthCalculator;
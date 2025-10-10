import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend);

interface BudgetItem {
    id: number;
    name: string;
    estimated: string;
    actual: string;
}

interface BudgetCategory {
    id: number;
    name: { en: string; te: string };
    items: BudgetItem[];
}

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

const initialCategories: Omit<BudgetCategory, 'id'>[] = [
    { name: { en: 'Venue & Catering', te: 'వేదిక & క్యాటరింగ్' }, items: [{ id: 1, name: 'Venue Rental', estimated: '200000', actual: '' }] },
    { name: { en: 'Attire & Rings', te: 'దుస్తులు & ఉంగరాలు' }, items: [{ id: 1, name: 'Wedding Dress / Saree', estimated: '50000', actual: '' }] },
    { name: { en: 'Decorations & Flowers', te: 'అలంకరణలు & పువ్వులు' }, items: [{ id: 1, name: 'Mandap Decoration', estimated: '75000', actual: '' }] },
    { name: { en: 'Photography & Video', te: 'ఫోటోగ్రఫి & వీడియో' }, items: [{ id: 1, name: 'Photographer', estimated: '60000', actual: '' }] },
];

const WeddingBudgetCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [categories, setCategories] = useState<BudgetCategory[]>(
        initialState?.categories || initialCategories.map((cat, index) => ({ ...cat, id: index + 1 }))
    );

    useEffect(() => {
        onStateChange({ categories });
    }, [categories, onStateChange]);

    const handleItemChange = (catId: number, itemId: number, field: 'name' | 'estimated' | 'actual', value: string) => {
        setCategories(prev => prev.map(cat => 
            cat.id === catId 
            ? { ...cat, items: cat.items.map(item => item.id === itemId ? { ...item, [field]: value } : item) }
            : cat
        ));
    };

    const addItem = (catId: number) => {
        setCategories(prev => prev.map(cat => 
            cat.id === catId 
            ? { ...cat, items: [...cat.items, { id: Date.now(), name: '', estimated: '', actual: '' }] }
            : cat
        ));
    };

    const removeItem = (catId: number, itemId: number) => {
        setCategories(prev => prev.map(cat => 
            cat.id === catId && cat.items.length > 1
            ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
            : cat
        ));
    };

    const { totalEstimated, totalActual, difference } = useMemo(() => {
        let est = 0, act = 0;
        categories.forEach(cat => {
            cat.items.forEach(item => {
                est += Number(item.estimated) || 0;
                act += Number(item.actual) || 0;
            });
        });
        return { totalEstimated: est, totalActual: act, difference: est - act };
    }, [categories]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

    const chartData = {
        labels: categories.map(c => c.name[language]),
        datasets: [{
            data: categories.map(c => c.items.reduce((sum: number, item: BudgetItem) => sum + (Number(item.estimated) || 0), 0)),
            backgroundColor: ['#3b82f6', '#ef4444', '#f97316', '#22c55e', '#a855f7', '#ec4899'],
            borderColor: theme === 'dark' ? '#1e293b' : '#fff',
            borderWidth: 2,
        }],
    };
    const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

    return (
        <div className="space-y-8">
            <div role="status" aria-live="polite" className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-light dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Estimated Budget' : 'అంచనా బడ్జెట్'}</p>
                    <p className="text-2xl font-bold text-primary dark:text-blue-400">{formatCurrency(totalEstimated)}</p>
                </div>
                <div className="bg-light dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Actual Spent' : 'వాస్తవ ఖర్చు'}</p>
                    <p className="text-2xl font-bold text-secondary dark:text-blue-500">{formatCurrency(totalActual)}</p>
                </div>
                <div className="bg-light dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Over/Under' : 'ఎక్కువ/తక్కువ'}</p>
                    <p className={`text-2xl font-bold ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(difference)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {categories.map(cat => (
                        <div key={cat.id} className="bg-white dark:bg-dark p-4 rounded-lg shadow-inner border dark:border-gray-700">
                            <h4 className="text-lg font-semibold text-primary dark:text-blue-300 mb-3">{cat.name[language]}</h4>
                            <div className="space-y-2">
                                {cat.items.map(item => (
                                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                                        <div className="col-span-5"><input type="text" value={item.name} onChange={e => handleItemChange(cat.id, item.id, 'name', e.target.value)} placeholder={language === 'en' ? 'Item' : 'అంశం'} className="w-full p-2 border rounded bg-gray-50 dark:bg-slate-700"/></div>
                                        <div className="col-span-3"><input type="number" value={item.estimated} onChange={e => handleItemChange(cat.id, item.id, 'estimated', e.target.value)} placeholder={language === 'en' ? 'Est. Cost' : 'అంచనా'} className="w-full p-2 border rounded bg-gray-50 dark:bg-slate-700"/></div>
                                        <div className="col-span-3"><input type="number" value={item.actual} onChange={e => handleItemChange(cat.id, item.id, 'actual', e.target.value)} placeholder={language === 'en' ? 'Actual' : 'వాస్తవం'} className="w-full p-2 border rounded bg-gray-50 dark:bg-slate-700"/></div>
                                        <div className="col-span-1 text-right"><button onClick={() => removeItem(cat.id, item.id)} disabled={cat.items.length <= 1} className="p-1 text-red-500 hover:text-red-700 disabled:opacity-50">&times;</button></div>
                                    </div>
                                ))}
                            </div>
                             <button onClick={() => addItem(cat.id)} className="mt-3 px-3 py-1 text-sm text-primary dark:text-blue-300 border border-primary dark:border-blue-300 rounded-md hover:bg-blue-50 dark:hover:bg-slate-700">+ {language === 'en' ? 'Add Item' : 'అంశాన్ని జోడించు'}</button>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-dark p-4 rounded-lg shadow-inner border dark:border-gray-700 sticky top-24">
                        <h4 className="text-lg font-semibold text-center mb-4">{language === 'en' ? 'Budget Breakdown' : 'బడ్జెట్ విచ్ఛిన్నం'}</h4>
                        <div className="h-64" role="img">
                            <Doughnut data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeddingBudgetCalculator;
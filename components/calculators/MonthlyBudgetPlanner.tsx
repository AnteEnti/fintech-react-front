import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend);

interface Item {
    id: number;
    name: string;
    value: string;
}

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

const MonthlyBudgetPlanner: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [incomes, setIncomes] = useState<Item[]>(initialState?.incomes || [
        { id: 1, name: language === 'en' ? 'Salary' : 'జీతం', value: '80000' }
    ]);
    const [expenses, setExpenses] = useState<Item[]>(initialState?.expenses || [
        { id: 1, name: language === 'en' ? 'Rent' : 'అద్దె', value: '20000' },
        { id: 2, name: language === 'en' ? 'Groceries' : 'కిరాణా', value: '10000' },
        { id: 3, name: language === 'en' ? 'Utilities' : 'యుటిలిటీలు', value: '5000' },
        { id: 4, name: language === 'en' ? 'Dining Out' : 'బయట తినడం', value: '5000' },
    ]);

    useEffect(() => {
        onStateChange({ incomes, expenses });
    }, [incomes, expenses, onStateChange]);

    const handleItemChange = (type: 'incomes' | 'expenses', id: number, field: 'name' | 'value', fieldValue: string) => {
        const updater = type === 'incomes' ? setIncomes : setExpenses;
        updater(prev => prev.map(item => item.id === id ? { ...item, [field]: fieldValue } : item));
    };

    const addItem = (type: 'incomes' | 'expenses') => {
        const updater = type === 'incomes' ? setIncomes : setExpenses;
        updater(prev => [...prev, { id: Date.now(), name: '', value: '' }]);
    };

    const removeItem = (type: 'incomes' | 'expenses', id: number) => {
        const updater = type === 'incomes' ? setIncomes : setExpenses;
        updater(prev => prev.length > 1 ? prev.filter(item => item.id !== id) : prev);
    };

    const { totalIncome, totalExpenses, netSavings } = useMemo(() => {
        const sumValues = (items: Item[]) => items.reduce((acc: number, item: Item) => acc + (Number(item.value) || 0), 0);
        const incomeSum = sumValues(incomes);
        const expensesSum = sumValues(expenses);
        const net = incomeSum - expensesSum;
        return { totalIncome: incomeSum, totalExpenses: expensesSum, netSavings: net };
    }, [incomes, expenses]);
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0,
        }).format(value);
    };

    const chartData = {
        labels: expenses.map(e => e.name || 'Unnamed'),
        datasets: [
            {
                data: expenses.map(e => Number(e.value) || 0),
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)', 'rgba(239, 68, 68, 0.7)', 'rgba(249, 115, 22, 0.7)',
                    'rgba(34, 197, 94, 0.7)', 'rgba(168, 85, 247, 0.7)', 'rgba(236, 72, 153, 0.7)',
                ],
                borderColor: theme === 'dark' ? '#1e293b' : '#fff',
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: { color: theme === 'dark' ? '#e2e8f0' : '#374151', boxWidth: 20 }
            }
        }
    };
    
    const ItemList: React.FC<{ type: 'incomes' | 'expenses' }> = ({ type }) => {
        const items = type === 'incomes' ? incomes : expenses;
        const colorClass = type === 'incomes' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500';
        const title = type === 'incomes' ? { en: 'Monthly Income', te: 'నెలవారీ ఆదాయం' } : { en: 'Monthly Expenses', te: 'నెలవారీ ఖర్చులు' };

        return (
            <div>
                <h3 className={`text-xl font-semibold mb-4 ${colorClass}`}>{title[language]}</h3>
                <div className="space-y-3">
                    {items.map(item => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-6">
                                <input type="text" value={item.name} onChange={e => handleItemChange(type, item.id, 'name', e.target.value)} placeholder={language === 'en' ? 'Source / Item' : 'మూలం / వస్తువు'} className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700"/>
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
                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Net Monthly Savings' : 'నికర నెలవారీ పొదుపు'}</p>
                <p className={`text-5xl font-extrabold my-2 ${netSavings >= 0 ? 'text-primary dark:text-blue-400' : 'text-red-500'}`}>
                    {formatCurrency(netSavings)}
                </p>
                <div className="flex justify-center gap-8 text-lg">
                    <span><span className="font-semibold text-green-600">{language === 'en' ? 'Income:' : 'ఆదాయం:'}</span> {formatCurrency(totalIncome)}</span>
                    <span><span className="font-semibold text-red-600">{language === 'en' ? 'Expenses:' : 'ఖర్చులు:'}</span> {formatCurrency(totalExpenses)}</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <ItemList type="incomes" />
                <ItemList type="expenses" />
            </div>

            {totalExpenses > 0 && (
                <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Expense Breakdown' : 'ఖర్చుల విచ్ఛిన్నం'}</h3>
                    <div className="h-80 mx-auto" style={{maxWidth: '450px'}} role="img">
                        <Doughnut data={chartData} options={chartOptions} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonthlyBudgetPlanner;
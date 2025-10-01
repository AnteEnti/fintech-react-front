import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

const HourlyRateCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [desiredIncome, setDesiredIncome] = useState(initialState?.desiredIncome || 1200000);
    const [annualExpenses, setAnnualExpenses] = useState(initialState?.annualExpenses || 200000);
    const [billableHours, setBillableHours] = useState(initialState?.billableHours || 25);
    const [weeksWorked, setWeeksWorked] = useState(initialState?.weeksWorked || 48);

    useEffect(() => {
        onStateChange({ desiredIncome, annualExpenses, billableHours, weeksWorked });
    }, [desiredIncome, annualExpenses, billableHours, weeksWorked, onStateChange]);

    const hourlyRate = useMemo(() => {
        const totalEarningsNeeded = desiredIncome + annualExpenses;
        const totalBillableHours = billableHours * weeksWorked;
        return totalBillableHours > 0 ? totalEarningsNeeded / totalBillableHours : 0;
    }, [desiredIncome, annualExpenses, billableHours, weeksWorked]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="desiredIncome" className="block text-sm font-medium mb-2">{language === 'en' ? 'Desired Annual Income' : 'కోరుకున్న వార్షిక ఆదాయం'}</label>
                    <input id="desiredIncome" type="number" value={desiredIncome} onChange={e => setDesiredIncome(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="annualExpenses" className="block text-sm font-medium mb-2">{language === 'en' ? 'Annual Business Expenses' : 'వార్షిక వ్యాపార ఖర్చులు'}</label>
                    <input id="annualExpenses" type="number" value={annualExpenses} onChange={e => setAnnualExpenses(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="billableHours" className="flex items-center text-sm font-medium mb-2">
                        {language === 'en' ? 'Billable Hours per Week' : 'వారానికి బిల్ చేయగల గంటలు'}
                        <Tooltip text={language === 'en' ? 'The number of hours you realistically spend on client work, not admin or marketing.' : 'మీరు వాస్తవికంగా క్లయింట్ పనిపై గడిపే గంటల సంఖ్య, అడ్మిన్ లేదా మార్కెటింగ్ కాదు.'} />
                    </label>
                    <input id="billableHours" type="number" value={billableHours} onChange={e => setBillableHours(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                 <div>
                    <label htmlFor="weeksWorked" className="flex items-center text-sm font-medium mb-2">
                        {language === 'en' ? 'Weeks Worked per Year' : 'సంవత్సరానికి పనిచేసే వారాలు'}
                        <Tooltip text={language === 'en' ? 'Total weeks in a year (52) minus vacation and sick days.' : 'సంవత్సరంలో మొత్తం వారాలు (52) మైనస్ సెలవులు మరియు అనారోగ్య దినాలు.'} />
                    </label>
                    <input id="weeksWorked" type="number" value={weeksWorked} onChange={e => setWeeksWorked(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
            </div>

            <div className="lg:col-span-3">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24 text-center">
                    <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Your Ideal Hourly Rate' : 'మీ ఆదర్శ గంట రేటు'}</p>
                    <p className="text-5xl font-bold text-primary dark:text-blue-400">{formatCurrency(hourlyRate)}</p>
                </div>
            </div>
        </div>
    );
};

export default HourlyRateCalculator;
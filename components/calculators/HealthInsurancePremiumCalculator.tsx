import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';
import { createValidator } from '../../utils/validation';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const HealthInsurancePremiumCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [age, setAge] = useState(initialState?.age || 30);
    const [coverage, setCoverage] = useState(initialState?.coverage || 1000000);
    const [members, setMembers] = useState(initialState?.members || 2);
    const [cityTier, setCityTier] = useState(initialState?.cityTier || 'tier1');
    const [errors, setErrors] = useState({ age: '', coverage: '', members: '' });
    
    const validator = createValidator(language);

    useEffect(() => {
        onStateChange({ age, coverage, members, cityTier });
    }, [age, coverage, members, cityTier, onStateChange]);

    const handleValidation = (field: string, value: number) => {
        let error = validator.isPositive(value);
        if (!error && field === 'age') error = validator.isInRange(value, 18, 65);
        setErrors(prev => ({ ...prev, [field]: error || '' }));
    };

    const estimatedPremium = useMemo(() => {
        const basePremium = 4000;
        const ageFactor = (age - 18) * 150;
        const coverageFactor = (coverage / 100000) * 800;
        const memberFactor = (members - 1) * 3000;
        const cityFactor = cityTier === 'tier1' ? 1.2 : 1.0;

        return (basePremium + ageFactor + coverageFactor + memberFactor) * cityFactor;
    }, [age, coverage, members, cityTier]);

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
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="age" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Your Age' : 'మీ వయస్సు'}</label>
                    <input id="age" type="number" value={age} onChange={e => { setAge(Number(e.target.value)); handleValidation('age', Number(e.target.value)) }} className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.age ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                </div>
                <div>
                    <label htmlFor="coverage" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Coverage Amount' : 'కవరేజ్ మొత్తం'}</label>
                     <select id="coverage" value={coverage} onChange={e => { setCoverage(Number(e.target.value)); handleValidation('coverage', Number(e.target.value)) }} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700">
                        <option value="500000">₹ 5,00,000</option>
                        <option value="1000000">₹ 10,00,000</option>
                        <option value="2500000">₹ 25,00,000</option>
                        <option value="5000000">₹ 50,00,000</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="members" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Number of Members' : 'సభ్యుల సంఖ్య'}</label>
                    <input id="members" type="number" value={members} onChange={e => { setMembers(Number(e.target.value)); handleValidation('members', Number(e.target.value)) }} className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.members ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                </div>
                <div>
                    <label htmlFor="cityTier" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'City Tier' : 'నగరం శ్రేణి'}</label>
                    <select id="cityTier" value={cityTier} onChange={e => setCityTier(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700">
                        <option value="tier1">{language === 'en' ? 'Tier 1 (e.g., Mumbai, Delhi)' : 'టైర్ 1 (ఉదా., ముంబై, ఢిల్లీ)'}</option>
                        <option value="tier2">{language === 'en' ? 'Tier 2 & 3' : 'టైర్ 2 & 3'}</option>
                    </select>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24">
                    <div className="text-center">
                        <p className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                            {language === 'en' ? 'Estimated Annual Premium' : 'అంచనా వార్షిక ప్రీమియం'}
                            <Tooltip text={language === 'en' ? 'This is a rough estimate. Actual premiums depend on the insurer, your health status, and chosen plan features.' : 'ఇది ఒక సుమారు అంచనా. వాస్తవ ప్రీమియంలు బీమా సంస్థ, మీ ఆరోగ్య స్థితి మరియు ఎంచుకున్న ప్లాన్ ఫీచర్లపై ఆధారపడి ఉంటాయి.'} />
                        </p>
                        <p className="text-5xl font-bold text-primary dark:text-blue-400">{formatCurrency(estimatedPremium)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthInsurancePremiumCalculator;
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as userService from '../services/userService';
import { PageData } from '../types';

interface SaveCalculationButtonProps {
    pageData: PageData;
    calculatorState: Record<string, any>;
}

const SaveCalculationButton: React.FC<SaveCalculationButtonProps> = ({ pageData, calculatorState }) => {
    const { isAuthenticated } = useAuth();
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        if (Object.keys(calculatorState).length > 0) {
            userService.saveCalculation(pageData, calculatorState);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000); // Reset after 2 seconds
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <button
            onClick={handleSave}
            className="px-3 py-2 text-sm font-semibold text-white bg-secondary rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            disabled={saved}
        >
            {saved ? 'Saved!' : 'Save'}
        </button>
    );
};

export default SaveCalculationButton;
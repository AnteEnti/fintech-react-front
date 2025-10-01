import { useLanguage } from '../context/LanguageContext';

type Validator = (value: number | string) => string | null;

interface ValidationRules {
    [key: string]: {
        en: string;
        te: string;
    };
}

const ERROR_MESSAGES: ValidationRules = {
    positive: {
        en: 'Value must be positive.',
        te: 'విలువ ధనాత్మకంగా ఉండాలి.',
    },
    nonNegative: {
        en: 'Value cannot be negative.',
        te: 'విలువ రుణాత్మకంగా ఉండకూడదు.',
    },
    min: {
        en: 'Value is too small.',
        te: 'విలువ చాలా చిన్నది.',
    },
    max: {
        en: 'Value is too large.',
        te: 'విలువ చాలా పెద్దది.',
    },
};

export const createValidator = (language: 'en' | 'te') => {
    return {
        isPositive: (value: number, customMessageKey?: string): string | null => {
            if (value <= 0) {
                const msg = ERROR_MESSAGES[customMessageKey || 'positive'];
                return msg[language];
            }
            return null;
        },
        isNonNegative: (value: number, customMessageKey?: string): string | null => {
            if (value < 0) {
                const msg = ERROR_MESSAGES[customMessageKey || 'nonNegative'];
                return msg[language];
            }
            return null;
        },
        isInRange: (value: number, min: number, max: number): string | null => {
             if (value < min) {
                return `${ERROR_MESSAGES.min[language]} (min: ${min})`;
             }
             if (value > max) {
                return `${ERROR_MESSAGES.max[language]} (max: ${max})`;
             }
             return null;
        }
    }
};

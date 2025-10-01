import React from 'react';

interface IconProps {
    name?: string;
    className?: string;
}

const PlantIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 85V45" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M68 55C68 45.6112 60.1656 38 50 38C39.8344 38 32 45.6112 32 55C32 64.3888 39.8344 72 50 72" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M50 72C60.1656 72 68 79.6112 68 89H32C32 79.6112 39.8344 72 50 72Z" fill="currentColor" opacity="0.3"/>
        <circle cx="25" cy="85" r="10" fill="currentColor" opacity="0.4"/>
        <circle cx="75" cy="85" r="10" fill="currentColor" opacity="0.4"/>
        <rect x="10" y="93" width="80" height="7" rx="3.5" fill="currentColor" opacity="0.2"/>
    </svg>
);

const WalletIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="30" width="70" height="50" rx="8" stroke="currentColor" strokeWidth="6" />
        <path d="M15 40H85" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M15 38L45 65L85 38" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
        <circle cx="70" cy="65" r="6" fill="currentColor" opacity="0.5"/>
    </svg>
);

const PiggyBankIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="35" width="60" height="50" rx="25" stroke="currentColor" strokeWidth="6"/>
        <path d="M45 30H55" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M20 70H25" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M75 70H80" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="70" cy="50" r="4" fill="currentColor"/>
    </svg>
);

const CalculatorIconComponent = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="20" width="50" height="65" rx="8" stroke="currentColor" strokeWidth="6"/>
        <path d="M35 35H65" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.3"/>
        <path d="M38 50h2" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M48 50h2" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M58 50h2" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M38 60h2" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M48 60h2" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M58 60h2" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
    </svg>
);

const ChartUpIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 80H80" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M20 20V80" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M30 70L45 50L60 60L80 30" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DocumentIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 15H65L80 30V85H25V15Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 50H65" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M40 65H65" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
    </svg>
);

const DefaultIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="6" opacity="0.5"/>
        <path d="M40 50H60" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M50 40V60" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
    </svg>
);


const icons: { [key: string]: React.FC<{ className?: string }> } = {
    plant: PlantIcon,
    wallet: WalletIcon,
    'piggy-bank': PiggyBankIcon,
    calculator: CalculatorIconComponent,
    'chart-up': ChartUpIcon,
    document: DocumentIcon,
    default: DefaultIcon,
};

const CalculatorIcon: React.FC<IconProps> = ({ name, className }) => {
    const IconComponent = name && icons[name] ? icons[name] : icons.default;
    return <IconComponent className={className} />;
};

export default CalculatorIcon;
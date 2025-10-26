import React from 'react';
import { ChartBarIcon, ArrowsRightLeftIcon, BanknotesIcon, LeafIcon, SyncIcon, CreditCardIcon, UserGroupIcon, KeyIcon, BookOpenIcon } from './icons';

const screensConfig = [
    { name: 'Dashboard', icon: ChartBarIcon },
    { name: 'Conciliación', icon: SyncIcon },
    { name: 'Transferencias', icon: ArrowsRightLeftIcon },
    { name: 'Tesorería', icon: BanknotesIcon },
    { name: 'TPVs', icon: CreditCardIcon },
    { name: 'Nóminas', icon: UserGroupIcon },
    { name: 'Leasing', icon: KeyIcon },
    { name: 'Sostenibilidad', icon: LeafIcon },
    { name: 'Historial', icon: BookOpenIcon },
];

const Navigation: React.FC<{ onNavigate: (screen: string) => void; activeScreen: string }> = ({ onNavigate, activeScreen }) => {
    
    return (
        <nav className="space-y-2">
            {screensConfig.map(screen => {
                const Icon = screen.icon;
                return (
                    <button 
                        key={screen.name} 
                        onClick={() => onNavigate(screen.name)} 
                        className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${activeScreen === screen.name ? 'bg-bbva-accent text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                       <Icon className="h-5 w-5 mr-3" />
                       {screen.name}
                    </button>
                )
            })}
        </nav>
    );
};

export default Navigation;
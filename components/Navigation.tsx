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

interface NavigationProps {
    onNavigate: (screen: string) => void;
    activeScreen: string;
    isCollapsed: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, activeScreen, isCollapsed }) => {
    
    return (
        <nav className="space-y-2">
            {screensConfig.map(screen => {
                const Icon = screen.icon;
                const isActive = activeScreen === screen.name;
                return (
                    <div key={screen.name} className="relative group">
                        <button 
                            onClick={() => onNavigate(screen.name)} 
                            className={`w-full text-left flex items-center p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                isActive 
                                ? 'bg-bbva-accent text-white' 
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            } ${isCollapsed ? 'justify-center' : ''}`}
                        >
                           <Icon className="h-5 w-5 flex-shrink-0" />
                           <span className={`ml-3 transition-opacity duration-200 whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                               {screen.name}
                           </span>
                        </button>
                        {isCollapsed && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-bbva-blue dark:bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                {screen.name}
                            </div>
                        )}
                    </div>
                )
            })}
        </nav>
    );
};

export default Navigation;
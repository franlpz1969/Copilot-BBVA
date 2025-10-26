

import React from 'react';
import { ChevronDownIcon, BellIcon, SearchIcon, SparklesIcon } from './icons';

interface HeaderProps {
    activeScreen: string;
}

const UserProfile: React.FC = () => (
    <div className="flex items-center space-x-2 cursor-pointer">
        <img src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23E9F2FA"/><text x="50" y="50" font-size="60" text-anchor="middle" dy=".3em">🧞</text></svg>' alt="Avatar de genio" className="h-10 w-10 rounded-full" />
        <div>
            <p className="font-semibold text-sm text-gray-700">Fran López</p>
            <p className="text-xs text-gray-500">CFO</p>
        </div>
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
    </div>
);

const Header: React.FC<HeaderProps> = ({ activeScreen }) => {
    
    const getHeaderContent = () => {
        switch(activeScreen) {
            case 'Dashboard':
                return { 
                    title: 'Bienvenido, Fran',
                    actions: <UserProfile />
                };
            case 'Conciliación':
                 return { 
                    title: 'Conciliación',
                    actions: (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-600">Conexión Segura</span>
                             <BellIcon className="h-6 w-6 text-gray-500" />
                             <UserProfile />
                        </div>
                    )
                };
            case 'Transferencias':
                 return { 
                    title: 'Transferencias',
                    actions: (
                       <div className="flex items-center space-x-4">
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 w-64 border rounded-lg focus:ring-2 focus:ring-bbva-accent outline-none"/>
                            </div>
                            <BellIcon className="h-6 w-6 text-gray-500" />
                            <UserProfile />
                        </div>
                    )
                };
            case 'Tesorería':
                 return { 
                    title: 'Tesorería',
                    actions: (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-600">Conexión Segura y Cifrada</span>
                             <BellIcon className="h-6 w-6 text-gray-500" />
                             <UserProfile />
                        </div>
                    )
                };
            case 'Sostenibilidad':
                 return { 
                    title: 'Sostenibilidad',
                    actions: (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-600">Datos Ambientales</span>
                             <BellIcon className="h-6 w-6 text-gray-500" />
                             <UserProfile />
                        </div>
                    )
                };
            default:
                return { title: 'Dashboard', actions: <UserProfile /> };
        }
    };

    const { title, actions } = getHeaderContent();

    return (
        <header className="bg-white flex-shrink-0 z-10 p-4 border-b">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold text-bbva-blue">{title}</h1>
                </div>
                
                <div className="flex items-center space-x-6">
                    {actions}
                </div>
            </div>
        </header>
    );
};

export default Header;
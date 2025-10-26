import React from 'react';
import { ChevronDownIcon, BellIcon, SearchIcon, ShareIcon, SunIcon, MoonIcon } from './icons';

interface HeaderProps {
    activeScreen: string;
    theme: string;
    onToggleTheme: () => void;
}

const UserProfile: React.FC = () => (
    <div className="flex items-center space-x-2 cursor-pointer">
        <img src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23E9F2FA"/><text x="50" y="50" font-size="60" text-anchor="middle" dy=".3em">🧞</text></svg>' alt="Avatar de genio" className="h-10 w-10 rounded-full" />
        <div>
            <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">Fran López <span className="font-normal text-gray-500 dark:text-gray-400">(Global Tech)</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">CFO</p>
        </div>
        <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </div>
);

const Header: React.FC<HeaderProps> = ({ activeScreen, theme, onToggleTheme }) => {
    
    const handleShareScreen = () => {
        alert("Iniciando sesión de pantalla compartida con un asesor...");
    };

    const getHeaderContent = () => {
        const defaultActions = (
            <div className="flex items-center space-x-4">
                <button onClick={handleShareScreen} title="Compartir pantalla con un asesor" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <ShareIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>
                <button title="Notificaciones" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BellIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>
                <button onClick={onToggleTheme} title="Cambiar tema" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    {theme === 'light' ? <MoonIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" /> : <SunIcon className="h-6 w-6 text-yellow-400" />}
                </button>
                <UserProfile />
            </div>
        );

        switch(activeScreen) {
            case 'Dashboard':
                return { 
                    title: 'Bienvenido, Fran',
                    actions: defaultActions
                };
            case 'Conciliación':
                 return { 
                    title: 'Conciliación',
                    actions: defaultActions
                };
            case 'Transferencias':
                 return { 
                    title: 'Transferencias',
                    actions: (
                       <div className="flex items-center space-x-4">
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type="text" placeholder="Buscar" className="pl-10 pr-4 py-2 w-64 border rounded-lg focus:ring-2 focus:ring-bbva-accent outline-none bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                            </div>
                            {defaultActions}
                        </div>
                    )
                };
            case 'Tesorería':
                 return { 
                    title: 'Tesorería',
                    actions: defaultActions
                };
            case 'Sostenibilidad':
                 return { 
                    title: 'Sostenibilidad',
                    actions: defaultActions
                };
            default:
                return { title: activeScreen, actions: defaultActions };
        }
    };

    const { title, actions } = getHeaderContent();

    return (
        <header className="bg-white dark:bg-gray-800 flex-shrink-0 z-10 p-3 border-b dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <h1 className="text-xl font-bold text-bbva-blue dark:text-white">{title}</h1>
                </div>
                
                <div className="flex items-center space-x-6">
                    {actions}
                </div>
            </div>
        </header>
    );
};

export default Header;
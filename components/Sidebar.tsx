import React from 'react';
import Navigation from './Navigation';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from './icons';

interface SidebarProps {
    activeScreen: string;
    onNavigate: (screen: string) => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, onNavigate, isCollapsed, onToggleCollapse }) => {
    return (
        <aside className={`bg-white dark:bg-gray-800 flex-shrink-0 border-r dark:border-gray-700 flex flex-col fixed top-0 left-0 h-full z-20 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className={`h-16 flex items-center border-b dark:border-gray-700 transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-start px-6'}`}>
                <h1 className={`text-xl font-bold text-bbva-blue dark:text-white transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Copiloto IA</h1>
                {isCollapsed && <span className="text-2xl">🧞</span>}
            </div>
            <div className="flex-1 py-6 px-3">
                <Navigation activeScreen={activeScreen} onNavigate={onNavigate} isCollapsed={isCollapsed} />
            </div>
            <div className="p-4 border-t dark:border-gray-700">
                 <button onClick={onToggleCollapse} className="w-full flex items-center justify-center p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {isCollapsed ? <ChevronDoubleRightIcon className="h-5 w-5"/> : <ChevronDoubleLeftIcon className="h-5 w-5" />}
                 </button>
            </div>
        </aside>
    );
};

export default Sidebar;
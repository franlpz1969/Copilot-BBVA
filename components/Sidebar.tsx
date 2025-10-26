
import React from 'react';
import Navigation from './Navigation';

const Sidebar: React.FC<{ activeScreen: string; onNavigate: (screen: string) => void }> = ({ activeScreen, onNavigate }) => {
    return (
        <aside className="w-64 bg-white flex-shrink-0 border-r flex flex-col">
            <div className="h-16 flex items-center justify-start px-6 border-b">
                <h1 className="text-xl font-bold text-bbva-blue">Copiloto IA</h1>
            </div>
            <div className="flex-1 py-6 px-4">
                <Navigation activeScreen={activeScreen} onNavigate={onNavigate} />
            </div>
            <div className="p-4 border-t">
                <p className="text-xs text-gray-400">© 2024 BBVA S.A.</p>
            </div>
        </aside>
    );
};

export default Sidebar;
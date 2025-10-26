
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';

const App: React.FC = () => {
    const [activeScreen, setActiveScreen] = useState('Dashboard');

    return (
        <div className="flex h-screen bg-bbva-background font-sans">
            <Sidebar activeScreen={activeScreen} onNavigate={setActiveScreen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header activeScreen={activeScreen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <MainContent activeScreen={activeScreen} onNavigate={setActiveScreen} />
                </main>
            </div>
        </div>
    );
};

export default App;
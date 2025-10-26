import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';

const App: React.FC = () => {
    const [activeScreen, setActiveScreen] = useState('Dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const mainContentRef = useRef<HTMLElement>(null);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        mainContentRef.current?.scrollTo(0, 0);
    }, [activeScreen]);

    return (
        <div className="flex h-screen bg-bbva-background dark:bg-gray-900 font-sans">
            <Sidebar 
                activeScreen={activeScreen} 
                onNavigate={setActiveScreen}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
            />
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
                <Header 
                    activeScreen={activeScreen}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                />
                <main ref={mainContentRef} className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                    <MainContent activeScreen={activeScreen} onNavigate={setActiveScreen} />
                </main>
            </div>
        </div>
    );
};

export default App;
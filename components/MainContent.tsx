

import React from 'react';
import Dashboard from '../screens/Dashboard';
import ConciliationScreen from '../screens/ConciliationScreen';
import TransfersScreen from '../screens/TransfersScreen';
import TreasuryScreen from '../screens/TreasuryScreen';
import SustainabilityScreen from '../screens/SustainabilityScreen';
import TPVScreen from '../screens/TPVScreen';
import PayrollScreen from '../screens/PayrollScreen';
import LeasingScreen from '../screens/LeasingScreen';
import CommunicationHistoryScreen from '../screens/ChatHistoryScreen';

const MainContent: React.FC<{ activeScreen: string; onNavigate: (screen: string) => void }> = ({ activeScreen, onNavigate }) => {
    const renderScreen = () => {
        switch (activeScreen) {
            case 'Dashboard':
                return <Dashboard onNavigate={onNavigate} />;
            case 'Conciliación':
                return <ConciliationScreen />;
            case 'Transferencias':
                return <TransfersScreen />;
            case 'Tesorería':
                return <TreasuryScreen />;
            case 'TPVs':
                return <TPVScreen />;
            case 'Nóminas':
                return <PayrollScreen />;
            case 'Leasing':
                return <LeasingScreen />;
            case 'Sostenibilidad':
                return <SustainabilityScreen />;
            case 'Historial':
                return <CommunicationHistoryScreen />;
            default:
                return <Dashboard onNavigate={onNavigate} />;
        }
    };

    return (
        <div>
            {renderScreen()}
        </div>
    );
};

export default MainContent;
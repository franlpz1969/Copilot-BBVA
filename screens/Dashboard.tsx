import React, { useState, useEffect, useMemo } from 'react';
import {
    MOCK_FINANCIAL_DATA,
    CASH_FLOW_DATA,
    SIMULATION_SCENARIOS_DATA,
    TPV_SUMMARY_DATA,
    CREDIT_LINE_DATA,
    SUSTAINABILITY_DATA,
    PAYROLL_DATA,
    LEASING_DATA,
    COMPLIANCE_ALERTS_DATA
} from '../constants';
import { SimulationScenario, CashFlowDataPoint, TimelineEvent } from '../types';
import DashboardCard from '../components/DashboardCard';
import CashFlowChart from '../components/CashFlowChart';
import AiAssistantPanel from '../components/AiAssistantPanel';
import KeyEventsTimeline from '../components/KeyEventsTimeline';
import DashboardStatCard from '../components/DashboardStatCard';
import UpcomingAlerts from '../components/UpcomingAlerts';
import { getWelcomeSummary } from '../services/geminiService';

import { CalculatorIcon, XIcon, UserGroupIcon, KeyIcon, DocumentIcon, ReceiptPercentIcon, BanknotesIcon, LeafIcon, GavelIcon, CreditCardIcon } from '../components/icons';
import HelpTooltip from '../components/HelpTooltip';

const initialKpis = {
    totalBalance: MOCK_FINANCIAL_DATA.summary.totalBalance,
};

const parseDate = (dateString: string): Date => {
    // Handle format "Vence en X días"
    if (dateString.includes('días')) {
        const days = parseInt(dateString.match(/\d+/)?.[0] ?? '0');
        const dt = new Date();
        dt.setDate(dt.getDate() + days);
        return dt;
    }
    const parts = dateString.split('/');
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
};

const Dashboard: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
    const [kpis, setKpis] = useState(initialKpis);
    const [cashFlowData, setCashFlowData] = useState<(CashFlowDataPoint & { netFlow: number; originalNetFlow?: number })[]>(CASH_FLOW_DATA);
    const [activeScenario, setActiveScenario] = useState<SimulationScenario | null>(null);
    
    const welcomeMessagePromise = useMemo(() => getWelcomeSummary(), []);

    const timelineEvents = useMemo((): TimelineEvent[] => {
        const payrollEvents: TimelineEvent[] = PAYROLL_DATA
            .filter(p => p.status === 'Pendiente de firma')
            .map(p => ({
                id: `pay-${p.id}`,
                date: parseDate(p.paymentDate),
                title: `Firma y pago de Nóminas (${p.month})`,
                type: 'Nóminas',
                icon: UserGroupIcon,
                severity: 'critical'
            }));

        const leasingEvents: TimelineEvent[] = LEASING_DATA
            .map(l => ({
                id: `lease-${l.id}`,
                date: parseDate(l.endDate),
                title: `Vencimiento del contrato de leasing: ${l.asset}`,
                type: 'Leasing',
                icon: KeyIcon,
                severity: 'high'
            }));
        
        const complianceEvents: TimelineEvent[] = COMPLIANCE_ALERTS_DATA.map(a => ({
                id: `comp-${a.id}`,
                date: parseDate(a.dueDate),
                title: a.title,
                type: a.type === 'Legal' ? 'Legal' : 'Impuestos',
                icon: a.type === 'Legal' ? GavelIcon : DocumentIcon,
                severity: a.severity
            }));

        const creditEvents: TimelineEvent[] = [{
            id: 'credit-1',
            date: parseDate(CREDIT_LINE_DATA.nextPaymentDate),
            title: `Pago de cuota de Línea de Crédito`,
            type: 'Crédito',
            icon: ReceiptPercentIcon,
            severity: 'medium'
        }];


        return [...payrollEvents, ...leasingEvents, ...complianceEvents, ...creditEvents];
    }, []);
    
    const criticalAlerts = useMemo(() => {
        return COMPLIANCE_ALERTS_DATA
            .filter(a => a.severity === 'high')
            .sort((a,b) => parseInt(a.dueDate.match(/\d+/)?.[0] ?? '99') - parseInt(b.dueDate.match(/\d+/)?.[0] ?? '99'));
    }, []);

    const resetSimulation = () => {
        setKpis(initialKpis);
        setCashFlowData(CASH_FLOW_DATA);
        setActiveScenario(null);
    };

    const handleSimulation = (scenario: SimulationScenario) => {
        if (activeScenario?.id === scenario.id) {
            resetSimulation();
            return;
        }

        const newCashFlowData = CASH_FLOW_DATA.map((d, i) => {
            let newIncome = d.income; let newExpenses = d.expenses;
            if (scenario.id === 'pri') newIncome *= (1 + (scenario.impact.revenue / 100));
            if (scenario.id === 'log') newExpenses *= (1 - (scenario.impact.cashFlow / 100));
            if (scenario.id === 'inv' && d.date === 'Ene') newExpenses += 50000;
            return { ...d, income: newIncome, expenses: newExpenses, netFlow: newIncome - newExpenses, originalNetFlow: CASH_FLOW_DATA[i].netFlow };
        });

        let newTotalBalance = initialKpis.totalBalance;
        if (scenario.id === 'inv') newTotalBalance -= 50000;

        setKpis({ totalBalance: newTotalBalance });
        setCashFlowData(newCashFlowData);
        setActiveScenario(scenario);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
                
                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DashboardStatCard 
                        title="Balance Total"
                        value={MOCK_FINANCIAL_DATA.summary.totalBalance}
                        change={5.2}
                        format="currency"
                        icon={BanknotesIcon}
                    />
                    <DashboardStatCard 
                        title="Ventas TPV (Mes)"
                        value={TPV_SUMMARY_DATA.totalSalesMonth}
                        change={-1.8}
                        format="currency"
                        icon={CreditCardIcon}
                    />
                     <DashboardStatCard 
                        title="Crédito Disponible"
                        value={CREDIT_LINE_DATA.availableCredit}
                        change={0}
                        format="currency"
                        icon={ReceiptPercentIcon}
                    />
                     <DashboardStatCard 
                        title="Huella Carbono"
                        value={SUSTAINABILITY_DATA.currentMonthFootprint}
                        change={-11.9}
                        format="number"
                        unit="kg CO₂"
                        icon={LeafIcon}
                    />
                </div>
                
                {/* ALERTS AND TIMELINE */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-1">
                        <UpcomingAlerts alerts={criticalAlerts} onNavigate={onNavigate} />
                    </div>
                    <div className="lg:col-span-2">
                        <KeyEventsTimeline events={timelineEvents} />
                    </div>
                </div>
                
                {/* CHARTS AND SIMULATOR */}
                <CashFlowChart 
                    data={cashFlowData} 
                    title={`Visión General de Flujo de Caja ${activeScenario ? `| Simulación: "${activeScenario.title}"` : ''}`}
                />

                <DashboardCard 
                    title="Simulador de Estrategias IA"
                    headerActions={
                        activeScenario && (
                            <button onClick={resetSimulation} className="text-xs font-medium text-red-600 hover:underline flex items-center">
                               <XIcon className="h-4 w-4 mr-1" />
                               Resetear
                            </button>
                        )
                    }
                >
                    <div className="flex items-center space-x-3 mb-3">
                        <CalculatorIcon className="h-7 w-7 text-white bg-bbva-accent p-1 rounded-lg" />
                        <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Analiza el impacto potencial de decisiones estratégicas en tus finanzas.</p>
                            <HelpTooltip content="Selecciona un escenario para visualizar su impacto en la gráfica de Flujo de Caja." />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {SIMULATION_SCENARIOS_DATA.map(scenario => (
                            <button key={scenario.id} onClick={() => handleSimulation(scenario)} className={`p-2.5 border dark:border-gray-700 rounded-lg text-left transition-all duration-200 ${activeScenario?.id === scenario.id ? 'bg-bbva-accent shadow-md' : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                <p className={`font-semibold text-xs ${activeScenario?.id === scenario.id ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>{scenario.title}</p>
                                <p className={`text-[11px] ${activeScenario?.id === scenario.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>{scenario.description}</p>
                            </button>
                        ))}
                    </div>
                </DashboardCard>

            </div>

            <div className="lg:col-span-1 h-[calc(100vh-88px)] sticky top-4">
                <AiAssistantPanel 
                    title="Copiloto IA"
                    initialMessagePromise={welcomeMessagePromise}
                    quickPrompts={[
                        "Resume mi salud financiera actual.",
                        "¿Cuál es el impacto de aumentar los precios un 5%?",
                        "Proyecta mi flujo de caja para el próximo trimestre.",
                    ]}
                />
            </div>
        </div>
    );
};

export default Dashboard;
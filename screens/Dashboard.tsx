import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
    CalculatorIcon, LightBulbIcon, SparklesIcon, DocumentIcon,
    ShieldCheckIcon, ChartBarIcon, CreditCardIcon,
    ReceiptPercentIcon
} from '../components/icons/index';
import { SIMULATION_SCENARIOS_DATA, COMPLIANCE_ALERTS_DATA, PRODUCT_RECOMMENDATIONS_DATA } from '../constants';
import AiAssistantPanel from '../components/AiAssistantPanel';
import { SimulationScenario, SimulationResult, ComplianceAlert, ProductRecommendation } from '../types';
import HelpTooltip from '../components/HelpTooltip';

const initialData = { revenue: 1200000, margin: 18, cashFlow: 85000 };

// --- NEW AI-DRIVEN SIMULATOR COMPONENT ---
const AiDrivenSimulatorCard = () => {
    const [selectedScenario, setSelectedScenario] = useState<SimulationScenario | null>(null);
    const [simulation, setSimulation] = useState<SimulationResult | null>(null);

    const runSimulation = (scenario: SimulationScenario) => {
        if (selectedScenario?.id === scenario.id) {
            setSelectedScenario(null);
            setSimulation(null);
        } else {
            setSelectedScenario(scenario);
            setSimulation({
                newRevenue: initialData.revenue * (1 + (scenario.impact.revenue / 100)),
                newMargin: initialData.margin * (1 + (scenario.impact.margin / 100)),
                newCashFlow: initialData.cashFlow * (1 + (scenario.impact.cashFlow / 100)),
            });
        }
    };
    
    const simulationChartData = simulation ? [
        { name: 'Ingresos', Actual: initialData.revenue, Proyectado: simulation.newRevenue },
        { name: 'Flujo de Caja', Actual: initialData.cashFlow, Proyectado: simulation.newCashFlow },
    ] : [];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                    <CalculatorIcon className="h-6 w-6 text-white bg-bbva-accent p-1 rounded-md" />
                    <h3 className="text-lg font-semibold text-gray-800">Simulador de Estrategias IA</h3>
                </div>
                <HelpTooltip content="Selecciona un escenario propuesto por la IA para visualizar su impacto proyectado en tus métricas clave de negocio." />
            </div>
            <p className="text-sm text-gray-600 mb-4">Selecciona una recomendación de la IA para visualizar su impacto potencial en tus finanzas.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {SIMULATION_SCENARIOS_DATA.map(scenario => (
                    <button key={scenario.id} onClick={() => runSimulation(scenario)} className={`p-3 border rounded-lg text-left transition-all duration-200 ${selectedScenario?.id === scenario.id ? 'bg-bbva-accent shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`}>
                        <p className={`font-semibold text-sm ${selectedScenario?.id === scenario.id ? 'text-white' : 'text-gray-800'}`}>{scenario.title}</p>
                        <p className={`text-xs ${selectedScenario?.id === scenario.id ? 'text-white/80' : 'text-gray-500'}`}>{scenario.description}</p>
                    </button>
                ))}
            </div>

            {simulation && (
                <div className="bg-bbva-light-blue p-4 rounded-lg border border-blue-200 animate-fade-in-down">
                    <h4 className="font-semibold text-bbva-blue mb-2">Resultados de la Simulación: "{selectedScenario?.title}"</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-56">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={simulationChartData} margin={{top: 20, right: 20, left: 0, bottom: 5}}>
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                    <YAxis tickFormatter={(val) => `${val/1000}k`} tick={{ fontSize: 12 }}/>
                                    <Tooltip formatter={(value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits:0 }).format(value)}/>
                                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                                    <Bar dataKey="Actual" fill="#a0aec0" name="Actual" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Proyectado" fill="#1464A5" name="Proyectado" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-col justify-center space-y-3">
                            <div><p className="text-sm text-gray-500">Nuevo Margen Bruto Proyectado</p><p className="text-2xl font-bold text-bbva-blue">{(simulation.newMargin).toFixed(2)}%</p></div>
                             <div><p className="text-sm text-gray-500">Nuevos Ingresos Proyectados</p><p className="text-lg font-bold text-bbva-blue">{simulation.newRevenue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}</p></div>
                            <div><p className="text-sm text-gray-500">Nuevo Flujo de Caja Proyectado</p><p className="text-lg font-bold text-bbva-blue">{simulation.newCashFlow.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}</p></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- NEW COMPLIANCE ALERTS COMPONENT ---
const ComplianceAlertsCard: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
    const severityStyles = {
        high: 'bg-bbva-light-blue text-bbva-blue border-bbva-accent',
        medium: 'bg-gray-100 text-gray-800 border-gray-400',
        low: 'bg-gray-50 text-gray-600 border-gray-300'
    };
    const iconMap = { 'Documento': DocumentIcon, 'Impuestos': ReceiptPercentIcon, 'Legal': ShieldCheckIcon };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="h-6 w-6 text-white bg-bbva-accent p-1 rounded-md" />
                    <h3 className="text-lg font-semibold text-gray-800">Alertas de Cumplimiento y Plazos</h3>
                </div>
                <HelpTooltip content="Esta sección te notifica proactivamente sobre plazos fiscales, legales y documentación que requiere tu atención para mantener tu empresa al día." />
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
                {COMPLIANCE_ALERTS_DATA.map(alert => {
                    const Icon = iconMap[alert.type];
                    return (
                        <div 
                            key={alert.id} 
                            onClick={() => alert.targetScreen && onNavigate(alert.targetScreen)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { alert.targetScreen && onNavigate(alert.targetScreen); }}}
                            tabIndex={alert.targetScreen ? 0 : -1}
                            role={alert.targetScreen ? "button" : undefined}
                            aria-label={`Alerta: ${alert.title}`}
                            className={`p-4 rounded-lg border-l-4 ${severityStyles[alert.severity]} ${alert.targetScreen ? 'cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-bbva-accent' : ''} transition-colors`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-start space-x-3">
                                    <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold">{alert.title}</p>
                                        <p className="text-sm">{alert.details}</p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                    <p className="text-sm font-bold">{alert.dueDate}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};


// --- NEW PRODUCT RECOMMENDATIONS COMPONENT ---
const AiProductRecommendationsCard: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
    const iconMap = { 'credit-card': CreditCardIcon, 'chart-bar': ChartBarIcon, 'shield-check': ShieldCheckIcon };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
             <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center space-x-3">
                    <LightBulbIcon className="h-6 w-6 text-white bg-bbva-accent p-1 rounded-md" />
                    <h3 className="text-lg font-semibold text-gray-800">Recomendaciones Financieras IA</h3>
                </div>
                <HelpTooltip content="Basado en tu perfil y actividad, la IA te sugiere productos y servicios financieros que pueden optimizar tu tesorería, reducir riesgos o mejorar tu rentabilidad." />
            </div>
            <div className="space-y-4">
                {PRODUCT_RECOMMENDATIONS_DATA.map(rec => {
                    const Icon = iconMap[rec.icon];
                    return (
                        <div key={rec.id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                            <Icon className="h-8 w-8 text-bbva-accent flex-shrink-0 mt-1" />
                            <div>
                                <p className="font-semibold text-bbva-blue">{rec.title}</p>
                                <p className="text-sm text-gray-600">{rec.description}</p>
                                <button 
                                    onClick={() => rec.targetScreen && onNavigate(rec.targetScreen)}
                                    disabled={!rec.targetScreen}
                                    className="text-sm font-bold text-bbva-accent hover:underline mt-1 disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed">
                                        Saber más
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

// --- MAIN DASHBOARD ---
const Dashboard: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
            <div className="lg:col-span-3 space-y-6">
                <AiDrivenSimulatorCard />
                <ComplianceAlertsCard onNavigate={onNavigate} />
                <AiProductRecommendationsCard onNavigate={onNavigate} />
            </div>
            
            <div className="lg:col-span-2 space-y-6 flex flex-col">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                     <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                            <SparklesIcon className="h-6 w-6 text-bbva-accent" />
                            <h3 className="text-lg font-semibold text-gray-800">Resumen Financiero General</h3>
                        </div>
                         <HelpTooltip content="Aquí se muestran tus indicadores financieros más importantes para una visión rápida del estado de tu negocio." />
                    </div>
                     <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <p className="text-sm text-gray-500">Balance Total</p>
                            <p className="text-2xl font-bold text-bbva-blue">175,340.50€</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Flujo de Caja Neto (Mes)</p>
                            <p className="text-2xl font-bold text-bbva-blue">22,500.00€</p>
                        </div>
                     </div>
                </div>
                <div className="flex-grow min-h-0">
                    <AiAssistantPanel 
                        quickPrompts={[
                            "Simula el impacto de optimizar mi logística.", 
                            "¿Cuál es mi alerta de cumplimiento más urgente?",
                            "Explícame más sobre el seguro de cambio de divisa.",
                            "Genera un informe financiero para el consejo de administración."
                        ]} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
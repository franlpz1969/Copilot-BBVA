
import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LEASING_DATA } from '../constants';
import AiAssistantPanel from '../components/AiAssistantPanel';
import { LeasingContract } from '../types';
import { KeyIcon, SparklesIcon, CalendarDaysIcon } from '../components/icons';
import { getProactiveClientInsight } from '../services/geminiService';
import HelpTooltip from '../components/HelpTooltip';

const AILeasingAdvisor = () => {
    const [insight, setInsight] = useState<{ title: string; text: string } | null>(null);

    useEffect(() => {
        const fetchInsight = async () => {
            const data = await getProactiveClientInsight('leasing');
            setInsight(data);
        };
        fetchInsight();
    }, []);

    if (!insight) return null;

    return (
        <div className="bg-bbva-light-blue p-4 rounded-lg border border-blue-200 shadow-lg">
            <div className="flex items-start space-x-3">
                <SparklesIcon className="h-5 w-5 text-bbva-accent flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-bold text-bbva-blue text-base mb-1">{insight.title}</h3>
                    <p className="text-xs text-gray-800" dangerouslySetInnerHTML={{ __html: insight.text }} />
                    <button className="mt-3 bg-bbva-blue text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-opacity-90 text-xs">
                        Analizar Ofertas con IA
                    </button>
                </div>
            </div>
        </div>
    );
};

const LeasingContractCard: React.FC<{ contract: LeasingContract }> = ({ contract }) => {
    const endDate = new Date(contract.endDate.split('/').reverse().join('-'));
    const isEndingSoon = endDate < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${isEndingSoon ? 'border-bbva-accent' : 'border-gray-300'}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-bbva-blue text-base">{contract.asset}</p>
                    <p className="text-xs text-gray-500 font-medium">{contract.type} | {contract.provider}</p>
                </div>
                 <KeyIcon className="h-5 w-5 text-gray-300" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-4 text-xs">
                <div>
                    <p className="text-gray-500">Cuota Mensual</p>
                    <p className="font-semibold text-gray-800 text-sm">{contract.monthlyFee.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
                </div>
                <div>
                    <p className="text-gray-500">Inicio</p>
                    <p className="font-semibold text-gray-800">{contract.startDate}</p>
                </div>
                <div>
                    <p className="text-gray-500">Fin</p>
                    <p className={`font-semibold ${isEndingSoon ? 'text-bbva-blue' : 'text-gray-800'}`}>{contract.endDate}</p>
                </div>
            </div>
        </div>
    );
};

const LeasingBreakdownChart: React.FC<{ contracts: LeasingContract[] }> = ({ contracts }) => {
    const COLORS = ['#072146', '#1464A5', '#007CBE'];
    const data = useMemo(() => {
        const breakdown = contracts.reduce((acc, contract) => {
            acc[contract.type] = (acc[contract.type] || 0) + contract.monthlyFee;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
    }, [contracts]);
    
    return (
        <div className="h-60">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} fill="#8884d8">
                        {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                    </Pie>
                    <Tooltip formatter={(value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)} wrapperClassName="text-xs"/>
                    <Legend iconSize={8} wrapperStyle={{fontSize: "11px"}}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

const UpcomingEventsTimeline: React.FC<{ contracts: LeasingContract[] }> = ({ contracts }) => {
    const upcomingEvents = contracts.map(c => ({
        name: c.asset,
        date: c.endDate,
        type: 'Vencimiento',
    })).sort((a,b) => new Date(a.date.split('/').reverse().join('-')).getTime() - new Date(b.date.split('/').reverse().join('-')).getTime()).slice(0,3);

    return (
        <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                    <div className="flex flex-col items-center">
                       <div className="bg-bbva-accent text-white rounded-full h-7 w-7 flex items-center justify-center">
                           <CalendarDaysIcon className="h-4 w-4"/>
                       </div>
                       {index < upcomingEvents.length -1 && <div className="w-px h-10 bg-gray-300"></div>}
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-gray-800">{event.date}</p>
                        <p className="text-xs text-gray-600">{event.type} de {event.name}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

const LeasingScreen: React.FC = () => {
    const [contracts] = useState<LeasingContract[]>(LEASING_DATA);

    const totalMonthlyFee = contracts.reduce((sum, c) => sum + c.monthlyFee, 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
                 <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-bbva-blue">Mis Contratos de Leasing</h2>
                        <HelpTooltip content="Listado de tus contratos de leasing vigentes." />
                    </div>
                    <div className="space-y-3">
                        {contracts.map(contract => <LeasingContractCard key={contract.id} contract={contract} />)}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-semibold text-gray-800">Próximos Vencimientos</h3>
                            <HelpTooltip content="Vencimientos más cercanos para planificar renovaciones." />
                        </div>
                        <UpcomingEventsTimeline contracts={contracts} />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-semibold text-gray-800">Desglose de Cuotas</h3>
                             <HelpTooltip content="Distribución de tus cuotas mensuales por tipo de activo." />
                        </div>
                        <LeasingBreakdownChart contracts={contracts} />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-4 h-[calc(100vh-88px)] sticky top-4">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-sm font-medium text-gray-500">Total Cuotas Mensuales</p>
                    <p className="text-2xl font-bold text-bbva-blue my-1">{totalMonthlyFee.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
                </div>
                <AILeasingAdvisor />
                <AiAssistantPanel 
                    title="Asistente de Leasing"
                    quickPrompts={[
                        "¿Qué contrato finaliza antes?",
                        "Compara las ventajas fiscales de leasing vs compra.",
                        "Busca ofertas de renting para un vehículo eléctrico.",
                    ]}
                 />
            </div>
        </div>
    );
};

export default LeasingScreen;

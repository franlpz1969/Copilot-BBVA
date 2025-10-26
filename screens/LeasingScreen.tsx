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
        <div className="bg-bbva-light-blue p-6 rounded-lg border border-blue-200 shadow-lg">
            <div className="flex items-start space-x-4">
                <SparklesIcon className="h-6 w-6 text-bbva-accent flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-bbva-blue text-lg mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: insight.text }} />
                    <button className="mt-4 bg-bbva-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 text-sm">
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
        <div className={`bg-white p-5 rounded-lg shadow-lg border-l-4 ${isEndingSoon ? 'border-bbva-accent' : 'border-gray-300'}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-bbva-blue text-lg">{contract.asset}</p>
                    <p className="text-sm text-gray-500 font-medium">{contract.type} | {contract.provider}</p>
                </div>
                 <KeyIcon className="h-6 w-6 text-gray-300" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                    <p className="text-gray-500">Cuota Mensual</p>
                    <p className="font-semibold text-gray-800 text-base">{contract.monthlyFee.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
                </div>
                <div>
                    <p className="text-gray-500">Inicio Contrato</p>
                    <p className="font-semibold text-gray-800">{contract.startDate}</p>
                </div>
                <div>
                    <p className="text-gray-500">Fin Contrato</p>
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
        <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                        {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                    </Pie>
                    <Tooltip formatter={(value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)}/>
                    <Legend iconSize={10} wrapperStyle={{fontSize: "12px"}}/>
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
        <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                    <div className="flex flex-col items-center">
                       <div className="bg-bbva-accent text-white rounded-full h-8 w-8 flex items-center justify-center">
                           <CalendarDaysIcon className="h-5 w-5"/>
                       </div>
                       {index < upcomingEvents.length -1 && <div className="w-px h-12 bg-gray-300"></div>}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{event.date}</p>
                        <p className="text-sm text-gray-600">{event.type} de {event.name}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                 <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-bbva-blue">Mis Contratos de Leasing</h2>
                        <HelpTooltip content="Aquí se listan todos tus contratos de leasing vigentes. Los contratos que finalizan pronto se resaltan para tu atención." />
                    </div>
                    <div className="space-y-4">
                        {contracts.map(contract => <LeasingContractCard key={contract.id} contract={contract} />)}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Próximos Vencimientos</h3>
                            <HelpTooltip content="Una línea de tiempo con los vencimientos de contrato más cercanos para que puedas planificar renovaciones o nuevas adquisiciones." />
                        </div>
                        <UpcomingEventsTimeline contracts={contracts} />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Desglose de Cuotas</h3>
                             <HelpTooltip content="Distribución de tus cuotas mensuales de leasing por tipo de activo (Vehículo, Equipo informático, etc.)." />
                        </div>
                        <LeasingBreakdownChart contracts={contracts} />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-sm font-medium text-gray-500">Total Cuotas Mensuales</p>
                    <p className="text-3xl font-bold text-bbva-blue my-2">{totalMonthlyFee.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
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
import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CONCILIATION_MOVEMENTS, CONCILIATION_ACTIONS } from '../constants';
import { RecommendedAction, ConciliationMovement } from '../types';
import { DocumentIcon, CheckCircleIcon, SyncIcon, LightBulbIcon } from '../components/icons/index';
import AiAssistantPanel from '../components/AiAssistantPanel';
import HelpTooltip from '../components/HelpTooltip';

const ITEMS_PER_PAGE = 8;

interface KPICardProps {
    title: string;
    children: React.ReactNode;
    tooltip: string;
}
const KPICard: React.FC<KPICardProps> = ({ title, children, tooltip }) => (
    <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <HelpTooltip content={tooltip} />
        </div>
        {children}
    </div>
);

const iconMap: { [key in RecommendedAction['icon']]: React.ReactNode } = {
    difference: <div className="p-2 bg-bbva-light-blue rounded-full"><LightBulbIcon className="h-6 w-6 text-bbva-accent" /></div>,
    approval: <div className="p-2 bg-bbva-light-blue rounded-full"><CheckCircleIcon className="h-6 w-6 text-bbva-blue" /></div>,
    report: <div className="p-2 bg-gray-100 rounded-full"><DocumentIcon className="h-6 w-6 text-gray-600" /></div>,
    contact: <div/>,
    analyze: <div/>
};

const COLORS = { conciled: '#007CBE', pending: '#718096', difference: '#072146' };
const RADIAN = Math.PI / 180;
// FIX: Add explicit types to the destructured props to match recharts' expected signature.
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const StatusDonutChart = ({ data }: { data: ConciliationMovement[] }) => {
    const totalMovements = data.length;
    const chartData = useMemo(() => {
        const stats = data.reduce((acc, mov) => {
            acc[mov.status] = (acc[mov.status] || 0) + 1;
            return acc;
        }, {} as Record<ConciliationMovement['status'], number>);
        
        return [
            { name: 'Conciliado', value: stats.conciled || 0 },
            { name: 'Pendiente', value: stats.pending || 0 },
            { name: 'Diferencia', value: stats.difference || 0 },
        ].filter(item => item.value > 0);
    }, [data]);

    return (
        <div style={{ width: '100%', height: 120 }} className="relative">
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={55} fill="#8884d8" paddingAngle={5} dataKey="value" labelLine={false} label={renderCustomizedLabel}>
                        {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} />))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} movimientos`, name]} />
                </PieChart>
            </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-bbva-blue">{totalMovements}</span>
                <span className="text-xs text-gray-500">Movimientos</span>
            </div>
        </div>
    );
};

const ConciliationScreen: React.FC = () => {
    const [movements, setMovements] = useState<ConciliationMovement[]>(CONCILIATION_MOVEMENTS);
    const [isConciliating, setIsConciliating] = useState(false);
    const [aiPrompt, setAiPrompt] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const conciliationStats = useMemo(() => {
        return movements.reduce((acc, mov) => {
            acc[mov.status] = (acc[mov.status] || 0) + 1;
            return acc;
        }, {} as Record<ConciliationMovement['status'], number>);
    }, [movements]);

    const totalPages = Math.ceil(movements.length / ITEMS_PER_PAGE);
    const paginatedMovements = movements.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleConciliation = () => {
        setIsConciliating(true);
        setTimeout(() => {
            setMovements(currentMovements => currentMovements.map(m => (m.status === 'pending' ? { ...m, status: 'conciled' } : m)));
            setIsConciliating(false);
        }, 2000);
    };

    const handleAiHelp = (concept: string, linkText: string) => {
        setAiPrompt(linkText === 'Resolver con IA' ? `Resolver la diferencia en ${concept}` : `Ayúdame a resolver la discrepancia en la transacción: "${concept}".`);
    };
    
    const handleAiTransaction = (id: number, details: any) => {
        if(id === 99) { // Special ID for the conciliation action
             setMovements(prev => {
                const newMovements = prev.filter(m => m.status !== 'difference');
                newMovements.push({
                    id: 99,
                    date: new Date().toLocaleDateString('es-ES'),
                    concept: details.provider,
                    amount: -details.amount,
                    status: 'conciled'
                });
                return newMovements;
             });
        }
    };

    const getStatusChip = (status: ConciliationMovement['status'], concept: string) => {
        const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
        switch (status) {
            case 'conciled': return <span className={`${baseClasses} text-gray-800 bg-gray-100`}>Conciliado</span>;
            case 'pending': return <span className={`${baseClasses} text-gray-800 bg-gray-200`}>Pendiente</span>;
            case 'difference': return (
                <div className="flex items-center justify-center space-x-2">
                    <span className={`${baseClasses} text-white bg-bbva-blue`}>Diferencia</span>
                    <button onClick={() => handleAiHelp(concept, '')} title="Obtener ayuda de la IA" className="text-bbva-accent hover:text-bbva-blue">
                        <LightBulbIcon className="h-5 w-5" />
                    </button>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <KPICard title="Estado de Conciliación" tooltip="Un resumen visual del estado de todos tus movimientos bancarios del periodo seleccionado.">
                    <StatusDonutChart data={movements} />
                    <div className="mt-4 px-2">
                        <h4 className="font-semibold text-sm mb-2 text-gray-700">Resumen de Movimientos</h4>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-1.5 flex items-center"><span className="h-2.5 w-2.5 rounded-full mr-2" style={{backgroundColor: COLORS.conciled}}></span>Conciliados</td>
                                    <td className="text-right font-semibold">{conciliationStats.conciled || 0}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-1.5 flex items-center"><span className="h-2.5 w-2.5 rounded-full mr-2" style={{backgroundColor: COLORS.pending}}></span>Pendientes</td>
                                    <td className="text-right font-semibold">{conciliationStats.pending || 0}</td>
                                </tr>
                                <tr>
                                    <td className="py-1.5 flex items-center"><span className="h-2.5 w-2.5 rounded-full mr-2" style={{backgroundColor: COLORS.difference}}></span>Con Diferencia</td>
                                    <td className="text-right font-semibold">{conciliationStats.difference || 0}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </KPICard>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Sugerencias del Asistente IA</h3>
                        <HelpTooltip content="Acciones recomendadas por la IA para agilizar tu conciliación y resolver discrepancias." />
                    </div>
                    <div className="space-y-4">
                        {CONCILIATION_ACTIONS.map(action => (
                            <div key={action.id} className="bg-white p-4 rounded-lg shadow-lg flex items-start space-x-3">
                                {iconMap[action.icon]}
                                <div><p className="font-semibold text-gray-800">{action.title}</p><p className="text-sm text-gray-500">{action.description}</p><button onClick={() => handleAiHelp(action.title, action.linkText)} className="text-sm font-medium text-bbva-accent hover:underline mt-1">{action.linkText}</button></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-bold text-bbva-blue">Conciliación de Cuentas</h2>
                        <HelpTooltip content="Aquí puedes ver, filtrar y gestionar todos los movimientos de tus cuentas bancarias y su estado de conciliación." />
                    </div>
                    <button onClick={handleConciliation} disabled={isConciliating || !movements.some(m => m.status === 'pending')} className="bg-bbva-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <SyncIcon className={`h-5 w-5 ${isConciliating ? 'animate-spin' : ''}`}/><span>{isConciliating ? 'Conciliando...' : 'Ejecutar conciliación'}</span>
                    </button>
                </div>
                
                <div className="flex-grow overflow-y-auto">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-white z-10">
                            <tr className="border-b">
                                <th className="py-3 px-2 text-sm font-sans font-semibold text-gray-500">Fecha</th>
                                <th className="py-3 px-2 text-sm font-sans font-semibold text-gray-500">Concepto</th>
                                <th className="py-3 px-2 text-sm font-sans font-semibold text-gray-500 text-right">Importe</th>
                                <th className="py-3 px-2 text-sm font-sans font-semibold text-gray-500 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedMovements.map(mov => (
                                <tr key={mov.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-2 text-sm font-sans text-gray-600">{mov.date}</td>
                                    <td className="py-3 px-2 text-sm font-sans text-gray-800">{mov.concept}</td>
                                    <td className={`py-3 px-2 text-sm font-sans font-semibold text-right ${mov.amount > 0 ? 'text-gray-800' : 'text-gray-800'}`}>{mov.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
                                    <td className="py-3 px-2 text-sm font-sans text-center">{getStatusChip(mov.status, mov.concept)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <div className="flex justify-center items-center mt-4 space-x-2">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded-md text-sm disabled:opacity-50">&lt;</button>
                    {[...Array(totalPages).keys()].map(num => (
                        <button key={num + 1} onClick={() => handlePageChange(num + 1)} className={`px-3 py-1 rounded-md text-sm ${currentPage === num + 1 ? 'text-white bg-bbva-accent' : 'text-gray-600'}`}>{num + 1}</button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md text-sm disabled:opacity-50">&gt;</button>
                 </div>
            </div>

            <div className="lg:col-span-1">
                 <AiAssistantPanel 
                    title="Asistente de Conciliación"
                    key={aiPrompt} // Re-mount component when prompt changes
                    quickPrompts={aiPrompt ? [aiPrompt] : [
                        "Explícame qué es una conciliación.",
                        "Resume los movimientos pendientes.",
                        "¿Hay algún riesgo en estas conciliaciones?"
                    ]}
                    onTransaction={handleAiTransaction}
                 />
            </div>
        </div>
    );
};

export default ConciliationScreen;
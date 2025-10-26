import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { SUSTAINABILITY_DATA } from '../constants';
import AiAssistantPanel from '../components/AiAssistantPanel';
import { LeafIcon, DocumentIcon } from '../components/icons';
import HelpTooltip from '../components/HelpTooltip';

const RADIAN = Math.PI / 180;
const renderCustomizedPieLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
  const radius = outerRadius + 25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text x={x} y={y} fill="#6b7280" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const HistoricalFootprintChart = () => (
     <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SUSTAINABILITY_DATA.historicalFootprint} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                 <defs>
                    <linearGradient id="colorFootprint" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#007CBE" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#007CBE" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(val) => `${val/1000}k`} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => [`${value.toLocaleString()} kg CO₂`, "Huella de Carbono"]}/>
                <Area type="monotone" dataKey="footprint" stroke="#007CBE" fill="url(#colorFootprint)" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);


const SustainabilityScreen: React.FC = () => {
    const [activeRecommendations, setActiveRecommendations] = useState<Set<number>>(new Set());

    const simulatedData = useMemo(() => {
        let simulatedFootprint = SUSTAINABILITY_DATA.currentMonthFootprint;
        const simulatedBreakdown = [...SUSTAINABILITY_DATA.breakdown.map(b => ({...b}))];

        activeRecommendations.forEach(recId => {
            const rec = SUSTAINABILITY_DATA.recommendations.find(r => r.id === recId);
            if (rec) {
                simulatedFootprint -= rec.impactValue;
                const category = simulatedBreakdown.find(b => b.name === rec.category);
                if (category) {
                    category.footprint = Math.max(0, category.footprint - rec.impactValue);
                }
            }
        });
        return { footprint: simulatedFootprint, breakdown: simulatedBreakdown };
    }, [activeRecommendations]);

    const { previousMonthFootprint, sectorAverageFootprint, recommendations, kpis } = SUSTAINABILITY_DATA;
    const { footprint: currentFootprint, breakdown } = simulatedData;
    
    const change = currentFootprint - previousMonthFootprint;
    const isReduction = change <= 0;
    
    const isSimulating = activeRecommendations.size > 0;

    const comparisonData = [
        { name: 'Tu Empresa', value: currentFootprint, fill: '#1464A5' },
        { name: 'Media Sector', value: sectorAverageFootprint, fill: '#D6E6F5' },
    ];

    const toggleRecommendation = (id: number) => {
        setActiveRecommendations(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium text-gray-500">Huella de Carbono (Este Mes)</h3>
                            {isSimulating && <span className="text-xs font-bold text-white bg-bbva-accent px-2 py-1 rounded-full">SIMULACIÓN ACTIVA</span>}
                        </div>
                        <p className="text-3xl font-bold text-bbva-blue my-2">{currentFootprint.toLocaleString()} <span className="text-lg">kg CO₂</span></p>
                        <p className={`text-sm font-semibold ${isReduction ? 'text-gray-600' : 'text-bbva-blue'}`}>{change.toFixed(0)} kg ({((change / previousMonthFootprint) * 100).toFixed(1)}%) vs. mes anterior</p>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-sm font-medium text-gray-500">Comparativa del Sector</h3>
                        <div className="h-24">
                           <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={comparisonData} layout="vertical" margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                                    <XAxis type="number" hide /><YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} axisLine={false} tickLine={false}/>
                                    <Tooltip formatter={(value: number) => `${value.toLocaleString()} kg CO₂`}/><Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Ratios Clave de Sostenibilidad</h3>
                        <HelpTooltip content="Indicadores que relacionan tu huella de carbono con métricas de negocio, como el número de empleados o los ingresos, para medir tu eficiencia." />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-bbva-blue">{kpis.emissionsPerEmployee.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">kg CO₂ / empleado</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-bbva-blue">{kpis.emissionsPerRevenue.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">kg CO₂ / 1k€ Ingresos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Simulador de Impacto: Recomendaciones</h3>
                        <HelpTooltip content="Activa las recomendaciones de la IA para ver cómo reducirían tu huella de carbono total y su desglose por categoría." />
                    </div>
                     <p className="text-sm text-gray-600 mb-4">Activa las recomendaciones para ver su impacto combinado en tu huella de carbono.</p>
                     <div className="space-y-4">
                        {recommendations.map(rec => (
                             <label key={rec.id} htmlFor={`rec-${rec.id}`} className={`block bg-gray-50 p-4 rounded-lg flex items-start space-x-4 cursor-pointer transition-all ${activeRecommendations.has(rec.id) ? 'ring-2 ring-bbva-accent' : 'border border-transparent'}`}>
                                <input type="checkbox" id={`rec-${rec.id}`} checked={activeRecommendations.has(rec.id)} onChange={() => toggleRecommendation(rec.id)} className="mt-1 h-4 w-4 accent-bbva-accent" />
                                <div className="flex-shrink-0 bg-gray-200 p-2 rounded-full"><LeafIcon className="h-6 w-6 text-gray-700" /></div>
                                <div><h4 className="font-semibold text-bbva-blue">{rec.title}</h4><p className="text-sm text-gray-700">{rec.description}</p><p className="text-sm font-bold text-gray-600 mt-1">{rec.impact}</p></div>
                            </label>
                        ))}
                     </div>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Evolución de la Huella de Carbono</h3>
                        <HelpTooltip content="Gráfico que muestra la tendencia de tu huella de carbono en los últimos meses." />
                    </div>
                     <HistoricalFootprintChart />
                </div>
            </div>
            <div className="lg:col-span-1 space-y-6">
                 <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Informes</h3>
                        <HelpTooltip content="Genera un informe resumido en PDF con los datos más relevantes de tu perfil de sostenibilidad." />
                    </div>
                    <button className="w-full bg-bbva-blue text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90 flex items-center justify-center space-x-2">
                        <DocumentIcon className="h-5 w-5" />
                        <span>Generar Informe de Sostenibilidad</span>
                    </button>
                </div>
                 <AiAssistantPanel 
                    title="Asistente de Sostenibilidad"
                    quickPrompts={["¿Cuál es mi mayor fuente de emisiones?", "Dame más detalles sobre cómo cambiar a un proveedor de energía verde.", "Calcula el ahorro si reduzco los viajes un 10%.",]}
                 />
            </div>
        </div>
    );
};

export default SustainabilityScreen;
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PAYROLL_DATA, PAYROLL_HISTORY_DATA } from '../constants';
import AiAssistantPanel from '../components/AiAssistantPanel';
import { PayrollBatch } from '../types';
import { SparklesIcon, ExclamationTriangleIcon, LightBulbIcon } from '../components/icons';
import { getProactiveClientInsight } from '../services/geminiService';
import HelpTooltip from '../components/HelpTooltip';

const AIProactivePayrollSummary = () => {
    const [summary, setSummary] = useState<{ title: string; text: string } | null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            const data = await getProactiveClientInsight('payroll');
            setSummary(data);
        };
        fetchSummary();
    }, []);

    if (!summary) return <div className="h-24"></div>;

    return (
        <div className="bg-bbva-light-blue p-6 rounded-lg border border-blue-200 shadow-lg mb-6">
            <div className="flex items-start space-x-4">
                <SparklesIcon className="h-6 w-6 text-bbva-accent flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-bbva-blue text-lg mb-1">{summary.title}</h3>
                    <p className="text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: summary.text }} />
                </div>
            </div>
        </div>
    );
};

const PayrollHistoryChart = () => (
    <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PAYROLL_HISTORY_DATA} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1464A5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#1464A5" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(val) => `${val/1000}k`} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => [new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value), "Coste Total"]}/>
                <Area type="monotone" dataKey="totalAmount" stroke="#1464A5" fillOpacity={1} fill="url(#colorPayroll)" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);


const PayrollScreen: React.FC = () => {
    const [payroll, setPayroll] = useState<PayrollBatch>(PAYROLL_DATA[0]);
    const [history] = useState<PayrollBatch[]>(PAYROLL_DATA.slice(1));
    const [aiPrompt, setAiPrompt] = useState('');

    const handleCorrectIncident = (description: string) => {
        setAiPrompt(`Ayúdame a corregir la incidencia: "${description}"`);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <AIProactivePayrollSummary />
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                           <h3 className="text-lg font-semibold text-gray-800">Próximo Cierre de Nóminas: {payroll.month}</h3>
                           <HelpTooltip content="Resumen de la próxima remesa de nóminas pendiente de revisión y firma."/>
                        </div>
                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">{payroll.status}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center my-6">
                        <div><p className="text-sm text-gray-500">Nº Empleados</p><p className="text-2xl font-bold text-bbva-blue">{payroll.employeeCount}</p></div>
                        <div><p className="text-sm text-gray-500">Importe Total</p><p className="text-2xl font-bold text-bbva-blue">{payroll.totalAmount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR'})}</p></div>
                        <div><p className="text-sm text-gray-500">Fecha de Pago</p><p className="text-2xl font-bold text-bbva-blue">{payroll.paymentDate}</p></div>
                    </div>
                    <button className="w-full bg-bbva-blue text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90">
                        Revisar y Firmar Remesa
                    </button>
                </div>

                 {payroll.incidents.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Incidencias Detectadas por IA</h3>
                            <HelpTooltip content="La IA analiza cada remesa en busca de anomalías o desviaciones que requieran tu atención antes de la firma."/>
                        </div>
                        <div className="space-y-4">
                            {payroll.incidents.map(incident => (
                                <div key={incident.id} className={`p-4 rounded-lg flex items-start space-x-3 ${incident.severity === 'critical' ? 'bg-bbva-light-blue border-l-4 border-bbva-accent' : 'bg-gray-100 border-l-4 border-gray-400'}`}>
                                    <ExclamationTriangleIcon className={`h-6 w-6 flex-shrink-0 ${incident.severity === 'critical' ? 'text-bbva-accent' : 'text-gray-500'}`} />
                                    <div>
                                        <p className="font-semibold text-gray-900">{incident.employee}</p>
                                        <p className="text-sm text-gray-700">{incident.description}</p>
                                        <button onClick={() => handleCorrectIncident(incident.description)} className="text-sm font-medium text-bbva-accent hover:underline mt-1 flex items-center space-x-1">
                                            <LightBulbIcon className="h-4 w-4" />
                                            <span>Resolver con IA</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Historial de Coste de Nóminas</h3>
                        <HelpTooltip content="Evolución mensual del coste total de las nóminas de tu empresa."/>
                    </div>
                     <PayrollHistoryChart />
                </div>
            </div>

            <div className="lg:col-span-1">
                 <AiAssistantPanel 
                    key={aiPrompt}
                    title="Asistente de Nóminas"
                    quickPrompts={aiPrompt ? [aiPrompt] : [
                        "Calcula el coste total de empresa para la próxima nómina.",
                        "¿Cuál es la fecha límite para el pago de impuestos de la seguridad social?",
                        "Prepara la remesa de nóminas para el mes que viene.",
                    ]}
                 />
            </div>
        </div>
    );
};

export default PayrollScreen;
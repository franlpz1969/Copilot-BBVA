import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SparklesIcon } from './icons';
import { CashFlowDataPoint } from '../types';

interface CashFlowChartProps {
    data: (CashFlowDataPoint & { netFlow: number; originalNetFlow?: number })[];
    title: string;
}

const formatCurrency = (value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(value);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const isSimulating = payload[0].payload.originalNetFlow !== undefined;
        return (
            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg border dark:border-gray-600">
                <p className="font-bold text-gray-800 dark:text-gray-100 text-sm mb-1">{label}</p>
                <p className="text-xs text-green-700 dark:text-green-400">Ingresos: {formatCurrency(payload[0].value)}</p>
                <p className="text-xs text-red-700 dark:text-red-400">Gastos: {formatCurrency(payload[1].value)}</p>
                <p className="text-xs text-bbva-blue dark:text-blue-300 font-bold mt-1">
                    {isSimulating ? 'Flujo Neto Simulado' : 'Flujo Neto'}: {formatCurrency(payload[2].value)}
                </p>
                {isSimulating && (
                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Flujo Neto Original: {formatCurrency(payload[0].payload.originalNetFlow)}
                    </p>
                )}
            </div>
        );
    }
    return null;
};

const CashFlowChart: React.FC<CashFlowChartProps> = ({ data, title }) => {
    const formatYAxis = (tickItem: number) => `${(tickItem / 1000)}k`;

    const totalIncome = data.reduce((acc, item) => acc + item.income, 0);
    const totalExpenses = data.reduce((acc, item) => acc + item.expenses, 0);
    const totalNetFlow = totalIncome - totalExpenses;
    const isSimulating = data[0]?.originalNetFlow !== undefined;


    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-1">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Análisis de ingresos, gastos y flujo neto de los últimos 6 meses.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-center">
                <div className="bg-green-50 dark:bg-green-900/50 p-2 rounded-lg">
                    <p className="text-xs text-green-800 dark:text-green-300">Ingresos Totales</p>
                    <p className="text-lg font-bold text-green-700 dark:text-green-400">{formatCurrency(totalIncome)}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/50 p-2 rounded-lg">
                    <p className="text-xs text-red-800 dark:text-red-300">Gastos Totales</p>
                    <p className="text-lg font-bold text-red-700 dark:text-red-400">{formatCurrency(totalExpenses)}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/50 p-2 rounded-lg">
                    <p className="text-xs text-blue-800 dark:text-blue-300">Flujo de Caja Neto</p>
                    <p className={`text-lg font-bold ${totalNetFlow >= 0 ? 'text-blue-700 dark:text-blue-400' : 'text-red-700 dark:text-red-400'}`}>{formatCurrency(totalNetFlow)}</p>
                </div>
            </div>

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <ComposedChart
                        data={data}
                        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(125, 125, 125, 0.2)" />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'rgb(156 163 175)' }} />
                        <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: 'rgb(156 163 175)' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{fontSize: "11px", color: 'rgb(156 163 175)'}}/>
                        <Bar dataKey="income" fill="#1464A5" name={isSimulating ? "Ingresos Simulados" : "Ingresos"} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="expenses" fill="#B3D4E8" name={isSimulating ? "Gastos Simulados" : "Gastos"} radius={[4, 4, 0, 0]} />
                        {isSimulating && (
                            <Line type="monotone" dataKey="originalNetFlow" stroke="#94a3b8" strokeWidth={2} name="Flujo Neto Original" strokeDasharray="5 5" dot={{ r: 4, stroke: '#94a3b8', fill: '#e2e8f0' }} />
                        )}
                        <Line type="monotone" dataKey="netFlow" stroke="#072146" strokeWidth={2} name={isSimulating ? "Flujo Neto Simulado" : "Flujo Neto"} dot={{ r: 4 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 bg-bbva-light-blue dark:bg-gray-700/50 p-3 rounded-lg border border-blue-200 dark:border-gray-600">
                <div className="flex items-start space-x-3">
                    <SparklesIcon className="h-5 w-5 text-bbva-accent flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-bbva-blue dark:text-blue-300 text-sm">Análisis del Copiloto IA</h4>
                        <p className="text-xs text-gray-800 dark:text-gray-300 mt-1">
                            He observado una tendencia positiva en tu flujo de caja neto, con un pico en <strong>Abril</strong>. Sin embargo, en <strong>Junio</strong>, el aumento de gastos fue proporcionalmente mayor al de ingresos, resultando en un flujo neto inferior. Te sugiero <strong>analizar los gastos de Junio</strong> para identificar optimizaciones.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashFlowChart;
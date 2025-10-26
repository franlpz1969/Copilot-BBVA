import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';
import { TPV_DATA } from '../constants';
import AiAssistantPanel from '../components/AiAssistantPanel';
import { CreditCardIcon, SparklesIcon, BuildingStorefrontIcon, DevicePhoneMobileIcon } from '../components/icons';
import HelpTooltip from '../components/HelpTooltip';

const TPVsalesChart = () => {
    const formatYAxis = (tickItem: number) => `${(tickItem / 1000)}k`;
    
    const combinedData = TPV_DATA.last7DaysSales.map((item, index) => ({
        ...item,
        previousSales: TPV_DATA.previous7DaysSales[index].sales,
    }));

    return (
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={combinedData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number, name: string) => [new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value), name === 'sales' ? 'Ventas Actuales' : 'Ventas Semana Anterior']}/>
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Bar dataKey="sales" fill="#1464A5" name="Ventas Actuales" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="previousSales" stroke="#007CBE" name="Ventas Semana Anterior" strokeWidth={2} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const TPVProactiveSummary = () => (
    <div className="bg-bbva-light-blue p-6 rounded-lg border border-blue-200 shadow-lg mb-6">
        <div className="flex items-start space-x-4">
            <SparklesIcon className="h-6 w-6 text-bbva-accent flex-shrink-0 mt-1" />
            <div>
                <h3 className="font-bold text-bbva-blue text-lg mb-1">Análisis Proactivo del Asistente IA</h3>
                <p className="text-sm text-gray-800">
                    Fran, he observado un **incremento del 15%** en la facturación de tus TPVs durante el fin de semana. ¡Excelente resultado! La **Tienda Central** sigue siendo tu punto de venta más rentable, aportando el 57% del total.
                </p>
            </div>
        </div>
    </div>
);

const StorePerformanceChart = () => {
    const formatXAxis = (tickItem: number) => `${(tickItem / 1000)}k`;
    return(
        <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TPV_DATA.storePerformance} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <XAxis type="number" tickFormatter={formatXAxis} tick={{ fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} axisLine={false} tickLine={false}/>
                    <Tooltip formatter={(value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)}/>
                    <Bar dataKey="sales" fill="#072146" barSize={20} radius={[0, 4, 4, 0]} name="Ventas"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

const TPVScreen: React.FC = () => {
    const { totalSalesMonth, transactionsMonth, currency, terminals, storePerformance, topProducts } = TPV_DATA;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <TPVProactiveSummary />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-sm font-medium text-gray-500">Facturación Total (Mes)</p>
                        <p className="text-3xl font-bold text-bbva-blue my-2">{totalSalesMonth.toLocaleString('es-ES', { style: 'currency', currency })}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-sm font-medium text-gray-500">Nº de Transacciones (Mes)</p>
                        <p className="text-3xl font-bold text-bbva-blue my-2">{transactionsMonth.toLocaleString('es-ES')}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Ventas: Comparativa Semanal</h3>
                        <HelpTooltip content="Compara las ventas de los últimos 7 días (barras azules) con las de los 7 días anteriores (línea azul claro) para identificar tendencias." />
                    </div>
                    <TPVsalesChart />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Rendimiento por Tienda</h3>
                            <HelpTooltip content="Visualiza y compara el total de ventas de cada uno de tus puntos de venta físicos y online." />
                        </div>
                        <StorePerformanceChart />
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Top Productos y Servicios</h3>
                            <HelpTooltip content="Ranking de los productos o servicios que generan más ingresos a través de los TPVs." />
                        </div>
                        <div className="space-y-3">
                            {topProducts.map(product => (
                                <div key={product.name} className="flex justify-between items-center text-sm">
                                    <p className="text-gray-700 font-medium">{product.name}</p>
                                    <p className="font-bold text-bbva-blue">{product.sales.toLocaleString('es-ES', {style: 'currency', currency:'EUR'})}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Contratación de TPVs</h3>
                        <HelpTooltip content="Solicita nuevos terminales de punto de venta para tu negocio. El asistente IA te guiará en el proceso." />
                    </div>
                     <div className="space-y-3">
                        <button className="w-full flex items-center space-x-3 text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border">
                            <BuildingStorefrontIcon className="h-8 w-8 text-bbva-accent"/>
                            <div>
                                <p className="font-semibold text-bbva-blue">TPV Físico o Inalámbrico</p>
                                <p className="text-xs text-gray-500">Para tu tienda o restaurante.</p>
                            </div>
                        </button>
                         <button className="w-full flex items-center space-x-3 text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border">
                            <DevicePhoneMobileIcon className="h-8 w-8 text-bbva-accent"/>
                            <div>
                                <p className="font-semibold text-bbva-blue">TPV Virtual o Móvil</p>
                                <p className="text-xs text-gray-500">Cobra desde tu móvil o en tu web.</p>
                            </div>
                        </button>
                     </div>
                </div>
                <AiAssistantPanel 
                    title="Asistente de TPVs"
                    quickPrompts={[
                        "Quiero contratar un TPV virtual para mi móvil.",
                        "Resume las comisiones de mis TPVs.",
                        "¿Qué tienda es la más rentable?",
                        "Compara la facturación de esta semana con la anterior."
                    ]}
                 />
            </div>
        </div>
    );
};

export default TPVScreen;
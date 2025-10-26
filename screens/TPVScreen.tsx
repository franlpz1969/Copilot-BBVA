
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
        <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={combinedData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(value: number, name: string) => [new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value), name === 'sales' ? 'Ventas Actuales' : 'Ventas Semana Anterior']} wrapperClassName="text-xs" />
                    <Legend wrapperStyle={{fontSize: "11px"}}/>
                    <Bar dataKey="sales" fill="#1464A5" name="Ventas Actuales" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="previousSales" stroke="#007CBE" name="Ventas Semana Anterior" strokeWidth={2} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const TPVProactiveSummary = () => (
    <div className="bg-bbva-light-blue p-4 rounded-lg border border-blue-200 shadow-lg mb-4">
        <div className="flex items-start space-x-3">
            <SparklesIcon className="h-5 w-5 text-bbva-accent flex-shrink-0 mt-0.5" />
            <div>
                <h3 className="font-bold text-bbva-blue text-base mb-1">Análisis Proactivo del Asistente IA</h3>
                <p className="text-xs text-gray-800">
                    Fran, he observado un **incremento del 15%** en la facturación de tus TPVs durante el fin de semana. ¡Excelente resultado! La **Tienda Central** sigue siendo tu punto de venta más rentable, aportando el 57% del total.
                </p>
            </div>
        </div>
    </div>
);

const StorePerformanceChart = () => {
    const formatXAxis = (tickItem: number) => `${(tickItem / 1000)}k`;
    return(
        <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TPV_DATA.storePerformance} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                    <XAxis type="number" tickFormatter={formatXAxis} tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 11 }} axisLine={false} tickLine={false}/>
                    <Tooltip formatter={(value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)} wrapperClassName="text-xs"/>
                    <Bar dataKey="sales" fill="#072146" barSize={18} radius={[0, 4, 4, 0]} name="Ventas"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

const TPVScreen: React.FC = () => {
    const { totalSalesMonth, transactionsMonth, currency, terminals, storePerformance, topProducts } = TPV_DATA;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
                <TPVProactiveSummary />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p className="text-sm font-medium text-gray-500">Facturación Total (Mes)</p>
                        <p className="text-2xl font-bold text-bbva-blue my-1">{totalSalesMonth.toLocaleString('es-ES', { style: 'currency', currency })}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p className="text-sm font-medium text-gray-500">Nº de Transacciones (Mes)</p>
                        <p className="text-2xl font-bold text-bbva-blue my-1">{transactionsMonth.toLocaleString('es-ES')}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                     <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-semibold text-gray-800">Ventas: Comparativa Semanal</h3>
                        <HelpTooltip content="Compara las ventas de los últimos 7 días con los 7 anteriores." />
                    </div>
                    <TPVsalesChart />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-base font-semibold text-gray-800">Rendimiento por Tienda</h3>
                            <HelpTooltip content="Visualiza las ventas de cada punto de venta físico y online." />
                        </div>
                        <StorePerformanceChart />
                    </div>
                     <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-base font-semibold text-gray-800">Top Productos y Servicios</h3>
                            <HelpTooltip content="Ranking de productos que más ingresos generan vía TPVs." />
                        </div>
                        <div className="space-y-2">
                            {topProducts.map(product => (
                                <div key={product.name} className="flex justify-between items-center text-xs">
                                    <p className="text-gray-700 font-medium">{product.name}</p>
                                    <p className="font-bold text-bbva-blue">{product.sales.toLocaleString('es-ES', {style: 'currency', currency:'EUR'})}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-4 h-[calc(100vh-88px)] sticky top-4">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                     <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-semibold text-gray-800">Contratación de TPVs</h3>
                        <HelpTooltip content="Solicita nuevos terminales. El asistente IA te guiará." />
                    </div>
                     <div className="space-y-2">
                        <button className="w-full flex items-center space-x-3 text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border">
                            <BuildingStorefrontIcon className="h-7 w-7 text-bbva-accent"/>
                            <div>
                                <p className="font-semibold text-sm text-bbva-blue">TPV Físico o Inalámbrico</p>
                                <p className="text-xs text-gray-500">Para tu tienda o restaurante.</p>
                            </div>
                        </button>
                         <button className="w-full flex items-center space-x-3 text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border">
                            <DevicePhoneMobileIcon className="h-7 w-7 text-bbva-accent"/>
                            <div>
                                <p className="font-semibold text-sm text-bbva-blue">TPV Virtual o Móvil</p>
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

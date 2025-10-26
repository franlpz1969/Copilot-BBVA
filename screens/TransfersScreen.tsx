
import React, { useState, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TRANSFERS_DATA } from '../constants';
import { Transfer, TransferRisk } from '../types';
import AiAssistantPanel from '../components/AiAssistantPanel';
import { FilterIcon, ExclamationTriangleIcon, CheckCircleIcon, SparklesIcon } from '../components/icons';

const kpiData = [
    { name: 'Page A', uv: 1000, pv: 2400 }, { name: 'Page B', uv: 3000, pv: 1398 },
    { name: 'Page C', uv: 2000, pv: 9800 }, { name: 'Page D', uv: 2780, pv: 3908 },
    { name: 'Page E', uv: 1890, pv: 4800 }, { name: 'Page F', uv: 4000, pv: 2000 },
];
const KPIChart = () => (
    <div className="h-16 mt-2">
        <ResponsiveContainer width="100%" height="100%"><LineChart data={kpiData}><Line type="monotone" dataKey="pv" stroke="#1464A5" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer>
    </div>
);

const HighRiskTransferWarning: React.FC<{ transfer: Transfer }> = ({ transfer }) => (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-lg">
        <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
                <h4 className="font-bold text-red-800">Atención Requerida: Transferencia de Alto Riesgo</h4>
                <p className="text-sm text-red-700 mt-1">
                    La transferencia a <strong>{transfer.provider}</strong> por <strong>{transfer.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</strong> requiere tu aprobación manual y doble verificación.
                </p>
            </div>
        </div>
    </div>
);

const AITransferSummary = ({ transfers }) => {
    const highRiskCount = transfers.filter(t => t.risk === 'Alto riesgo' && t.status !== 'completed').length;
    const newProviderTransfers = transfers.filter(t => t.provider === 'Global Imports Inc.' && t.status !== 'completed').length;

    if (highRiskCount === 0 && newProviderTransfers === 0) return null;

    return (
        <div className="bg-bbva-light-blue p-4 rounded-lg border border-blue-200 shadow-lg mb-4">
            <div className="flex items-start space-x-3">
                <SparklesIcon className="h-5 w-5 text-bbva-accent flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-bbva-blue text-sm">Resumen del Asistente IA</h4>
                    <p className="text-xs text-gray-800 mt-1">
                        He analizado las transferencias pendientes y te recomiendo prestar especial atención a:
                    </p>
                    <ul className="list-disc list-inside text-xs mt-2 space-y-1">
                        {highRiskCount > 0 && <li>Hay <strong>{highRiskCount} transferencia(s) de alto riesgo</strong> por su elevado importe.</li>}
                        {newProviderTransfers > 0 && <li>La transferencia a <strong>Global Imports Inc.</strong> es a un proveedor nuevo.</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};


const FiltersSidebar = ({ filters, setFilters, responsibleParties }) => {
    const handleRiskChange = (e) => {
        const { value, checked } = e.target;
        const riskValue = value as TransferRisk;
        setFilters(prev => {
            const newRisk = new Set(prev.risk);
            if (checked) { newRisk.add(riskValue); } else { newRisk.delete(riskValue); }
            return { ...prev, risk: Array.from(newRisk) };
        });
    };
    const clearFilters = () => setFilters({ risk: [], amount: 160000, responsible: 'Todos' });

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg h-full">
            <div className="flex justify-between items-center mb-4"><h3 className="text-sm font-semibold text-gray-800">Filtros</h3><FilterIcon className="h-4 w-4 text-gray-500" /></div>
            <div className="space-y-4">
                <div><label className="block text-xs font-medium text-gray-700 mb-2">Riesgo</label><div className="space-y-1.5"><div className="flex items-center"><input type="checkbox" value="Bajo riesgo" onChange={handleRiskChange} checked={filters.risk.includes('Bajo riesgo')} className="h-3.5 w-3.5 rounded accent-bbva-accent"/> <span className="ml-2 text-xs">Bajo riesgo</span></div><div className="flex items-center"><input type="checkbox" value="Medio riesgo" onChange={handleRiskChange} checked={filters.risk.includes('Medio riesgo')} className="h-3.5 w-3.5 rounded accent-bbva-accent"/> <span className="ml-2 text-xs">Medio riesgo</span></div><div className="flex items-center"><input type="checkbox" value="Alto riesgo" onChange={handleRiskChange} checked={filters.risk.includes('Alto riesgo')} className="h-3.5 w-3.5 rounded accent-bbva-accent"/> <span className="ml-2 text-xs">Alto riesgo</span></div></div></div>
                <div><label htmlFor="amount" className="block text-xs font-medium text-gray-700">Monto Máximo</label><input type="range" id="amount" name="amount" min="0" max="160000" step="1000" value={filters.amount} onChange={e => setFilters(f => ({...f, amount: Number(e.target.value)}))} className="mt-1 block w-full accent-bbva-accent" /><div className="flex justify-between text-xs text-gray-500"><span>€0</span><span>€{filters.amount.toLocaleString()}</span></div></div>
                <div><label htmlFor="responsible" className="block text-xs font-medium text-gray-700">Responsable</label><select id="responsible" value={filters.responsible} onChange={e => setFilters(f => ({...f, responsible: e.target.value}))} className="mt-1 w-full p-1.5 border rounded-md text-xs focus:ring-bbva-accent focus:border-bbva-accent">{responsibleParties.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                <div className="border-t pt-3 space-y-2"><button onClick={clearFilters} className="w-full text-gray-600 py-1.5 px-3 rounded-lg hover:bg-gray-100 border text-xs">Limpiar Filtros</button></div>
            </div>
        </div>
    );
};

const riskStyles: { [key in TransferRisk]: string } & { [key: string]: string } = {
    'Bajo riesgo': 'border-l-4 border-green-500 bg-white',
    'Medio riesgo': 'border-l-4 border-yellow-500 bg-white',
    'Alto riesgo': 'border-l-4 border-red-500 bg-white',
    'completed': 'border-l-4 border-gray-400 bg-gray-50 opacity-60',
};

const TransferCard: React.FC<{ transfer: Transfer }> = ({ transfer }) => (
    <div className={`p-3 rounded-lg shadow-md ${riskStyles[transfer.status === 'completed' ? 'completed' : transfer.risk || 'Bajo riesgo']}`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold text-base text-bbva-blue">{transfer.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
                <p className="text-xs font-medium text-gray-700">{transfer.provider}</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-500">Resp: {transfer.responsible}</p>
                <p className="text-xs text-gray-500">{transfer.date}</p>
                {transfer.status === 'completed' && <span className="text-[10px] font-bold text-gray-500">FIRMADO</span>}
            </div>
        </div>
    </div>
);

const TransfersScreen: React.FC = () => {
    const [transfers, setTransfers] = useState<Transfer[]>(TRANSFERS_DATA);
    const [showSuccess, setShowSuccess] = useState('');
    const [filters, setFilters] = useState({ risk: [], amount: 160000, responsible: 'Todos' });

    const responsibleParties = useMemo(() => ['Todos', ...Array.from(new Set(transfers.map(t => t.responsible).filter(Boolean)))], [transfers]);

    const filteredTransfers = useMemo(() => {
        return transfers.filter(t => {
            const riskMatch = filters.risk.length === 0 || (t.risk && filters.risk.includes(t.risk));
            const amountMatch = t.amount <= filters.amount;
            const responsibleMatch = filters.responsible === 'Todos' || t.responsible === filters.responsible;
            return riskMatch && amountMatch && responsibleMatch;
        });
    }, [filters, transfers]);

    const handleSignLowRisk = () => {
        setTransfers(prev => prev.map(t => t.risk === 'Bajo riesgo' && t.status !== 'completed' ? {...t, status: 'completed' } : t));
        setShowSuccess('¡Transferencias de bajo riesgo firmadas con éxito!');
        setTimeout(() => setShowSuccess(''), 3000);
    };

    const handleAITransaction = (transactionId: number) => {
        setTransfers(prev => prev.map(t => t.id === transactionId ? {...t, status: 'completed'} : t));
        setShowSuccess(`¡Transferencia #${transactionId} aprobada y firmada con la ayuda de IA!`);
        setTimeout(() => setShowSuccess(''), 4000);
    };

    const highRiskTransfer = useMemo(() => filteredTransfers.find(t => t.risk === 'Alto riesgo' && t.status !== 'completed'), [filteredTransfers]);
    const pendingLowRiskCount = useMemo(() => filteredTransfers.filter(t => t.risk === 'Bajo riesgo' && t.status !== 'completed').length, [filteredTransfers]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
            <div className="lg:col-span-3"><FiltersSidebar filters={filters} setFilters={setFilters} responsibleParties={responsibleParties} /></div>
            <div className="lg:col-span-5 space-y-4">
                 <AITransferSummary transfers={filteredTransfers} />
                 <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-base font-semibold text-gray-800">Transferencias Pendientes</h3>
                        <button onClick={handleSignLowRisk} disabled={pendingLowRiskCount === 0} className="bg-bbva-blue text-white text-xs font-semibold py-1.5 px-3 rounded-lg hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">Firmar {pendingLowRiskCount} de bajo riesgo</button>
                    </div>
                     {showSuccess && (<div className="bg-green-100 border border-green-300 text-green-800 px-3 py-1.5 rounded-lg mb-3 text-xs text-center flex items-center justify-center space-x-2"><CheckCircleIcon className="h-4 w-4"/><span>{showSuccess}</span></div>)}
                    <div className="space-y-2 h-[420px] overflow-y-auto pr-2">
                        {filteredTransfers.length > 0 ? (
                            filteredTransfers.map(t => <TransferCard key={t.id} transfer={t} />)
                        ) : (<p className="text-center text-gray-500 pt-10 text-sm">No hay transferencias que coincidan.</p>)}
                    </div>
                </div>
            </div>
             <div className="lg:col-span-4 h-[calc(100vh-88px)] sticky top-4">
                 <AiAssistantPanel 
                    title="Asistente de Transferencias"
                    quickPrompts={["Pagar la factura de Global Imports Inc.", "Analiza las transferencias de alto riesgo.", "Muéstrame la transferencia de mayor importe.", "¿Hay transferencias inusuales este mes?"]}
                    onTransaction={handleAITransaction}
                 />
            </div>
        </div>
    );
};

export default TransfersScreen;

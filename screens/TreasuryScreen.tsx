
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TREASURY_ACCOUNTS, SUGGESTED_ACTIONS_TREASURY, CASH_FLOW_PROJECTION_DATA, CREDIT_LINE_DATA } from '../constants';
import AiAssistantPanel from '../components/AiAssistantPanel';
import { Account, RecommendedAction } from '../types';
import { DocumentIcon, CheckCircleIcon, UserCircleIcon, AnalyticsIcon, LightBulbIcon, XIcon, SparklesIcon, ReceiptPercentIcon } from '../components/icons/index';
import AccountDistributionChart from '../components/AccountDistributionChart';
import { getProactiveClientInsight } from '../services/geminiService';

const riskStyles = { 'Bajo': 'text-green-600 bg-green-100', 'Medio': 'text-yellow-600 bg-yellow-100', 'Alto': 'text-red-600 bg-red-100' };

interface AccountCardProps { account: Account; }
const AccountCard: React.FC<AccountCardProps> = ({account}) => (
    <div className="flex items-center justify-between p-3 bg-white shadow-md rounded-lg">
        <div className="flex items-center space-x-3">
             <div className="p-2 bg-bbva-light-blue rounded-full"><UserCircleIcon className="h-5 w-5 text-bbva-accent"/></div>
             <div><p className="font-semibold text-sm text-gray-800">{account.name}</p><p className="text-xs text-gray-500">{account.number} | {account.balance.toLocaleString('es-ES', { style: 'currency', currency: account.currency})}</p></div>
        </div>
        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${riskStyles[account.risk || 'Bajo']}`}>Riesgo {account.risk}</span>
    </div>
);

const actionIconMap: { [key in RecommendedAction['icon']]: React.ReactNode } = {
    approval: <div className="p-1.5 bg-bbva-light-blue rounded-full"><CheckCircleIcon className="h-4 w-4 text-blue-500" /></div>,
    report: <div className="p-1.5 bg-yellow-100 rounded-full"><DocumentIcon className="h-4 w-4 text-yellow-600" /></div>,
    contact: <div className="p-1.5 bg-bbva-light-blue rounded-full"><UserCircleIcon className="h-4 w-4 text-blue-500" /></div>,
    analyze: <div className="p-1.5 bg-gray-100 rounded-full"><AnalyticsIcon className="h-4 w-4 text-gray-500" /></div>,
    difference: <div/>,
};

interface SuggestedActionProps { action: RecommendedAction & { completed: boolean }; onToggle: (id: number) => void; }
const SuggestedAction: React.FC<SuggestedActionProps> = ({action, onToggle}) => (
    <div className="flex items-start space-x-2">
        <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 accent-bbva-accent" checked={action.completed} onChange={() => onToggle(action.id)} />
        {actionIconMap[action.icon]}
        <div className={action.completed ? 'opacity-50' : ''}><p className={`font-medium text-sm text-gray-800 ${action.completed ? 'line-through' : ''}`}>{action.title}</p><p className={`text-xs text-gray-500 ${action.completed ? 'line-through' : ''}`}>{action.description}</p></div>
    </div>
);

const AIClientAdvisor = () => {
    const [insight, setInsight] = useState<{title: string, text: string} | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchInsight = async () => {
            const insightData = await getProactiveClientInsight();
            setInsight(insightData);
        };
        fetchInsight();
    }, []);

    if(!isVisible || !insight) return null;

    return (
        <div className="bg-bbva-light-blue p-4 rounded-lg border border-blue-200 relative shadow-lg">
            <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2 text-blue-800 hover:text-blue-900"><XIcon className="h-4 w-4" /></button>
            <div className="flex items-start space-x-3">
                <SparklesIcon className="h-5 w-5 text-bbva-accent flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-bold text-bbva-blue text-base mb-1">{insight.title}</h3>
                    <p className="text-xs text-bbva-blue" dangerouslySetInnerHTML={{ __html: insight.text }} />
                    <button className="mt-3 bg-bbva-blue text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-opacity-90 text-xs">Preguntar al Asistente</button>
                </div>
            </div>
        </div>
    )
};

const CashFlowProjectionChart = () => (
    <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-base font-semibold text-gray-800 mb-2">Proyección Flujo de Caja (5 sem)</h3>
        <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CASH_FLOW_PROJECTION_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                    <defs><linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1464A5" stopOpacity={0.8}/><stop offset="95%" stopColor="#1464A5" stopOpacity={0}/></linearGradient><linearGradient id="colorProjection" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/><stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/></linearGradient></defs>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis tickFormatter={(val) => `${val/1000}k`} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)} wrapperClassName="text-xs" />
                    <Area type="monotone" dataKey="balance" stroke="#1464A5" fill="url(#colorBalance)" name="Balance" /><Area type="monotone" dataKey="projection" stroke="#82ca9d" fill="url(#colorProjection)" name="Proyección" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const CreditLineDetails = () => (
    <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2 mb-3">
            <ReceiptPercentIcon className="h-5 w-5 text-white bg-bbva-accent p-0.5 rounded-md" />
            <h3 className="text-base font-semibold text-gray-800">Línea de Crédito</h3>
        </div>
         <div className="space-y-1.5">
            <div className="flex justify-between text-xs"><span className="text-gray-500">Límite Total</span><span className="font-semibold text-gray-800">{CREDIT_LINE_DATA.totalLimit.toLocaleString('es-ES', { style: 'currency', currency: 'EUR'})}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">Dispuesto</span><span className="font-semibold text-gray-800">{CREDIT_LINE_DATA.amountDrawn.toLocaleString('es-ES', { style: 'currency', currency: 'EUR'})}</span></div>
            <div className="w-full bg-gray-200 rounded-full h-3.5 my-1"><div className="bg-bbva-accent h-3.5 rounded-full text-white text-[10px] flex items-center justify-center" style={{ width: `${(CREDIT_LINE_DATA.amountDrawn / CREDIT_LINE_DATA.totalLimit) * 100}%` }}>{`${((CREDIT_LINE_DATA.amountDrawn / CREDIT_LINE_DATA.totalLimit) * 100).toFixed(0)}%`}</div></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">Disponible</span><span className="font-semibold text-green-600">{CREDIT_LINE_DATA.availableCredit.toLocaleString('es-ES', { style: 'currency', currency: 'EUR'})}</span></div>
            <div className="border-t pt-1.5 mt-1 flex justify-between text-xs"><span className="text-gray-500">Próximo Vencimiento</span><span className="font-semibold text-red-600">{CREDIT_LINE_DATA.nextPaymentDate} ({CREDIT_LINE_DATA.nextPaymentAmount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR'})})</span></div>
        </div>
    </div>
);


const TreasuryScreen: React.FC = () => {
    const [actions, setActions] = useState(SUGGESTED_ACTIONS_TREASURY.map(a => ({...a, completed: false})));
    
    const handleActionToggle = (id: number) => {
        setActions(prevActions => prevActions.map(action => action.id === id ? { ...action, completed: !action.completed } : action));
    };
    
    const eurAccounts = TREASURY_ACCOUNTS.filter(acc => acc.currency === 'EUR');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
            <div className="lg:col-span-4 space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-base font-semibold text-gray-800 mb-2">Distribución de Cuentas (EUR)</h3>
                    <AccountDistributionChart data={TREASURY_ACCOUNTS} />
                </div>
                <AIClientAdvisor />
                 <CreditLineDetails />
            </div>
            <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">Mis Cuentas</h3>
                    <div className="space-y-2">{TREASURY_ACCOUNTS.map(acc => <AccountCard key={acc.id} account={acc} />)}</div>
                </div>
                <CashFlowProjectionChart />
            </div>
            <div className="lg:col-span-3">
                 <div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col">
                     <h3 className="text-base font-semibold text-gray-800 mb-3">Acciones Sugeridas por IA</h3>
                     <div className="space-y-4 flex-grow">
                         {actions.map(action => <SuggestedAction key={action.id} action={action} onToggle={handleActionToggle} />)}
                     </div>
                     <div className="mt-3 flex-shrink-0">
                        <AiAssistantPanel title="Copiloto IA de Tesorería" quickPrompts={["Analiza el riesgo de mis cuentas", "¿Cuál es la mejor estrategia de inversión?", "Proyecta mi flujo de caja."]} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreasuryScreen;

import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon } from './icons';

interface DashboardStatCardProps {
    title: string;
    value: number;
    change: number;
    format: 'currency' | 'number';
    unit?: string;
    icon: React.ComponentType<{ className?: string }>;
}

const mockData = [
    { v: Math.random() * 100 }, { v: Math.random() * 100 }, { v: Math.random() * 100 },
    { v: Math.random() * 100 }, { v: Math.random() * 100 }, { v: Math.random() * 100 },
    { v: Math.random() * 100 }, { v: Math.random() * 100 }, { v: Math.random() * 100 }
];

const DashboardStatCard: React.FC<DashboardStatCardProps> = ({ title, value, change, format, unit, icon: Icon }) => {
    
    const formattedValue = format === 'currency'
        ? value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
        : value.toLocaleString('es-ES');

    const isPositive = change >= 0;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{title}</h3>
                <Icon className="h-6 w-6 text-gray-300 dark:text-gray-500" />
            </div>
            <div>
                 <p className="text-xl font-bold text-bbva-blue dark:text-white">{formattedValue} <span className="text-base font-medium text-gray-500 dark:text-gray-400">{unit}</span></p>
                 <div className="flex items-center space-x-1">
                     <span className={`flex items-center text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                         {isPositive ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
                         {Math.abs(change)}%
                     </span>
                     <span className="text-xs text-gray-400 dark:text-gray-500">vs mes anterior</span>
                 </div>
            </div>
             <div className="w-full h-10 mt-2 -mb-2 -mx-2">
                <ResponsiveContainer>
                    <AreaChart data={mockData}>
                        <defs>
                            <linearGradient id={isPositive ? "colorPositive" : "colorNegative"} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.4}/>
                                <stop offset="95%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="v" stroke={isPositive ? "#10B981" : "#EF4444"} strokeWidth={2} fillOpacity={1} fill={`url(#${isPositive ? "colorPositive" : "colorNegative"})`} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardStatCard;
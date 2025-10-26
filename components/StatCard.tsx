import React from 'react';
import DashboardCard from './DashboardCard';
import { ArrowRightIcon } from './icons';

const StatCard: React.FC<{ title: string; amount: number; currency: string; trend?: 'up' | 'down' }> = ({ title, amount, currency, trend }) => {
    
    const TrendIcon = () => {
        if (!trend) return null;
        const color = trend === 'up' ? 'text-green-500' : 'text-red-500';
        const rotation = trend === 'up' ? '-rotate-45' : 'rotate-45'; 
        return <ArrowRightIcon className={`h-5 w-5 ${color} transform ${rotation}`} />;
    };

    return (
        <DashboardCard title={title}>
            <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-bbva-blue">
                    {amount.toLocaleString('es-ES', { style: 'currency', currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <TrendIcon />
            </div>
        </DashboardCard>
    );
};

export default StatCard;

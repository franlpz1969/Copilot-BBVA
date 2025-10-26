import React from 'react';

interface DashboardCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-sm border ${className}`}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div>{children}</div>
        </div>
    );
};

export default DashboardCard;

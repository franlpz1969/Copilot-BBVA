import React from 'react';
import { ArrowRightIcon } from './icons';

interface DashboardCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    ctaLink?: {
        text: string;
        onClick: () => void;
    };
    headerActions?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className, ctaLink, headerActions }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700 flex flex-col ${className}`}>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">{title}</h3>
                <div className="flex items-center space-x-4">
                    {headerActions}
                    {ctaLink && (
                        <button onClick={ctaLink.onClick} className="text-xs font-medium text-bbva-accent hover:underline flex items-center">
                            {ctaLink.text}
                            <ArrowRightIcon className="h-3 w-3 ml-1" />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex-grow">{children}</div>
        </div>
    );
};

export default DashboardCard;
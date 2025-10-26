import React from 'react';
import { QuestionMarkCircleIcon } from './icons';

interface HelpTooltipProps {
    content: string;
    className?: string;
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({ content, className }) => {
    return (
        <div className={`relative flex items-center group ${className}`}>
            <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 cursor-pointer" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-bbva-blue dark:bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                {content}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-bbva-blue dark:border-t-gray-900"></div>
            </div>
        </div>
    );
};

export default HelpTooltip;
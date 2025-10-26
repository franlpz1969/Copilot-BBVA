import React from 'react';
import { TimelineEvent } from '../types';

const severityStyles = {
    critical: {
        bg: 'bg-red-500',
        border: 'border-red-500 dark:border-red-400',
        text: 'text-red-600 dark:text-red-400',
    },
    high: {
        bg: 'bg-yellow-500',
        border: 'border-yellow-500 dark:border-yellow-400',
        text: 'text-yellow-600 dark:text-yellow-400',
    },
    medium: {
        bg: 'bg-bbva-accent',
        border: 'border-bbva-accent dark:border-blue-400',
        text: 'text-bbva-accent dark:text-blue-400',
    },
    low: {
        bg: 'bg-gray-400',
        border: 'border-gray-400 dark:border-gray-500',
        text: 'text-gray-500 dark:text-gray-400',
    }
};

const TimelineItem: React.FC<{ event: TimelineEvent; isLast: boolean }> = ({ event, isLast }) => {
    const { bg, border, text } = severityStyles[event.severity];
    const Icon = event.icon;

    return (
        <div className="relative flex items-start">
            {/* Dot and Line */}
            <div className="flex flex-col items-center mr-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${border} bg-white dark:bg-gray-700 z-10`}>
                    <Icon className={`h-4 w-4 ${text}`} />
                </div>
                {!isLast && <div className="w-0.5 h-20 bg-gray-200 dark:bg-gray-600"></div>}
            </div>
            {/* Content */}
            <div className={`p-3 rounded-lg bg-white dark:bg-gray-800 border ${border} -mt-1 w-full`}>
                <p className={`font-bold text-xs ${text}`}>{event.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mt-0.5">{event.title}</p>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{event.type}</span>
            </div>
        </div>
    );
};


const KeyEventsTimeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ninetyDaysFromNow = new Date(today);
    ninetyDaysFromNow.setDate(today.getDate() + 90);

    const filteredEvents = events
        .filter(event => event.date >= today && event.date <= ninetyDaysFromNow)
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg h-full">
            <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-3">Próximos Vencimientos y Eventos</h3>
            <div className="max-h-80 overflow-y-auto pr-2">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                        <TimelineItem key={event.id} event={event} isLast={index === filteredEvents.length - 1} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">No hay eventos clave en los próximos 90 días.</p>
                )}
            </div>
        </div>
    );
};

export default KeyEventsTimeline;
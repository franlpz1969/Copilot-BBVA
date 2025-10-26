import React from 'react';
import { ComplianceAlert } from '../types';
import { ExclamationTriangleIcon, ArrowRightIcon, DocumentIcon, GavelIcon } from './icons';

interface UpcomingAlertsProps {
    alerts: ComplianceAlert[];
    onNavigate: (screen: string) => void;
}

const alertIcons = {
    'Impuestos': <DocumentIcon className="h-4 w-4 text-bbva-accent" />,
    'Legal': <GavelIcon className="h-4 w-4 text-bbva-accent" />,
    'Documento': <DocumentIcon className="h-4 w-4 text-bbva-accent" />,
};

const UpcomingAlerts: React.FC<UpcomingAlertsProps> = ({ alerts, onNavigate }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg h-full">
            <div className="flex items-center space-x-2 mb-3">
                 <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">Alertas Críticas</h3>
            </div>
            {alerts.length > 0 ? (
                <div className="space-y-3">
                    {alerts.map(alert => (
                        <div key={alert.id} className="bg-gray-50 dark:bg-gray-700/50 border-l-4 border-red-500 p-2.5 rounded-r-lg">
                           <div className="flex items-start space-x-2">
                               <div className="flex-shrink-0 mt-0.5">{alertIcons[alert.type]}</div>
                               <div>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 leading-tight">{alert.title}</p>
                                    <p className="text-xs text-red-600 dark:text-red-400 font-bold">{alert.dueDate}</p>
                               </div>
                           </div>
                           {alert.targetScreen && (
                                <button onClick={() => onNavigate(alert.targetScreen)} className="text-xs font-bold text-bbva-accent hover:underline flex items-center mt-1.5 ml-6">
                                    Revisar ahora <ArrowRightIcon className="h-3 w-3 ml-1" />
                                </button>
                           )}
                        </div>
                    ))}
                </div>
            ) : (
                 <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">No hay alertas críticas en este momento.</p>
            )}
        </div>
    );
};

export default UpcomingAlerts;
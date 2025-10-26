import React from 'react';
import DashboardCard from './DashboardCard';
import TaskCard from './TaskCard';
import { TASKS_DATA, RECOMMENDED_ACTIONS_DATA } from '../constants';
import { RecommendedAction } from '../types';
// FIX: Import all required icons, including the newly added ArrowRightIcon and icons for the map.
import { DocumentIcon, CheckCircleIcon, ArrowRightIcon, UserCircleIcon, AnalyticsIcon } from './icons';

// FIX: Add missing 'contact' and 'analyze' keys to satisfy the type.
const iconMap: { [key in RecommendedAction['icon']]: React.ReactNode } = {
    difference: <DocumentIcon className="h-6 w-6 text-yellow-500" />,
    approval: <CheckCircleIcon className="h-6 w-6 text-blue-500" />,
    report: <DocumentIcon className="h-6 w-6 text-green-500" />,
    contact: <UserCircleIcon className="h-6 w-6 text-purple-500" />,
    analyze: <AnalyticsIcon className="h-6 w-6 text-indigo-500" />,
};


const RightPanel: React.FC = () => {
    return (
        <div className="space-y-6">
            <DashboardCard title="Tareas Pendientes">
                <div className="space-y-3">
                    {TASKS_DATA.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </DashboardCard>
            <DashboardCard title="Acciones Recomendadas">
                 <div className="space-y-4">
                    {RECOMMENDED_ACTIONS_DATA.map(action => (
                        <div key={action.id} className="flex items-start space-x-4">
                            <div className="bg-gray-100 p-2 rounded-full">
                                {iconMap[action.icon]}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{action.title}</p>
                                <p className="text-sm text-gray-500">{action.description}</p>
                                <a href="#" className="text-sm font-medium text-bbva-accent hover:underline flex items-center mt-1">
                                    {action.linkText}
                                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardCard>
        </div>
    );
};

export default RightPanel;

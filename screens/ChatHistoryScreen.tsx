import React, { useState, useMemo } from 'react';
import { COMMUNICATIONS_HISTORY_DATA } from '../constants';
import { Communication, CommunicationChannel } from '../types';
import { SparklesIcon, WhatsappIcon, PhoneIcon, BuildingOfficeIcon, ChevronDownIcon, ChevronUpIcon } from '../components/icons';

const channelIcons: Record<CommunicationChannel, React.ReactNode> = {
    'Copilot AI': <SparklesIcon className="h-6 w-6 text-white" />,
    'WhatsApp': <WhatsappIcon className="h-6 w-6 text-white" />,
    'Call Center': <PhoneIcon className="h-6 w-6 text-white" />,
    'Oficina': <BuildingOfficeIcon className="h-6 w-6 text-white" />,
};

const channelColors: Record<CommunicationChannel, string> = {
    'Copilot AI': 'bg-bbva-accent',
    'WhatsApp': 'bg-green-500',
    'Call Center': 'bg-bbva-blue',
    'Oficina': 'bg-gray-700',
};

type FilterType = CommunicationChannel | 'Todos';

const CommunicationHistoryScreen: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredCommunications = useMemo(() => {
        if (activeFilter === 'Todos') {
            return COMMUNICATIONS_HISTORY_DATA;
        }
        return COMMUNICATIONS_HISTORY_DATA.filter(c => c.channel === activeFilter);
    }, [activeFilter]);

    const filterOptions: FilterType[] = ['Todos', 'Copilot AI', 'WhatsApp', 'Call Center', 'Oficina'];

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-bbva-blue dark:text-white">Historial de Comunicaciones</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Revisa todas tus interacciones con BBVA a través de los diferentes canales.</p>
            </div>
            
            <div className="mb-6">
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                    {filterOptions.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap ${
                                activeFilter === filter
                                ? 'bg-bbva-blue text-white shadow'
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border dark:border-gray-600'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {filteredCommunications.map(comm => {
                    const isExpanded = expandedId === comm.id;
                    const isExpandable = !!comm.messages && comm.messages.length > 0;

                    return (
                        <div key={comm.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border dark:border-gray-700">
                            <div 
                                className={`flex items-start space-x-4 ${isExpandable ? 'cursor-pointer' : ''}`}
                                onClick={isExpandable ? () => toggleExpand(comm.id) : undefined}
                            >
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${channelColors[comm.channel]}`}>
                                    {channelIcons[comm.channel]}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-base text-bbva-blue dark:text-blue-300">{comm.summary}</p>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                Canal: <span className="font-semibold">{comm.channel}</span> | Agente: <span className="font-semibold">{comm.agent}</span>
                                            </p>
                                        </div>
                                        <div className="text-right flex items-center space-x-3">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4">{comm.date}</p>
                                            {isExpandable && (
                                                isExpanded ? <ChevronUpIcon className="h-4 w-4 text-gray-400" /> : <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 border-t dark:border-gray-600 pt-2">{comm.details}</p>
                                </div>
                            </div>
                            {isExpanded && comm.messages && (
                                <div className="mt-4 pt-3 border-t dark:border-gray-600 ml-14 pl-1 space-y-2">
                                    {comm.messages.map((msg, index) => (
                                        <div key={index} className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-md px-3 py-1.5 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-blue-100 dark:bg-blue-900/50 text-bbva-blue dark:text-blue-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CommunicationHistoryScreen;
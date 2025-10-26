import React from 'react';
import ChatInterface from './ChatInterface';
import { SparklesIcon } from './icons';

// FIX: Update onTransaction to accept a second 'details' argument to match its usage.
const AiAssistantPanel: React.FC<{ title?: string, quickPrompts?: string[], className?: string, onTransaction?: (id: number, details: any) => void, initialMessagePromise?: Promise<string> }> = ({ title = "Asistente IA", quickPrompts, className, onTransaction, initialMessagePromise }) => {
    return (
        <div className={`w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 ${className}`}>
            <div className="flex items-center justify-between p-4 bg-bbva-blue rounded-t-xl">
                <div className="flex items-center space-x-2">
                    <SparklesIcon className="h-6 w-6 text-white" />
                    <h2 className="font-semibold text-lg text-white">{title}</h2>
                </div>
            </div>
            
            <ChatInterface 
                quickPrompts={quickPrompts} 
                onTransaction={onTransaction} 
                initialMessagePromise={initialMessagePromise}
            />
        </div>
    );
};

export default AiAssistantPanel;
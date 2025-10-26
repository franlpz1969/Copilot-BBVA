import React from 'react';
import ChatInterface from './ChatInterface';

// FIX: Update onTransaction to accept a second 'details' argument to match its usage.
const AiAssistantPanel: React.FC<{ title?: string, quickPrompts?: string[], className?: string, onTransaction?: (id: number, details: any) => void }> = ({ title = "Asistente IA", quickPrompts, className, onTransaction }) => {
    return (
        <div className={`w-full h-full bg-white rounded-lg shadow-lg flex flex-col ${className}`}>
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                    <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
                </div>
            </div>
            
            <ChatInterface quickPrompts={quickPrompts} onTransaction={onTransaction} />
        </div>
    );
};

export default AiAssistantPanel;
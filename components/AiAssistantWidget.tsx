
import React, { useState } from 'react';
import { SparklesIcon, XIcon } from './icons';
import AiAssistantPanel from './AiAssistantPanel';

const AiAssistantWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // This component is no longer rendered in App.tsx
    // It is kept here to avoid breaking file dependencies if any, but it's effectively deprecated.

    if (!isOpen) {
        return (
             <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 bg-bbva-accent text-white rounded-full p-4 shadow-lg hover:bg-bbva-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bbva-accent z-50 transition-transform duration-300 hover:scale-110"
            >
                <SparklesIcon className="h-8 w-8" />
            </button>
        )
    }

    return (
        <div className="fixed bottom-24 right-8 w-96 h-[600px] z-50">
            <AiAssistantPanel />
        </div>
    );
};

export default AiAssistantWidget;
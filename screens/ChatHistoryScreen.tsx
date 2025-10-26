import React from 'react';
import { CHAT_HISTORY_DATA } from '../constants';
import { ChatSession } from '../types';
import { UserCircleIcon, SparklesIcon } from '../components/icons';

const ChatMessageCard: React.FC<{ message: ChatSession['messages'][0] }> = ({ message }) => {
    const isUser = message.isUser;
    return (
        <div className={`flex items-start space-x-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && <div className="flex-shrink-0 w-8 h-8 bg-bbva-accent rounded-full flex items-center justify-center"><SparklesIcon className="h-5 w-5 text-white" /></div>}
            <div className={`max-w-xl p-3 rounded-lg ${isUser ? 'bg-bbva-accent text-white' : 'bg-gray-100'}`}>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}/>
                <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>{message.timestamp}</p>
            </div>
            {isUser && <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"><UserCircleIcon className="h-6 w-6 text-gray-600" /></div>}
        </div>
    );
};


const ChatHistoryScreen: React.FC = () => {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-bbva-blue">Historial de Conversaciones</h1>
            
            <p className="text-gray-600">
                Aquí puedes revisar tus interacciones pasadas con el Copiloto IA. Cada tarjeta representa una sesión de conversación.
            </p>

            {CHAT_HISTORY_DATA.map(session => (
                <div key={session.id} className="bg-white p-6 rounded-lg shadow-lg border">
                    <div className="border-b pb-3 mb-4">
                        <h2 className="text-xl font-semibold text-bbva-blue">{session.title}</h2>
                        <p className="text-sm text-gray-500">{session.date}</p>
                    </div>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
                        {session.messages.map((message, index) => (
                           <ChatMessageCard key={index} message={message} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatHistoryScreen;
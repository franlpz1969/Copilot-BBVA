import React, { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, VideoCameraIcon, BookOpenIcon } from './icons';
import { getFinancialAdvice } from '../services/geminiService';
import { FaqItem, LinkItem } from '../types';

interface Message {
    text: string;
    isUser: boolean;
    imageUrl?: string;
    faqs?: FaqItem[];
    links?: LinkItem[];
    transactional?: {
        id: number;
        provider: string;
        amount: number;
        currency: string;
    }
}

interface ChatInterfaceProps {
    quickPrompts?: string[];
    onTransaction?: (id: number, details: Message['transactional']) => void;
}

const defaultPrompts = [
    "¿Cuál es mi saldo total consolidado?",
    "Resume mis gastos del último mes.",
    "¿Hay alguna tarea urgente pendiente?",
];

const TransactionalMessage: React.FC<{details: Message['transactional'], onApprove: () => void}> = ({ details, onApprove }) => {
    const [approved, setApproved] = useState(false);
    
    const handleApprove = () => {
        onApprove();
        setApproved(true);
    }
    
    const isGenericAction = details.provider === 'Comisión Bancaria';
    const actionText = isGenericAction ? `Registrar y conciliar` : `Aprobar y Firmar`;

    return (
        <div className="bg-bbva-light-blue p-4 rounded-lg border border-blue-200 mt-2">
            <h4 className="font-bold text-bbva-blue">{isGenericAction ? 'Acción de Conciliación' : 'Petición de Transferencia'}</h4>
            <p className="text-sm text-gray-700 mt-1">
                {isGenericAction ? `Registrar apunte para` : `Transferencia a`} <strong>{details.provider}</strong> por un importe de <strong>{details.amount.toLocaleString('es-ES', {style: 'currency', currency: details.currency})}</strong>.
            </p>
            <div className="mt-3">
                {approved ? (
                     <div className="flex items-center space-x-2 text-gray-600 font-semibold">
                        <CheckCircleIcon className="h-5 w-5"/>
                        <span>¡Acción completada!</span>
                    </div>
                ) : (
                    <button onClick={handleApprove} className="w-full bg-bbva-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90">
                        {actionText}
                    </button>
                )}
            </div>
        </div>
    )
};

const ImageAttachment: React.FC<{ src: string }> = ({ src }) => (
    <div className="mt-2 border rounded-lg overflow-hidden">
        <img src={src} alt="Contexto visual" className="w-full h-auto" />
    </div>
);

const FaqAccordion: React.FC<{ faqs: FaqItem[] }> = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const formatAnswer = (answer: string | string[]) => {
        const processString = (s: string) => s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        if (Array.isArray(answer)) {
            return (
                <ul className="list-disc list-inside space-y-1 mt-1">
                    {answer.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: processString(item) }} />
                    ))}
                </ul>
            );
        }
        return <p dangerouslySetInnerHTML={{ __html: processString(answer) }} />;
    };

    return (
        <div className="mt-3 border-t pt-3">
            <h5 className="font-bold text-sm text-gray-600 mb-2">Preguntas Frecuentes</h5>
            <div className="space-y-2">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b last:border-b-0">
                        <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center text-left py-2">
                            <span className="font-medium text-sm text-bbva-blue">{faq.question}</span>
                            {openIndex === index ? <ChevronUpIcon className="h-5 w-5 text-gray-500" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
                        </button>
                        {openIndex === index && (
                            <div className="pb-2 pr-4 text-sm text-gray-600">
                                {formatAnswer(faq.answer)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const HelpfulLinks: React.FC<{ links: LinkItem[] }> = ({ links }) => {
    const linkIcon = (type: LinkItem['type']) => {
        switch(type) {
            case 'video': return <VideoCameraIcon className="h-5 w-5 text-bbva-accent" />;
            case 'manual': return <BookOpenIcon className="h-5 w-5 text-bbva-accent" />;
            default: return null;
        }
    };

    return (
        <div className="mt-3 border-t pt-3">
            <h5 className="font-bold text-sm text-gray-600 mb-2">Recursos Útiles</h5>
            <div className="space-y-2">
                {links.map((link, index) => (
                    <a href={link.url} key={index} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200">
                        {linkIcon(link.type)}
                        <span className="font-medium text-sm text-bbva-accent underline">{link.title}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};


const ChatInterface: React.FC<ChatInterfaceProps> = ({ quickPrompts = defaultPrompts, onTransaction }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if(quickPrompts && quickPrompts.length > 0 && input === ''){
        const initialPrompt = quickPrompts.find(p => p.startsWith("Resolver con IA"));
        if(initialPrompt) {
            setInput(initialPrompt);
            document.getElementById('chat-input')?.focus();
        }
      }
    }, [quickPrompts]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { text: input, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await getFinancialAdvice(currentInput);
            let aiMessage: Message;
            try {
                const parsed = JSON.parse(responseText);
                aiMessage = {
                    text: parsed.text || "No he podido procesar la respuesta.",
                    isUser: false,
                    imageUrl: parsed.imageUrl,
                    faqs: parsed.faqs,
                    links: parsed.links,
                    transactional: parsed.transactional,
                };
            } catch (e) {
                aiMessage = { text: responseText, isUser: false };
            }

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = { text: 'Disculpa, estoy teniendo problemas para conectarme. Por favor, inténtalo de nuevo.', isUser: false };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
        document.getElementById('chat-input')?.focus();
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-b-xl">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.length === 0 && (
                     <div className="text-left p-4 text-gray-600">
                        <p className="font-medium mb-4">Hola, soy tu Copiloto IA. ¿En qué te ayudo hoy, Fran?</p>
                        <div className="space-y-2">
                            {quickPrompts.map((prompt, i) => (
                                <button key={i} onClick={() => handlePromptClick(prompt)} className="w-full text-left text-sm p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-bbva-accent font-medium">
                                    {`“${prompt}”`}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md w-full px-4 py-3 rounded-2xl ${msg.isUser ? 'bg-bbva-accent text-white' : 'bg-gray-100 text-gray-800'}`}>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            {msg.imageUrl && <ImageAttachment src={msg.imageUrl} />}
                            {msg.transactional && onTransaction && (
                                <TransactionalMessage details={msg.transactional} onApprove={() => onTransaction(msg.transactional.id, msg.transactional)} />
                            )}
                            {msg.faqs && msg.faqs.length > 0 && <FaqAccordion faqs={msg.faqs} />}
                            {msg.links && msg.links.length > 0 && <HelpfulLinks links={msg.links} />}
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-xs px-4 py-2 rounded-2xl bg-gray-100 text-gray-800"><div className="flex items-center space-x-2"><span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span><span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span><span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></span></div></div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t">
                <div className="relative">
                    <input id="chat-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Escribe tu pregunta a Copiloto IA..." className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bbva-accent" disabled={isLoading} />
                    <button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bbva-accent text-white hover:bg-bbva-blue disabled:bg-gray-300 transition-colors"><PaperAirplaneIcon className="h-5 w-5" /></button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
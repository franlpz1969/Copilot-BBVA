import React, { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, VideoCameraIcon, BookOpenIcon, MicrophoneIcon, StopCircleIcon } from './icons';
import { getFinancialAdvice } from '../services/geminiService';
import { FaqItem, LinkItem } from '../types';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality, Blob } from '@google/genai';

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
    initialMessagePromise?: Promise<string>;
}

// Helper functions for audio processing
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
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
        <div className="bg-bbva-light-blue dark:bg-gray-700/60 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50 mt-2">
            <h4 className="font-bold text-bbva-blue dark:text-blue-300 text-sm">{isGenericAction ? 'Acción de Conciliación' : 'Petición de Transferencia'}</h4>
            <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                {isGenericAction ? `Registrar apunte para` : `Transferencia a`} <strong>{details.provider}</strong> por <strong>{details.amount.toLocaleString('es-ES', {style: 'currency', currency: details.currency})}</strong>.
            </p>
            <div className="mt-2">
                {approved ? (
                     <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 font-semibold text-sm">
                        <CheckCircleIcon className="h-4 w-4"/>
                        <span>¡Acción completada!</span>
                    </div>
                ) : (
                    <button onClick={handleApprove} className="w-full bg-bbva-blue text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-opacity-90 text-sm">
                        {actionText}
                    </button>
                )}
            </div>
        </div>
    )
};

const ImageAttachment: React.FC<{ src: string }> = ({ src }) => (
    <div className="mt-2 border dark:border-gray-600 rounded-lg overflow-hidden">
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
        <div className="mt-3 border-t dark:border-gray-600 pt-3">
            <h5 className="font-bold text-xs text-gray-600 dark:text-gray-400 mb-2">Preguntas Frecuentes</h5>
            <div className="space-y-1">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b dark:border-gray-600 last:border-b-0">
                        <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center text-left py-1.5">
                            <span className="font-medium text-xs text-bbva-blue dark:text-blue-300">{faq.question}</span>
                            {openIndex === index ? <ChevronUpIcon className="h-4 w-4 text-gray-500" /> : <ChevronDownIcon className="h-4 w-4 text-gray-500" />}
                        </button>
                        {openIndex === index && (
                            <div className="pb-2 pr-4 text-xs text-gray-600 dark:text-gray-300">
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
            case 'video': return <VideoCameraIcon className="h-4 w-4 text-bbva-accent" />;
            case 'manual': return <BookOpenIcon className="h-4 w-4 text-bbva-accent" />;
            default: return null;
        }
    };

    return (
        <div className="mt-3 border-t dark:border-gray-600 pt-3">
            <h5 className="font-bold text-xs text-gray-600 dark:text-gray-400 mb-2">Recursos Útiles</h5>
            <div className="space-y-1">
                {links.map((link, index) => (
                    <a href={link.url} key={index} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                        {linkIcon(link.type)}
                        <span className="font-medium text-xs text-bbva-accent underline">{link.title}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};


const ChatInterface: React.FC<ChatInterfaceProps> = ({ quickPrompts = defaultPrompts, onTransaction, initialMessagePromise }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    
    const chatEndRef = useRef<HTMLDivElement>(null);
    const liveSessionRef = useRef<Promise<LiveSession> | null>(null);
    const audioInfrastructureRef = useRef<{
        inputAudioContext: AudioContext;
        outputAudioContext: AudioContext;
        scriptProcessor: ScriptProcessorNode;
        mediaStreamSource: MediaStreamAudioSourceNode;
        nextStartTime: number;
        sources: Set<AudioBufferSourceNode>;
        stream: MediaStream;
        currentInputTranscription: string;
        currentOutputTranscription: string;
    } | null>(null);

    useEffect(() => {
        if (initialMessagePromise && messages.length === 0) {
            setIsLoading(true);
            initialMessagePromise
                .then(text => {
                    setMessages([{ text, isUser: false }]);
                })
                .catch(err => {
                    console.error("Error fetching initial message:", err);
                    setMessages([{ text: "No pude cargar el resumen del día, disculpa.", isUser: false }]);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [initialMessagePromise]);

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
    
    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (liveSessionRef.current) {
                liveSessionRef.current.then(session => session.close());
                liveSessionRef.current = null;
            }
            if (audioInfrastructureRef.current?.stream) {
                audioInfrastructureRef.current.stream.getTracks().forEach(track => track.stop());
            }
            if(audioInfrastructureRef.current?.inputAudioContext.state !== 'closed') audioInfrastructureRef.current?.inputAudioContext.close();
            if(audioInfrastructureRef.current?.outputAudioContext.state !== 'closed') audioInfrastructureRef.current?.outputAudioContext.close();
        };
    }, []);

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

    const handleToggleListening = async () => {
        if (isListening) {
            // Stop listening
            if (liveSessionRef.current) {
                liveSessionRef.current.then(session => session.close());
                liveSessionRef.current = null;
            }
            if (audioInfrastructureRef.current?.stream) {
                 audioInfrastructureRef.current.stream.getTracks().forEach(track => track.stop());
            }
            if(audioInfrastructureRef.current?.scriptProcessor){
                audioInfrastructureRef.current.scriptProcessor.disconnect();
            }
             if(audioInfrastructureRef.current?.mediaStreamSource){
                audioInfrastructureRef.current.mediaStreamSource.disconnect();
            }
            setIsListening(false);
        } else {
            // Start listening
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setIsListening(true);
                
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                
                audioInfrastructureRef.current = {
                    // FIX: Cast window to `any` to allow for `webkitAudioContext` for older browser compatibility without TypeScript errors.
                    inputAudioContext: new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 }),
                    // FIX: Cast window to `any` to allow for `webkitAudioContext` for older browser compatibility without TypeScript errors.
                    outputAudioContext: new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 }),
                    nextStartTime: 0,
                    sources: new Set(),
                    stream: stream,
                    scriptProcessor: null!,
                    mediaStreamSource: null!,
                    currentInputTranscription: '',
                    currentOutputTranscription: '',
                };
                
                liveSessionRef.current = ai.live.connect({
                    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                    callbacks: {
                        onopen: () => {
                          const infra = audioInfrastructureRef.current!;
                          infra.mediaStreamSource = infra.inputAudioContext.createMediaStreamSource(infra.stream);
                          infra.scriptProcessor = infra.inputAudioContext.createScriptProcessor(4096, 1, 1);
                          
                          infra.scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            liveSessionRef.current?.then((session) => {
                              session.sendRealtimeInput({ media: pcmBlob });
                            });
                          };
                          infra.mediaStreamSource.connect(infra.scriptProcessor);
                          infra.scriptProcessor.connect(infra.inputAudioContext.destination);
                        },
                        onmessage: async (message: LiveServerMessage) => {
                            const infra = audioInfrastructureRef.current!;
                            
                            if (message.serverContent?.inputTranscription) {
                                infra.currentInputTranscription += message.serverContent.inputTranscription.text;
                            }
                            if (message.serverContent?.outputTranscription) {
                                infra.currentOutputTranscription += message.serverContent.outputTranscription.text;
                            }
                            if (message.serverContent?.turnComplete) {
                                const fullInput = infra.currentInputTranscription;
                                const fullOutput = infra.currentOutputTranscription;
                                if (fullInput) setMessages(prev => [...prev, { text: fullInput, isUser: true }]);
                                if (fullOutput) setMessages(prev => [...prev, { text: fullOutput, isUser: false }]);
                                infra.currentInputTranscription = '';
                                infra.currentOutputTranscription = '';
                            }

                            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                            if (base64Audio) {
                                infra.nextStartTime = Math.max(infra.nextStartTime, infra.outputAudioContext.currentTime);
                                const audioBuffer = await decodeAudioData(decode(base64Audio), infra.outputAudioContext, 24000, 1);
                                const source = infra.outputAudioContext.createBufferSource();
                                source.buffer = audioBuffer;
                                source.connect(infra.outputAudioContext.destination);
                                source.addEventListener('ended', () => { infra.sources.delete(source); });
                                source.start(infra.nextStartTime);
                                infra.nextStartTime += audioBuffer.duration;
                                infra.sources.add(source);
                            }
                        },
                        onerror: (e: ErrorEvent) => {
                            console.error("Live session error:", e);
                            setMessages(prev => [...prev, {text: "Error en la conexión de voz.", isUser: false}]);
                            setIsListening(false);
                        },
                        onclose: () => {
                             // This can be triggered by server or by client calling session.close()
                             setIsListening(false);
                        },
                    },
                    config: {
                        responseModalities: [Modality.AUDIO],
                        inputAudioTranscription: {},
                        outputAudioTranscription: {},
                    },
                });
            } catch (err) {
                console.error("Error getting microphone access:", err);
                setMessages(prev => [...prev, {text: "No se pudo acceder al micrófono.", isUser: false}]);
                setIsListening(false);
            }
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-b-xl">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.length === 0 && !isLoading && !initialMessagePromise && (
                     <div className="text-left p-2 text-gray-600 dark:text-gray-300">
                        <p className="font-medium mb-3 text-sm">Hola, soy tu Copiloto IA. ¿En qué te ayudo hoy, Fran?</p>
                        <div className="space-y-2">
                            {quickPrompts.map((prompt, i) => (
                                <button key={i} onClick={() => handlePromptClick(prompt)} className="w-full text-left text-xs p-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 text-bbva-accent font-medium">
                                    {`“${prompt}”`}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                         <div className={`max-w-md w-full px-3 py-2 rounded-2xl ${msg.isUser ? 'bg-bbva-accent text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
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
                        <div className="max-w-xs px-3 py-2 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-800"><div className="flex items-center space-x-2"><span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span><span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span><span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></span></div></div>
                    </div>
                )}
                 {isListening && (
                    <div className="flex justify-center">
                        <div className="px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xs font-medium flex items-center space-x-2">
                            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span>Escuchando...</span>
                        </div>
                    </div>
                 )}
                <div ref={chatEndRef} />
            </div>
            <div className="p-3 border-t dark:border-gray-700">
                <div className="relative flex items-center space-x-2">
                    <input id="chat-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Escribe o pulsa el micrófono..." className="w-full pl-3 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bbva-accent text-sm" disabled={isLoading || isListening} />
                    <button onClick={handleSendMessage} disabled={isLoading || !input.trim() || isListening} className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-bbva-accent text-white hover:bg-bbva-blue disabled:bg-gray-300 transition-colors"><PaperAirplaneIcon className="h-4 w-4" /></button>
                    <button onClick={handleToggleListening} disabled={isLoading} className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}>
                        {isListening ? <StopCircleIcon className="h-5 w-5" /> : <MicrophoneIcon className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
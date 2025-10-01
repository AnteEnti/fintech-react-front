import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChatMessage } from '../../types';
import { startChat, sendMessage } from '../../services/chatService';
import type { Chat } from '@google/genai';
import { marked } from 'marked';
import ChatIcon from './ChatIcon';
import Message from './Message';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const { language } = useLanguage();

    const welcomeMessage = {
        en: "Hello! I'm your financial assistant. How can I help you understand finance today? Ask me about budgeting, SIPs, taxes, and more.",
        te: "నమస్కారం! నేను మీ ఆర్థిక సహాయకుడిని. ఈ రోజు ఫైనాన్స్ గురించి అర్థం చేసుకోవడానికి నేను మీకు ఎలా సహాయపడగలను? బడ్జెటింగ్, SIPలు, పన్నులు మరియు మరిన్నింటి గురించి నన్ను అడగండి."
    };

    useEffect(() => {
        if (isOpen && !chatRef.current) {
            try {
                chatRef.current = startChat();
                setMessages([{
                    sender: 'bot',
                    text: welcomeMessage[language],
                }]);
            } catch (error) {
                console.error("Failed to start chat session:", error);
                setMessages([{
                    sender: 'bot',
                    text: "Sorry, the chat service is unavailable right now."
                }]);
            }
        }
    }, [isOpen, language]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputValue;
        setInputValue('');
        setIsLoading(true);

        try {
            if (chatRef.current) {
                const responseText = await sendMessage(chatRef.current, currentInput);
                const botMessage: ChatMessage = { sender: 'bot', text: responseText };
                setMessages(prev => [...prev, botMessage]);
            }
        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = { sender: 'bot', text: "Sorry, something went wrong." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const toggleChat = () => {
        const currentlyOpen = isOpen;
        setIsOpen(!currentlyOpen);
        if (currentlyOpen) {
            toggleButtonRef.current?.focus();
        }
    };

    return (
        <>
            <button
                ref={toggleButtonRef}
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-accent text-white p-4 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-transform transform hover:scale-110 z-50"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <ChatIcon />
                )}
            </button>
            <div className={`fixed bottom-24 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white dark:bg-dark shadow-2xl rounded-lg flex flex-col transition-all duration-300 origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                <header className="bg-secondary dark:bg-blue-800 text-white p-4 rounded-t-lg flex justify-between items-center">
                    <h3 className="text-lg font-bold">{language === 'en' ? 'Financial Assistant' : 'ఆర్థిక సహాయకుడు'}</h3>
                </header>
                <div className="flex-1 p-4 overflow-y-auto" aria-live="polite">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <Message key={index} sender={msg.sender} text={msg.text} />
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 dark:bg-slate-700 rounded-lg p-3 max-w-xs flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={language === 'en' ? 'Ask a question...' : 'ఒక ప్రశ్న అడగండి...'}
                            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"
                            disabled={isLoading}
                        />
                        <button type="submit" className="bg-primary text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900" disabled={isLoading || !inputValue.trim()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Chatbot;
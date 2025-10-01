import React from 'react';
import { marked } from 'marked';

interface MessageProps {
    sender: 'user' | 'bot';
    text: string;
}

const Message: React.FC<MessageProps> = ({ sender, text }) => {
    const isUser = sender === 'user';

    const parsedContent = { __html: marked.parse(text) as string };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow ${
                    isUser
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-dark dark:bg-slate-700 dark:text-gray-200'
                }`}
            >
                <div 
                    className="prose prose-sm max-w-none text-inherit
                               dark:prose-strong:text-inherit
                               dark:prose-headings:text-inherit
                               dark:prose-a:text-blue-400
                               prose-p:my-2 first:prose-p:mt-0 last:prose-p:mb-0"
                    dangerouslySetInnerHTML={parsedContent} 
                />
            </div>
        </div>
    );
};

export default Message;

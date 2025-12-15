"use client";
import React, { useRef, useEffect, useState } from 'react';

interface TerminalProps {
    history: { type: 'input' | 'output', content: React.ReactNode }[];
    prompt: string;
    onCommand: (cmd: string) => void;
}

export const Terminal = ({ history, prompt, onCommand }: TerminalProps) => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Auto scroll to bottom
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    useEffect(() => {
        // Keep focus
        const focusInput = () => {
             // Only focus if user isn't selecting text (optional check, but kept simple here)
             inputRef.current?.focus();
        };
        document.addEventListener('click', focusInput);
        focusInput();
        return () => document.removeEventListener('click', focusInput);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onCommand(input);
        setInput('');
    };

    return (
        <div className="w-full h-full flex flex-col font-retro uppercase text-lg overflow-y-auto pb-4 scrollbar-hide shadow-inner" onClick={() => inputRef.current?.focus()}>
            {/* History */}
            {history.map((item, idx) => (
                <div key={idx} className={`${item.type === 'input' ? 'mt-2 opacity-80' : ''} whitespace-pre-wrap break-words leading-snug`}>
                    {item.type === 'input' ? <span className="mr-2">{prompt}</span> : null}
                    {item.content}
                </div>
            ))}
            
            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex mt-2 relative text-lg group">
                <span className="mr-2 opacity-80">{prompt}</span>
                <div className="relative flex-1">
                    <span>{input}</span>
                    <span className="animate-pulse inline-block bg-current w-[0.6em] h-[1.1em] align-middle ml-[2px] mb-[2px]"></span>
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={input}
                        onChange={e => setInput(e.target.value.toUpperCase())}
                        className="absolute inset-0 opacity-0 cursor-text w-full h-full"
                        autoFocus
                        autoComplete="off"
                    />
                </div>
            </form>
            <div ref={bottomRef} />
        </div>
    );
};

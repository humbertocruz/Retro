"use client";
import React, { useState, useRef, useEffect } from 'react';

interface EditorProps {
    onExit: () => void;
}

export const Editor = ({ onExit }: EditorProps) => {
    const [content, setContent] = useState('Type your text here...');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textareaRef.current?.focus();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onExit();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onExit]);

    return (
        <div className="flex flex-col w-full h-full relative border border-current p-1 bg-current text-retro-dark">
            <div className="flex justify-between items-center text-retro-dark bg-current p-1 mb-1 font-bold">
                <span>RETRO EDITOR V1.0</span>
                <span>[ESC] TO EXIT</span>
            </div>
            <textarea
                ref={textareaRef}
                value={content}
                onChange={e => setContent(e.target.value)}
                className="flex-1 w-full p-2 bg-retro-dark text-inherit font-retro text-xl outline-none resize-none border-none"
                spellCheck={false}
            />
        </div>
    );
};

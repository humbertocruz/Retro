"use client";

import React, { useState, useEffect } from 'react';

interface BootSequenceProps {
    platformName: string;
    onComplete: () => void;
}

export const BootSequence = ({ platformName, onComplete }: BootSequenceProps) => {
    const [lines, setLines] = useState<string[]>([]);
    
    useEffect(() => {
        // Simple mock implementation of varied boot speeds and text
        const sequence = [
            `BIOS ITEM-X VER 1.0.2`,
            `Copyright (C) 1970-1990`,
            `${platformName} SYSTEM`,
            `Checking Memory...`,
            `64K OK`,
            `128K OK`,
            `256K OK`,
            `512K OK`,
            `640K OK`,
            `VIDEO ADAPTER... INITIALIZED`,
            `KEYBOARD... DETECTED`,
            `LOADING OPERATING SYSTEM...`,
            `...`,
            `...`
        ];

        let currentIndex = 0;
        
        const interval = setInterval(() => {
            if (currentIndex >= sequence.length) {
                clearInterval(interval);
                setTimeout(onComplete, 800);
                return;
            }
            
            setLines(prev => [...prev, sequence[currentIndex]]);
            currentIndex++;
        }, 300); 

        return () => clearInterval(interval);
    }, [platformName, onComplete]);

    return (
        <div className="font-retro text-lg leading-relaxed uppercase">
            {lines.map((line, i) => (
                <div key={i}>{line}</div>
            ))}
            <div className="animate-pulse">_</div>
        </div>
    );
};

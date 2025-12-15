import React from 'react';
import { cn } from '@/lib/utils';

interface CRTWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export function CRTWrapper({ children, className }: CRTWrapperProps) {
    return (
        <div className={cn("relative w-full h-full overflow-hidden bg-retro-screen font-retro", className)}>
            {/* Scanlines */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] bg-repeat" />
            
            {/* Moving scanline */}
            <div className="pointer-events-none absolute inset-0 z-20 animate-scanline bg-[linear-gradient(0deg,rgba(0,0,0,0)_50%,rgba(0,255,0,0.2)_50%,rgba(0,0,0,0)_50%)] bg-[length:100%_4px] opacity-20" />

            {/* Vignette */}
            <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle,rgba(0,0,0,0)_60%,rgba(0,0,0,0.6)_100%)]" />

            {/* Content area with text glow */}
            <div className="relative z-0 h-full w-full p-8 text-glow text-retro-green">
                {children}
            </div>
        </div>
    );
}

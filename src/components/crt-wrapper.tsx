import React from 'react';
import { cn } from '@/lib/utils';

interface CRTWrapperProps {
    children: React.ReactNode;
    className?: string;
    monitorType?: 'monochrome' | 'color-tv';
    curvature?: 'high' | 'medium' | 'low';
    scanlineIntensity?: 'high' | 'medium' | 'low' | 'none';
    noPadding?: boolean;
}

export function CRTWrapper({ 
    children, 
    className,
    monitorType = 'monochrome',
    curvature = 'medium',
    scanlineIntensity = 'medium',
    noPadding = false
}: CRTWrapperProps) {
    const scanlineOpacity = {
        'high': 'opacity-40',
        'medium': 'opacity-20',
        'low': 'opacity-10',
        'none': 'opacity-0'
    };

    const curvatureClass = {
        'high': 'mask-curvature-high', // We would implement these if we had real curvature SVG masks, for now just standard
        'medium': '',
        'low': ''
    };

    return (
        <div className={cn(
            "relative w-full h-full overflow-hidden bg-retro-screen font-retro", 
            curvatureClass[curvature],
            className
        )}>
             {/* RGB Mask for Color TV */}
             {monitorType === 'color-tv' && (
                <div className="pointer-events-none absolute inset-0 z-15 mix-blend-overlay bg-[url('/rgb-mask.png')] bg-repeat opacity-30" 
                     style={{ backgroundSize: '4px 4px' }}>
                     {/* Fallback CSS pattern if image missing using repeating linear gradient */}
                     <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,0,0.15),rgba(0,255,0,0.15),rgba(0,0,255,0.15))] bg-[length:3px_1px]" />
                </div>
             )}

            {/* Scanlines */}
            {scanlineIntensity !== 'none' && (
                <div className={cn(
                    "pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] bg-repeat",
                    scanlineOpacity[scanlineIntensity]
                )} />
            )}
            
            {/* Moving scanline */}
            <div className="pointer-events-none absolute inset-0 z-20 animate-scanline bg-[linear-gradient(0deg,rgba(0,0,0,0)_50%,rgba(0,255,0,0.2)_50%,rgba(0,0,0,0)_50%)] bg-[length:100%_4px] opacity-10" />

            {/* Vignette */}
            <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle,rgba(0,0,0,0)_60%,rgba(0,0,0,0.4)_100%)]" />

            {/* Content area with text glow */}
            <div className={cn(
                "relative z-0 h-full w-full",
                noPadding ? "p-0" : "p-8",
                monitorType === 'monochrome' && "text-glow"
            )}>
                {children}
            </div>
            
            {/* Screen reflection/glare */}
            <div className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_15%)]" />
        </div>
    );
}

"use client";

import React from 'react';

interface WebMSXWrapperProps {
    platformId: string;
}

export const WebMSXWrapper = ({ platformId }: WebMSXWrapperProps) => {
    // Official WebMSX URL or a hosted version. 
    // Using the official one for now.
    // Parameters can be added to the URL for specific machines or ROMs if needed.
    // e.g. ?machine=MSX2
    
    // We can customize based on platformId if we have multiple MSX versions later.
    const msxUrl = "https://webmsx.org"; 

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
            <iframe 
                src={msxUrl}
                className="w-full h-full border-none"
                allow="autoplay; fullscreen; gamepad"
                title="WebMSX Emulator"
            />
            <div className="absolute top-2 right-2 opacity-50 text-[10px] text-white pointer-events-none">
                POWERED BY WEBMSX
            </div>
        </div>
    );
};

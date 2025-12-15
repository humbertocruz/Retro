"use client";

import React, { useState } from 'react';
import { Platform } from '@/config/eras';
import { BootSequence } from './boot-sequence';
import { CRTWrapper } from './crt-wrapper';
import { Terminal } from './terminal';
import { Pong } from './programs/pong';
import { Editor } from './programs/editor';
import { WebMSXWrapper } from './emulators/webmsx-wrapper';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export const SystemContainer = ({ platform }: { platform: Platform }) => {
    const [status, setStatus] = useState<'booting' | 'running'>('booting');
    const [program, setProgram] = useState<null | 'pong' | 'editor'>(null);
    const [history, setHistory] = useState<{ type: 'input' | 'output', content: React.ReactNode }[]>([
        { type: 'output', content: `${platform.name.toUpperCase()} BASIC V1.0` },
        { type: 'output', content: `(C) ${platform.year} RETRO SIMULATIONS INC.` },
        { type: 'output', content: 'READY.' },
    ]);
    const router = useRouter();

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toUpperCase();
        
        // Add input to history
        setHistory(prev => [...prev, { type: 'input', content: cleanCmd }]);

        // Process Command
        let output: React.ReactNode = "FILE NOT FOUND OR BAD COMMAND.";

        if (cleanCmd === 'HELP') {
            output = `AVAILABLE COMMANDS:
- DIR: LIST FILES
- PONG: RUN TENNIS GAME
- EDIT: RUN TEXT EDITOR
- CLS: CLEAR SCREEN
- EXIT: RETURN TO REALITY`;
        } else if (cleanCmd === 'DIR') {
             output = `VOLUME IN DRIVE C IS RETRO_SIM
 Directory of C:\\

COMMAND  COM     25,483  01-01-${platform.year}
PONG     EXE     15,360  01-01-${platform.year}
EDITOR   EXE      8,192  01-01-${platform.year}
CONFIG   SYS        128  01-01-${platform.year}
README   TXT      1,024  01-01-${platform.year}
        5 File(s)     49,159 bytes
        1 Dir(s)   20,480,000 bytes free`;
        } else if (cleanCmd === 'CLS' || cleanCmd === 'CLEAR') {
            setHistory([]);
            return;
        } else if (cleanCmd === 'EXIT') {
            router.push('/');
            return;
        } else if (cleanCmd === 'PONG' || cleanCmd === 'RUN PONG') {
            setProgram('pong');
            return;
        } else if (cleanCmd === 'EDIT' || cleanCmd === 'RUN EDIT') {
            setProgram('editor');
            return;
        }

        setHistory(prev => [...prev, { type: 'output', content: output }]);
    };

    // Map themes to specific CSS classes
    const getThemeClass = (theme: Platform['theme']) => {
        switch(theme) {
            case 'amber': return 'text-retro-amber';
            case 'white': return 'text-white';
            case 'color': return 'text-white bg-[#0000AA]';
            default: return 'text-retro-green';
        }
    };

    return (
        <CRTWrapper 
            className={cn("h-screen w-screen transform transition-all", getThemeClass(platform.theme))}
            monitorType={platform.displayConfig?.monitorType}
            curvature={platform.displayConfig?.curvature}
            scanlineIntensity={platform.displayConfig?.scanlineIntensity}
            noPadding={platform.displayConfig?.noPadding}
        >
            {status === 'booting' && (
                <BootSequence 
                    platformName={platform.name}
                    onComplete={() => setStatus('running')} 
                />
            )}
            
            {status === 'running' && !program && platform.id === 'msx-1985' && (
                <div className="h-full w-full relative z-10">
                    <WebMSXWrapper platformId={platform.id} />
                    {/* Escape hatch */}
                    <button 
                        onClick={() => router.push('/')}
                        className="absolute bottom-4 right-4 border border-white/20 bg-black/50 text-white px-4 py-2 hover:bg-white/10 text-sm transition-all z-50 pointer-events-auto backdrop-blur-sm"
                    >
                        EJECT CARTRIDGE
                    </button>
                </div>
            )}

            {status === 'running' && !program && platform.id !== 'msx-1985' && (
                <div className="h-full flex flex-col font-retro text-lg relative p-8">
                    <Terminal 
                        history={history}
                        prompt={platform.type === 'terminal' ? '>' : 'C:\\>'}
                        onCommand={handleCommand}
                    />

                    {/* Escape hatch for user sanity */}
                    <button 
                        onClick={() => router.push('/')}
                        className="absolute bottom-4 right-4 border border-current px-4 py-2 opacity-30 hover:opacity-100 text-sm transition-opacity z-50 pointer-events-auto"
                    >
                        POWER OFF
                    </button>
                    
                    {/* Hack to force focus when clicking anywhere in CRT */}
                    <div className="absolute inset-0 z-0 pointer-events-none" />
                </div>
            )}

            {status === 'running' && program === 'pong' && (
                <Pong onExit={() => setProgram(null)} />
            )}

            {status === 'running' && program === 'editor' && (
                <Editor onExit={() => setProgram(null)} />
            )}
        </CRTWrapper>
    );
};

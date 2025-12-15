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
import { useDisplay } from '@/context/display-context';

export const SystemContainer = ({ platform }: { platform: Platform }) => {
    const { getEffectiveConfig } = useDisplay();
    // Logic for initial state: if skipCustomBoot is true, start as running immediately
    const [status, setStatus] = useState<'booting' | 'running'>(
        platform.skipCustomBoot ? 'running' : 'booting'
    );
    const [program, setProgram] = useState<null | 'pong' | 'editor'>(null);
    const [history, setHistory] = useState<{ type: 'input' | 'output', content: React.ReactNode }[]>([
        { type: 'output', content: `${platform.name.toUpperCase()} BASIC V1.0` },
        { type: 'output', content: `(C) ${platform.year} RETRO SIMULATIONS INC.` },
        { type: 'output', content: 'READY.' },
    ]);
    const router = useRouter();

    const config = getEffectiveConfig(platform);

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toUpperCase();
        
        // Add input to history
        setHistory(prev => [...prev, { type: 'input', content: cleanCmd }]);

        // Process Command
        let output: React.ReactNode = "FILE NOT FOUND OR BAD COMMAND.";

        // Check for aliases depending on platform
        let isDirCommand = cleanCmd === 'DIR';
        if (platform.id.includes('apple') && cleanCmd === 'CATALOG') isDirCommand = true;
        if (platform.id.includes('sh') || platform.id.includes('terminal') || platform.id.includes('unix') || platform.id.includes('linux')) {
             if (cleanCmd === 'LS' || cleanCmd === 'LS -LA') isDirCommand = true;
        }
        if (platform.id.includes('c64') && (cleanCmd === 'LIST' || cleanCmd === 'LOAD"$",8')) isDirCommand = true;

        if (cleanCmd === 'HELP') {
            output = `AVAILABLE COMMANDS:
- ${platform.id.includes('apple') ? 'CATALOG' : (platform.type === 'terminal' ? 'LS' : 'DIR')}: LIST FILES
- PONG: RUN TENNIS GAME
- EDIT: RUN TEXT EDITOR
- CLS: CLEAR SCREEN
- EXIT: RETURN TO REALITY`;
        } else if (isDirCommand) {
             const drive = platform.driveName || 'C:';
             const files = platform.fileSystem || [];
             
             if (platform.id.includes('dos') || platform.id.includes('win')) {
                // DOS Style
                output = (
                    <div className="flex flex-col">
                        <span> Volume in drive {drive[0]} is {platform.isHardDrive ? 'HARD_DISK' : 'RETRO_DISK'}</span>
                        <span> Directory of {drive}\</span>
                        <br/>
                        {files.map((f, i) => (
                            <div key={i} className="flex justify-between w-64">
                                <span>{f.name.padEnd(8)} {f.type === 'dir' ? '<DIR>' : (f.content?.toUpperCase() || 'EXE')}</span>
                                <span>{f.size || '0'}</span>
                            </div>
                        ))}
                        <div className="flex justify-between w-64 mt-2">
                             <span>{files.length} File(s)</span>
                             <span>{Math.floor(Math.random() * 50000)} bytes free</span>
                        </div>
                    </div>
                );
             } else if (platform.id.includes('apple')) {
                // Apple II Style
                output = (
                    <div className="flex flex-col">
                        <span>DISK VOLUME 254</span>
                        <br/>
                        {files.map((f, i) => (
                            <div key={i} className="pl-4">
                                {f.name === 'HELLO' ? '*' : ' '} {String.fromCharCode(65 + i)} 00{f.size || '2'} {f.name}
                            </div>
                        ))}
                        <br/>
                    </div>
                );
             } else if (platform.id.includes('c64')) {
                 // C64 Style
                 output = (
                    <div className="flex flex-col">
                        <span>0 .&quot;{platform.isHardDrive ? 'HARD DISK' : 'RETRO DISK'}&quot;  88 2A</span>
                        {files.map((f, i) => (
                            <div key={i}>
                                {f.size || '10'}   &quot;{f.name}&quot;               PRG
                            </div>
                        ))}
                        <span>64 BLOCKS FREE.</span>
                    </div>
                 );
             } else if (platform.type === 'terminal') {
                // Unix Style
                output = (
                    <div className="flex flex-col">
                         {files.map((f, i) => (
                            <span key={i} className={f.type === 'dir' ? 'text-retro-green font-bold' : ''}>
                                {f.type === 'dir' ? 'd' : '-'}rw-r--r-- 1 user group {f.size || '4096'} {f.date || 'Dec 15'} {f.name}
                            </span>
                        ))}
                    </div>
                );
             } else {
                 // Fallback Generic
                 output = (
                    <div>
                        <div>DRIVE: {drive}</div>
                        {files.map((f, i) => (
                            <div key={i}>- {f.name} ({f.size || 'N/A'})</div>
                        ))}
                    </div>
                 );
             }
        } else if (cleanCmd === 'CLS' || cleanCmd === 'CLEAR' || cleanCmd === 'HOME') {
            setHistory([]);
            return;
        } else if (cleanCmd === 'EXIT') {
            router.push('/');
            return;
        } else if (cleanCmd === 'PONG' || cleanCmd === 'RUN PONG' || cleanCmd === 'RUN "PONG"') {
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
            monitorType={config.monitorType}
            curvature={config.curvature}
            scanlineIntensity={config.scanlineIntensity}
            noPadding={config.noPadding}
        >
            {status === 'booting' && (
                <BootSequence 
                    platformName={platform.name}
                    customSequence={platform.bootSequence}
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
                        prompt={platform.customPrompt || (platform.type === 'terminal' ? '>' : 'C:\\>')}
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

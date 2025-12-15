export interface VirtualFile {
    name: string;
    type: 'file' | 'dir';
    size?: string;
    date?: string;
    content?: string;
}

export interface Platform {
    id: string;
    name: string;
    description: string;
    year: number;
    theme: 'amber' | 'green' | 'color' | 'monochrome' | 'white';
    type: 'terminal' | 'cli' | 'gui';
    displayConfig?: {
        monitorType: 'monochrome' | 'color-tv';
        curvature: 'high' | 'medium' | 'low';
        scanlineIntensity: 'high' | 'medium' | 'low' | 'none';
        noPadding?: boolean;
    };
    skipCustomBoot?: boolean;
    bootSequence?: string[];
    customPrompt?: string;
    fileSystem?: VirtualFile[];
    driveName?: string; // e.g. "C:", "DRIVE 1"
    isHardDrive?: boolean;
}

export const ERAS: Platform[] = [
    {
        id: 'univac-1951',
        name: 'UNIVAC I',
        description: 'First commercial computer produced in the US.',
        year: 1951,
        theme: 'amber',
        type: 'terminal',
        displayConfig: { monitorType: 'monochrome', curvature: 'high', scanlineIntensity: 'high' },
        customPrompt: 'READY >',
        driveName: 'TAPE UNIT 1',
        fileSystem: [
            { name: 'CENSUS_DATA', type: 'file', size: '128 BLKS' },
            { name: 'CALC_ROUTINE', type: 'file', size: '45 BLKS' }
        ],
        bootSequence: [
            "UNIVAC SYSTEM READY",
            "LOAD SUPERVISOR...",
            "TAPE UNIT 1 ONLINE",
            "MEMORY CHECK... OK",
            "READY FOR BATCH PROCESSING"
        ]
    },
    {
        id: 'mainframe-1970',
        name: 'MAINFRAME TERMINAL',
        description: 'University research system. Pure text.',
        year: 1970,
        theme: 'amber',
        type: 'terminal',
        displayConfig: { monitorType: 'monochrome', curvature: 'high', scanlineIntensity: 'high' },
        customPrompt: '$',
        driveName: '/usr/home',
        isHardDrive: true,
        fileSystem: [
            { name: 'research_notes.txt', type: 'file', size: '2KB', date: 'Oct 12' },
            { name: 'fortran_code', type: 'dir' },
            { name: 'mail', type: 'file', size: '1KB', date: 'Oct 14' }
        ],
        bootSequence: [
            "VT100 TERMINAL ONLINE",
            "CONNECTION ESTABLISHED",
            "LOGIN:",
            "PASSWORD: *********",
            "WELCOME TO UNIVERSITY MAINFRAME",
            "SYSTEM KERNEL V4.2 LOADED"
        ]
    },
    {
        id: 'apple1-1976',
        name: 'APPLE I',
        description: 'The garage-built revolution.',
        year: 1976,
        theme: 'white',
        type: 'cli',
        displayConfig: { monitorType: 'monochrome', curvature: 'medium', scanlineIntensity: 'medium' },
        customPrompt: '\\',
        driveName: 'CASSETTE INTERFACE',
        fileSystem: [
            { name: 'BASIC', type: 'file', size: '4096' },
            { name: 'STAR TREK', type: 'file', size: '8192' }
        ],
        bootSequence: [
            "\\", 
            "APPLE SYSTEM MONITOR",
            "WAITING FOR INPUT",
            "READY"
        ]
    },
    {
        id: 'apple2-1977',
        name: 'APPLE II',
        description: 'The first consumer appliance computer.',
        year: 1977,
        theme: 'green',
        type: 'cli',
        displayConfig: { monitorType: 'color-tv', curvature: 'medium', scanlineIntensity: 'medium' },
        customPrompt: ']',
        driveName: 'DISK II',
        fileSystem: [
            { name: 'HELLO', type: 'file', size: '2' },
            { name: 'APPLESOFT', type: 'file', size: '32' },
            { name: 'BRICKOUT', type: 'file', size: '15' },
            { name: 'LEMONADE', type: 'file', size: '22' }
        ],
        bootSequence: [
            "APPLE II",
            "",
            "DOS 3.3 SYSTEM MASTER",
            "",
            "]"
        ]
    },
    {
        id: 'trs80-1977',
        name: 'TRS-80 MODEL I',
        description: 'Affordable home computing.',
        year: 1977,
        theme: 'white',
        type: 'cli',
        displayConfig: { monitorType: 'monochrome', curvature: 'medium', scanlineIntensity: 'medium' },
        customPrompt: '>', // TRS-80 Level II Basic prompt
        driveName: 'CASSETTE',
        fileSystem: [
            { name: 'SYSTEM', type: 'file' },
            { name: 'BASIC', type: 'file' },
            { name: 'DANCING DEMON', type: 'file' }
        ],
        bootSequence: [
            "MEMORY SIZE?",
            "RADIO SHACK LEVEL II BASIC",
            "READY",
            ">"
        ]
    },
    {
        id: 'spectrum-1982',
        name: 'ZX SPECTRUM',
        description: 'The UK\'s favorite 8-bit machine.',
        year: 1982,
        theme: 'color',
        type: 'cli',
        displayConfig: { monitorType: 'color-tv', curvature: 'medium', scanlineIntensity: 'medium' },
        customPrompt: '>', // Simplified for our purposes
        driveName: 'TAPE RECORDER',
        fileSystem: [
             { name: 'MANIC MINER', type: 'file' },
             { name: 'JET SET WILLY', type: 'file' },
             { name: 'HORACE GOES SKIING', type: 'file' }
        ],
        bootSequence: [
            "(c) 1982 Sinclair Research Ltd",
            "",
            "Color System Initialized",
            "BASIC OK"
        ]
    },
    {
        id: 'c64-1982',
        name: 'COMMODORE 64',
        description: 'The best-selling computer of all time.',
        year: 1982,
        theme: 'color', 
        type: 'cli',
        displayConfig: { monitorType: 'color-tv', curvature: 'medium', scanlineIntensity: 'medium' },
        customPrompt: 'READY.', 
        driveName: 'Device 8',
        fileSystem: [
            { name: 'GIANA SISTERS', type: 'file', size: '145 BLOCKS' },
            { name: 'COMMANDO', type: 'file', size: '130 BLOCKS' },
            { name: 'BUBBLE BOBBLE', type: 'file', size: '122 BLOCKS' }
        ],
        bootSequence: [
            "    **** COMMODORE 64 BASIC V2 ****",
            "",
            " 64K RAM SYSTEM  38911 BASIC BYTES FREE",
            "",
            "READY.",
        ]
    },
    {
        id: 'dos-1985',
        name: 'IBM PC (MS-DOS)',
        description: 'Business standard workstation.',
        year: 1985,
        theme: 'white',
        type: 'cli',
        displayConfig: { monitorType: 'monochrome', curvature: 'low', scanlineIntensity: 'medium' },
        customPrompt: 'C:\\>',
        driveName: 'Drive C',
        isHardDrive: true,
        fileSystem: [
            { name: 'COMMAND.COM', type: 'file', size: '25,483', date: '01-01-85' },
            { name: 'AUTOEXEC.BAT', type: 'file', size: '128', date: '01-01-85' },
            { name: 'CONFIG.SYS', type: 'file', size: '45', date: '01-01-85' },
            { name: 'DOCS', type: 'dir' },
            { name: 'GAMES', type: 'dir' }
        ],
        bootSequence: [
            "Starting MS-DOS...",
            "",
            "HIMEM is testing extended memory...done.",
            "C:\\>AUTOEXEC.BAT",
            "C:\\>ECHO OFF",
            "Detected Mouse Driver...",
            "C:\\>"
        ]
    },
    {
        id: 'msx-1985',
        name: 'MSX SYSTEM',
        description: 'The standard for home computing.',
        year: 1985,
        theme: 'color',
        type: 'gui',
        displayConfig: { monitorType: 'color-tv', curvature: 'low', scanlineIntensity: 'low', noPadding: true },
        skipCustomBoot: true
    },
    {
        id: 'amiga-1985',
        name: 'COMMODORE AMIGA 1000',
        description: 'Multimedia powerhouse.',
        year: 1985,
        theme: 'color',
        type: 'gui',
        displayConfig: { monitorType: 'color-tv', curvature: 'low', scanlineIntensity: 'low' },
        customPrompt: '1>', 
        driveName: 'DF0',
        fileSystem: [
            { name: 'Workbench', type: 'dir' },
            { name: 'Utilities', type: 'dir' },
            { name: 'Trashcan', type: 'dir' },
            { name: 'Demos', type: 'dir' }
        ],
        bootSequence: [
            "AmigaDOS 1.0",
            "",
            "Copyright 1985 Commodore-Amiga, Inc.",
            "All Rights Reserved.",
            "",
            "Workbench Loaded."
        ]
    },
     {
        id: 'windows95-1995',
        name: 'WIN 9X PC',
        description: 'The graphical revolution.',
        year: 1995,
        theme: 'color',
        type: 'gui',
        displayConfig: { monitorType: 'color-tv', curvature: 'low', scanlineIntensity: 'none' },
        customPrompt: 'C:\\WINDOWS>',
        driveName: 'Disk C',
        isHardDrive: true,
        fileSystem: [
             { name: 'WIN.COM', type: 'file', size: '24KB' },
             { name: 'SYSTEM.INI', type: 'file', size: '2KB' },
             { name: 'COMMAND.COM', type: 'file', size: '45KB' }
        ],
        bootSequence: [
            "Starting Windows 95...",
            "",
            "Microsoft (R) Windows 95",
            "   (C)Copyright Microsoft Corp 1981-1995.",
            "",
            "C:\\WINDOWS>WIN"
        ]
    },
    {
        id: 'terminal-2024',
        name: 'MODERN TERMINAL',
        description: 'ZSH on Arch Linux.',
        year: 2024,
        theme: 'green',
        type: 'terminal',
        displayConfig: { monitorType: 'monochrome', curvature: 'low', scanlineIntensity: 'none' },
        customPrompt: '[user@archlinux ~]$',
        driveName: '/home/user',
        isHardDrive: true,
        fileSystem: [
            { name: 'projects', type: 'dir' },
            { name: '.config', type: 'dir' },
            { name: '.zshrc', type: 'file', size: '4KB' },
            { name: 'todo.md', type: 'file', size: '1KB' }
        ],
        bootSequence: [
            "Arch Linux 6.8.1-arch1-1 (tty1)",
            "",
            "archlinux login: user",
            "Password: ",
            "Last login: Mon Dec 15 10:00:00 on tty1",
            "[user@archlinux ~]$" 
        ]
    }
];

export interface Platform {
    id: string;
    name: string;
    description: string;
    year: number;
    theme: 'amber' | 'green' | 'color' | 'monochrome' | 'white';
    type: 'terminal' | 'cli' | 'gui';
}

export const ERAS: Platform[] = [
    {
        id: 'mainframe-1970',
        name: 'MAINFRAME TERMINAL',
        description: 'University research system. Pure text.',
        year: 1970,
        theme: 'amber',
        type: 'terminal'
    },
    {
        id: 'apple-1978',
        name: 'RETRO HOME PC',
        description: '8-bit power in your home.',
        year: 1978,
        theme: 'green',
        type: 'cli'
    },
    {
        id: 'dos-1985',
        name: 'BUSINESS WORKSTATION',
        description: 'Productivity and spreadsheets.',
        year: 1985,
        theme: 'white',
        type: 'cli'
    }
];

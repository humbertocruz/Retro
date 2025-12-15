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
}

export const ERAS: Platform[] = [
    {
        id: 'mainframe-1970',
        name: 'MAINFRAME TERMINAL',
        description: 'University research system. Pure text.',
        year: 1970,
        theme: 'amber',
        type: 'terminal',
        displayConfig: {
            monitorType: 'monochrome',
            curvature: 'high',
            scanlineIntensity: 'high'
        }
    },
    {
        id: 'apple-1978',
        name: 'RETRO HOME PC',
        description: '8-bit power in your home.',
        year: 1978,
        theme: 'green',
        type: 'cli',
        displayConfig: {
            monitorType: 'monochrome',
            curvature: 'medium',
            scanlineIntensity: 'medium'
        }
    },
    {
        id: 'dos-1985',
        name: 'BUSINESS WORKSTATION',
        description: 'Productivity and spreadsheets.',
        year: 1985,
        theme: 'white',
        type: 'cli',
        displayConfig: {
            monitorType: 'monochrome',
            curvature: 'low',
            scanlineIntensity: 'medium'
        }
    },
    {
        id: 'msx-1985',
        name: 'MSX SYSTEM',
        description: 'The standard for home computing.',
        year: 1985,
        theme: 'color',
        type: 'gui',
        displayConfig: {
            monitorType: 'color-tv',
            curvature: 'low',
            scanlineIntensity: 'low',
            noPadding: true
        }
    }
];

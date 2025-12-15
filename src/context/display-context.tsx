"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from '@/config/eras';

interface DisplaySettings {
    monitorTypeOverride: 'monochrome' | 'color-tv' | null;
    curvatureOverride: 'high' | 'medium' | 'low' | null;
    scanlineIntensityOverride: 'high' | 'medium' | 'low' | 'none' | null;
}

interface DisplayContextType {
    settings: DisplaySettings;
    updateSettings: (key: keyof DisplaySettings, value: string | null) => void;
    getEffectiveConfig: (platform: Platform) => NonNullable<Platform['displayConfig']>;
}

const DisplayContext = createContext<DisplayContextType | undefined>(undefined);

export function DisplayProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<DisplaySettings>({
        monitorTypeOverride: null,
        curvatureOverride: null,
        scanlineIntensityOverride: null,
    });

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('retro_display_settings');
        if (saved) {
            try {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setSettings(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse display settings", e);
            }
        }
    }, []);

    const updateSettings = (key: keyof DisplaySettings, value: string | null) => {
        setSettings(prev => {
            const next = { ...prev, [key]: value };
            localStorage.setItem('retro_display_settings', JSON.stringify(next));
            return next;
        });
    };

    const getEffectiveConfig = (platform: Platform): NonNullable<Platform['displayConfig']> => {
        const base = platform.displayConfig || {
             monitorType: 'monochrome',
             curvature: 'medium',
             scanlineIntensity: 'medium',
             noPadding: false
        };

        return {
            monitorType: settings.monitorTypeOverride ?? base.monitorType,
            curvature: settings.curvatureOverride ?? base.curvature,
            scanlineIntensity: settings.scanlineIntensityOverride ?? base.scanlineIntensity,
            noPadding: base.noPadding // We don't override padding logic usually
        };
    };

    return (
        <DisplayContext.Provider value={{ settings, updateSettings, getEffectiveConfig }}>
            {children}
        </DisplayContext.Provider>
    );
}

export function useDisplay() {
    const context = useContext(DisplayContext);
    if (!context) {
        throw new Error("useDisplay must be used within a DisplayProvider");
    }
    return context;
}

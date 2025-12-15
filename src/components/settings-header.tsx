"use client";

import React, { useState } from 'react';
import { useDisplay } from '@/context/display-context';

export const SettingsHeader = () => {
    const { settings, updateSettings } = useDisplay();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-full z-50 pointer-events-none p-4">
            <div className="flex justify-between items-start">
                <div className="pointer-events-auto">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-black/80 text-retro-green border border-retro-green/50 px-3 py-1 hover:bg-retro-green hover:text-black transition-colors uppercase text-sm backdrop-blur-sm"
                    >
                        {isOpen ? '[x] Close Config' : '[+] CRT Config'}
                    </button>

                    {isOpen && (
                        <div className="mt-2 bg-black/90 border border-retro-green/50 p-4 w-64 backdrop-blur-md space-y-4 shadow-lg shadow-retro-green/10">
                            <div>
                                <label className="block text-xs uppercase opacity-70 mb-1">Monitor Type</label>
                                <select 
                                    className="w-full bg-black border border-retro-green/30 px-2 py-1 text-sm focus:outline-none focus:border-retro-green"
                                    value={settings.monitorTypeOverride || ""} 
                                    onChange={(e) => updateSettings('monitorTypeOverride', e.target.value || null)}
                                >
                                    <option value="">Default (Auto)</option>
                                    <option value="monochrome">Monochrome</option>
                                    <option value="color-tv">Color TV</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs uppercase opacity-70 mb-1">Scanlines</label>
                                <select 
                                    className="w-full bg-black border border-retro-green/30 px-2 py-1 text-sm focus:outline-none focus:border-retro-green"
                                    value={settings.scanlineIntensityOverride || ""} 
                                    onChange={(e) => updateSettings('scanlineIntensityOverride', e.target.value || null)}
                                >
                                    <option value="">Default (Auto)</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                    <option value="none">Off</option>
                                </select>
                            </div>

                             <div>
                                <label className="block text-xs uppercase opacity-70 mb-1">Curvature</label>
                                <select 
                                    className="w-full bg-black border border-retro-green/30 px-2 py-1 text-sm focus:outline-none focus:border-retro-green"
                                    value={settings.curvatureOverride || ""} 
                                    onChange={(e) => updateSettings('curvatureOverride', e.target.value || null)}
                                >
                                    <option value="">Default (Auto)</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>

                            <div className="text-[10px] text-center opacity-40 pt-2 border-t border-white/10">
                                SYSTEM CONFIG V1.0
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

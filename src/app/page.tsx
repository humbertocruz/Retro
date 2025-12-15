"use client";

import { CRTWrapper } from "@/components/crt-wrapper";
import { ERAS } from "@/config/eras";
import { SettingsHeader } from "@/components/settings-header";
import { useDisplay } from "@/context/display-context";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { settings } = useDisplay();
  const router = useRouter();

  const [selectedDecade, setSelectedDecade] = useState<number>(1980);
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('');
  const [imgSrc, setImgSrc] = useState('/retro-setup.png');

  // Default home config or check local logic
  const homeConfig = {
      monitorType: (settings.monitorTypeOverride || 'monochrome') as 'monochrome' | 'color-tv',
      curvature: (settings.curvatureOverride || 'medium') as 'high' | 'medium' | 'low',
      scanlineIntensity: (settings.scanlineIntensityOverride || 'medium') as 'high' | 'medium' | 'low' | 'none',
  };

  const decades = [1950, 1970, 1980, 1990, 2000, 2010];

  const availablePlatforms = useMemo(() => {
    return ERAS.filter(p => {
        if (selectedDecade === 2010) return p.year >= 2010;
        return p.year >= selectedDecade && p.year < selectedDecade + 10;
    }).sort((a, b) => a.year - b.year); // Oldest first in list usually makes sense for timeline, or newest? Let's do chronological.
  }, [selectedDecade]);

  // Reset selection when decade changes
  useEffect(() => {
      setSelectedPlatformId('');
  }, [selectedDecade]);

  // Update Image when platform changes
  useEffect(() => {
      if (selectedPlatformId) {
          // Attempt to load specific platform image, will fallback via onError
          setImgSrc(`/platforms/${selectedPlatformId}.png`);
      } else {
          setImgSrc('/retro-setup.png');
      }
  }, [selectedPlatformId]);

  const handleStart = () => {
      if (selectedPlatformId) {
          router.push(`/system/${selectedPlatformId}`);
      }
  };

  return (
    <>
      <SettingsHeader />
      <CRTWrapper
        className="flex flex-col h-screen"
        monitorType={homeConfig.monitorType}
        curvature={homeConfig.curvature}
        scanlineIntensity={homeConfig.scanlineIntensity}
      >
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-hidden">

            {/* LEFT COLUMN: Visuals */}
            <div className="flex flex-col gap-6 h-full justify-center">
                 {/* Title */}
                <div className="space-y-2 text-left">
                     <h1 className="text-5xl lg:text-7xl font-bold animate-pulse text-retro-amber drop-shadow-[0_0_10px_rgba(255,176,0,0.5)]">
                      RETRO_OS
                    </h1>
                    <p className="text-xl uppercase tracking-widest opacity-80 text-retro-green">
                      Select System Coordinates
                    </p>
                </div>

                {/* Dynamic Image */}
                <div className="relative w-full aspect-video border-2 border-retro-green rounded-lg overflow-hidden shadow-[0_0_25px_rgba(51,255,0,0.3)] bg-black/50">
                    <Image
                        src={imgSrc}
                        alt="Retro System"
                        fill
                        className="object-cover opacity-90 transition-opacity duration-500"
                        style={{ imageRendering: 'pixelated' }}
                        priority
                        onError={() => setImgSrc('/retro-setup.png')}
                    />
                     {/* Overlay info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 border-t border-retro-green/30 backdrop-blur-sm">
                         <p className="text-retro-amber font-mono text-lg">
                             {selectedPlatformId 
                                ? `> SELECTED: ${availablePlatforms.find(p => p.id === selectedPlatformId)?.name}` 
                                : "> SYSTEM_SELECT: WAITING..."}
                         </p>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Controls */}
            <div className="flex flex-col gap-6 h-full max-h-[80vh] bg-black/40 border border-retro-green/30 p-6 rounded-xl backdrop-blur-sm overflow-hidden">
                
                {/* 1. Decade Selector */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase text-retro-green/70">1. Select Era</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {decades.map(decade => (
                            <button
                                key={decade}
                                onClick={() => setSelectedDecade(decade)}
                                className={`
                                    px-2 py-3 rounded border border-retro-green/50 text-sm font-bold transition-all
                                    ${selectedDecade === decade 
                                        ? 'bg-retro-green text-black shadow-[0_0_10px_rgba(51,255,0,0.6)]' 
                                        : 'bg-black/50 text-retro-green hover:bg-retro-green/20'}
                                `}
                            >
                                {decade}s
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Platform List */}
                <div className="flex flex-col gap-2 flex-1 overflow-hidden min-h-0">
                     <label className="text-sm font-bold uppercase text-retro-green/70">
                         2. Select System ({availablePlatforms.length})
                     </label>
                     <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-retro-green scrollbar-track-black/20">
                         {availablePlatforms.length === 0 && (
                             <div className="text-center py-8 opacity-50 italic">No systems found for this era.</div>
                         )}
                         {availablePlatforms.map(p => (
                             <button
                                key={p.id}
                                onClick={() => setSelectedPlatformId(p.id)}
                                className={`
                                    w-full text-left p-4 border border-retro-green/30 rounded flex justify-between items-center group transition-all
                                    ${selectedPlatformId === p.id
                                        ? 'bg-retro-green/20 border-retro-green text-white shadow-inner'
                                        : 'bg-black/20 hover:bg-white/5 hover:border-retro-green/60 text-retro-green/80'}
                                `}
                             >
                                 <div className="flex flex-col">
                                     <span className="font-bold text-lg group-hover:text-retro-amber transition-colors">{p.name}</span>
                                     <span className="text-xs opacity-60">{p.year} • {p.type.toUpperCase()}</span>
                                 </div>
                                 {selectedPlatformId === p.id && <span className="animate-pulse">●</span>}
                             </button>
                         ))}
                     </div>
                </div>

                {/* 3. Start Button */}
                <div className="pt-2">
                    <button
                        onClick={handleStart}
                        disabled={!selectedPlatformId}
                        className={`
                            w-full py-5 text-2xl font-bold uppercase tracking-wider border-2 transition-all
                            ${selectedPlatformId
                                ? 'bg-retro-green text-black border-retro-green hover:bg-retro-amber hover:border-retro-amber hover:shadow-[0_0_20px_rgba(255,176,0,0.6)] cursor-pointer'
                                : 'bg-transparent text-gray-600 border-gray-800 cursor-not-allowed opacity-50'}
                        `}
                    >
                         {selectedPlatformId ? 'LAUNCH SYSTEM' : 'SELECT SYSTEM'}
                    </button>
                </div>

            </div>

        </main>
      </CRTWrapper>
    </>
  );
}

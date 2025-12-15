"use client";

import { CRTWrapper } from "@/components/crt-wrapper";
import { ERAS, Platform } from "@/config/eras";
import { SettingsHeader } from "@/components/settings-header";
import { useDisplay } from "@/context/display-context";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { settings } = useDisplay();
  const router = useRouter();

  const [selectedYear, setSelectedYear] = useState<number>(1985);
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('');
  
  // Default home config or check local logic
  const homeConfig = {
      monitorType: settings.monitorTypeOverride || 'monochrome', 
      curvature: settings.curvatureOverride || 'medium',
      scanlineIntensity: settings.scanlineIntensityOverride || 'medium',
  };

  // Filter platforms based on year range (e.g. +/- 5 years or just <= year)
  // For this UI, let's show platforms that existed around that time.
  const availablePlatforms = useMemo(() => {
    return ERAS.filter(p => {
        // Show platforms released up to the selected year, 
        // but maybe filter out very old ones if year is high? 
        // For simplicity: Show everything released <= selectedYear
        // AND not too old (e.g. > selectedYear - 15) to keep list relevant?
        // Let's just do <= selectedYear to see history accumulating.
        return p.year <= selectedYear;
    }).sort((a, b) => b.year - a.year); // Newest first
  }, [selectedYear]);

  // Update selected platform if the current one becomes unavailable
  if (selectedPlatformId && !availablePlatforms.find(p => p.id === selectedPlatformId)) {
     if (availablePlatforms.length > 0) {
        setSelectedPlatformId(availablePlatforms[0].id);
     } else {
        setSelectedPlatformId('');
     }
  }
  
  const handleStart = () => {
      if (selectedPlatformId) {
          router.push(`/system/${selectedPlatformId}`);
      }
  };

  return (
    <>
      <SettingsHeader />
      <CRTWrapper 
        className="flex items-center justify-center flex-col"
        monitorType={homeConfig.monitorType as any}
        curvature={homeConfig.curvature as any}
        scanlineIntensity={homeConfig.scanlineIntensity as any}
      >
        <main className="text-center w-full max-w-3xl px-6 relative z-10 flex flex-col gap-8">
            
            {/* Header / Title */}
            <div className="space-y-2">
                 <h1 className="text-5xl md:text-7xl font-bold animate-pulse text-retro-amber drop-shadow-[0_0_10px_rgba(255,176,0,0.5)]">
                  RETRO_TIMELINE
                </h1>
                <p className="text-xl uppercase tracking-widest opacity-80">
                  Select Temporal Coordinates
                </p>
            </div>

            {/* Year Selector */}
            <div className="flex flex-col gap-4 border-2 border-retro-green/30 p-8 bg-black/40 backdrop-blur-sm">
                <label className="text-2xl font-bold uppercase text-left flex justify-between">
                    <span>Target Year</span>
                    <span className="text-retro-amber animate-pulse">{selectedYear}</span>
                </label>
                <input 
                    type="range" 
                    min="1950" 
                    max="2025" 
                    step="1"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="w-full h-4 bg-retro-dark appearance-none border border-retro-green/50 cursor-pointer accent-retro-green outline-none"
                    style={{
                      background: `linear-gradient(to right, #33ff00 0%, #33ff00 ${((selectedYear - 1950) / (2025 - 1950)) * 100}%, #111 ${((selectedYear - 1950) / (2025 - 1950)) * 100}%, #111 100%)`
                    }}
                />
                <div className="flex justify-between text-xs opacity-50 uppercase font-mono">
                    <span>1950</span>
                    <span>1970</span>
                    <span>1990</span>
                    <span>2010</span>
                    <span>2025</span>
                </div>
            </div>

            {/* Platform Selector */}
            <div className="flex flex-col gap-4">
                <label className="text-xl font-bold uppercase text-left opacity-80">
                    Available Systems {availablePlatforms.length > 0 ? `(${availablePlatforms.length})` : '(0)'}
                </label>
                
                <select 
                    value={selectedPlatformId}
                    onChange={(e) => setSelectedPlatformId(e.target.value)}
                    className="w-full bg-black border-2 border-retro-green p-4 text-xl font-retro uppercase focus:outline-none focus:bg-retro-green/10 transition-colors"
                >
                    <option value="" disabled>-- SELECT SYSTEM --</option>
                    {availablePlatforms.map(p => (
                        <option key={p.id} value={p.id}>
                            [{p.year}] {p.name}
                        </option>
                    ))}
                </select>
                
                {/* Selected Platform Details Preview */}
                <div className="h-16 flex items-center justify-center text-sm opacity-70 border-t border-retro-green/20 mt-2">
                    {selectedPlatformId ? (
                        <span>{availablePlatforms.find(p => p.id === selectedPlatformId)?.description}</span>
                    ) : (
                        <span>SELECT A SYSTEM TO INITIALIZE...</span>
                    )}
                </div>
            </div>

            {/* Start Button */}
            <button 
                onClick={handleStart}
                disabled={!selectedPlatformId}
                className="group relative px-8 py-4 bg-transparent border-2 border-retro-green text-retro-green text-3xl font-bold uppercase overflow-hidden transition-all hover:bg-retro-green hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <span className="relative z-10 group-hover:animate-pulse">
                    INITIALIZE BOOT SEQUENCE
                </span>
            </button>

        </main>
    </CRTWrapper>
    </>
  );
}

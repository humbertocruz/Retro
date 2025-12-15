import { CRTWrapper } from "@/components/crt-wrapper";
import { ERAS } from "@/config/eras";
import Link from "next/link";

export default function Home() {
  return (
    <CRTWrapper className="flex items-center justify-center flex-col">
      <main className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold animate-pulse">
          SYSTEM_BOOT_SEQUENCE_INITIATED
        </h1>
        <p className="text-xl opacity-80">
          SELECT_TARGET_ERA...
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl px-4">
            {ERAS.map((era) => (
                <Link 
                    key={era.id}
                    href={`/system/${era.id}`}
                    className="border-2 border-retro-green p-6 hover:bg-retro-green hover:text-retro-dark transition-colors cursor-pointer group flex flex-col gap-2"
                >
                    <span className="text-2xl font-bold block mb-2 group-hover:underline">
                        [ {era.year} :: {era.name} ]
                    </span>
                    <span className="text-sm opacity-80 group-hover:opacity-100">
                        {era.description}
                    </span>
                </Link>
            ))}
        </div>
      </main>
    </CRTWrapper>
  );
}

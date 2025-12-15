import React from 'react';
import { ERAS } from '@/config/eras';
import { SystemContainer } from '@/components/system-container';
import { notFound } from 'next/navigation';

// Correctly typing params for Next.js 16 (where params is a Promise)
export default async function Page({ params }: { params: Promise<{ era: string }> }) {
    const { era } = await params;
    const platform = ERAS.find(p => p.id === era);

    if (!platform) {
        notFound();
    }

    return <SystemContainer platform={platform} />;
}

export function generateStaticParams() {
    return ERAS.map((platform) => ({
        era: platform.id,
    }));
}

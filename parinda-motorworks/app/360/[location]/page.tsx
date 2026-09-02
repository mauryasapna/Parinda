import React from 'react';
import { notFound } from 'next/navigation';
import { PANORAMA_LOCATIONS, getLocationById } from '@/data/panoramas';
import { PanoramaViewer } from '@/components/panorama';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    location: string;
  }>;
}

export async function generateStaticParams() {
  return PANORAMA_LOCATIONS.map((loc) => ({
    location: loc.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params;
  const loc = getLocationById(location);

  if (!loc) {
    return {
      title: 'Parinda 360° Experience',
      description: 'Step inside the Parinda adventure destination in true 3D 360° virtual reality.'
    };
  }

  return {
    title: `${loc.title} - 360° Virtual Experience | Parinda`,
    description: loc.description,
    openGraph: {
      title: `${loc.title} - Parinda 360° Tour`,
      description: loc.description,
      images: [loc.thumbnail]
    }
  };
}

export default async function Location360Page({ params }: PageProps) {
  const { location } = await params;
  const loc = getLocationById(location);

  if (!loc) {
    notFound();
  }

  return (
    <main className="w-full h-screen bg-black overflow-hidden select-none">
      <PanoramaViewer
        locationId={loc.id}
        title={loc.title}
        image={loc.image}
      />
    </main>
  );
}

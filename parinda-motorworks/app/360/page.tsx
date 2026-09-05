import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{
    loc?: string;
  }>;
}

export default async function VirtualTourIndexPage({ searchParams }: PageProps) {
  const { loc } = await searchParams;
  const target = loc ? loc.trim().toLowerCase() : 'reception';
  redirect(`/360/${target}`);
}

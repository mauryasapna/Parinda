import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Parinda | Adventure Mobility Experience Center',
  description: 'A premium adventure mobility destination for off-road riding, skill development, camping, food, community and vehicle experiences.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GTA Studio Intake',
  description: 'Client intake manager for tattoo studio workflows',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

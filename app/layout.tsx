import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Velocity — Ship Faster, Scale Smarter',
  description: 'The modern platform for teams who build. Velocity accelerates your workflow with powerful tools, seamless integrations, and real-time collaboration.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}

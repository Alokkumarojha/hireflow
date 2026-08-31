import type { Metadata } from 'next';
import Navbar from '@/components/navbar/navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'HireFlow',
  description: 'Advanced job recruitment platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

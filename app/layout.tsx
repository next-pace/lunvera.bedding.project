// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/components/I18nProvider';
import { DevBadge } from '@/components/DevBadge';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lunvera Bedding | Lunvera Yatak ile Odada Yaşam',
  description: 'Redefining comfort with premium bedding collections',
  icons: {
    icon: [
      { url: 'https://i.hizliresim.com/9qw59mz.png' },
    ],
    shortcut: ['https://i.hizliresim.com/9qw59mz.png'],
    apple: ['https://i.hizliresim.com/9qw59mz.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          {children}
          <DevBadge />
        </I18nProvider>
      </body>
    </html>
  );
}
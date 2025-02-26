import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GameDiscover - Найди свою любимую игру',
  description: 'Откройте для себя лучшие видеоигры и ищите в базе данных IGDB',};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <div className="container mx-auto py-6 md:py-10">
              {children}
            </div>
          </main>
          <footer className="border-t py-6 md:py-0">
            <div className="container mx-auto flex h-16 items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} GameDiscover. Работает на основе IGDB API. </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
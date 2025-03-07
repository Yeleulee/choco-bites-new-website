import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const playfair = Playfair_Display({ subsets: ['latin'] });
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'c_hoco_bites | Artisanal Chocolate Creations',
  description: 'Discover luxury handcrafted chocolates made with passion and precision. Experience the art of chocolate making with c_hoco_bites.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
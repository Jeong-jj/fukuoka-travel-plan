import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '후쿠오카 4박 5일 · Beta 1.4.0',
  description: 'iPhone과 Galaxy에 최적화된 2026 후쿠오카 4박 5일 여행 플래너',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}

import type { Metadata, Viewport } from 'next';
import './globals.css';
import Menu from '@/components/Menu/Menu';
import Rodape from '@/components/Rodape/Rodape';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Convites animados em vídeo | ${site.nome}`,
    template: `%s | ${site.nome}`,
  },
  description: site.descricao,
  applicationName: site.nome,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: site.nome,
    title: `Convites animados em vídeo | ${site.nome}`,
    description: site.descricao,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Convites animados em vídeo | ${site.nome}`,
    description: site.descricao,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0b0f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Menu />
        <main>{children}</main>
        <Rodape />
      </body>
    </html>
  );
}

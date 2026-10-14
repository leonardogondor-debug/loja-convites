import type { Metadata } from 'next';
import PaginaEvento from '@/components/PaginaEvento/PaginaEvento';

export const metadata: Metadata = {
  title: 'Você foi convidado!',
  robots: { index: false, follow: false },
};

export default async function PaginaDoEvento({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="container" style={{ paddingTop: 32 }}>
      <h1 style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.2rem)', marginBottom: 24 }}>Você foi convidado(a)!</h1>
      <PaginaEvento id={id} />
    </div>
  );
}

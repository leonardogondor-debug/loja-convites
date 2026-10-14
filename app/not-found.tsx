import type { Metadata } from 'next';
import Botao from '@/components/Botao/Botao';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: false },
};

export default function NaoEncontrado() {
  return (
    <div className="container" style={{ padding: '64px 16px', textAlign: 'center' }}>
      <p style={{ fontSize: '4rem', margin: 0 }} aria-hidden="true">
        🎈
      </p>
      <h1>Página não encontrada</h1>
      <p style={{ color: 'var(--texto-suave)' }}>O endereço que você abriu não existe ou foi movido.</p>
      <Botao href="/convites">Ver convites</Botao>
    </div>
  );
}

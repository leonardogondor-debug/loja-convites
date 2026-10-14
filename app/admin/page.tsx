import type { Metadata } from 'next';
import CabecalhoPagina from '@/components/CabecalhoPagina/CabecalhoPagina';
import PainelAdmin from '@/components/PainelAdmin/PainelAdmin';

export const metadata: Metadata = {
  title: 'Painel administrativo',
  robots: { index: false, follow: false },
};

export default function PaginaAdmin() {
  return (
    <div className="container">
      <CabecalhoPagina
        titulo="Painel administrativo"
        descricao="Acompanhe pedidos, confirme pagamentos e libere os convites."
      />
      <PainelAdmin />
    </div>
  );
}

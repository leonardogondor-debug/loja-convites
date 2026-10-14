import type { Metadata } from 'next';
import CabecalhoPagina from '@/components/CabecalhoPagina/CabecalhoPagina';
import Checkout from '@/components/Checkout/Checkout';

export const metadata: Metadata = {
  title: 'Pagamento',
  robots: { index: false, follow: false },
};

export default async function PaginaCheckout({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="container">
      <CabecalhoPagina
        titulo="Finalizar pedido"
        trilha={[{ rotulo: 'Início', href: '/' }, { rotulo: 'Pagamento' }]}
      />
      <Checkout id={id} />
    </div>
  );
}

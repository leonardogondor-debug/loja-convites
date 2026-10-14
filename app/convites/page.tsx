import type { Metadata } from 'next';
import CabecalhoPagina from '@/components/CabecalhoPagina/CabecalhoPagina';
import Catalogo from '@/components/Catalogo/Catalogo';
import { convites } from '@/lib/convites';

export const metadata: Metadata = {
  title: 'Catálogo de convites animados',
  description:
    'Veja todos os modelos de convites animados em vídeo: infantil, aniversário, chá de bebê, casamento e formatura. Personalize e receba pronto para o WhatsApp.',
  alternates: { canonical: '/convites' },
  openGraph: { url: '/convites', title: 'Catálogo de convites animados' },
};

export default function PaginaConvites() {
  return (
    <div className="container">
      <CabecalhoPagina
        titulo="Catálogo de convites animados"
        descricao="Escolha um modelo, personalize com os dados da sua festa e receba o convite em vídeo."
        trilha={[{ rotulo: 'Início', href: '/' }, { rotulo: 'Convites' }]}
      />
      <Catalogo convites={convites} />
    </div>
  );
}

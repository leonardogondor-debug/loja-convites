import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CabecalhoPagina from '@/components/CabecalhoPagina/CabecalhoPagina';
import Catalogo from '@/components/Catalogo/Catalogo';
import { categorias, convitesPorCategoria, getCategoria } from '@/lib/convites';

interface Props {
  params: Promise<{ categoria: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const dados = getCategoria(categoria);
  if (!dados) return {};
  return {
    title: `Convites animados de ${dados.nome.toLowerCase()}`,
    description: dados.descricao,
    alternates: { canonical: `/categorias/${dados.slug}` },
    openGraph: { url: `/categorias/${dados.slug}`, title: `Convites animados de ${dados.nome.toLowerCase()}` },
  };
}

export default async function PaginaCategoria({ params }: Props) {
  const { categoria } = await params;
  const dados = getCategoria(categoria);
  if (!dados) notFound();

  return (
    <div className="container">
      <CabecalhoPagina
        titulo={`Convites animados de ${dados.nome.toLowerCase()}`}
        descricao={dados.descricao}
        trilha={[
          { rotulo: 'Início', href: '/' },
          { rotulo: 'Convites', href: '/convites' },
          { rotulo: dados.nome },
        ]}
      />
      <Catalogo convites={convitesPorCategoria(dados.slug)} categoriaAtiva={dados.slug} />
    </div>
  );
}

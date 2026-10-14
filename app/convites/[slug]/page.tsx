import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CabecalhoPagina from '@/components/CabecalhoPagina/CabecalhoPagina';
import DetalheConvite from '@/components/DetalheConvite/DetalheConvite';
import { convites, getCategoria, getConvite } from '@/lib/convites';
import { site } from '@/lib/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return convites.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const convite = getConvite(slug);
  if (!convite) return {};

  const titulo = `Convite animado ${convite.titulo}`;
  return {
    title: titulo,
    description: convite.descricao,
    alternates: { canonical: `/convites/${convite.slug}` },
    openGraph: {
      type: 'website',
      url: `/convites/${convite.slug}`,
      title: titulo,
      description: convite.descricao,
    },
  };
}

export default async function PaginaConvite({ params }: Props) {
  const { slug } = await params;
  const convite = getConvite(slug);
  if (!convite) notFound();

  const categoria = getCategoria(convite.categoria);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Convite animado ${convite.titulo}`,
    description: convite.descricao,
    category: categoria?.nome,
    brand: { '@type': 'Brand', name: site.nome },
    offers: {
      '@type': 'Offer',
      url: `${site.url}/convites/${convite.slug}`,
      priceCurrency: 'BRL',
      price: convite.preco.toFixed(2),
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <CabecalhoPagina
        titulo={`Convite animado ${convite.titulo}`}
        trilha={[
          { rotulo: 'Início', href: '/' },
          { rotulo: 'Convites', href: '/convites' },
          { rotulo: convite.titulo },
        ]}
      />
      <DetalheConvite convite={convite} />
    </div>
  );
}

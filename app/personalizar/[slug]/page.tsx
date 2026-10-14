import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CabecalhoPagina from '@/components/CabecalhoPagina/CabecalhoPagina';
import FormularioPersonalizacao from '@/components/FormularioPersonalizacao/FormularioPersonalizacao';
import { convites, getConvite } from '@/lib/convites';

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
  return {
    title: convite ? `Personalizar ${convite.titulo}` : 'Personalizar convite',
    robots: { index: false, follow: false },
  };
}

export default async function PaginaPersonalizar({ params }: Props) {
  const { slug } = await params;
  const convite = getConvite(slug);
  if (!convite) notFound();

  return (
    <div className="container">
      <CabecalhoPagina
        titulo={`Personalizar: ${convite.titulo}`}
        descricao="Preencha os dados da festa. Você poderá conferir tudo antes de pagar."
        trilha={[
          { rotulo: 'Início', href: '/' },
          { rotulo: 'Convites', href: '/convites' },
          { rotulo: convite.titulo, href: `/convites/${convite.slug}` },
          { rotulo: 'Personalizar' },
        ]}
      />
      <FormularioPersonalizacao convite={convite} />
    </div>
  );
}

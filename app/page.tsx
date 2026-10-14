import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero/Hero';
import CardConvite from '@/components/CardConvite/CardConvite';
import ComoFunciona from '@/components/ComoFunciona/ComoFunciona';
import Botao from '@/components/Botao/Botao';
import { categorias, convites } from '@/lib/convites';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `Convites animados em vídeo para festas | ${site.nome}` },
  description: site.descricao,
  alternates: { canonical: '/' },
};

export default function Home() {
  const destaques = convites.slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.nome,
    url: site.url,
    description: site.descricao,
    inLanguage: 'pt-BR',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Hero />

      <section className="container" style={{ paddingTop: 48 }} aria-labelledby="titulo-destaques">
        <h2 id="titulo-destaques">Convites em destaque</h2>
        <ul
          style={{
            display: 'grid',
            gap: 20,
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          }}
        >
          {destaques.map((convite) => (
            <li key={convite.slug}>
              <CardConvite convite={convite} />
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 24, textAlign: 'center' }}>
          <Botao href="/convites" variante="secundario">
            Ver todos os convites
          </Botao>
        </p>
      </section>

      <section className="container" style={{ paddingTop: 48 }} aria-labelledby="titulo-categorias">
        <h2 id="titulo-categorias">Categorias</h2>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {categorias.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categorias/${c.slug}`}
                style={{
                  display: 'inline-block',
                  padding: '10px 18px',
                  borderRadius: 999,
                  border: '1px solid var(--borda)',
                  background: 'var(--grafite)',
                  color: 'var(--texto)',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                {c.nome}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ComoFunciona />
    </>
  );
}

import Link from 'next/link';
import CardConvite from '@/components/CardConvite/CardConvite';
import { categorias, type CategoriaSlug, type Convite } from '@/lib/convites';
import styles from './Catalogo.module.css';

interface Props {
  convites: Convite[];
  categoriaAtiva?: CategoriaSlug;
}

export default function Catalogo({ convites, categoriaAtiva }: Props) {
  return (
    <section aria-label="Catálogo de convites">
      <nav className={styles.filtros} aria-label="Filtrar por categoria">
        <Link
          href="/convites"
          className={`${styles.chip} ${!categoriaAtiva ? styles.ativo : ''}`}
          aria-current={!categoriaAtiva ? 'page' : undefined}
        >
          Todos
        </Link>
        {categorias.map((c) => (
          <Link
            key={c.slug}
            href={`/categorias/${c.slug}`}
            className={`${styles.chip} ${categoriaAtiva === c.slug ? styles.ativo : ''}`}
            aria-current={categoriaAtiva === c.slug ? 'page' : undefined}
          >
            {c.nome}
          </Link>
        ))}
      </nav>

      {convites.length === 0 ? (
        <p>Nenhum convite nesta categoria ainda.</p>
      ) : (
        <ul className={styles.grade}>
          {convites.map((convite) => (
            <li key={convite.slug}>
              <CardConvite convite={convite} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

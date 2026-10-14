import Link from 'next/link';
import { formatarPreco, getCategoria, type Convite } from '@/lib/convites';
import styles from './CardConvite.module.css';

export default function CardConvite({ convite }: { convite: Convite }) {
  const categoria = getCategoria(convite.categoria);

  return (
    <article className={styles.card}>
      <Link href={`/convites/${convite.slug}`} className={styles.link}>
        <div className={styles.capa} style={{ background: convite.cor }} aria-hidden="true">
          <span className={styles.emoji}>{convite.emoji}</span>
        </div>
        <div className={styles.corpo}>
          <p className={styles.categoria}>{categoria?.nome}</p>
          <h3 className={styles.titulo}>{convite.titulo}</h3>
          <p className={styles.preco}>{formatarPreco(convite.preco)}</p>
        </div>
      </Link>
    </article>
  );
}

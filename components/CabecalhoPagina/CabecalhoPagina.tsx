import Link from 'next/link';
import styles from './CabecalhoPagina.module.css';

interface Props {
  titulo: string;
  descricao?: string;
  trilha?: { rotulo: string; href?: string }[];
}

export default function CabecalhoPagina({ titulo, descricao, trilha }: Props) {
  return (
    <header className={styles.cabecalho}>
      {trilha && trilha.length > 0 ? (
        <nav aria-label="Você está em" className={styles.trilha}>
          <ol className={styles.lista}>
            {trilha.map((item, i) => (
              <li key={item.rotulo} className={styles.item}>
                {item.href ? (
                  <Link href={item.href} className={styles.link}>
                    {item.rotulo}
                  </Link>
                ) : (
                  <span aria-current="page">{item.rotulo}</span>
                )}
                {i < trilha.length - 1 ? <span aria-hidden="true"> / </span> : null}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <h1 className={styles.titulo}>{titulo}</h1>
      {descricao ? <p className={styles.descricao}>{descricao}</p> : null}
    </header>
  );
}

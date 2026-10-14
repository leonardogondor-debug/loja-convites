import Link from 'next/link';
import { categorias } from '@/lib/convites';
import { site } from '@/lib/site';
import styles from './Rodape.module.css';

export default function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className={styles.rodape}>
      <div className={`container ${styles.grade}`}>
        <div>
          <p className={styles.marca}>🎉 {site.nome}</p>
          <p className={styles.texto}>
            Convites animados em vídeo, prontos para enviar pelo WhatsApp.
          </p>
        </div>

        <nav aria-label="Categorias">
          <h2 className={styles.titulo}>Categorias</h2>
          <ul className={styles.lista}>
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link href={`/categorias/${c.slug}`} className={styles.link}>
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Atendimento">
          <h2 className={styles.titulo}>Atendimento</h2>
          <ul className={styles.lista}>
            <li>
              <a
                className={styles.link}
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <Link className={styles.link} href="/admin">
                Área administrativa
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className={styles.copy}>
        © {ano} {site.nome}. Todos os direitos reservados.
      </p>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/lib/site';
import styles from './Menu.module.css';

const links = [
  { href: '/', rotulo: 'Início' },
  { href: '/convites', rotulo: 'Convites' },
  { href: '/#como-funciona', rotulo: 'Como funciona' },
];

export default function Menu() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`} aria-label="Principal">
        <Link href="/" className={styles.logo} onClick={() => setAberto(false)}>
          <span aria-hidden="true">🎉</span>
          <span className={styles.logoTexto}>{site.nome}</span>
        </Link>

        <button
          type="button"
          className={styles.botao}
          aria-expanded={aberto}
          aria-controls="menu-principal"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((v) => !v)}
        >
          <span aria-hidden="true">{aberto ? '✕' : '☰'}</span>
        </button>

        <ul id="menu-principal" className={`${styles.lista} ${aberto ? styles.aberto : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.link} onClick={() => setAberto(false)}>
                {link.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

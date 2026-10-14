import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Botao.module.css';

type Variante = 'primario' | 'secundario' | 'fantasma';

interface Base {
  variante?: Variante;
  children: ReactNode;
  className?: string;
}

type LinkProps = Base & { href: string; external?: boolean };
type ButtonProps = Base & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export default function Botao(props: LinkProps | ButtonProps) {
  const { variante = 'primario', children, className } = props;
  const classes = [styles.botao, styles[variante], className].filter(Boolean).join(' ');

  if (typeof props.href === 'string') {
    const { href, external } = props as LinkProps;
    if (external) {
      return (
        <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  const {
    variante: _variante,
    children: _children,
    className: _className,
    href: _href,
    ...resto
  } = props as ButtonProps;
  return (
    <button className={classes} {...resto}>
      {children}
    </button>
  );
}

import type { InputHTMLAttributes } from 'react';
import styles from './Campo.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  rotulo: string;
  erro?: string;
  ajuda?: string;
}

export default function Campo({ id, rotulo, erro, ajuda, ...resto }: Props) {
  const descritoPor = [ajuda ? `${id}-ajuda` : '', erro ? `${id}-erro` : ''].filter(Boolean).join(' ');

  return (
    <div className={styles.campo}>
      <label htmlFor={id} className={styles.rotulo}>
        {rotulo}
      </label>
      <input
        id={id}
        className={`${styles.input} ${erro ? styles.invalido : ''}`}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descritoPor || undefined}
        {...resto}
      />
      {ajuda ? (
        <p id={`${id}-ajuda`} className={styles.ajuda}>
          {ajuda}
        </p>
      ) : null}
      {erro ? (
        <p id={`${id}-erro`} className={styles.erro} role="alert">
          {erro}
        </p>
      ) : null}
    </div>
  );
}

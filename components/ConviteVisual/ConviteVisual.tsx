import { formatarData, type DadosFesta } from '@/lib/pedidos';
import styles from './ConviteVisual.module.css';

interface Props {
  titulo: string;
  emoji: string;
  cor: string;
  festa?: Partial<DadosFesta>;
}

export default function ConviteVisual({ titulo, emoji, cor, festa }: Props) {
  const temDados = Boolean(festa?.nome || festa?.data || festa?.local);

  return (
    <div className={styles.convite} style={{ background: cor }} role="img" aria-label={`Prévia do convite ${titulo}`}>
      <span className={styles.emoji} aria-hidden="true">
        {emoji}
      </span>
      <div className={styles.conteudo}>
        {temDados ? (
          <>
            <p className={styles.chamada}>Você é nosso convidado!</p>
            <p className={styles.nome}>
              {festa?.nome || 'Nome'}
              {festa?.idade ? <span className={styles.idade}> • {festa.idade} anos</span> : null}
            </p>
            <p className={styles.linha}>
              {festa?.data ? formatarData(festa.data) : 'data'}
              {festa?.horario ? ` às ${festa.horario}` : ''}
            </p>
            {festa?.local ? <p className={styles.linha}>📍 {festa.local}</p> : null}
            {festa?.mensagem ? <p className={styles.mensagem}>{festa.mensagem}</p> : null}
          </>
        ) : (
          <p className={styles.nome}>{titulo}</p>
        )}
      </div>
    </div>
  );
}

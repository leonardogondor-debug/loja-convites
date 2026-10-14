import Botao from '@/components/Botao/Botao';
import ConviteVisual from '@/components/ConviteVisual/ConviteVisual';
import { formatarPreco, getCategoria, type Convite } from '@/lib/convites';
import styles from './DetalheConvite.module.css';

export default function DetalheConvite({ convite }: { convite: Convite }) {
  const categoria = getCategoria(convite.categoria);

  return (
    <div className={styles.grade}>
      <ConviteVisual titulo={convite.titulo} emoji={convite.emoji} cor={convite.cor} />

      <div>
        <p className={styles.categoria}>{categoria?.nome}</p>
        <p className={styles.preco}>{formatarPreco(convite.preco)}</p>
        <p className={styles.descricao}>{convite.descricao}</p>

        <ul className={styles.beneficios}>
          <li>🎬 Vídeo MP4 de {convite.duracao}</li>
          <li>✏️ Nome, idade, data, horário e local personalizados</li>
          <li>💳 Pagamento por Pix ou cartão</li>
          <li>📲 Entrega por link, pronto para o WhatsApp</li>
          <li>✅ Página do evento com confirmação de presença</li>
        </ul>

        <Botao href={`/personalizar/${convite.slug}`}>Personalizar este convite</Botao>
      </div>
    </div>
  );
}

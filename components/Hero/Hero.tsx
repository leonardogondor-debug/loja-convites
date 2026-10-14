import Botao from '@/components/Botao/Botao';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.conteudo}`}>
        <p className={styles.selo}>Convites em vídeo MP4</p>
        <h1 className={styles.titulo}>
          Convites animados para festas <span className={styles.destaque}>inesquecíveis</span>
        </h1>
        <p className={styles.texto}>
          Escolha o modelo, preencha nome, data e local e receba o convite pronto para enviar no
          WhatsApp. Pagamento por Pix ou cartão.
        </p>
        <div className={styles.acoes}>
          <Botao href="/convites">Ver convites</Botao>
          <Botao href="/#como-funciona" variante="secundario">
            Como funciona
          </Botao>
        </div>
      </div>
    </section>
  );
}

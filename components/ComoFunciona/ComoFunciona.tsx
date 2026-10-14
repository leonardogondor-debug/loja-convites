import styles from './ComoFunciona.module.css';

const etapas = [
  { icone: '🎨', titulo: 'Escolha o modelo', texto: 'Navegue pelo catálogo e veja a prévia animada.' },
  { icone: '✏️', titulo: 'Personalize', texto: 'Informe nome, idade, data, horário e local da festa.' },
  { icone: '💳', titulo: 'Pague', texto: 'Pix ou cartão. O convite só é liberado após a confirmação.' },
  { icone: '📲', titulo: 'Receba e compartilhe', texto: 'Vídeo MP4 e página do evento com confirmação de presença.' },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className={styles.secao} aria-labelledby="titulo-como-funciona">
      <div className="container">
        <h2 id="titulo-como-funciona" className={styles.titulo}>
          Como funciona
        </h2>
        <ol className={styles.lista}>
          {etapas.map((etapa, i) => (
            <li key={etapa.titulo} className={styles.item}>
              <span className={styles.numero} aria-hidden="true">
                {i + 1}
              </span>
              <span className={styles.icone} aria-hidden="true">
                {etapa.icone}
              </span>
              <h3 className={styles.subtitulo}>{etapa.titulo}</h3>
              <p className={styles.texto}>{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

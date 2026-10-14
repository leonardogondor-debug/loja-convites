'use client';

import { useCallback, useEffect, useState } from 'react';
import Botao from '@/components/Botao/Botao';
import { formatarPreco } from '@/lib/convites';
import { site } from '@/lib/site';
import {
  atualizarPedido,
  formatarData,
  obterPedido,
  type MetodoPagamento,
  type Pedido,
} from '@/lib/pedidos';
import styles from './Checkout.module.css';

// Código ilustrativo. Em produção, o gateway (Mercado Pago, Asaas, Stripe...) devolve o Pix real.
const PIX_DEMO = '00020126DEMONSTRACAO-NAO-E-UM-PIX-REAL5204000053039865802BR6009SAO PAULO6304ABCD';

export default function Checkout({ id }: { id: string }) {
  const [pedido, setPedido] = useState<Pedido | null | undefined>(undefined);
  const [copiado, setCopiado] = useState(false);

  const carregar = useCallback(() => setPedido(obterPedido(id) ?? null), [id]);

  useEffect(() => {
    carregar();
    const intervalo = window.setInterval(carregar, 3000);
    return () => window.clearInterval(intervalo);
  }, [carregar]);

  function escolher(metodo: MetodoPagamento) {
    atualizarPedido(id, { metodo });
    carregar();
  }

  async function copiar(texto: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  }

  if (pedido === undefined) return <p role="status">Carregando pedido…</p>;

  if (pedido === null) {
    return (
      <div className={styles.painel}>
        <h2>Pedido não encontrado</h2>
        <p>
          Não localizamos este pedido neste navegador. Na versão de demonstração os pedidos ficam salvos
          apenas no aparelho onde foram criados.
        </p>
        <Botao href="/convites">Voltar ao catálogo</Botao>
      </div>
    );
  }

  const linkEvento = `${window.location.origin}/evento/${pedido.id}`;
  const mensagemZap = `Você está convidado(a)! Veja o convite de ${pedido.festa.nome} e confirme sua presença: ${linkEvento}`;

  return (
    <div className={styles.grade}>
      <section className={styles.painel} aria-labelledby="titulo-resumo">
        <h2 id="titulo-resumo">Resumo do pedido</h2>
        <dl className={styles.resumo}>
          <div><dt>Convite</dt><dd>{pedido.titulo}</dd></div>
          <div><dt>Aniversariante</dt><dd>{pedido.festa.nome} ({pedido.festa.idade} anos)</dd></div>
          <div><dt>Quando</dt><dd>{formatarData(pedido.festa.data)} às {pedido.festa.horario}</dd></div>
          <div><dt>Onde</dt><dd>{pedido.festa.local}</dd></div>
          <div className={styles.total}><dt>Total</dt><dd>{formatarPreco(pedido.valor)}</dd></div>
        </dl>
      </section>

      <section className={styles.painel} aria-labelledby="titulo-pagamento">
        <h2 id="titulo-pagamento">Pagamento</h2>

        {pedido.status === 'aguardando_pagamento' && (
          <>
            <div className={styles.metodos} role="group" aria-label="Forma de pagamento">
              <button
                type="button"
                className={`${styles.metodo} ${pedido.metodo === 'pix' ? styles.ativo : ''}`}
                aria-pressed={pedido.metodo === 'pix'}
                onClick={() => escolher('pix')}
              >
                Pix
              </button>
              <button
                type="button"
                className={`${styles.metodo} ${pedido.metodo === 'cartao' ? styles.ativo : ''}`}
                aria-pressed={pedido.metodo === 'cartao'}
                onClick={() => escolher('cartao')}
              >
                Cartão
              </button>
            </div>

            {pedido.metodo === 'pix' && (
              <div className={styles.bloco}>
                <p>Copie o código Pix e pague no app do seu banco:</p>
                <code className={styles.codigo}>{PIX_DEMO}</code>
                <Botao type="button" variante="secundario" onClick={() => copiar(PIX_DEMO)}>
                  {copiado ? 'Copiado!' : 'Copiar código Pix'}
                </Botao>
              </div>
            )}

            {pedido.metodo === 'cartao' && (
              <div className={styles.bloco}>
                <p>
                  Em produção, você será levado(a) ao ambiente seguro do gateway de pagamento. Nenhum dado
                  de cartão passa por este site.
                </p>
              </div>
            )}

            {pedido.metodo ? (
              <p className={styles.aviso} role="status">
                ⏳ Aguardando confirmação do pagamento. Esta tela atualiza sozinha. O convite só é liberado
                depois da confirmação.
              </p>
            ) : (
              <p className={styles.aviso}>Escolha Pix ou cartão para continuar.</p>
            )}
            <p className={styles.demo}>
              Modo demonstração: a confirmação é feita pelo painel administrativo, simulando o aviso
              automático do gateway.
            </p>
          </>
        )}

        {(pedido.status === 'pago' || pedido.status === 'video_pronto') && (
          <p className={styles.sucesso} role="status">
            ✅ Pagamento confirmado! Estamos preparando o seu vídeo. Esta tela atualiza sozinha.
          </p>
        )}

        {pedido.status === 'liberado' && (
          <div className={styles.bloco}>
            <p className={styles.sucesso} role="status">🎉 Convite liberado!</p>
            <p>Link do convite e confirmação de presença:</p>
            <code className={styles.codigo}>{linkEvento}</code>
            <div className={styles.acoes}>
              <Botao href={linkEvento}>Abrir convite</Botao>
              <Botao type="button" variante="secundario" onClick={() => copiar(linkEvento)}>
                {copiado ? 'Copiado!' : 'Copiar link'}
              </Botao>
              <Botao
                href={`https://wa.me/?text=${encodeURIComponent(mensagemZap)}`}
                external
                variante="fantasma"
              >
                Enviar no WhatsApp
              </Botao>
            </div>
            <p className={styles.demo}>
              Dúvidas? Fale com a {site.nome} pelo WhatsApp.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

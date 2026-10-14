'use client';

import { useCallback, useEffect, useState } from 'react';
import Botao from '@/components/Botao/Botao';
import { convites, formatarPreco } from '@/lib/convites';
import {
  atualizarPedido,
  formatarData,
  listarPedidos,
  rotuloStatus,
  type Pedido,
  type StatusPedido,
} from '@/lib/pedidos';
import styles from './PainelAdmin.module.css';

type Aba = 'pedidos' | 'modelos';

const proximo: Partial<Record<StatusPedido, { status: StatusPedido; rotulo: string }>> = {
  aguardando_pagamento: { status: 'pago', rotulo: 'Confirmar pagamento' },
  pago: { status: 'video_pronto', rotulo: 'Marcar vídeo como gerado' },
  video_pronto: { status: 'liberado', rotulo: 'Liberar convite ao cliente' },
};

export default function PainelAdmin() {
  const [aba, setAba] = useState<Aba>('pedidos');
  const [pedidos, setPedidos] = useState<Pedido[] | null>(null);

  const carregar = useCallback(() => setPedidos(listarPedidos()), []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function avancar(pedido: Pedido) {
    const passo = proximo[pedido.status];
    if (!passo) return;
    atualizarPedido(pedido.id, { status: passo.status });
    carregar();
  }

  const lista = pedidos ?? [];
  const aguardando = lista.filter((p) => p.status === 'aguardando_pagamento').length;
  const receita = lista
    .filter((p) => p.status !== 'aguardando_pagamento')
    .reduce((soma, p) => soma + p.valor, 0);

  return (
    <div>
      <p className={styles.demo}>
        Modo demonstração: os pedidos ficam no navegador e esta área não tem login. Na versão de produção
        o painel exige senha e usa banco de dados.
      </p>

      <ul className={styles.resumo}>
        <li><span className={styles.numero}>{lista.length}</span> pedidos</li>
        <li><span className={styles.numero}>{aguardando}</span> aguardando pagamento</li>
        <li><span className={styles.numero}>{formatarPreco(receita)}</span> confirmado</li>
      </ul>

      <div className={styles.abas} role="tablist" aria-label="Seções do painel">
        <button type="button" role="tab" aria-selected={aba === 'pedidos'} className={`${styles.aba} ${aba === 'pedidos' ? styles.ativa : ''}`} onClick={() => setAba('pedidos')}>
          Pedidos
        </button>
        <button type="button" role="tab" aria-selected={aba === 'modelos'} className={`${styles.aba} ${aba === 'modelos' ? styles.ativa : ''}`} onClick={() => setAba('modelos')}>
          Modelos
        </button>
        <Botao type="button" variante="fantasma" onClick={carregar} className={styles.atualizar}>
          Atualizar
        </Botao>
      </div>

      {aba === 'pedidos' && (
        <>
          {pedidos === null && <p role="status">Carregando…</p>}
          {pedidos !== null && lista.length === 0 && <p>Nenhum pedido ainda.</p>}
          <ul className={styles.pedidos}>
            {lista.map((pedido) => {
              const passo = proximo[pedido.status];
              const confirmados = pedido.rsvps.filter((r) => r.vai);
              return (
                <li key={pedido.id} className={styles.pedido}>
                  <div className={styles.topo}>
                    <strong>{pedido.titulo}</strong>
                    <span className={`${styles.status} ${styles[pedido.status]}`}>{rotuloStatus[pedido.status]}</span>
                  </div>
                  <p className={styles.linha}>
                    {pedido.festa.nome} ({pedido.festa.idade} anos) • {formatarData(pedido.festa.data)} às {pedido.festa.horario}
                  </p>
                  <p className={styles.linha}>📍 {pedido.festa.local}</p>
                  <p className={styles.linha}>
                    👤 {pedido.cliente.nome} • {pedido.cliente.whatsapp} • {pedido.cliente.email}
                  </p>
                  <p className={styles.linha}>
                    💰 {formatarPreco(pedido.valor)} • {pedido.metodo ? (pedido.metodo === 'pix' ? 'Pix' : 'Cartão') : 'forma de pagamento não escolhida'}
                  </p>
                  {pedido.status === 'liberado' && (
                    <p className={styles.linha}>
                      ✅ {confirmados.length} confirmação(ões):{' '}
                      {confirmados.length > 0 ? confirmados.map((r) => `${r.nome} (${r.convidados})`).join(', ') : 'nenhuma ainda'}
                    </p>
                  )}
                  <div className={styles.acoes}>
                    {passo && (
                      <Botao type="button" onClick={() => avancar(pedido)}>
                        {passo.rotulo}
                      </Botao>
                    )}
                    {pedido.status === 'liberado' && (
                      <Botao href={`/evento/${pedido.id}`} variante="secundario">
                        Abrir página do evento
                      </Botao>
                    )}
                  </div>
                  {pedido.status === 'pago' && (
                    <p className={styles.dica}>
                      A geração automática do MP4 entra na etapa 3 do orçamento; aqui o passo é manual.
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {aba === 'modelos' && (
        <>
          <ul className={styles.modelos}>
            {convites.map((c) => (
              <li key={c.slug} className={styles.modelo}>
                <span className={styles.emoji} aria-hidden="true">{c.emoji}</span>
                <span className={styles.nomeModelo}>{c.titulo}</span>
                <span>{formatarPreco(c.preco)}</span>
              </li>
            ))}
          </ul>
          <p className={styles.dica}>
            Cadastro, edição e ativação de modelos pelo celular fazem parte da etapa 2 (precisa de banco de
            dados). Por enquanto os modelos ficam em <code>lib/convites.ts</code>.
          </p>
        </>
      )}
    </div>
  );
}

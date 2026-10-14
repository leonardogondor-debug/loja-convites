'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Botao from '@/components/Botao/Botao';
import Campo from '@/components/Campo/Campo';
import ConviteVisual from '@/components/ConviteVisual/ConviteVisual';
import { getConvite } from '@/lib/convites';
import { adicionarRsvp, obterPedido, type Pedido } from '@/lib/pedidos';
import styles from './PaginaEvento.module.css';

export default function PaginaEvento({ id }: { id: string }) {
  const [pedido, setPedido] = useState<Pedido | null | undefined>(undefined);
  const [nome, setNome] = useState('');
  const [vai, setVai] = useState<'sim' | 'nao'>('sim');
  const [convidados, setConvidados] = useState('1');
  const [erro, setErro] = useState('');
  const [enviado, setEnviado] = useState<'sim' | 'nao' | null>(null);

  useEffect(() => {
    setPedido(obterPedido(id) ?? null);
  }, [id]);

  if (pedido === undefined) return <p role="status">Carregando convite…</p>;

  if (pedido === null || pedido.status !== 'liberado') {
    return (
      <div className={styles.aviso}>
        <h2>Convite indisponível</h2>
        <p>
          Este convite não foi encontrado ou ainda não foi liberado. Na versão de demonstração, os dados
          ficam salvos apenas no navegador em que o pedido foi criado.
        </p>
        <Botao href="/convites">Conhecer os convites</Botao>
      </div>
    );
  }

  const convite = getConvite(pedido.slug);
  const confirmados = pedido.rsvps.filter((r) => r.vai);
  const totalPessoas = confirmados.reduce((soma, r) => soma + r.convidados, 0);

  function confirmar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const qtd = Number(convidados);
    if (nome.trim().length < 2) return setErro('Informe seu nome.');
    if (vai === 'sim' && (!Number.isInteger(qtd) || qtd < 1 || qtd > 10)) {
      return setErro('Informe de 1 a 10 pessoas.');
    }
    setErro('');
    const atualizado = adicionarRsvp(id, {
      nome: nome.trim(),
      vai: vai === 'sim',
      convidados: vai === 'sim' ? qtd : 0,
    });
    if (atualizado) setPedido(atualizado);
    setEnviado(vai);
  }

  return (
    <div className={styles.grade}>
      <ConviteVisual
        titulo={pedido.titulo}
        emoji={convite?.emoji ?? '🎉'}
        cor={convite?.cor ?? 'linear-gradient(135deg,#0b0b0f,#ff2d95)'}
        festa={pedido.festa}
      />

      <section className={styles.painel} aria-labelledby="titulo-rsvp">
        <h2 id="titulo-rsvp">Confirme sua presença</h2>

        {enviado ? (
          <p className={styles.sucesso} role="status">
            {enviado === 'sim'
              ? '🎉 Presença confirmada! Obrigado, nos vemos lá.'
              : 'Obrigado por avisar! Sentiremos sua falta.'}
          </p>
        ) : (
          <form onSubmit={confirmar} className={styles.formulario} noValidate>
            <Campo id="rsvp-nome" rotulo="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" maxLength={60} required />

            <fieldset className={styles.opcoes}>
              <legend className={styles.legenda}>Você vai?</legend>
              <label className={styles.opcao}>
                <input type="radio" name="vai" checked={vai === 'sim'} onChange={() => setVai('sim')} /> Sim, eu vou!
              </label>
              <label className={styles.opcao}>
                <input type="radio" name="vai" checked={vai === 'nao'} onChange={() => setVai('nao')} /> Não poderei ir
              </label>
            </fieldset>

            {vai === 'sim' && (
              <Campo id="rsvp-qtd" rotulo="Quantas pessoas (contando com você)?" type="number" inputMode="numeric" min={1} max={10} value={convidados} onChange={(e) => setConvidados(e.target.value)} />
            )}

            {erro ? <p className={styles.erro} role="alert">{erro}</p> : null}
            <Botao type="submit">Enviar resposta</Botao>
          </form>
        )}

        <p className={styles.contagem}>
          {confirmados.length === 0
            ? 'Seja o primeiro a confirmar!'
            : `${confirmados.length} confirmação(ões) • ${totalPessoas} pessoa(s)`}
        </p>
      </section>
    </div>
  );
}

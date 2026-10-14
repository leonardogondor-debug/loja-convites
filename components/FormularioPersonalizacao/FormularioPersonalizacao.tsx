'use client';

import { useRouter } from 'next/navigation';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import Botao from '@/components/Botao/Botao';
import Campo from '@/components/Campo/Campo';
import ConviteVisual from '@/components/ConviteVisual/ConviteVisual';
import { formatarPreco, type Convite } from '@/lib/convites';
import { criarPedido } from '@/lib/pedidos';
import styles from './FormularioPersonalizacao.module.css';

type Erros = Record<string, string>;

export default function FormularioPersonalizacao({ convite }: { convite: Convite }) {
  const router = useRouter();
  const [festa, setFesta] = useState({
    nome: '',
    idade: '',
    data: '',
    horario: '',
    local: '',
    mensagem: '',
  });
  const [cliente, setCliente] = useState({ nome: '', whatsapp: '', email: '' });
  const [erros, setErros] = useState<Erros>({});

  const mudarFesta = (campo: keyof typeof festa) => (e: ChangeEvent<HTMLInputElement>) =>
    setFesta((atual) => ({ ...atual, [campo]: e.target.value }));

  const mudarCliente = (campo: keyof typeof cliente) => (e: ChangeEvent<HTMLInputElement>) =>
    setCliente((atual) => ({ ...atual, [campo]: e.target.value }));

  function validar(): Erros {
    const novos: Erros = {};
    const idade = Number(festa.idade);
    if (festa.nome.trim().length < 2) novos.nome = 'Informe o nome do aniversariante ou do evento.';
    if (!Number.isInteger(idade) || idade < 0 || idade > 120) novos.idade = 'Informe uma idade válida (0 a 120).';
    if (!festa.data) novos.data = 'Informe a data da festa.';
    else if (new Date(`${festa.data}T23:59:59`).getTime() < Date.now()) novos.data = 'A data já passou.';
    if (!festa.horario) novos.horario = 'Informe o horário.';
    if (festa.local.trim().length < 3) novos.local = 'Informe o local da festa.';
    if (cliente.nome.trim().length < 2) novos.clienteNome = 'Informe seu nome.';
    if (cliente.whatsapp.replace(/\D/g, '').length < 10) novos.whatsapp = 'Informe um WhatsApp com DDD.';
    if (!/^\S+@\S+\.\S+$/.test(cliente.email)) novos.email = 'Informe um e-mail válido.';
    return novos;
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const novos = validar();
    setErros(novos);
    if (Object.keys(novos).length > 0) return;

    const pedido = criarPedido({
      slug: convite.slug,
      titulo: convite.titulo,
      valor: convite.preco,
      festa: {
        nome: festa.nome.trim(),
        idade: Number(festa.idade),
        data: festa.data,
        horario: festa.horario,
        local: festa.local.trim(),
        mensagem: festa.mensagem.trim() || undefined,
      },
      cliente: {
        nome: cliente.nome.trim(),
        whatsapp: cliente.whatsapp.trim(),
        email: cliente.email.trim(),
      },
    });
    router.push(`/checkout/${pedido.id}`);
  }

  return (
    <div className={styles.grade}>
      <form className={styles.formulario} onSubmit={enviar} noValidate>
        <fieldset className={styles.grupo}>
          <legend className={styles.legenda}>Dados da festa</legend>
          <Campo id="nome" rotulo="Nome do aniversariante" value={festa.nome} onChange={mudarFesta('nome')} erro={erros.nome} maxLength={40} autoComplete="off" required />
          <Campo id="idade" rotulo="Idade que vai completar" type="number" inputMode="numeric" min={0} max={120} value={festa.idade} onChange={mudarFesta('idade')} erro={erros.idade} required />
          <Campo id="data" rotulo="Data da festa" type="date" value={festa.data} onChange={mudarFesta('data')} erro={erros.data} required />
          <Campo id="horario" rotulo="Horário" type="time" value={festa.horario} onChange={mudarFesta('horario')} erro={erros.horario} required />
          <Campo id="local" rotulo="Local da festa" value={festa.local} onChange={mudarFesta('local')} erro={erros.local} maxLength={80} placeholder="Ex.: Salão Alegria, Rua das Flores, 100" required />
          <Campo id="mensagem" rotulo="Mensagem (opcional)" value={festa.mensagem} onChange={mudarFesta('mensagem')} maxLength={80} ajuda="Até 80 caracteres." />
        </fieldset>

        <fieldset className={styles.grupo}>
          <legend className={styles.legenda}>Seus dados</legend>
          <Campo id="cliente-nome" rotulo="Seu nome" value={cliente.nome} onChange={mudarCliente('nome')} erro={erros.clienteNome} autoComplete="name" required />
          <Campo id="whatsapp" rotulo="WhatsApp" type="tel" inputMode="tel" value={cliente.whatsapp} onChange={mudarCliente('whatsapp')} erro={erros.whatsapp} autoComplete="tel" placeholder="(51) 99999-9999" ajuda="Usado para enviar o link do convite." required />
          <Campo id="email" rotulo="E-mail" type="email" value={cliente.email} onChange={mudarCliente('email')} erro={erros.email} autoComplete="email" required />
        </fieldset>

        <Botao type="submit">Continuar para o pagamento — {formatarPreco(convite.preco)}</Botao>
      </form>

      <aside className={styles.previa} aria-label="Prévia do convite">
        <h2 className={styles.tituloPrevia}>Prévia</h2>
        <ConviteVisual
          titulo={convite.titulo}
          emoji={convite.emoji}
          cor={convite.cor}
          festa={{
            nome: festa.nome,
            idade: festa.idade ? Number(festa.idade) : undefined,
            data: festa.data,
            horario: festa.horario,
            local: festa.local,
            mensagem: festa.mensagem,
          }}
        />
        <p className={styles.nota}>O vídeo final terá animação e música do modelo escolhido.</p>
      </aside>
    </div>
  );
}

export type StatusPedido = 'aguardando_pagamento' | 'pago' | 'video_pronto' | 'liberado';
export type MetodoPagamento = 'pix' | 'cartao';

export interface DadosFesta {
  nome: string;
  idade: number;
  data: string;
  horario: string;
  local: string;
  mensagem?: string;
}

export interface Cliente {
  nome: string;
  whatsapp: string;
  email: string;
}

export interface Rsvp {
  id: string;
  nome: string;
  convidados: number;
  vai: boolean;
  criadoEm: string;
}

export interface Pedido {
  id: string;
  slug: string;
  titulo: string;
  valor: number;
  festa: DadosFesta;
  cliente: Cliente;
  metodo?: MetodoPagamento;
  status: StatusPedido;
  criadoEm: string;
  rsvps: Rsvp[];
}

/*
 * ATENÇÃO: nesta versão de demonstração os pedidos ficam no localStorage do navegador.
 * Em produção, substitua as funções abaixo por chamadas a uma API + banco de dados
 * (veja o README, etapa 2).
 */
const CHAVE = 'loja-convites:pedidos';

function ler(): Pedido[] {
  if (typeof window === 'undefined') return [];
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    return bruto ? (JSON.parse(bruto) as Pedido[]) : [];
  } catch {
    return [];
  }
}

function gravar(pedidos: Pedido[]): void {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(pedidos));
  } catch {
    /* armazenamento indisponível */
  }
}

export function gerarId(): string {
  const aleatorio = Math.random().toString(36).slice(2, 8);
  return `${Date.now().toString(36).slice(-4)}${aleatorio}`;
}

export function listarPedidos(): Pedido[] {
  return ler().sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

export function obterPedido(id: string): Pedido | undefined {
  return ler().find((p) => p.id === id);
}

export function criarPedido(dados: Omit<Pedido, 'id' | 'criadoEm' | 'status' | 'rsvps'>): Pedido {
  const pedido: Pedido = {
    ...dados,
    id: gerarId(),
    criadoEm: new Date().toISOString(),
    status: 'aguardando_pagamento',
    rsvps: [],
  };
  gravar([...ler(), pedido]);
  return pedido;
}

export function atualizarPedido(id: string, alteracoes: Partial<Pedido>): Pedido | undefined {
  const pedidos = ler();
  const indice = pedidos.findIndex((p) => p.id === id);
  if (indice === -1) return undefined;
  const atualizado = { ...pedidos[indice], ...alteracoes };
  pedidos[indice] = atualizado;
  gravar(pedidos);
  return atualizado;
}

export function adicionarRsvp(id: string, rsvp: Omit<Rsvp, 'id' | 'criadoEm'>): Pedido | undefined {
  const pedido = obterPedido(id);
  if (!pedido) return undefined;
  const novo: Rsvp = { ...rsvp, id: gerarId(), criadoEm: new Date().toISOString() };
  return atualizarPedido(id, { rsvps: [...pedido.rsvps, novo] });
}

export function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split('-');
  if (!ano || !mes || !dia) return iso;
  return `${dia}/${mes}/${ano}`;
}

export const rotuloStatus: Record<StatusPedido, string> = {
  aguardando_pagamento: 'Aguardando pagamento',
  pago: 'Pago — gerar vídeo',
  video_pronto: 'Vídeo pronto',
  liberado: 'Convite liberado',
};

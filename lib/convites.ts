export type CategoriaSlug =
  | 'infantil'
  | 'aniversario'
  | 'cha-de-bebe'
  | 'casamento'
  | 'formatura';

export interface Categoria {
  slug: CategoriaSlug;
  nome: string;
  descricao: string;
}

export interface Convite {
  slug: string;
  titulo: string;
  categoria: CategoriaSlug;
  descricao: string;
  preco: number;
  emoji: string;
  cor: string;
  duracao: string;
}

export const categorias: Categoria[] = [
  {
    slug: 'infantil',
    nome: 'Infantil',
    descricao:
      'Convites animados para festas infantis: super-heróis, princesas, safári, unicórnios e muito mais.',
  },
  {
    slug: 'aniversario',
    nome: 'Aniversário',
    descricao: 'Convites animados para aniversários de adolescentes e adultos.',
  },
  {
    slug: 'cha-de-bebe',
    nome: 'Chá de bebê',
    descricao: 'Convites animados delicados para chá de bebê e chá revelação.',
  },
  {
    slug: 'casamento',
    nome: 'Casamento',
    descricao: 'Convites animados elegantes para casamentos e noivados.',
  },
  {
    slug: 'formatura',
    nome: 'Formatura',
    descricao: 'Convites animados para formaturas e celebrações de conquistas.',
  },
];

export const convites: Convite[] = [
  {
    slug: 'unicornio-magico',
    titulo: 'Unicórnio Mágico',
    categoria: 'infantil',
    descricao:
      'Arco-íris, estrelinhas e um unicórnio que pula na tela para anunciar a festa. Ideal para meninas de 3 a 8 anos.',
    preco: 29.9,
    emoji: '🦄',
    cor: 'linear-gradient(135deg,#ff2d95 0%,#8a2be2 100%)',
    duracao: '15 segundos',
  },
  {
    slug: 'super-heroi-urbano',
    titulo: 'Super-herói Urbano',
    categoria: 'infantil',
    descricao:
      'Cidade à noite, capa voando e o nome do aniversariante em destaque. Perfeito para festas de super-heróis.',
    preco: 29.9,
    emoji: '🦸',
    cor: 'linear-gradient(135deg,#111122 0%,#ff2d95 100%)',
    duracao: '15 segundos',
  },
  {
    slug: 'safari-divertido',
    titulo: 'Safári Divertido',
    categoria: 'infantil',
    descricao:
      'Leão, girafa e macaquinho dão as boas-vindas à festa. Cores vibrantes e animação leve.',
    preco: 27.9,
    emoji: '🦁',
    cor: 'linear-gradient(135deg,#ff7ac0 0%,#ffb347 100%)',
    duracao: '12 segundos',
  },
  {
    slug: 'princesa-encantada',
    titulo: 'Princesa Encantada',
    categoria: 'infantil',
    descricao:
      'Castelo, coroa e brilhos em rosa e preto. Convite com ar de conto de fadas moderno.',
    preco: 29.9,
    emoji: '👑',
    cor: 'linear-gradient(135deg,#ff7ac0 0%,#2b0a1e 100%)',
    duracao: '15 segundos',
  },
  {
    slug: 'balada-rosa',
    titulo: 'Balada Rosa',
    categoria: 'aniversario',
    descricao:
      'Luzes neon, glitter e música animada para aniversários de adolescentes e adultos.',
    preco: 34.9,
    emoji: '🪩',
    cor: 'linear-gradient(135deg,#0b0b0f 0%,#ff2d95 100%)',
    duracao: '15 segundos',
  },
  {
    slug: 'cha-de-bebe-nuvens',
    titulo: 'Chá de Bebê Nuvens',
    categoria: 'cha-de-bebe',
    descricao:
      'Nuvens, estrelas e ursinho dormindo. Animação suave para anunciar a chegada do bebê.',
    preco: 32.9,
    emoji: '🧸',
    cor: 'linear-gradient(135deg,#ffc2e0 0%,#7a5cff 100%)',
    duracao: '15 segundos',
  },
  {
    slug: 'casamento-elegante',
    titulo: 'Casamento Elegante',
    categoria: 'casamento',
    descricao:
      'Flores em rosa, detalhes dourados e fundo preto. Um convite sofisticado e emocionante.',
    preco: 49.9,
    emoji: '💍',
    cor: 'linear-gradient(135deg,#0b0b0f 0%,#b8860b 100%)',
    duracao: '20 segundos',
  },
  {
    slug: 'formatura-estrela',
    titulo: 'Formatura Estrela',
    categoria: 'formatura',
    descricao:
      'Capelo voando, confetes e o nome do formando brilhando. Para celebrar uma conquista.',
    preco: 39.9,
    emoji: '🎓',
    cor: 'linear-gradient(135deg,#16161d 0%,#ff2d95 100%)',
    duracao: '15 segundos',
  },
];

export function getConvite(slug: string): Convite | undefined {
  return convites.find((c) => c.slug === slug);
}

export function getCategoria(slug: string): Categoria | undefined {
  return categorias.find((c) => c.slug === slug);
}

export function convitesPorCategoria(slug: CategoriaSlug): Convite[] {
  return convites.filter((c) => c.categoria === slug);
}

export function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

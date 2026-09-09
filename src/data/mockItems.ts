import type { ChipProps } from '@mui/material'

// Itens recém-colados pelo usuário ainda não passaram pela IA (isso é
// simulado hoje — o pipeline de verdade é um próximo passo), então vários
// campos são opcionais até a análise "chegar".
export type SavedItem = {
  id: string
  title: string
  source: string
  sourceUrl?: string
  location?: string
  tag: string
  tagColor: ChipProps['color']
  image?: string | null
  savedAgo: string
  savedAt: string
  aiSummary?: string
  aiSignals?: string[]
  connectionId: string | null
}

// Itens de exemplo — quando o pipeline de salvamento estiver pronto, isso
// vem da API (useQuery) em vez de um array fixo. connectionId liga os itens
// que a IA identificou como parte do mesmo plano/contexto.
export const mockItems: SavedItem[] = [
  {
    id: '1',
    title: 'Restaurante Ostradamus — frutos do mar na beira mar',
    source: 'Instagram',
    sourceUrl: 'https://instagram.com/reel/exemplo-ostradamus',
    location: 'Florianópolis, SC',
    tag: 'Gastronomia',
    tagColor: 'warning',
    image: '/card-photos/card1.png',
    savedAgo: 'há 2 horas',
    savedAt: '9 de setembro, 14:20',
    aiSummary:
      'Esse vídeo mostra um restaurante especializado em frutos do mar, com vista pro mar, em Florianópolis. Pelo áudio e pela legenda, parece ser uma recomendação de passeio gastronômico — não uma promoção paga.',
    aiSignals: [
      'Local identificado: Florianópolis, SC (geotag do post)',
      'Categoria: Gastronomia / frutos do mar',
      'Tom do conteúdo: recomendação pessoal, não é anúncio',
    ],
    connectionId: 'floripa',
  },
  {
    id: '2',
    title: 'Pousada com vista pro mar em Jurerê',
    source: 'TikTok',
    sourceUrl: 'https://tiktok.com/@exemplo/video/pousada-jurere',
    location: 'Florianópolis, SC',
    tag: 'Hospedagem',
    tagColor: 'info',
    image: '/card-photos/card2.png',
    savedAgo: 'há 5 horas',
    savedAt: '9 de setembro, 11:05',
    aiSummary:
      'Tour por uma pousada em Jurerê Internacional. A pessoa que gravou destaca diária, vista e distância da praia — sinais fortes de que é conteúdo pra ajudar a decidir onde ficar hospedado.',
    aiSignals: [
      'Local identificado: Jurerê, Florianópolis, SC',
      'Categoria: Hospedagem',
      'Menciona diária e proximidade da praia',
    ],
    connectionId: 'floripa',
  },
  {
    id: '3',
    title: 'Aluguel de carro econômico pro fim de semana',
    source: 'Instagram',
    sourceUrl: 'https://instagram.com/p/exemplo-aluguel-carro',
    location: 'Florianópolis, SC',
    tag: 'Transporte',
    tagColor: 'secondary',
    image: '/card-photos/card3.png',
    savedAgo: 'ontem',
    savedAt: '8 de setembro, 19:40',
    aiSummary:
      'Post comparando preços de locadoras de carro em Florianópolis pra um final de semana. Sem geotag, mas o texto cita "SC" e datas próximas às de outros itens salvos por você.',
    aiSignals: [
      'Categoria: Transporte / aluguel de carro',
      'Período mencionado: fim de semana',
      'Cidade inferida pelo texto: Florianópolis, SC',
    ],
    connectionId: 'floripa',
  },
  {
    id: '4',
    title: 'Trilha da Lagoinha do Leste — nível moderado',
    source: 'YouTube',
    sourceUrl: 'https://youtube.com/watch?v=exemplo-trilha-lagoinha',
    location: 'Florianópolis, SC',
    tag: 'Passeio',
    tagColor: 'success',
    image: '/card-photos/card4.png',
    savedAgo: 'há 2 dias',
    savedAt: '7 de setembro, 09:15',
    aiSummary:
      'Vídeo (com narração) sobre a trilha até a Lagoinha do Leste, nível moderado, cerca de 1h40 de caminhada. A transcrição do áudio confirma que fica dentro de Florianópolis, SC.',
    aiSignals: [
      'Transcrição de áudio processada (duração: ~1h40 de trilha)',
      'Categoria: Passeio / natureza',
      'Local identificado: Florianópolis, SC',
    ],
    connectionId: 'floripa',
  },
]

export function getItemById(id: string | undefined) {
  return mockItems.find((item) => item.id === id)
}

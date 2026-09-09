import type { SavedItem } from '../data/mockItems'

// Guarda os itens que o usuário realmente salvou, por enquanto no
// localStorage (por usuário, via user.id do Supabase). Quando a tabela de
// itens existir no banco, isso vira chamadas de API/useQuery — a assinatura
// das funções foi pensada pra essa troca ser tranquila depois.
const ITEMS_PREFIX = 'salvaqui:items:'
const ONBOARDED_PREFIX = 'salvaqui:onboarded:'

export function getLocalItems(userId: string): SavedItem[] {
  try {
    const raw = localStorage.getItem(ITEMS_PREFIX + userId)
    return raw ? (JSON.parse(raw) as SavedItem[]) : []
  } catch {
    return []
  }
}

function setLocalItems(userId: string, items: SavedItem[]) {
  try {
    localStorage.setItem(ITEMS_PREFIX + userId, JSON.stringify(items))
  } catch {
    // localStorage indisponível (aba anônima, storage cheio etc.) — ignora.
  }
}

function guessSourceFromUrl(url: string): string {
  const lower = url.toLowerCase()
  if (lower.includes('instagram.com')) return 'Instagram'
  if (lower.includes('tiktok.com')) return 'TikTok'
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'YouTube'
  return 'Link'
}

function formatSavedAt(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Cria um item a partir de um link colado. Sem pipeline de IA de verdade
// ainda, então ele nasce "aguardando análise" (ver HomePage/ItemDetailPage,
// que sabem exibir esse estado incompleto).
export function addLocalItem(userId: string, url: string): SavedItem {
  const newItem: SavedItem = {
    id: `local-${Date.now()}`,
    title: url,
    source: guessSourceFromUrl(url),
    sourceUrl: url,
    tag: 'Novo',
    tagColor: 'default',
    image: null,
    savedAgo: 'agora mesmo',
    savedAt: formatSavedAt(new Date()),
    connectionId: null,
  }
  setLocalItems(userId, [newItem, ...getLocalItems(userId)])
  return newItem
}

export function removeLocalItem(userId: string, itemId: string) {
  setLocalItems(
    userId,
    getLocalItems(userId).filter((item) => item.id !== itemId)
  )
}

export function isOnboarded(userId: string): boolean {
  try {
    return localStorage.getItem(ONBOARDED_PREFIX + userId) === '1'
  } catch {
    return false
  }
}

export function markOnboarded(userId: string) {
  try {
    localStorage.setItem(ONBOARDED_PREFIX + userId, '1')
  } catch {
    // ignora — pior caso, o onboarding aparece de novo.
  }
}

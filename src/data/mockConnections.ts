export type Connection = {
  id: string
  title: string
  description: string
  location: string
  itemIds: string[]
  createdAgo: string
}

// Em produção isso vem da IA cruzando os itens salvos (local, categoria,
// datas próximas etc.). Por enquanto é fixo, só pra a tela ter o que mostrar.
export const mockConnections: Connection[] = [
  {
    id: 'floripa',
    title: 'Parece que você está planejando uma viagem para Florianópolis',
    description:
      'Você salvou um restaurante, uma pousada, um aluguel de carro e uma trilha — todos em Florianópolis, SC, em uma janela de poucos dias. Junto, isso parece um roteiro de viagem.',
    location: 'Florianópolis, SC',
    itemIds: ['1', '2', '3', '4'],
    createdAgo: 'detectado hoje',
  },
]

export function getConnectionById(id: string | undefined) {
  return mockConnections.find((connection) => connection.id === id)
}

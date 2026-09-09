import { Box, Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

// Estado vazio de verdade da Caixa de Entrada (nada salvo ainda, ou tudo
// removido). Aparece dentro da Home normal — diferente do OnboardingIntro,
// que só aparece na primeiríssima visita.
export default function EmptyInbox() {
  const navigate = useNavigate()

  return (
    <Stack spacing={2.5} sx={{ alignItems: 'center', textAlign: 'center', py: { xs: 6, md: 8 } }}>
      <Box component="img" src="/Saw.png" alt="Sau" sx={{ width: 96, height: 'auto', opacity: 0.9 }} />
      <Stack spacing={0.5}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Sua Caixa de Entrada está vazia
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 360 }}>
          Cole um link ali em cima pra começar a salvar. Assim que tiver algo aqui, a IA
          começa a entender do que se trata.
        </Typography>
      </Stack>
      <Button
        variant="text"
        onClick={() => navigate('/conexao/floripa')}
        sx={{ fontWeight: 600 }}
      >
        Ver um exemplo do que a IA consegue encontrar →
      </Button>
    </Stack>
  )
}

import type { FormEvent } from 'react'
import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'

const steps = [
  {
    icon: <LinkOutlinedIcon />,
    title: 'Cole um link',
    text: 'De um Instagram, TikTok, YouTube — qualquer coisa que você não quer esquecer.',
  },
  {
    icon: <AutoAwesomeOutlinedIcon />,
    title: 'A IA entende do que se trata',
    text: 'Categoria, local, e por que você provavelmente salvou aquilo.',
  },
  {
    icon: <BoltOutlinedIcon />,
    title: 'As conexões aparecem sozinhas',
    text: 'Quando vários itens combinam, o Salvaqui te avisa.',
  },
]

type OnboardingIntroProps = {
  firstName: string
  link: string
  onLinkChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onSkip: () => void
}

// Tela cheia mostrada só na primeira vez que a pessoa entra (Caixa de
// Entrada ainda vazia e onboarding não concluído). Depois disso, vira a
// Home normal — vazia de verdade ou com os itens que a pessoa salvar.
export default function OnboardingIntro({
  firstName,
  link,
  onLinkChange,
  onSubmit,
  onSkip,
}: OnboardingIntroProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Box component="img" src="/Saw.png" alt="Sau" sx={{ width: 140, height: 'auto' }} />

          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Bem-vindo(a), {firstName}!
            </Typography>
            <Typography color="text.secondary">
              Vamos guardar a primeira coisa que você não quer esquecer.
            </Typography>
          </Stack>

          <Stack spacing={2} sx={{ width: '100%' }}>
            {steps.map((step) => (
              <Stack
                key={step.title}
                direction="row"
                spacing={2}
                sx={{ alignItems: 'center', textAlign: 'left' }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{step.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.text}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>

          <Paper
            component="form"
            onSubmit={onSubmit}
            elevation={0}
            variant="outlined"
            sx={{ p: 1.5, borderRadius: 3, display: 'flex', gap: 1.5, width: '100%' }}
          >
            <TextField
              placeholder="Cole aqui seu primeiro link..."
              value={link}
              onChange={(e) => onLinkChange(e.target.value)}
              fullWidth
              variant="standard"
              slotProps={{ input: { disableUnderline: true } }}
              sx={{ px: 1 }}
              autoFocus
            />
            <Button type="submit" variant="contained" disableElevation sx={{ flexShrink: 0 }}>
              Salvar
            </Button>
          </Paper>

          <Button variant="text" color="secondary" onClick={onSkip}>
            Pular por agora, ver minha Caixa de Entrada vazia
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

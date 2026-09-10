import type { ReactNode } from 'react'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ThemeToggleButton from './ThemeToggleButton'

type AuthLayoutProps = {
  children: ReactNode
  title: string
  subtitle: string
  mascotMessage: string
}

// Casca compartilhada por Login e Cadastro: painel esquerdo com a Sau
// (mascote) dando as boas-vindas, painel direito com o formulário.
export default function AuthLayout({ children, title, subtitle, mascotMessage }: AuthLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '42%',
          minWidth: 380,
          p: 6,
          background: 'linear-gradient(160deg, #E85D3D 0%, #C44B2F 100%)',
          color: 'white',
        }}
      >
        <Typography
          component={RouterLink}
          to="/"
          variant="h6"
          sx={{ fontWeight: 800, color: 'white', textDecoration: 'none' }}
        >
          salvaqui
        </Typography>

        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Box component="img" src="/Saw.png" alt="Sau" sx={{ width: 220, height: 'auto' }} />
          <Paper
            elevation={0}
            sx={{
              px: 3,
              py: 2,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.97)',
              color: 'text.primary',
              maxWidth: 280,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {mascotMessage}
            </Typography>
          </Paper>
        </Stack>

        <Typography variant="body2" sx={{ opacity: 0.75 }}>
          Salve agora. Entenda depois.
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <ThemeToggleButton size="small" />
        </Box>

        <Container maxWidth="xs" sx={{ py: 6 }}>
          <Stack spacing={0.5} sx={{ mb: 4 }}>
            <Typography
              component={RouterLink}
              to="/"
              variant="h6"
              sx={{
                display: { xs: 'block', md: 'none' },
                fontWeight: 800,
                color: 'primary.main',
                textDecoration: 'none',
                mb: 2,
              }}
            >
              salvaqui
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography color="text.secondary">{subtitle}</Typography>
          </Stack>
          {children}
        </Container>
      </Box>
    </Box>
  )
}

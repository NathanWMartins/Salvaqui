import { useEffect, useState } from 'react'
import { keyframes } from '@emotion/react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import InstallMobileOutlinedIcon from '@mui/icons-material/InstallMobileOutlined'
import { usePWAInstall } from '../contexts/PWAInstallContext'

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(232, 93, 61, 0.55); }
  70%  { box-shadow: 0 0 0 16px rgba(232, 93, 61, 0); }
  100% { box-shadow: 0 0 0 0 rgba(232, 93, 61, 0); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
`

// Botão flutuante (canto inferior direito) que convida a instalar o app.
// Some sozinho quando o Salvaqui já está instalado.
export default function InstallFab() {
  const { canInstall, installed, promptInstall } = usePWAInstall()
  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  useEffect(() => {
    if (!feedback) return
    const timeout = setTimeout(() => setFeedback(null), 4000)
    return () => clearTimeout(timeout)
  }, [feedback])

  if (installed) return null

  const handleInstall = async () => {
    const outcome = await promptInstall()
    if (outcome === 'accepted') {
      setFeedback('Prontinho! O Salvaqui já está instalado. 🎉')
      setOpen(false)
    } else if (outcome === 'dismissed') {
      setOpen(false)
    }
    // 'unavailable' (ex.: iPhone/Safari) mantém o modal aberto com as instruções manuais.
  }

  return (
    <>
      <Box
        role="button"
        tabIndex={0}
        aria-label="Instalar o Salvaqui"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(true)
          }
        }}
        sx={{
          position: 'fixed',
          right: { xs: 16, md: 24 },
          bottom: { xs: 16, md: 24 },
          zIndex: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          color: 'white',
          animation: `${pulse} 2.5s ease-out infinite, ${float} 3s ease-in-out infinite`,
          transition: 'transform 0.2s ease',
          '&:hover': { transform: 'scale(1.08)' },
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
          },
        }}
      >
        <InstallMobileOutlinedIcon sx={{ fontSize: 28 }} />
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 4, overflow: 'visible' } } }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          size="small"
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <DialogContent sx={{ pt: 5, pb: 1 }}>
          <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Box component="img" src="/Saw.png" alt="Sau" sx={{ width: 96, height: 'auto', mt: -6 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Quer instalar o Salvaqui?
            </Typography>

            {canInstall ? (
              <Typography color="text.secondary">
                Leva menos de 10 segundos, funciona até offline, e não ocupa espaço de loja de
                aplicativo.
              </Typography>
            ) : (
              <Stack spacing={1.5} sx={{ textAlign: 'left', width: '100%' }}>
                <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                  Seu navegador não libera instalação automática — mas dá pra fazer na mão:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>iPhone (Safari):</strong> toque em Compartilhar e depois em "Adicionar
                  à Tela de Início".
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Android (Chrome):</strong> toque no menu ⋮ e depois em "Instalar app" ou
                  "Adicionar à tela inicial".
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Computador (Chrome/Edge):</strong> clique no ícone de instalar na barra
                  de endereço, à direita.
                </Typography>
              </Stack>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
          <Button onClick={() => setOpen(false)} color="secondary" fullWidth={!canInstall}>
            {canInstall ? 'Agora não' : 'Entendi'}
          </Button>
          {canInstall && (
            <Button onClick={handleInstall} variant="contained" disableElevation fullWidth>
              Instalar
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {feedback && (
        <Box
          role="status"
          sx={{
            position: 'fixed',
            right: { xs: 16, md: 24 },
            bottom: { xs: 84, md: 96 },
            zIndex: 20,
            bgcolor: 'primary.main',
            color: 'white',
            px: 2,
            py: 1.25,
            borderRadius: 2,
            maxWidth: 260,
            boxShadow: 4,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {feedback}
          </Typography>
        </Box>
      )}
    </>
  )
}

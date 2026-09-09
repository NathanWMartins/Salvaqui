import { useState } from 'react'
import { Box, Button, Chip, Container, Paper, Snackbar, Alert, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import DetailHeader from '../components/DetailHeader'
import { getConnectionById } from '../data/mockConnections'
import { mockItems } from '../data/mockItems'

export default function ConnectionPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const connection = getConnectionById(id)
  const [message, setMessage] = useState<string | null>(null)

  if (!connection) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <DetailHeader title="Conexão não encontrada" backTo="/inicio" />
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <Typography color="text.secondary">Essa conexão não existe (ou expirou).</Typography>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate('/inicio')}>
            Voltar pra Caixa de Entrada
          </Button>
        </Container>
      </Box>
    )
  }

  const items = mockItems.filter((item) => connection.itemIds.includes(item.id))

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <DetailHeader title="Conexão detectada" backTo="/inicio" />

      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={4}>
          {/* Cabeçalho da conexão, no mesmo espírito da seção "momento mágico" da landing */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: 4,
              background: 'linear-gradient(160deg, #E85D3D 0%, #C44B2F 100%)',
              color: 'white',
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box component="img" src="/Saw.png" alt="Sau" sx={{ width: 64, height: 'auto' }} />
                <Chip
                  icon={<AutoAwesomeOutlinedIcon sx={{ color: 'white !important' }} />}
                  label={connection.createdAgo.toUpperCase()}
                  size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 700 }}
                />
              </Stack>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {connection.title}
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>{connection.description}</Typography>
              <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">{connection.location}</Typography>
              </Stack>
            </Stack>
          </Paper>

          {/* Itens que compõem a conexão */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {items.length} itens conectados
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              {items.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  variant="outlined"
                  onClick={() => navigate(`/item/${item.id}`)}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    display: 'flex',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
                  }}
                >
                  <Box
                    component="img"
                    src={item.image ?? '/Saw.png'}
                    alt={item.title}
                    sx={{ width: 96, height: 96, objectFit: 'cover', flexShrink: 0 }}
                  />
                  <Stack spacing={0.5} sx={{ p: 1.5, minWidth: 0 }}>
                    <Chip
                      label={item.tag}
                      color={item.tagColor}
                      size="small"
                      sx={{ alignSelf: 'flex-start', fontWeight: 700, fontSize: '0.65rem' }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Box>
          </Stack>

          {/* Ações */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button
              variant="contained"
              size="large"
              disableElevation
              onClick={() => setMessage('Em breve! A criação automática de viagens ainda está sendo construída.')}
            >
              Criar minha viagem
            </Button>
            <Button
              variant="text"
              size="large"
              color="secondary"
              onClick={() => setMessage('Combinado, essa conexão não vai mais aparecer em destaque.')}
            >
              Ignorar essa conexão
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={4000}
        onClose={() => setMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setMessage(null)} severity="info" variant="filled" sx={{ bgcolor: 'secondary.main' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

import { useState, type ReactNode } from 'react'
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
import DetailHeader from '../components/DetailHeader'
import { getItemById } from '../data/mockItems'
import { getConnectionById } from '../data/mockConnections'
import { getLocalItems, removeLocalItem } from '../lib/localItems'
import { useAuth } from '../contexts/AuthContext'

const tagOptions: { label: string; color: 'warning' | 'info' | 'secondary' | 'success' }[] = [
  { label: 'Gastronomia', color: 'warning' },
  { label: 'Hospedagem', color: 'info' },
  { label: 'Transporte', color: 'secondary' },
  { label: 'Passeio', color: 'success' },
]

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { session } = useAuth()
  const userId = session?.user.id ?? 'guest'

  // Primeiro procura nos itens de exemplo, depois nos que a pessoa salvou de
  // verdade (guardados localmente por enquanto).
  const item = getItemById(id) ?? getLocalItems(userId).find((i) => i.id === id)
  const isLocalItem = item?.id.startsWith('local-') ?? false

  const [removed, setRemoved] = useState(false)
  const [tagAnchor, setTagAnchor] = useState<null | HTMLElement>(null)

  if (!item) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <DetailHeader title="Item não encontrado" backTo="/inicio" />
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <Typography color="text.secondary">
            Esse item não existe (ou já foi removido).
          </Typography>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate('/inicio')}>
            Voltar pra Caixa de Entrada
          </Button>
        </Container>
      </Box>
    )
  }

  const connection = item.connectionId ? getConnectionById(item.connectionId) : undefined

  const handleRemove = () => {
    if (isLocalItem) {
      removeLocalItem(userId, item.id)
    }
    setRemoved(true)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <DetailHeader title={item.tag} backTo="/inicio" />

      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        {removed && (
          <Alert severity="info" sx={{ mb: 3 }}>
            {isLocalItem
              ? 'Item removido da sua Caixa de Entrada.'
              : 'Item removido da sua Caixa de Entrada. (Isso é só visual pra esse exemplo — nada foi apagado de verdade.)'}
          </Alert>
        )}

        <Stack spacing={3}>
          {/* Imagem grande (ou placeholder, se ainda não tiver) */}
          <Box sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', aspectRatio: '16 / 9' }}>
            {item.image ? (
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Stack
                sx={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  bgcolor: 'action.hover',
                  color: 'text.secondary',
                }}
              >
                <AutoAwesomeOutlinedIcon sx={{ fontSize: 32 }} />
                <Typography variant="body2">Ainda estamos analisando esse conteúdo</Typography>
              </Stack>
            )}
            <Chip
              label={item.tag}
              color={item.tagColor}
              sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 700 }}
            />
          </Box>

          {/* Título e local */}
          <Stack spacing={1}>
            <Typography variant="h5" sx={{ fontWeight: 700, wordBreak: 'break-word' }}>
              {item.title}
            </Typography>
            {item.location && (
              <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                <LocationOnOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography color="text.secondary">{item.location}</Typography>
              </Stack>
            )}
          </Stack>

          {/* Metadados */}
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, p: { xs: 2, md: 2.5 } }}>
            <Stack spacing={1.5}>
              <MetaRow icon={<LinkOutlinedIcon fontSize="small" />} label="Fonte">
                {item.sourceUrl ? (
                  <Typography
                    component="a"
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="body2"
                    sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none', wordBreak: 'break-all' }}
                  >
                    {item.source} <OpenInNewOutlinedIcon sx={{ fontSize: 13, verticalAlign: 'middle', ml: 0.3 }} />
                  </Typography>
                ) : (
                  <Typography variant="body2">{item.source}</Typography>
                )}
              </MetaRow>
              <MetaRow icon={<AccessTimeOutlinedIcon fontSize="small" />} label="Salvo em">
                <Typography variant="body2">{item.savedAt}</Typography>
              </MetaRow>
              <MetaRow icon={<LabelOutlinedIcon fontSize="small" />} label="Categoria">
                <Chip
                  label={item.tag}
                  color={item.tagColor}
                  size="small"
                  onClick={(e) => setTagAnchor(e.currentTarget)}
                  sx={{ fontWeight: 700, cursor: 'pointer' }}
                />
                <Menu anchorEl={tagAnchor} open={Boolean(tagAnchor)} onClose={() => setTagAnchor(null)}>
                  {tagOptions.map((option) => (
                    <MenuItem key={option.label} onClick={() => setTagAnchor(null)}>
                      <Chip label={option.label} color={option.color} size="small" sx={{ mr: 1 }} />
                      {option.label}
                    </MenuItem>
                  ))}
                </Menu>
              </MetaRow>
            </Stack>
          </Paper>

          {/* O que a IA entendeu */}
          <Paper
            elevation={0}
            sx={{ borderRadius: 3, p: { xs: 2.5, md: 3 }, bgcolor: 'secondary.main', color: 'white' }}
          >
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <AutoAwesomeOutlinedIcon fontSize="small" />
                <Typography variant="overline" sx={{ letterSpacing: 1, opacity: 0.85 }}>
                  O QUE A IA ENTENDEU
                </Typography>
              </Stack>
              {item.aiSummary ? (
                <>
                  <Typography sx={{ opacity: 0.95 }}>{item.aiSummary}</Typography>
                  {item.aiSignals && item.aiSignals.length > 0 && (
                    <>
                      <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)' }} />
                      <Stack spacing={0.75}>
                        {item.aiSignals.map((signal) => (
                          <Typography key={signal} variant="body2" sx={{ opacity: 0.85 }}>
                            • {signal}
                          </Typography>
                        ))}
                      </Stack>
                    </>
                  )}
                </>
              ) : (
                <Typography sx={{ opacity: 0.9 }}>
                  Ainda não analisamos esse conteúdo — isso ainda é feito à mão nesta versão.
                  Assim que o pipeline de IA estiver pronto, aqui aparece o resumo do que ela
                  entendeu.
                </Typography>
              )}
            </Stack>
          </Paper>

          {/* Banner de conexão, se houver */}
          {connection && (
            <Paper
              elevation={0}
              variant="outlined"
              sx={{
                borderRadius: 3,
                p: { xs: 2, md: 2.5 },
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
                borderColor: 'primary.main',
              }}
            >
              <Box component="img" src="/Saw.png" alt="Sau" sx={{ width: 48, height: 'auto' }} />
              <Typography sx={{ flex: 1, minWidth: 200 }}>
                Esse item faz parte de uma possível viagem pra{' '}
                <strong>{connection.location}</strong>.
              </Typography>
              <Button
                variant="contained"
                disableElevation
                onClick={() => navigate(`/conexao/${connection.id}`)}
              >
                Ver conexão
              </Button>
            </Paper>
          )}

          {/* Ações */}
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlineOutlinedIcon />}
              onClick={handleRemove}
              disabled={removed}
            >
              Remover
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

function MetaRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <Box sx={{ color: 'text.secondary', display: 'flex' }}>{icon}</Box>
      <Typography variant="body2" color="text.secondary" sx={{ width: 90, flexShrink: 0 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>{children}</Box>
    </Stack>
  )
}

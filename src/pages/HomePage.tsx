import { useState, type FormEvent } from 'react'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import { getDisplayName, logout } from '../lib/auth'
import { useAuth } from '../contexts/AuthContext'
import { addLocalItem, getLocalItems, isOnboarded, markOnboarded } from '../lib/localItems'
import OnboardingIntro from '../components/OnboardingIntro'
import EmptyInbox from '../components/EmptyInbox'
import ThemeToggleButton from '../components/ThemeToggleButton'

const filters = ['Todos', 'Comprar', 'Conhecer', 'Fazer', 'Assistir', 'Aprender']

export default function HomePage() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const userId = session?.user.id ?? 'guest'

  const [items, setItems] = useState(() => getLocalItems(userId))
  const [onboarded, setOnboarded] = useState(() => isOnboarded(userId))
  const [link, setLink] = useState('')
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const firstName = getDisplayName(session?.user)

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = link.trim()
    if (!trimmed) return

    // TODO: quando o pipeline de IA existir, esse item nasce "aguardando
    // análise" e é atualizado depois — por enquanto fica assim mesmo.
    const newItem = addLocalItem(userId, trimmed)
    setItems((prev) => [newItem, ...prev])
    setLink('')
    if (!onboarded) {
      markOnboarded(userId)
      setOnboarded(true)
    }
  }

  const handleSkipOnboarding = () => {
    markOnboarded(userId)
    setOnboarded(true)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  // Primeira visita, sem nada salvo ainda: mostra a introdução em vez da
  // Home normal.
  if (!onboarded && items.length === 0) {
    return (
      <OnboardingIntro
        firstName={firstName}
        link={link}
        onLinkChange={setLink}
        onSubmit={handleSave}
        onSkip={handleSkipOnboarding}
      />
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header fixo */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: (theme) => alpha(theme.palette.background.default, 0.9),
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between', py: 2, gap: 2 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
              salvaqui
            </Typography>

            <TextField
              placeholder="Buscar no que você salvou..."
              size="small"
              sx={{ flex: 1, maxWidth: 420, display: { xs: 'none', sm: 'block' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <ThemeToggleButton />

            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: '0.9rem' }}>
                {firstName[0]?.toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null)
                  navigate('/configuracoes')
                }}
              >
                <SettingsOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                Configurações
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                Sair
              </MenuItem>
            </Menu>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={4}>
          {/* Saudação da Sau */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2.5,
              bgcolor: 'primary.main',
              color: 'white',
              flexWrap: 'wrap',
            }}
          >
            <Box component="img" src="/Saw.png" alt="Sau" sx={{ width: 72, height: 'auto', flexShrink: 0 }} />
            <Box sx={{ flex: 1, minWidth: 220 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Oi, {firstName}! 👋
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>
                {items.length > 0
                  ? `Você tem ${items.length} ${items.length === 1 ? 'item salvo' : 'itens salvos'}.`
                  : 'Sua Caixa de Entrada tá pronta. Cole seu primeiro link ali embaixo!'}
              </Typography>
            </Box>
          </Paper>

          {/* Salvar novo link */}
          <Paper
            component="form"
            onSubmit={handleSave}
            elevation={0}
            variant="outlined"
            sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 3, display: 'flex', gap: 1.5, alignItems: 'center' }}
          >
            <TextField
              placeholder="Cole aqui um link do Instagram, TikTok, YouTube..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              fullWidth
              variant="standard"
              slotProps={{ input: { disableUnderline: true } }}
              sx={{ px: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              disableElevation
              startIcon={<AddLinkOutlinedIcon />}
              sx={{ flexShrink: 0 }}
            >
              Salvar
            </Button>
          </Paper>

          {items.length === 0 ? (
            <EmptyInbox />
          ) : (
            <>
              {/* Filtros por intenção */}
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                {filters.map((filter) => (
                  <Chip
                    key={filter}
                    label={filter}
                    onClick={() => setActiveFilter(filter)}
                    color={activeFilter === filter ? 'primary' : undefined}
                    variant={activeFilter === filter ? 'filled' : 'outlined'}
                  />
                ))}
              </Stack>

              {/* Grid de itens salvos */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                  gap: 2.5,
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
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
                    }}
                  >
                    <Box sx={{ position: 'relative', aspectRatio: '4 / 3' }}>
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
                            gap: 0.5,
                            bgcolor: 'action.hover',
                            color: 'text.secondary',
                          }}
                        >
                          <AutoAwesomeOutlinedIcon />
                          <Typography variant="caption">Analisando...</Typography>
                        </Stack>
                      )}
                      <Chip
                        label={item.tag}
                        size="small"
                        color={item.tagColor}
                        sx={{ position: 'absolute', top: 8, left: 8, fontWeight: 700, fontSize: '0.65rem' }}
                      />
                    </Box>
                    <Stack spacing={0.5} sx={{ p: 1.75 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          wordBreak: 'break-word',
                        }}
                      >
                        {item.title}
                      </Typography>
                      {item.location && (
                        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                          <LocationOnOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {item.location}
                          </Typography>
                        </Stack>
                      )}
                      <Typography variant="caption" color="text.secondary">
                        {item.source} · {item.savedAgo}
                      </Typography>
                    </Stack>
                  </Paper>
                ))}
              </Box>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

import { useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  TextField,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import AndroidIcon from '@mui/icons-material/Android'
import AppleIcon from '@mui/icons-material/Apple'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined'
import InstallMobileOutlinedIcon from '@mui/icons-material/InstallMobileOutlined'
import { Link as RouterLink } from 'react-router-dom'
import { keyframes } from '@emotion/react'
import SauCompanion from '../components/SauCompanion'
import { usePWAInstall } from '../contexts/PWAInstallContext'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined'
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined'

const contextItems = [
  {
    title: 'Restaurante',
    source: 'Instagram · Florianópolis',
    tag: 'Gastronomia',
    color: 'warning' as const,
    location: 'Florianópolis',
    icon: <RestaurantOutlinedIcon />,
    gradient: 'linear-gradient(135deg, #FFB199, #E85D3D)',
  },
  {
    title: 'Pousada dos Mares',
    source: 'TikTok · Jurerê Internacional',
    tag: 'Hospedagem',
    color: 'info' as const,
    location: 'Jurerê - Floripa',
    icon: <HotelOutlinedIcon />,
    gradient: 'linear-gradient(135deg, #74C0FC, #1971C2)',
  },
  {
    title: 'Aeroporto',
    source: 'Navegador Web · Florianópolis',
    tag: 'Transporte',
    color: 'secondary' as const,
    location: 'Floripa International Airport',
    icon: <DirectionsCarOutlinedIcon />,
    gradient: 'linear-gradient(135deg, #6B7280, #1F2937)',
  },
  {
    title: 'Trilha Lagoinha do Leste',
    source: 'Instagram · Florianópolis',
    tag: 'Passeio',
    color: 'success' as const,
    location: 'Sul da ilha',
    icon: <TerrainOutlinedIcon />,
    gradient: 'linear-gradient(135deg, #69DB7C, #2F9E44)',
  },
]

const shareSteps = [
  'Toque no botão "Compartilhar" no TikTok ou Instagram.',
  'Selecione o ícone coral do Salvaqui na lista.',
  'Pronto! A janela de captura rápida abre em segundo plano.',
]

const intentStats = [
  { label: 'Comprar', value: '18 itens', icon: <ShoppingBagOutlinedIcon /> },
  { label: 'Conhecer', value: '42 locais', icon: <PlaceOutlinedIcon /> },
  { label: 'Fazer', value: '27 passos', icon: <TaskAltOutlinedIcon /> },
  { label: 'Aprender', value: '64 artigos', icon: <SchoolOutlinedIcon /> },
  { label: 'Assistir', value: '15 vídeos', icon: <PlayCircleOutlinedIcon /> },
  { label: 'Inbox', value: '3 pendentes', icon: <InboxOutlinedIcon /> },
]

const multimodalSteps = [
  { n: 1, icon: <InsertLinkOutlinedIcon />, title: 'Recepção de Link & Scraping Seguro', text: 'Metadados OpenGraph, autor e thumbnail limpos.' },
  { n: 2, icon: <GraphicEqOutlinedIcon />, title: 'Transcrição de Vídeo & Áudio', text: 'Converte a fala do vídeo em texto pesquisável.' },
  { n: 3, icon: <VisibilityOutlinedIcon />, title: 'Visão Computacional Multimodal', text: 'Identifica objetos, lugares e cenários visuais.' },
  { n: 4, icon: <AutoAwesomeOutlinedIcon />, title: 'Extração de Entidades & Ação', text: 'Gera o resumo e a sugestão de ação direto.' },
]

const freeFeatures = [
  'Salvamento ilimitado',
  'Organização por até 3 contextos',
  'Detecção de contextos essenciais',
  'PWA leve para Android e iOS',
]

const proFeatures = [
  'Transcrição de áudio e vídeo ilimitada',
  'Visão computacional em imagens e prints',
  'Detecção automática de roteiros e viagens',
  'Alertas e lembretes de contexto',
  'Histórico e busca semântica sem limites',
]

// Fade-in suave do vídeo de fundo da hero.
const heroVideoFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

// Fade-in do balão de apresentação — aparece um instante depois do vídeo.
const introFadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`

export default function LandingPage() {
  const [url, setUrl] = useState('')
  const { canInstall, installed, promptInstall } = usePWAInstall()
  const [installMessage, setInstallMessage] = useState<string | null>(null)

  const handleInstallClick = async () => {
    const outcome = await promptInstall()
    if (outcome === 'accepted') {
      setInstallMessage('Prontinho! O Salvaqui já está instalado. 🎉')
    } else if (outcome === 'dismissed') {
      setInstallMessage('Sem problema, você pode instalar quando quiser por aqui mesmo.')
    }
  }

  return (
    <Box sx={{ position: 'relative', backgroundColor: '#fbf9f6' }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: '#fbf9f6',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center', py: 2 }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                salvaqui
              </Typography>
              <Chip
                label="IA Contextual"
                size="small"
                color="primary"
                variant="outlined"
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              />
            </Stack>
            <Stack direction="row" spacing={1.5}>
              <Button component={RouterLink} to="/login" sx={{ color: "#ff8146" }}>
                Entrar
              </Button>
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                disableElevation
                sx={{ backgroundColor: "#ff8146", display: { xs: 'none', sm: 'inline-flex' } }}
              >
                Experimente Grátis
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Hero */}
      <Box
        id="hero"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: 520, md: 640 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Vídeo do Sau em tela cheia, ao fundo */}
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: 'absolute',
            top: { xs: 0, md: '50%' },
            right: { xs: -12, md: 100 },
            transform: { xs: 'none', md: 'translateY(-50%)' },
            width: { xs: '78%', md: '70%' },
            height: { xs: '48%', md: '70%' },
            objectFit: 'cover',
            objectPosition: 'right center',
            zIndex: 0,
            opacity: 0,
            animation: `${heroVideoFadeIn} 1s ease-out forwards`,
          }}
        >
          <source src="/SawVideo.mp4" type="video/mp4" />
        </Box>

        {/* Véu garantindo contraste do texto por cima do vídeo — no mobile
            deixa a parte de cima (onde o vídeo está) bem mais visível, e só
            escurece perto do texto embaixo. */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            background: {
              xs: 'linear-gradient(180deg, rgba(251,249,246,0.1) 0%, rgba(251,249,246,0.25) 38%, rgba(251,249,246,0.94) 56%, rgba(251,249,246,0.97) 100%)',
              md: 'linear-gradient(90deg, rgba(251,249,246,1) 0%, rgba(251,249,246,0.88) 42%, rgba(251,249,246,0) 68%)',
            },
          }}
        />

        {/* Balão de apresentação do Sau, sobre o vídeo */}
        <Paper
          elevation={0}
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            top: '14%',
            right: '8%',
            px: 2.5,
            py: 1.5,
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            width: 220,
            textAlign: 'left',
            zIndex: 2,
            opacity: 0,
            animation: `${introFadeIn} 0.6s ease-out 1s forwards`,
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none',
              opacity: 1,
            },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Oi, eu sou a Saw! 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Vou te ajudar a descobrir o que você salva e para o quê!
          </Typography>
        </Paper>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 8, md: 10 } }}>
          <Stack
            spacing={1}
            sx={{
              maxWidth: { xs: '100%', md: 620 },
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
              mt: { xs: 22, md: 0 },
            }}
          >
            <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' } }}>
              Você salva.
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' } }}>
              E a{' '}
              <Typography component="span" variant="h2" sx={{ fontSize: 'inherit', color: 'primary.main' }}>
                Saw
              </Typography>{' '}
              transforma em ação.
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 200, maxWidth: 620, fontStyle: 'italic', pt: 1, pb: 1 }}
            >
              Chega de links esquecidos no Instagram, TikTok ou navegador. O Salvaqui conecta
              seus conteúdos salvos e descobre a intenção por trás deles.
            </Typography>

            <Paper
              variant="outlined"
              sx={{ p: 1.5, borderRadius: 4, width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="https://instagram.com/p/floripa-trilha"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  sx={{ minWidth: 0, '& fieldset': { border: 'none' } }}
                />
                <Button
                  variant="contained"
                  disableElevation
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: "#ff8146",
                    flexShrink: 0,
                    px: { xs: 1.5, sm: 2.5 },
                    whiteSpace: 'nowrap',
                  }}
                >
                  Analisar
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Box>

      {/* O momento mágico */}
      <Box
        id="momento-magico"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #FBF9F6 0%, #ff8146 100%)',
          // background: '#ff8146',
          color: 'white',
          py: { xs: 5, md: 7 },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={{ xs: 3, md: 4 }}>
            {/* Header */}
            <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.7rem', md: '2.3rem' }, color: 'rgba(44, 44, 44, 0.85)' }}>
                O momento em que <br /> tudo se conecta.
              </Typography>
              <Typography sx={{ color: 'rgba(44, 44, 44, 0.85)', maxWidth: 480 }}>
                Quatro conteúdos salvos em dias diferentes. <br />A IA percebe que, juntos, eles contam
                uma história.
              </Typography>
            </Stack>

            {/* Grid de cards estilo preview de vídeo */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: { xs: 1.5, md: 2 },
              }}
            >
              {contextItems.map((item, index) => (
                <Box
                  key={item.title}
                  sx={{
                    position: 'relative',
                    borderRadius: 1,
                    overflow: 'hidden',
                    aspectRatio: '3 / 4',
                    background: item.gradient,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                  }}
                >
                  <Box
                    component="img"
                    src={`/card-photos/card${index + 1}.png`}
                    alt={item.title}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  {/* leve escurecida pra legenda/selo ficarem legíveis */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.8) 100%)',
                    }}
                  />

                  {/* badge de "play", tipo vídeo */}
                  <PlayCircleOutlinedIcon
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      fontSize: 20,
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  />

                  {/* selo de categoria, canto superior esquerdo */}
                  <Chip
                    label={item.tag}
                    size="small"
                    color={item.color}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 15,
                      height: 20,
                      fontSize: '0.62rem',
                      fontWeight: 700,
                    }}
                  />

                  {/* legenda inferior, tipo IG/TikTok */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 1,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.78) 100%)',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.2,
                        fontSize: { xs: '0.68rem', md: '0.75rem' },
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Stack direction="row" spacing={0.4} sx={{ alignItems: 'center', mt: 0.3 }}>
                      <LocationOnOutlinedIcon sx={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }} />
                      <Typography
                        variant="caption"
                        sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.62rem' }}
                      >
                        {item.location}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Resultado da IA — versão compacta */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 2.5 },
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.97)',
                color: 'text.primary',
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Chip
                    label="4 conexões encontradas"
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 700, fontSize: '0.68rem', background: '#ff8146' }}
                  />
                </Stack>

                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      background: '#ff8146'
                    }}
                  >
                    <LocationOnOutlinedIcon sx={{ color: 'white', fontSize: 18 }} />
                  </Box>
                  <Stack spacing={0.4}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      Parece que você está planejando uma viagem para Florianópolis! <br /> Vamos começar os planejamentos?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.82rem' }}>
                      Restaurante, hospedagem, transporte e passeio — tudo salvo nos últimos dias.
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ pt: 0.5 }}>
                  <Button variant="contained" size="small" disableElevation sx={{ fontWeight: 700, background: '#ff8146' }}>
                    Criar minha viagem
                  </Button>
                  <Button variant="text" size="small" color="secondary">
                    Guardar para depois
                  </Button>
                </Stack>
              </Stack>
            </Paper>

            <Typography
              sx={{
                textAlign: 'center',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '0.85rem',
                mx: 'auto',
              }}
            >
              A IA não decide por você. Ela percebe conexões que você talvez ainda não tenha percebido.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Velocidade extrema */}
      <Container maxWidth="sm" id="velocidade" sx={{ py: { xs: 8, md: 10 } }}>
        <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', mb: 4 }}>
          <Chip icon={<BoltOutlinedIcon />} label="VELOCIDADE EXTREMA" size="small" color="primary" variant="outlined" />
          <Typography variant="h3">Salvar leva 2 segundos em qualquer celular</Typography>
          <Typography color="text.secondary">
            Sem abrir outro app pra colar link. O Salvaqui instala direto do navegador em segundos, sem precisar de loja de aplicativo — e funciona até offline.
          </Typography>
          <Stack direction="row" spacing={1.5}>
            <Chip icon={<AndroidIcon />} label="Android" variant="outlined" />
            <Chip icon={<AppleIcon />} label="iPhone (iOS)" variant="outlined" />
          </Stack>
        </Stack>

        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>Web Share Target Integrado</Typography>
            <Stack spacing={2}>
              {shareSteps.map((step, i) => (
                <Stack key={step} direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                  <StepBadge n={i + 1} />
                  <Typography color="text.secondary">{step}</Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Container>

      {/* IA descobre o porquê */}
      <Box id="intencoes" sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md">
          <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', mb: 5 }}>
            <Typography variant="h3">A IA descobre o "porquê" você salvou</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
              Fora o cesto de bookmarks tradicional. No Salvaqui, cada salvamento ganha uma
              intenção automática — e você vê tudo organizado por isso.
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            {intentStats.map((stat) => (
              <Grid key={stat.label} size={{ xs: 6, md: 4 }}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 1 }}>{stat.icon}</Box>
                    <Typography sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* IA Multimodal */}
      <Container maxWidth="sm" id="tecnologia" sx={{ py: { xs: 8, md: 10 } }}>
        <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', mb: 4 }}>
          <Typography variant="h3">IA multimodal: mais que um simples bookmark</Typography>
          <Typography color="text.secondary">
            Vídeo sem legenda? Reels de viagem? Nosso motor decifra frame e áudio pra extrair a
            inteligência completa.
          </Typography>
        </Stack>
        <Stack spacing={3}>
          {multimodalSteps.map((step) => (
            <Stack key={step.n} direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
              <StepBadge n={step.n} />
              <Box>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
                  <Box sx={{ color: 'primary.main', display: 'flex' }}>{step.icon}</Box>
                  <Typography sx={{ fontWeight: 600 }}>{step.title}</Typography>
                </Stack>
                <Typography color="text.secondary">{step.text}</Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Container>

      {/* Preço */}
      <Box id="precos" sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md">
          <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', mb: 5 }}>
            <Typography variant="h3">Simples, sem pegadinhas</Typography>
            <Typography color="text.secondary">
              Use de graça pra sempre, ou pague menos que um café por mês pra desbloquear todo o
              poder da IA.
            </Typography>
          </Stack>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ height: '100%', borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6">Gratuito</Typography>
                  <Typography variant="h3" sx={{ my: 1 }}>R$0</Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Para salvar e organizar o básico.
                  </Typography>
                  <Stack spacing={1} sx={{ mb: 3 }}>
                    {freeFeatures.map((f) => (
                      <Stack key={f} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <CheckCircleOutlineIcon fontSize="small" color="action" />
                        <Typography variant="body2">{f}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button fullWidth variant="outlined" component={RouterLink} to="/signup">
                    Começar Grátis Agora
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card
                variant="outlined"
                sx={{ height: '100%', borderRadius: 3, borderColor: 'primary.main', borderWidth: 2, position: 'relative' }}
              >
                <Chip
                  label="7 DIAS GRÁTIS"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.65rem',
                  }}
                />
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" color="primary.main">Salvaqui Pro</Typography>
                  <Typography variant="h3" sx={{ my: 1 }}>
                    R$12,90<Typography component="span" variant="body1">/mês</Typography>
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Inteligência multimodal, sem limites.
                  </Typography>
                  <Stack spacing={1} sx={{ mb: 3 }}>
                    {proFeatures.map((f) => (
                      <Stack key={f} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <CheckCircleOutlineIcon fontSize="small" color="primary" />
                        <Typography variant="body2">{f}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button fullWidth variant="contained" disableElevation component={RouterLink} to="/signup">
                    Testar Pro 7 Dias Grátis
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Instalação */}
      <Container maxWidth="sm" id="instalar" sx={{ py: { xs: 8, md: 20 }, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 1 }}>Instalação instantânea em 1 toque</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          O Salvaqui ocupa poucos MB de memória, não precisa de loja de apps, e funciona mesmo
          com conexão instável.
        </Typography>
        {canInstall ? (
          <Button
            size="large"
            variant="contained"
            disableElevation
            startIcon={<InstallMobileOutlinedIcon />}
            onClick={handleInstallClick}
          >
            Instalar Gratuitamente
          </Button>
        ) : (
          <Button
            size="large"
            variant="contained"
            disableElevation
            startIcon={<InstallMobileOutlinedIcon />}
            component={RouterLink}
            to="/signup"
          >
            {installed ? 'Já instalado — criar conta' : 'Instalar Gratuitamente'}
          </Button>
        )}
        {!canInstall && !installed && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
            No iPhone: toque em Compartilhar e depois em "Adicionar à Tela de Início".
          </Typography>
        )}
      </Container>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', py: 5 }}>
        <Container maxWidth="lg">
          <Stack spacing={1} direction="row" sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            <Chip icon={<SecurityOutlinedIcon />} label="Seguro" size="small" variant="outlined" />
            <Chip icon={<DoNotDisturbAltOutlinedIcon />} label="Sem anúncios" size="small" variant="outlined" />
            <Chip icon={<InstallMobileOutlinedIcon />} label="PWA pronto" size="small" variant="outlined" />
          </Stack>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            © 2026 Salvaqui — Inteligência Contextual PWA. Feito para quem esquece onde salvou as
            coisas.
          </Typography>
        </Container>
      </Box>
      <SauCompanion />

      <Snackbar
        open={Boolean(installMessage)}
        autoHideDuration={5000}
        onClose={() => setInstallMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setInstallMessage(null)}
          severity="success"
          variant="filled"
          icon={
            <Box component="img" src="/Saw.png" alt="Sau" sx={{ width: 28, height: 'auto' }} />
          }
          sx={{ bgcolor: 'primary.main' }}
        >
          {installMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

function StepBadge({ n }: { n: number }) {
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        bgcolor: 'primary.main',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '0.85rem',
        flexShrink: 0,
      }}
    >
      {n}
    </Box>
  )
}

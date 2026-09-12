import { useState, type FormEvent, type ReactNode } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import DetailHeader from '../components/DetailHeader'
import { useAuth } from '../contexts/AuthContext'
import { useThemeMode } from '../contexts/ThemeModeContext'
import { getDisplayName, logout, updateEmail, updateName, updatePassword } from '../lib/auth'

// Card com cantos bem menos arredondados que o padrão do resto do app —
// aqui a página é densa em conteúdo, então um raio de card menor deixa
// as seções mais "arquivo" e menos "balão".
const CARD_RADIUS = 2.5

// Cabeçalho reaproveitado por cada seção: ícone com fundo colorido +
// título + descrição curta, pra cada card ter identidade própria em vez
// de só um Typography solto no topo.
function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description?: string
}) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 1.75,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
          color: 'primary.main',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
    </Stack>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const { mode, toggleMode } = useThemeMode()
  const user = session?.user

  const [name, setName] = useState(getDisplayName(user) ?? '')
  const [nameStatus, setNameStatus] = useState<string | null>(null)
  const [nameLoading, setNameLoading] = useState(false)

  const [email, setEmail] = useState(user?.email ?? '')
  const [emailStatus, setEmailStatus] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [emailLoading, setEmailLoading] = useState(false)

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordLoading, setPasswordLoading] = useState(false)

  const displayName = getDisplayName(user)

  const handleUpdateName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNameStatus(null)
    setNameLoading(true)
    try {
      await updateName(name)
      setNameStatus('Nome atualizado.')
    } catch (err) {
      setNameStatus(err instanceof Error ? err.message : 'Não foi possível atualizar o nome.')
    } finally {
      setNameLoading(false)
    }
  }

  const handleUpdateEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmailStatus(null)
    setEmailError(null)
    setEmailLoading(true)
    try {
      await updateEmail(email)
      setEmailStatus('Enviamos um link de confirmação pro novo e-mail. Ele só passa a valer depois que você confirmar.')
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : 'Não foi possível atualizar o e-mail.')
    } finally {
      setEmailLoading(false)
    }
  }

  const handleUpdatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPasswordStatus(null)
    setPasswordError(null)

    if (newPassword.length < 6) {
      setPasswordError('A senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas não coincidem.')
      return
    }

    setPasswordLoading(true)
    try {
      await updatePassword(newPassword)
      setPasswordStatus('Senha atualizada.')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Não foi possível atualizar a senha.')
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <DetailHeader title="Configurações da conta" backTo="/inicio" />

      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={3}>
          {/* Resumo do perfil */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: CARD_RADIUS,
              p: { xs: 2.5, md: 3 },
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: (theme) => alpha(theme.palette.common.white, 0.2),
                color: 'inherit',
                fontSize: '1.4rem',
                fontWeight: 700,
              }}
            >
              {displayName[0]?.toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
                {displayName}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }} noWrap>
                {user?.email}
              </Typography>
            </Box>
            <Chip
              label="Plano Grátis"
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor: (theme) => alpha(theme.palette.common.white, 0.18),
                color: 'inherit',
              }}
            />
          </Paper>

          {/* Perfil */}
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: CARD_RADIUS, p: { xs: 2.5, md: 3 } }}>
            <Stack component="form" spacing={2} onSubmit={handleUpdateName}>
              <SectionHeader
                icon={<PersonOutlineOutlinedIcon fontSize="small" />}
                title="Nome de exibição"
                description="Como a Sau vai te chamar pelo app."
              />
              {nameStatus && (
                <Alert severity={nameStatus === 'Nome atualizado.' ? 'success' : 'error'}>
                  {nameStatus}
                </Alert>
              )}
              <TextField
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" disableElevation disabled={nameLoading} sx={{ alignSelf: 'flex-start' }}>
                {nameLoading ? 'Salvando...' : 'Salvar nome'}
              </Button>
            </Stack>
          </Paper>

          {/* E-mail */}
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: CARD_RADIUS, p: { xs: 2.5, md: 3 } }}>
            <Stack component="form" spacing={2} onSubmit={handleUpdateEmail}>
              <SectionHeader
                icon={<AlternateEmailOutlinedIcon fontSize="small" />}
                title="E-mail de acesso"
                description="Usado pra login e pras notificações da conta."
              />
              {emailError && <Alert severity="error">{emailError}</Alert>}
              {emailStatus && <Alert severity="success">{emailStatus}</Alert>}
              <TextField
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" disableElevation disabled={emailLoading} sx={{ alignSelf: 'flex-start' }}>
                {emailLoading ? 'Enviando...' : 'Atualizar e-mail'}
              </Button>
            </Stack>
          </Paper>

          {/* Senha */}
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: CARD_RADIUS, p: { xs: 2.5, md: 3 } }}>
            <Stack component="form" spacing={2} onSubmit={handleUpdatePassword}>
              <SectionHeader
                icon={<LockOutlinedIcon fontSize="small" />}
                title="Senha"
              />
              {passwordError && <Alert severity="error">{passwordError}</Alert>}
              {passwordStatus && <Alert severity="success">{passwordStatus}</Alert>}
              <TextField
                label="Nova senha"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                helperText="Mínimo de 6 caracteres."
                autoComplete="new-password"
                fullWidth
                required
              />
              <TextField
                label="Confirmar nova senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                fullWidth
                required
              />
              <Button type="submit" variant="contained" disableElevation disabled={passwordLoading} sx={{ alignSelf: 'flex-start' }}>
                {passwordLoading ? 'Atualizando...' : 'Atualizar senha'}
              </Button>
            </Stack>
          </Paper>

          {/* Preferências */}
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: CARD_RADIUS, p: { xs: 2.5, md: 3 } }}>
            <Stack spacing={2}>
              <SectionHeader
                icon={<TuneOutlinedIcon fontSize="small" />}
                title="Preferências"
                description="Ajustes de exibição do app."
              />
              <Stack
                direction="row"
                sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  {mode === 'dark' ? (
                    <DarkModeOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  ) : (
                    <LightModeOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  )}
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Modo escuro
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {mode === 'dark' ? 'Ativado' : 'Desativado'}
                    </Typography>
                  </Box>
                </Stack>
                <Switch checked={mode === 'dark'} onChange={toggleMode} inputProps={{ 'aria-label': 'Alternar modo escuro' }} />
              </Stack>
            </Stack>
          </Paper>

          {/* Plano */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: CARD_RADIUS,
              p: { xs: 2.5, md: 3 },
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.35),
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
            }}
          >
            <Stack spacing={2}>
              <SectionHeader
                icon={<WorkspacePremiumOutlinedIcon fontSize="small" />}
                title="Seu plano"
                description="Veja o que está incluso e o que muda no Pro."
              />

              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <Chip
                  icon={<CheckCircleOutlineOutlinedIcon />}
                  label="Grátis"
                  sx={{ fontWeight: 700, bgcolor: 'background.paper' }}
                />
                <Typography variant="body2" color="text.secondary">
                  Você está no plano atual.
                </Typography>
              </Stack>

              <Stack spacing={0.75}>
                {['Salvamento ilimitado', 'Até 3 contextos ativos', 'Detecção essencial de conexões'].map((perk) => (
                  <Stack key={perk} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography variant="body2">{perk}</Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ borderColor: (theme) => alpha(theme.palette.primary.main, 0.2) }} />

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <AutoAwesomeOutlinedIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  No Pro: contextos ilimitados, detecção avançada por IA e mais.
                </Typography>
              </Stack>

              <Button
                variant="contained"
                disableElevation
                sx={{ alignSelf: 'flex-start' }}
                onClick={() => navigate('/#precos')}
              >
                Ver planos e assinar o Pro
              </Button>
            </Stack>
          </Paper>

          {/* Sessão */}
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: CARD_RADIUS, p: { xs: 2.5, md: 3 } }}>
            <Stack spacing={1.5}>
              <Button
                variant="text"
                color="secondary"
                startIcon={<LogoutOutlinedIcon />}
                onClick={handleLogout}
                sx={{ alignSelf: 'flex-start' }}
              >
                Sair da conta
              </Button>
              <Divider />
              <Button
                variant="text"
                color="error"
                startIcon={<DeleteOutlineOutlinedIcon />}
                disabled
                title="Em breve — exclusão de conta ainda não está implementada"
                sx={{ alignSelf: 'flex-start' }}
              >
                Excluir conta
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  )
}

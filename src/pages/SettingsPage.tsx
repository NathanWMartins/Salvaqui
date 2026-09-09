import { useState, type FormEvent } from 'react'
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import DetailHeader from '../components/DetailHeader'
import { useAuth } from '../contexts/AuthContext'
import { getDisplayName, logout, updateEmail, updateName, updatePassword } from '../lib/auth'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { session } = useAuth()
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
        <Stack spacing={4}>
          {/* Perfil */}
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, p: { xs: 2.5, md: 3 } }}>
            <Stack component="form" spacing={2} onSubmit={handleUpdateName}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Perfil
              </Typography>
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
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, p: { xs: 2.5, md: 3 } }}>
            <Stack component="form" spacing={2} onSubmit={handleUpdateEmail}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                E-mail
              </Typography>
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
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, p: { xs: 2.5, md: 3 } }}>
            <Stack component="form" spacing={2} onSubmit={handleUpdatePassword}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Senha
              </Typography>
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

          {/* Plano */}
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, p: { xs: 2.5, md: 3 } }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Plano
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <Chip
                  icon={<CheckCircleOutlineOutlinedIcon />}
                  label="Grátis"
                  color="default"
                  sx={{ fontWeight: 700 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Salvamento ilimitado, até 3 contextos, detecção essencial.
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                sx={{ alignSelf: 'flex-start' }}
                onClick={() => navigate('/#precos')}
              >
                Ver planos e assinar o Pro
              </Button>
            </Stack>
          </Paper>

          <Divider />

          {/* Sessão */}
          <Stack spacing={1.5} sx={{ alignItems: 'flex-start' }}>
            <Button variant="text" color="secondary" onClick={handleLogout}>
              Sair da conta
            </Button>
            <Button variant="text" color="error" disabled title="Em breve — exclusão de conta ainda não está implementada">
              Excluir conta
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

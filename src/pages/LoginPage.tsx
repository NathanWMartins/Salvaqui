import { useEffect, useState, type FormEvent } from 'react'
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import GoogleIcon from '@mui/icons-material/Google'
import AuthLayout from '../components/AuthLayout'
import { loginWithEmail, loginWithGoogle } from '../lib/auth'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Navega assim que a sessão do Supabase (contexto) confirmar o login —
  // evita redirecionar antes do estado global saber que o usuário entrou.
  useEffect(() => {
    if (session) navigate('/inicio')
  }, [session, navigate])

  const handleGoogleLogin = async () => {
    setError(null)
    setGoogleLoading(true)
    try {
      await loginWithGoogle()
      // o navegador é redirecionado pro Google — se der erro antes disso,
      // caímos no catch; se não, essa página nem continua carregada.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar com o Google.')
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Preencha e-mail e senha para continuar.')
      return
    }

    setLoading(true)
    try {
      await loginWithEmail(email, password)
      // navegação acontece no useEffect acima, quando a sessão for atualizada
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Que bom te ver de novo"
      subtitle="Entre para continuar de onde você parou."
      mascotMessage="Oi de novo! Vamos ver o que você salvou enquanto esteve fora? 👋"
    >
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          fullWidth
          required
        />

        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          fullWidth
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((v) => !v)} edge="end" size="small">
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ textAlign: 'right' }}>
          <Link component={RouterLink} to="/esqueci-senha" variant="body2" color="secondary">
            Esqueci minha senha
          </Link>
        </Box>

        <Button type="submit" variant="contained" size="large" disableElevation disabled={loading} fullWidth>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <Divider>
          <Typography variant="body2" color="text.secondary">
            ou
          </Typography>
        </Divider>

        <Button
          variant="outlined"
          size="large"
          color="secondary"
          startIcon={<GoogleIcon />}
          fullWidth
          disabled={googleLoading}
          onClick={handleGoogleLogin}
        >
          {googleLoading ? 'Redirecionando...' : 'Continuar com Google'}
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', pt: 1 }}>
          Não tem conta?{' '}
          <Link component={RouterLink} to="/signup" sx={{ fontWeight: 700 }}>
            Criar conta grátis
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  )
}

import { useEffect, useState, type FormEvent } from 'react'
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
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
import { signupWithEmail } from '../lib/auth'
import { useAuth } from '../contexts/AuthContext'

export default function SignupPage() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  // Se o projeto Supabase exigir confirmação por e-mail, não há sessão
  // ainda — só navega quando ela realmente existir.
  useEffect(() => {
    if (session) navigate('/inicio')
  }, [session, navigate])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setInfo(null)

    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos para continuar.')
      return
    }
    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
    if (!acceptedTerms) {
      setError('Você precisa aceitar os termos de uso para continuar.')
      return
    }

    setLoading(true)
    try {
      const { needsEmailConfirmation } = await signupWithEmail(name, email, password)
      if (needsEmailConfirmation) {
        setInfo('Conta criada! Verifique seu e-mail para confirmar antes de entrar.')
      }
      // se não precisar confirmar, o useEffect acima navega assim que a sessão chegar
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar sua conta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Crie sua conta grátis"
      subtitle="Comece a salvar em segundos. Sem cartão de crédito."
      mascotMessage="Eu sou a Sau! Vou te ajudar a organizar tudo que você salvar por aqui. 🧭"
    >
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
        {info && <Alert severity="success">{info}</Alert>}

        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          fullWidth
          required
        />

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
          autoComplete="new-password"
          helperText="Mínimo de 6 caracteres."
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

        <TextField
          label="Confirmar senha"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          fullWidth
          required
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              size="small"
            />
          }
          label={
            <Typography variant="body2" color="text.secondary">
              Aceito os{' '}
              <Link component={RouterLink} to="/termos">
                termos de uso
              </Link>{' '}
              e a{' '}
              <Link component={RouterLink} to="/privacidade">
                política de privacidade
              </Link>
              .
            </Typography>
          }
        />

        <Button type="submit" variant="contained" size="large" disableElevation disabled={loading} fullWidth>
          {loading ? 'Criando conta...' : 'Criar conta grátis'}
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
          disabled
        >
          Continuar com Google
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', pt: 1 }}>
          Já tem conta?{' '}
          <Link component={RouterLink} to="/login" sx={{ fontWeight: 700 }}>
            Entrar
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  )
}

import { useState, type FormEvent } from 'react'
import { Alert, Button, Link, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { requestPasswordReset } from '../lib/auth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!email) {
      setError('Digite seu e-mail pra gente enviar o link de recuperação.')
      return
    }

    setLoading(true)
    try {
      await requestPasswordReset(email)
      // Não revela se o e-mail existe ou não — evita vazar quem tem conta.
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar o e-mail.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Esqueceu sua senha?"
      subtitle="Sem problema, a gente te ajuda a recuperar."
      mascotMessage="Acontece com todo mundo! Vamos te mandar um link por e-mail. 📩"
    >
      {sent ? (
        <Stack spacing={2.5}>
          <Alert severity="success">
            Se existir uma conta com esse e-mail, você vai receber um link pra redefinir sua
            senha em instantes. Confira também a caixa de spam.
          </Alert>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" sx={{ fontWeight: 700 }}>
              Voltar pro login
            </Link>
          </Typography>
        </Stack>
      ) : (
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
            autoFocus
          />

          <Button type="submit" variant="contained" size="large" disableElevation disabled={loading} fullWidth>
            {loading ? 'Enviando...' : 'Enviar link de recuperação'}
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Lembrou a senha?{' '}
            <Link component={RouterLink} to="/login" sx={{ fontWeight: 700 }}>
              Entrar
            </Link>
          </Typography>
        </Stack>
      )}
    </AuthLayout>
  )
}

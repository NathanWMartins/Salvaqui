import { useState, type FormEvent } from 'react'
import { Alert, Button, Link, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { updatePassword } from '../lib/auth'
import { useAuth } from '../contexts/AuthContext'

// Chegou aqui a partir do link de e-mail de "esqueci minha senha". O
// supabase-js já detecta o token na URL e monta uma sessão de recuperação
// sozinho (comportamento padrão do cliente) — só falta pedir a nova senha.
export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const { session, loading } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setSaving(true)
    try {
      await updatePassword(password)
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível atualizar a senha.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return null

  if (!session) {
    return (
      <AuthLayout
        title="Link inválido ou expirado"
        subtitle="Esse link de recuperação não é mais válido."
        mascotMessage="Ih, esse link venceu. Pede um novo aqui do lado. 🔄"
      >
        <Stack spacing={2.5}>
          <Alert severity="warning">
            Links de redefinição de senha expiram depois de um tempo, por segurança. Solicite um
            novo.
          </Alert>
          <Button
            component={RouterLink}
            to="/esqueci-senha"
            variant="contained"
            size="large"
            disableElevation
            fullWidth
          >
            Solicitar novo link
          </Button>
        </Stack>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Defina sua nova senha"
      subtitle="Escolha uma senha nova pra sua conta."
      mascotMessage="Quase lá! Só falta escolher a nova senha. 🔐"
    >
      {done ? (
        <Stack spacing={2.5}>
          <Alert severity="success">Senha atualizada com sucesso!</Alert>
          <Button
            variant="contained"
            size="large"
            disableElevation
            fullWidth
            onClick={() => navigate('/inicio')}
          >
            Ir pra Caixa de Entrada
          </Button>
        </Stack>
      ) : (
        <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Nova senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            helperText="Mínimo de 6 caracteres."
            fullWidth
            required
            autoFocus
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

          <Button type="submit" variant="contained" size="large" disableElevation disabled={saving} fullWidth>
            {saving ? 'Salvando...' : 'Salvar nova senha'}
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" sx={{ fontWeight: 700 }}>
              Cancelar e voltar pro login
            </Link>
          </Typography>
        </Stack>
      )}
    </AuthLayout>
  )
}

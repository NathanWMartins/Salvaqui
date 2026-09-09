import type { AuthError, User } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

// Mensagens de erro do Supabase traduzidas pros casos mais comuns.
function translateAuthError(error: AuthError): string {
  const msg = error.message.toLowerCase()
  if (msg.includes('invalid login credentials')) return 'E-mail ou senha incorretos.'
  if (msg.includes('user already registered') || msg.includes('already registered')) {
    return 'Já existe uma conta com esse e-mail. Tente entrar.'
  }
  if (msg.includes('email not confirmed')) return 'Confirme seu e-mail antes de entrar.'
  if (msg.includes('password should be at least')) return 'A senha é muito curta.'
  if (msg.includes('new password should be different')) {
    return 'A nova senha precisa ser diferente da atual.'
  }
  if (msg.includes('should be different from the old password')) {
    return 'A nova senha precisa ser diferente da atual.'
  }
  return 'Algo deu errado. Tente de novo em instantes.'
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(translateAuthError(error))
  return data.user
}

// Retorna `needsEmailConfirmation: true` quando o projeto Supabase exige
// confirmação por e-mail antes de liberar a sessão (padrão de fábrica).
export async function signupWithEmail(
  name: string,
  email: string,
  password: string
): Promise<{ user: User | null; needsEmailConfirmation: boolean }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  })
  if (error) throw new Error(translateAuthError(error))
  return { user: data.user, needsEmailConfirmation: !data.session }
}

export async function logout() {
  await supabase.auth.signOut()
}

export function getDisplayName(
  user: Pick<User, 'user_metadata' | 'email'> | null | undefined
): string {
  const name = user?.user_metadata?.name as string | undefined
  if (name) return name.split(' ')[0]
  return user?.email?.split('@')[0] ?? 'por aqui'
}

// Atualiza o nome de exibição (guardado em user_metadata, não precisa de
// confirmação por e-mail).
export async function updateName(name: string): Promise<User> {
  const { data, error } = await supabase.auth.updateUser({ data: { name } })
  if (error) throw new Error(translateAuthError(error))
  return data.user
}

// Troca o e-mail. O Supabase, por padrão, exige confirmação (manda um link
// pro e-mail novo, às vezes também pro antigo) antes de efetivar a troca.
export async function updateEmail(email: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ email })
  if (error) throw new Error(translateAuthError(error))
}

export async function updatePassword(password: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw new Error(translateAuthError(error))
}

// Envia o e-mail de recuperação de senha. O link leva pra /redefinir-senha,
// onde a sessão de recuperação já vem parseada pelo supabase-js e a pessoa
// define a nova senha (via updatePassword, acima).
export async function requestPasswordReset(email: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/redefinir-senha`,
  })
  if (error) throw new Error(translateAuthError(error))
}

// Login com Google via Supabase OAuth. Redireciona pro Google e volta pro
// app já autenticado — precisa do provider "Google" habilitado no dashboard
// do Supabase (Authentication > Providers), com Client ID/Secret do Google
// Cloud configurados lá.
export async function loginWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/inicio`,
    },
  })
  if (error) throw new Error(translateAuthError(error))
  // Não retorna usuário aqui — o navegador é redirecionado pro Google e
  // volta pra /inicio já com sessão; o AuthContext pega a sessão sozinho.
}

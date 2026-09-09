import { createClient } from '@supabase/supabase-js'

// As chaves vêm do .env (nunca hardcode aqui). Copie .env.example pra .env
// e preencha com os dados do seu projeto Supabase (Project Settings > API).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || !supabaseAnonKey) {
  // Não trava o app — só avisa. Login/cadastro vão falhar até o .env ser preenchido.
  console.warn(
    '[salvaqui] Supabase não configurado. Crie um arquivo .env com VITE_SUPABASE_URL e ' +
      'VITE_SUPABASE_ANON_KEY (veja .env.example).'
  )
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

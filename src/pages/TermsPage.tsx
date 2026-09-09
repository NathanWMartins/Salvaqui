import type { ReactNode } from 'react'
import { Stack, Typography } from '@mui/material'
import LegalLayout from '../components/LegalLayout'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Stack spacing={1.5} sx={{ color: 'text.secondary' }}>
        {children}
      </Stack>
    </Stack>
  )
}

export default function TermsPage() {
  return (
    <LegalLayout title="Termos de Uso" updatedAt="9 de setembro de 2026">
      <Section title="1. O que é o Salvaqui">
        <Typography>
          O Salvaqui é um aplicativo (PWA) que ajuda você a guardar conteúdos que encontra na
          internet — links de Instagram, TikTok, YouTube e outros — e usa inteligência
          artificial pra entender do que se trata e sugerir conexões entre eles.
        </Typography>
      </Section>

      <Section title="2. Sua conta">
        <Typography>
          Você precisa criar uma conta (com e-mail e senha) pra usar o Salvaqui. Você é
          responsável por manter sua senha em segurança e por tudo que acontecer na sua conta.
        </Typography>
        <Typography>
          Você deve ter pelo menos 13 anos (ou a idade mínima exigida na sua região) pra criar
          uma conta.
        </Typography>
      </Section>

      <Section title="3. O que você pode fazer">
        <Typography>
          Você pode salvar, organizar e consultar seus próprios conteúdos. Não pode usar o
          Salvaqui pra salvar ou distribuir conteúdo ilegal, violento, ou que viole direitos de
          terceiros.
        </Typography>
      </Section>

      <Section title="4. Conteúdo de terceiros">
        <Typography>
          Os links que você salva apontam pra conteúdo de outras plataformas (Instagram, TikTok,
          YouTube etc.), que continuam sendo propriedade de seus respectivos criadores e
          plataformas. O Salvaqui só guarda uma referência e um resumo gerado por IA — não hospeda
          o conteúdo original.
        </Typography>
      </Section>

      <Section title="5. Inteligência artificial">
        <Typography>
          O Salvaqui usa IA pra analisar o conteúdo que você salva (título, descrição, e em
          alguns casos áudio/imagem) e sugerir categorias, locais e conexões entre itens. Essas
          sugestões podem conter erros — sempre confira antes de tomar decisões importantes
          baseadas nelas (como reservar uma viagem).
        </Typography>
      </Section>

      <Section title="6. Planos e cobrança">
        <Typography>
          O plano Grátis não tem custo. O plano Pro é cobrado por assinatura mensal, conforme o
          valor exibido no momento da contratação. Você pode cancelar a qualquer momento; o
          acesso Pro continua até o fim do período já pago.
        </Typography>
      </Section>

      <Section title="7. Cancelamento e encerramento">
        <Typography>
          Você pode excluir sua conta a qualquer momento nas Configurações. Podemos suspender ou
          encerrar contas que violem estes termos.
        </Typography>
      </Section>

      <Section title="8. Alterações nestes termos">
        <Typography>
          Podemos atualizar estes termos de vez em quando. Mudanças relevantes serão avisadas
          dentro do app ou por e-mail.
        </Typography>
      </Section>

      <Section title="9. Contato">
        <Typography>
          Dúvidas sobre estes termos? Fale com a gente em{' '}
          <Typography component="span" sx={{ fontWeight: 600 }}>
            contato@salvaqui.com
          </Typography>{' '}
          (endereço de exemplo — atualize pro seu e-mail real).
        </Typography>
      </Section>
    </LegalLayout>
  )
}

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

export default function PrivacyPage() {
  return (
    <LegalLayout title="Política de Privacidade" updatedAt="9 de setembro de 2026">
      <Section title="1. Quais dados coletamos">
        <Typography>
          <strong>Dados de conta:</strong> nome e e-mail, quando você cria sua conta.
        </Typography>
        <Typography>
          <strong>Conteúdo salvo:</strong> os links que você guarda no Salvaqui, e os resumos e
          categorias que a IA gera a partir deles.
        </Typography>
        <Typography>
          <strong>Dados de uso:</strong> informações técnicas básicas (tipo de dispositivo,
          erros do app) pra ajudar a manter o Salvaqui funcionando.
        </Typography>
      </Section>

      <Section title="2. Como usamos seus dados">
        <Typography>
          Usamos seus dados pra: manter sua conta funcionando, processar os links que você
          salva com IA, mostrar suas conexões e itens, e melhorar o produto. Não vendemos seus
          dados pra terceiros.
        </Typography>
      </Section>

      <Section title="3. Inteligência artificial e conteúdo salvo">
        <Typography>
          Quando você salva um link, parte do conteúdo (texto, e em alguns casos áudio ou
          imagem) pode ser processado por modelos de IA — nossos ou de provedores parceiros —
          pra gerar o resumo e a categorização que você vê no app. Esses provedores processam os
          dados só pra essa finalidade.
        </Typography>
      </Section>

      <Section title="4. Onde seus dados ficam guardados">
        <Typography>
          Seus dados de conta e conteúdo salvo ficam armazenados com o Supabase (nosso provedor
          de banco de dados e autenticação), que segue práticas padrão de segurança do setor
          (criptografia em trânsito, controle de acesso por usuário).
        </Typography>
      </Section>

      <Section title="5. Com quem compartilhamos">
        <Typography>
          Compartilhamos dados apenas com provedores que nos ajudam a operar o Salvaqui (como
          hospedagem e processamento de IA), e só na medida necessária pra prestar o serviço.
          Não compartilhamos seus dados com anunciantes.
        </Typography>
      </Section>

      <Section title="6. Seus direitos">
        <Typography>
          Você pode acessar, corrigir ou excluir seus dados a qualquer momento pelas
          Configurações da conta. Se preferir, pode pedir isso diretamente por e-mail — veja o
          contato abaixo.
        </Typography>
      </Section>

      <Section title="7. Cookies e armazenamento local">
        <Typography>
          Usamos armazenamento local do navegador (como localStorage) pra manter você conectado
          e lembrar de preferências do app. Não usamos cookies de rastreamento publicitário.
        </Typography>
      </Section>

      <Section title="8. Crianças">
        <Typography>
          O Salvaqui não é direcionado a crianças menores de 13 anos, e não coletamos
          intencionalmente dados de crianças nessa faixa etária.
        </Typography>
      </Section>

      <Section title="9. Alterações nesta política">
        <Typography>
          Podemos atualizar esta política de vez em quando. Mudanças relevantes serão avisadas
          dentro do app ou por e-mail.
        </Typography>
      </Section>

      <Section title="10. Contato">
        <Typography>
          Dúvidas sobre privacidade? Fale com a gente em{' '}
          <Typography component="span" sx={{ fontWeight: 600 }}>
            privacidade@salvaqui.com
          </Typography>{' '}
          (endereço de exemplo — atualize pro seu e-mail real).
        </Typography>
      </Section>
    </LegalLayout>
  )
}

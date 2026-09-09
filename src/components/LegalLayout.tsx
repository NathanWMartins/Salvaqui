import type { ReactNode } from 'react'
import { Alert, Box, Container, Stack, Typography } from '@mui/material'
import DetailHeader from './DetailHeader'

type LegalLayoutProps = {
  title: string
  updatedAt: string
  children: ReactNode
}

// Casca compartilhada por Termos de Uso e Política de Privacidade.
export default function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <DetailHeader title={title} backTo="/" />

      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={3}>
          <Alert severity="warning">
            Este é um rascunho inicial em linguagem simples, gerado como ponto de partida — não
            é aconselhamento jurídico. Revise com um advogado antes de publicar de verdade.
          </Alert>

          <Stack spacing={0.5}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Última atualização: {updatedAt}
            </Typography>
          </Stack>

          <Stack spacing={3}>{children}</Stack>
        </Stack>
      </Container>
    </Box>
  )
}

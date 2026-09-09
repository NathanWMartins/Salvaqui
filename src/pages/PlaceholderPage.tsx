import { Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'

export default function PlaceholderPage({title}: {title: string}) {
  return (
    <Container maxWidth="sm" sx={{ py:12 }}>
        <Stack spacing={2} sx={{alignItems: 'center', textAlign: 'center'}}>
            <Typography variant="h4">{title}</Typography>
            <Typography color="text.secondary">Esta página ainda vai ser construída.</Typography>
            <Button component={RouterLink} to="/" variant="outlined">
            Voltar para a home
            </Button>
        </Stack>
    </Container>
  )
}
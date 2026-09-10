import { Box, Container, IconButton, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import ThemeToggleButton from './ThemeToggleButton'

type DetailHeaderProps = {
  title: string
  backTo?: string
}


export default function DetailHeader({ title, backTo }: DetailHeaderProps) {
  const navigate = useNavigate()

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        bgcolor: (theme) => alpha(theme.palette.background.default, 0.9),
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="md">
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, py: 1.5 }}>
          <IconButton
            onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
            aria-label="Voltar"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, flex: 1 }} noWrap>
            {title}
          </Typography>
          <Typography
            component={RouterLink}
            to="/inicio"
            variant="body2"
            sx={{ fontWeight: 800, color: 'primary.main', textDecoration: 'none', display: { xs: 'none', sm: 'block' } }}
          >
            salvaqui
          </Typography>
          <ThemeToggleButton size="small" />
        </Stack>
      </Container>
    </Box>
  )
}

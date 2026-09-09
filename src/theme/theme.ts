import { createTheme } from '@mui/material/styles'

// Paleta provisória: fundo neutro claro, acento em âmbar/coral.
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#E85D3D',
      dark: '#C44B2F',
      light: '#FF8F6B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1F2937',
    },
    background: {
      default: '#FBF9F6',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#5C5C5C',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingLeft: 22,
          paddingRight: 22,
          paddingTop: 10,
          paddingBottom: 10,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})
import { createTheme, type PaletteMode, type ThemeOptions } from '@mui/material/styles'

// Configurações compartilhadas pelos dois modos (forma, tipografia,
// overrides de componente) — só a paleta muda entre claro/escuro.
const shared: ThemeOptions = {
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
}

const lightPalette: ThemeOptions['palette'] = {
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
}

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: {
    main: '#FF7A50',
    dark: '#E85D3D',
    light: '#FFB199',
    contrastText: '#1A1310',
  },
  secondary: {
    main: '#CBD5E1',
  },
  background: {
    default: '#17130F',
    paper: '#211C17',
  },
  text: {
    primary: '#F5F1EC',
    secondary: '#B8AFA6',
  },
  divider: 'rgba(245,241,236,0.12)',
}

export function getTheme(mode: PaletteMode) {
  return createTheme({
    ...shared,
    palette: mode === 'dark' ? darkPalette : lightPalette,
  })
}

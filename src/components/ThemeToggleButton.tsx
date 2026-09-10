import { IconButton, Tooltip, type IconButtonProps } from '@mui/material'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import { useThemeMode } from '../contexts/ThemeModeContext'

type ThemeToggleButtonProps = Omit<IconButtonProps, 'onClick' | 'aria-label'>

// Botão de alternância claro/escuro, pra usar nos headers do app inteiro.
// Mostra o ícone do estado pra onde vai (lua = "ativar escuro", sol =
// "ativar claro"), que é o padrão mais comum pra esse tipo de controle.
export default function ThemeToggleButton(props: ThemeToggleButtonProps) {
  const { mode, toggleMode } = useThemeMode()
  const isDark = mode === 'dark'

  return (
    <Tooltip title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}>
      <IconButton
        onClick={toggleMode}
        aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        color="inherit"
        {...props}
      >
        {isDark ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  )
}

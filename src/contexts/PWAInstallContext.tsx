import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// Tipagem do evento nativo do navegador (ainda não faz parte do lib.dom padrão).
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type InstallOutcome = 'accepted' | 'dismissed' | 'unavailable'

type PWAInstallContextValue = {
  canInstall: boolean
  installed: boolean
  promptInstall: () => Promise<InstallOutcome>
}

const PWAInstallContext = createContext<PWAInstallContextValue>({
  canInstall: false,
  installed: false,
  promptInstall: async () => 'unavailable',
})

function isStandalone() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    // Safari/iOS antigo
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

// Guarda o evento `beforeinstallprompt` (o navegador só dispara uma vez e
// precisa que a gente chame preventDefault pra poder disparar depois, sob
// clique do usuário) e expõe se o app já está instalado.
export function PWAInstallProvider({ children }: { children: ReactNode }) {
  const [deferredEvent, setDeferredEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(() => isStandalone())

  useEffect(() => {
    const handleBeforeInstall = (event: Event) => {
      event.preventDefault()
      setDeferredEvent(event as BeforeInstallPromptEvent)
    }
    const handleInstalled = () => {
      setInstalled(true)
      setDeferredEvent(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const promptInstall = async (): Promise<InstallOutcome> => {
    if (!deferredEvent) return 'unavailable'
    await deferredEvent.prompt()
    const choice = await deferredEvent.userChoice
    setDeferredEvent(null)
    if (choice.outcome === 'accepted') setInstalled(true)
    return choice.outcome
  }

  return (
    <PWAInstallContext.Provider value={{ canInstall: Boolean(deferredEvent), installed, promptInstall }}>
      {children}
    </PWAInstallContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- hook vive junto do provider de propósito
export function usePWAInstall() {
  return useContext(PWAInstallContext)
}

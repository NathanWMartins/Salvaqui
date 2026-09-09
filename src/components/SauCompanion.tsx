import { useEffect, useRef, useState } from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { keyframes } from '@emotion/react'

type SectionMessage = {
    id: string
    message: string
}

const sectionMessages: SectionMessage[] = [
    { id: 'momento-magico', message: 'Assim que eu conecto os pontos!' },
    { id: 'velocidade', message: 'Salvar leva só 2 segundos, sério!' },
    { id: 'intencoes', message: 'Óó, tudo organizado por intenção.' },
    { id: 'tecnologia', message: 'Eu leio até o áudio e a imagem do vídeo 👀' },
    { id: 'precos', message: 'Dá pra começar de graça, mas se quiser ajudar a gente 👀.' },
    { id: 'instalar', message: 'Bora instalar? Leva só 1 toque!' },
]

type Side = 'left' | 'right'

// A Saw alterna de lado a cada seção: 1ª seção à esquerda, 2ª à direita, 3ª à esquerda...
const sideForIndex = (index: number): Side => (index % 2 === 0 ? 'left' : 'right')

// Voo ao trocar de lado: arco pra cima + um giro completo no sentido do deslocamento.
const flyRight = keyframes`
  0%   { transform: rotate(0deg)    translateY(0); }
  50%  { transform: rotate(180deg)  translateY(-56px); }
  100% { transform: rotate(360deg)  translateY(0); }
`
const flyLeft = keyframes`
  0%   { transform: rotate(0deg)    translateY(0); }
  50%  { transform: rotate(-180deg) translateY(-56px); }
  100% { transform: rotate(-360deg) translateY(0); }
`

// Flutuação suave enquanto ela está "parada" numa seção.
const hover = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
`


// Posições horizontais dos dois lados. Sempre usamos `left` (nunca `right`)
// pra permitir uma transição de CSS suave entre os pontos.
const LEFT_X = { xs: '12px', sm: '5%', md: '6%' }
const RIGHT_X = { xs: 'calc(100% - 80px)', sm: 'calc(100% - 300px)', md: 'calc(100% - 300px)' }

const MASCOT_SIZE = 65
const TOP_PAD = 90 // distância mínima do topo da seção
const BOTTOM_PAD = 160 // distância mínima do fim da seção
const ANCHOR_VIEWPORT_RATIO = 0.38 // "altura" da tela onde a Saw tende a ficar
const FLIGHT_MS = 1800 // voo lento e suave entre seções
const FLIGHT_EASE = 'cubic-bezier(0.45, 0.05, 0.25, 1)'

export default function SauCompanion() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [topPx, setTopPx] = useState(0)
    const [visible, setVisible] = useState(false)
    const [flying, setFlying] = useState(false)
    const [flightDir, setFlightDir] = useState<Side>('left')
    // posição da Saw do hero (ponto de partida do primeiro voo)
    const [heroPos, setHeroPos] = useState<{ left: number; top: number } | null>(null)
    // muda a cada voo pra reiniciar as animações do balão e do giro
    const [flightKey, setFlightKey] = useState(0)

    const [balloonOpen, setBalloonOpen] = useState(false)

    const activeIndexRef = useRef<number | null>(null)
    const sectionsRef = useRef<(SectionMessage & { el: HTMLElement })[]>([])
    const flightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const sections = sectionMessages
            .map((s) => ({ ...s, el: document.getElementById(s.id) }))
            .filter((s) => s.el) as (SectionMessage & { el: HTMLElement })[]

        sectionsRef.current = sections
        if (sections.length === 0) return

        const heroMascot = document.getElementById('hero-mascot')

        const measureHero = () => {
            if (!heroMascot) return null
            const rect = heroMascot.getBoundingClientRect()
            const pos = {
                left: rect.left + rect.width / 2 - MASCOT_SIZE / 2,
                top: rect.top + window.scrollY + rect.height / 2 - MASCOT_SIZE / 2,
            }
            setHeroPos(pos)
            return pos
        }

        // Começa exatamente onde a Saw do hero está.
        const initialFrame = requestAnimationFrame(() => {
            const initial = measureHero()
            if (initial) setTopPx(initial.top)
        })

        const setHeroMascotVisible = (show: boolean) => {
            if (!heroMascot) return
            heroMascot.style.transition = 'opacity 0.6s ease'
            heroMascot.style.opacity = show ? '1' : '0'
        }

        const clampTopForSection = (el: HTMLElement, rawTop: number) => {
            const min = el.offsetTop + TOP_PAD
            const max = el.offsetTop + el.offsetHeight - BOTTOM_PAD
            const safeMax = Math.max(min, max)
            return Math.min(Math.max(rawTop, min), safeMax)
        }

        const goToSection = (index: number) => {
            activeIndexRef.current = index
            setFlightKey((k) => k + 1)
            setBalloonOpen(false)

            // Gira no sentido do deslocamento (do hero/centro ou do lado oposto até o lado de destino).
            setFlightDir(sideForIndex(index))

            setActiveIndex(index)
            setFlying(true)
            setVisible(true)
            setHeroMascotVisible(false)

            const rawTop = window.scrollY + window.innerHeight * ANCHOR_VIEWPORT_RATIO
            setTopPx(clampTopForSection(sections[index].el, rawTop))

            if (flightTimeoutRef.current) clearTimeout(flightTimeoutRef.current)
            flightTimeoutRef.current = setTimeout(() => setFlying(false), FLIGHT_MS)
        }

        const returnToHero = () => {
            activeIndexRef.current = null
            setActiveIndex(null)
            setBalloonOpen(false)
            setFlying(false)
            setVisible(false)
            setHeroMascotVisible(true)
            const pos = measureHero()
            if (pos) setTopPx(pos.top)
        }

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const mostVisible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

                if (mostVisible) {
                    const index = sections.findIndex((s) => s.el === mostVisible.target)
                    if (index !== -1 && index !== activeIndexRef.current) goToSection(index)
                }
            },
            { threshold: [0.4, 0.6] }
        )
        sections.forEach((s) => sectionObserver.observe(s.el))

        const hero = document.getElementById('hero')
        const heroObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) returnToHero()
            },
            { threshold: 0.6 }
        )
        if (hero) heroObserver.observe(hero)

        // acompanha o scroll em tempo real DENTRO da seção ativa
        let ticking = false
        const handleScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                ticking = false
                const index = activeIndexRef.current
                if (index === null) {
                    measureHero()
                    return
                }
                const section = sectionsRef.current[index]
                if (!section) return
                const rawTop = window.scrollY + window.innerHeight * ANCHOR_VIEWPORT_RATIO
                setTopPx(clampTopForSection(section.el, rawTop))
            })
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll)

        return () => {
            cancelAnimationFrame(initialFrame)
            sectionObserver.disconnect()
            heroObserver.disconnect()
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
            if (flightTimeoutRef.current) clearTimeout(flightTimeoutRef.current)
            setHeroMascotVisible(true)
        }
    }, [])

    const side: Side = activeIndex === null ? 'left' : sideForIndex(activeIndex)
    const activeMessage = activeIndex === null ? '' : sectionMessages[activeIndex]?.message

    // Enquanto está "no hero", fica parada exatamente sobre a Saw do topo (invisível),
    // pra que o primeiro voo comece de lá.
    const leftValue =
        activeIndex === null && heroPos ? `${heroPos.left}px` : side === 'left' ? LEFT_X : RIGHT_X

    return (
        <Box
            sx={{
                position: 'absolute',
                left: leftValue,
                top: topPx,
                opacity: visible ? 1 : 0,
                visibility: visible ? 'visible' : 'hidden',
                transition: flying
                    ? `top ${FLIGHT_MS}ms ${FLIGHT_EASE}, left ${FLIGHT_MS}ms ${FLIGHT_EASE}, opacity 0.5s ease`
                    : 'top 0.1s linear, opacity 0.3s ease',
                zIndex: 5,
                display: 'flex',
                alignItems: 'flex-end',
                gap: 1.5,
                pointerEvents: 'none',
                '@media (prefers-reduced-motion: reduce)': {
                    transition: 'opacity 0.3s ease',
                },
            }}
        >
            <Stack
                direction="column"
                sx={{ gap: 2, alignItems: side === 'left' ? 'flex-start' : 'flex-end' }}
            >
                <Paper
                    key={`balao-${flightKey}`}
                    elevation={3}
                    sx={{
                        position: 'relative',
                        px: 2,
                        py: 1.25,
                        borderRadius: 3,
                        maxWidth: 160,
                        ml: side === 'left' ? 5 : 0,
                        mr: side === 'right' ? 5 : 0,
                        opacity: {
                            xs: flying || !balloonOpen ? 0 : 1,
                            sm: flying ? 0 : 1,
                        },
                        transform: {
                            xs: flying || !balloonOpen ? 'scale(0.9)' : 'scale(1)',
                            sm: flying ? 'scale(0.9)' : 'scale(1)',
                        },
                        transformOrigin: side === 'left' ? 'bottom left' : 'bottom right',
                        transition: 'opacity 0.25s ease, transform 0.25s ease',
                        pointerEvents: 'none',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -7,
                            width: 0,
                            height: 0,
                            borderLeft: '7px solid transparent',
                            borderRight: '7px solid transparent',
                            borderTop: '7px solid',
                            borderTopColor: 'background.paper',
                            ...(side === 'left' ? { left: 16 } : { right: 16 }),
                        },
                    }}
                >
                    <Typography variant="body2">{activeMessage}</Typography>
                </Paper>
                <Box
                    key={`voo-${flightKey}`}
                    role="button"
                    tabIndex={0}
                    aria-label={balloonOpen ? 'Esconder mensagem do Sau' : 'Ver mensagem do Sau'}
                    onClick={() => !flying && setBalloonOpen((v) => !v)}
                    onKeyDown={(e) => {
                        if (!flying && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault()
                            setBalloonOpen((v) => !v)
                        }
                    }}
                    sx={{
                        flexShrink: 0,
                        pointerEvents: 'auto',
                        cursor: { xs: flying ? 'default' : 'pointer', sm: 'default' },
                        width: { xs: 44, sm: MASCOT_SIZE },
                        animation: flying
                            ? `${flightDir === 'right' ? flyRight : flyLeft} ${FLIGHT_MS}ms ease-in-out`
                            : `${hover} 3s ease-in-out infinite`,
                        '@media (prefers-reduced-motion: reduce)': {
                            animation: 'none',
                        },
                    }}
                >
                    <Box
                        component="img"
                        src="/Saw.png"
                        alt="Sau"
                        sx={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </Box>
            </Stack>
        </Box>
    )
}

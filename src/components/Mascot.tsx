type MascotProps = {
  size?: number
}

// Mascote original do Salvaqui: um "marcador" arredondado com carinha simpática
// e uma estrelinha simbolizando a IA. 100% desenhado em SVG — fácil de ajustar
// cores, expressão ou proporções depois.
export default function Mascot({ size = 96 }: MascotProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mascotBody" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF8F6B" />
          <stop offset="1" stopColor="#E85D3D" />
        </linearGradient>
      </defs>

      {/* corpo em formato de marcador/bookmark */}
      <path
        d="M20 16C20 10.4772 24.4772 6 30 6H90C95.5228 6 100 10.4772 100 16V96C100 101 96 104 92 101L60 84L28 101C24 104 20 101 20 96V16Z"
        fill="url(#mascotBody)"
      />

      {/* estrelinha de IA */}
      <path
        d="M92 18L94.5 24L100.5 25.5L94.5 27L92 33L89.5 27L83.5 25.5L89.5 24L92 18Z"
        fill="#FFF3EC"
      />

      {/* olhos */}
      <ellipse cx="46" cy="52" rx="8" ry="10" fill="#FFF9F5" />
      <ellipse cx="74" cy="52" rx="8" ry="10" fill="#FFF9F5" />
      <circle cx="47.5" cy="55" r="4" fill="#1F2937" />
      <circle cx="75.5" cy="55" r="4" fill="#1F2937" />
      <circle cx="45.5" cy="53" r="1.4" fill="#FFFFFF" />
      <circle cx="73.5" cy="53" r="1.4" fill="#FFFFFF" />

      {/* bochechas */}
      <ellipse cx="36" cy="66" rx="6" ry="4" fill="#FFB199" opacity="0.6" />
      <ellipse cx="84" cy="66" rx="6" ry="4" fill="#FFB199" opacity="0.6" />

      {/* sorriso */}
      <path d="M50 70C54 76 66 76 70 70" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}
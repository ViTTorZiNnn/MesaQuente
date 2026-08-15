import fs from "fs";

// ============================================================
// 1. BACKGROUND LOBBY (background-lobby.png / bg.jpg / bg.svg)
// ============================================================
export const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <pattern id="halftone-left" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="11" cy="11" r="5.5" fill="#080001" opacity="0.5"/>
    </pattern>
    <pattern id="halftone-right" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="6" fill="#080001" opacity="0.55"/>
    </pattern>

    <radialGradient id="wall-glow" cx="50%" cy="10%" r="75%" fx="50%" fy="0%">
      <stop offset="0%" stop-color="#ea1d24" stop-opacity="1"/>
      <stop offset="30%" stop-color="#b80c14" stop-opacity="1"/>
      <stop offset="65%" stop-color="#5a040a" stop-opacity="1"/>
      <stop offset="100%" stop-color="#140103" stop-opacity="1"/>
    </radialGradient>

    <linearGradient id="lamp-light-cone" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff7b39" stop-opacity="0.88"/>
      <stop offset="25%" stop-color="#e62020" stop-opacity="0.58"/>
      <stop offset="70%" stop-color="#aa0c14" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#aa0c14" stop-opacity="0"/>
    </linearGradient>

    <linearGradient id="floor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#550508"/>
      <stop offset="15%" stop-color="#320204"/>
      <stop offset="100%" stop-color="#0a0001"/>
    </linearGradient>

    <radialGradient id="floor-spotlight" cx="50%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#ff4a22" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#a30c14" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <filter id="blur-cone" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="28"/>
    </filter>
    
    <filter id="lamp-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Base Wall -->
  <rect width="1920" height="910" fill="url(#wall-glow)"/>

  <!-- Brick Texture Outlines Subtle -->
  <g stroke="#000000" stroke-width="1.8" opacity="0.28" fill="none">
    <path d="M 0,80 H 320 M 0,160 H 360 M 0,240 H 300 M 0,320 H 340 M 0,400 H 310 M 0,480 H 370 M 0,560 H 320 M 0,640 H 360 M 0,720 H 300 M 0,800 H 340"/>
    <path d="M 120,80 V 160 M 240,80 V 160 M 60,160 V 240 M 180,160 V 240 M 300,160 V 240 M 120,240 V 320 M 240,240 V 320 M 60,320 V 400 M 180,320 V 400 M 300,320 V 400 M 120,400 V 480 M 240,400 V 480 M 60,480 V 560 M 180,480 V 560 M 300,480 V 560 M 120,560 V 640 M 240,560 V 640 M 60,640 V 720 M 180,640 V 720 M 300,640 V 720 M 120,720 V 800 M 240,720 V 800"/>
    <path d="M 1580,80 H 1920 M 1540,160 H 1920 M 1600,240 H 1920 M 1560,320 H 1920 M 1610,400 H 1920 M 1550,480 H 1920 M 1600,560 H 1920 M 1540,640 H 1920 M 1620,720 H 1920 M 1560,800 H 1920"/>
    <path d="M 1740,80 V 160 M 1860,80 V 160 M 1680,160 V 240 M 1800,160 V 240 M 1740,240 V 320 M 1860,240 V 320 M 1680,320 V 400 M 1800,320 V 400 M 1740,400 V 480 M 1860,400 V 480 M 1680,480 V 560 M 1800,480 V 560 M 1740,560 V 640 M 1860,560 V 640 M 1680,640 V 720 M 1800,640 V 720 M 1740,720 V 800 M 1860,720 V 800"/>
  </g>

  <!-- Halftone Overlay Sides -->
  <rect x="0" y="0" width="420" height="910" fill="url(#halftone-left)"/>
  <rect x="1500" y="0" width="420" height="910" fill="url(#halftone-right)"/>

  <!-- Comic Grunge Splatters and Cracks -->
  <g stroke="#120102" stroke-width="2.5" fill="none" opacity="0.45">
    <path d="M 120,450 Q 180,480 230,440 T 320,510 M 230,440 L 260,390 M 180,480 L 160,540"/>
    <path d="M 80,220 Q 140,240 180,210 T 260,270"/>
    <path d="M 1780,420 Q 1720,460 1660,430 T 1560,490 M 1660,430 L 1630,370"/>
    <path d="M 1820,680 Q 1750,710 1700,670 T 1620,730"/>
    <circle cx="860" cy="380" r="14" fill="#280204" stroke="none" opacity="0.35"/>
    <circle cx="878" cy="395" r="6" fill="#280204" stroke="none" opacity="0.35"/>
    <circle cx="1090" cy="420" r="16" fill="#280204" stroke="none" opacity="0.35"/>
  </g>

  <!-- Spotlight Cone from Lamp -->
  <polygon points="960,60 260,910 1660,910" fill="url(#lamp-light-cone)" filter="url(#blur-cone)"/>
  <polygon points="960,60 520,910 1400,910" fill="url(#lamp-light-cone)" opacity="0.65"/>

  <!-- Floor Base -->
  <rect x="0" y="890" width="1920" height="190" fill="url(#floor-grad)"/>
  <rect x="0" y="886" width="1920" height="12" fill="#120102" stroke="#000000" stroke-width="2"/>
  <line x1="0" y1="892" x2="1920" y2="892" stroke="#3d0508" stroke-width="2"/>

  <!-- Floor Spotlight Reflection -->
  <ellipse cx="960" cy="980" rx="720" ry="95" fill="url(#floor-spotlight)"/>

  <!-- Ceiling Lamp Fixture -->
  <line x1="960" y1="0" x2="960" y2="36" stroke="#000000" stroke-width="12"/>
  <line x1="960" y1="0" x2="960" y2="36" stroke="#2b2b2b" stroke-width="6"/>

  <g id="lamp-fixture">
    <path d="M 944,36 L 976,36 L 970,46 L 950,46 Z" fill="#181818" stroke="#000000" stroke-width="3"/>
    <path d="M 950,46 C 940,55 890,70 870,82 L 1050,82 C 1030,70 980,55 970,46 Z" fill="#1b1c20" stroke="#000000" stroke-width="5"/>
    <ellipse cx="960" cy="82" rx="90" ry="12" fill="#15161a" stroke="#000000" stroke-width="5"/>
    <ellipse cx="960" cy="82" rx="84" ry="8" fill="#ff7733" opacity="0.8" filter="url(#lamp-glow-filter)"/>
    <ellipse cx="960" cy="84" rx="30" ry="14" fill="#fff4cc" filter="url(#lamp-glow-filter)"/>
  </g>
</svg>`;

// ============================================================
// 2. LOGO MESA QUENTE (logo-mesa-quente.png)
// ============================================================
export const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
  <defs>
    <filter id="comic-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="8" dy="12" stdDeviation="0" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
    <linearGradient id="fire-grad-outer" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#d61a00"/>
      <stop offset="50%" stop-color="#ff6b00"/>
      <stop offset="100%" stop-color="#ffda00"/>
    </linearGradient>
    <linearGradient id="fire-grad-inner" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ff7b00"/>
      <stop offset="60%" stop-color="#ffe135"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="quente-top" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff4538"/>
      <stop offset="45%" stop-color="#ff1a1a"/>
      <stop offset="50%" stop-color="#cf0008"/>
      <stop offset="100%" stop-color="#7a0004"/>
    </linearGradient>
    <linearGradient id="mesa-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="48%" stop-color="#fdf4e3"/>
      <stop offset="50%" stop-color="#dfcfb8"/>
      <stop offset="100%" stop-color="#bba88e"/>
    </linearGradient>
    <linearGradient id="gold-banner-border" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e6a117"/>
      <stop offset="50%" stop-color="#ffea79"/>
      <stop offset="100%" stop-color="#e6a117"/>
    </linearGradient>
  </defs>

  <g filter="url(#comic-shadow)">
    <!-- BACKING PLAYING CARDS -->
    <g transform="translate(140, 200) rotate(-18)">
      <rect x="0" y="0" width="170" height="250" rx="14" fill="#9b0e15" stroke="#000000" stroke-width="10"/>
      <rect x="8" y="8" width="154" height="234" rx="8" fill="#d61a23" stroke="#f6c28b" stroke-width="4"/>
      <path d="M 85,155 C 60,155 55,130 65,110 C 75,90 85,75 85,75 C 85,75 95,90 105,110 C 115,130 110,155 85,155 Z" fill="#ffea79" stroke="#b01018" stroke-width="3"/>
    </g>

    <g transform="translate(720, 160) rotate(16)">
      <rect x="0" y="0" width="170" height="250" rx="14" fill="#110508" stroke="#000000" stroke-width="10"/>
      <rect x="8" y="8" width="154" height="234" rx="8" fill="#240f16" stroke="#f6c28b" stroke-width="4"/>
      <text x="85" y="145" font-family="'Impact', 'Arial Black', sans-serif" font-size="80" font-weight="900" fill="#fdf4e3" stroke="#000000" stroke-width="4" text-anchor="middle">?</text>
    </g>

    <!-- TOP FLAME BURST -->
    <g transform="translate(500, 140)">
      <path d="M 0,-130 C 25,-80 75,-70 95,-30 C 115,10 105,60 65,80 C 15,100 -25,100 -75,75 C -115,55 -125,0 -95,-40 C -75,-65 -35,-85 0,-130 Z" fill="url(#fire-grad-outer)" stroke="#000000" stroke-width="12" stroke-linejoin="round"/>
      <path d="M 0,-85 C 18,-50 45,-45 55,-20 C 65,5 60,35 38,48 C 8,60 -15,60 -45,45 C -70,30 -75,0 -55,-25 C -45,-40 -20,-55 0,-85 Z" fill="url(#fire-grad-inner)"/>
    </g>

    <!-- MAIN LOGO CONTAINER -->
    <path d="M 230,220 Q 500,160 770,220 Q 940,320 940,480 Q 920,620 500,640 Q 80,620 60,480 Q 60,320 230,220 Z" fill="#0b0b0b"/>
    <path d="M 235,225 Q 500,168 765,225 Q 930,323 930,477 Q 910,613 500,633 Q 90,613 70,477 Q 70,323 235,225 Z" fill="#000000" stroke="#f6a93b" stroke-width="7"/>

    <!-- TEXT "MESA" -->
    <g transform="translate(500, 360)">
      <text x="0" y="8" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" stroke-linejoin="round" text-anchor="middle" letter-spacing="4">MESA</text>
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="url(#mesa-grad)" stroke="#000000" stroke-width="14" stroke-linejoin="round" text-anchor="middle" letter-spacing="4">MESA</text>
    </g>

    <!-- TEXT "QUENTE" -->
    <g transform="translate(500, 525)">
      <text x="0" y="10" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" stroke-linejoin="round" text-anchor="middle" letter-spacing="2">QUENTE</text>
      <text x="0" y="4" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="#660004" stroke="#000000" stroke-width="16" stroke-linejoin="round" text-anchor="middle" letter-spacing="2">QUENTE</text>
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="url(#quente-top)" stroke="#000000" stroke-width="12" stroke-linejoin="round" text-anchor="middle" letter-spacing="2">QUENTE</text>
    </g>

    <!-- SUBTITLE BANNER: "O JOGO DAS RESPOSTAS" -->
    <g transform="translate(500, 610)">
      <path d="M -290,-30 Q 0,-40 290,-30 Q 305,8 270,18 Q 0,28 -270,18 Q -305,8 -290,-30 Z" fill="#000000" stroke="url(#gold-banner-border)" stroke-width="6"/>
      <text x="0" y="0" font-family="'Arial Black', 'Impact', sans-serif" font-size="34" font-weight="900" fill="#ffebc2" stroke="#000000" stroke-width="3" text-anchor="middle" letter-spacing="5">O JOGO DAS RESPOSTAS</text>
    </g>
  </g>
</svg>`;

// ============================================================
// 3. BOTÃO CRIAR PARTIDA (criar-partida.png)
// ============================================================
export const btnCriarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 140" width="700" height="140">
  <defs>
    <filter id="btn-comic-shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="6" dy="8" stdDeviation="0" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
    <linearGradient id="btn-red-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff3b30"/>
      <stop offset="15%" stop-color="#e0121a"/>
      <stop offset="70%" stop-color="#b00910"/>
      <stop offset="100%" stop-color="#7a0308"/>
    </linearGradient>
    <linearGradient id="avatar-cream" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#eed8be"/>
    </linearGradient>
  </defs>

  <g filter="url(#btn-comic-shadow)">
    <rect x="10" y="10" width="675" height="115" rx="36" fill="#0b0b0b"/>
    <rect x="15" y="14" width="665" height="106" rx="32" fill="url(#btn-red-grad)" stroke="#000000" stroke-width="7"/>
    <path d="M 50,22 H 645" stroke="#ff7c74" stroke-width="5" stroke-linecap="round" opacity="0.65"/>
    <path d="M 50,112 H 645" stroke="#480004" stroke-width="5" stroke-linecap="round" opacity="0.8"/>

    <!-- ICON: USER + PLUS -->
    <g transform="translate(85, 68)">
      <circle cx="-10" cy="-18" r="20" fill="url(#avatar-cream)" stroke="#000000" stroke-width="6"/>
      <path d="M -38,20 C -38,-4 -24,-10 -10,-10 C 4,-10 18,-4 18,20 Z" fill="url(#avatar-cream)" stroke="#000000" stroke-width="6"/>
      <circle cx="16" cy="6" r="16" fill="url(#avatar-cream)" stroke="#000000" stroke-width="5"/>
      <path d="M 16,-1 V 13 M 9,6 H 23" stroke="#000000" stroke-width="5" stroke-linecap="round"/>
    </g>

    <!-- TEXT -->
    <g transform="translate(425, 80)">
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="58" font-weight="900" fill="#fdf4e3" stroke="#000000" stroke-width="12" stroke-linejoin="round" text-anchor="middle" letter-spacing="3">CRIAR PARTIDA</text>
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="58" font-weight="900" fill="#fdf4e3" text-anchor="middle" letter-spacing="3">CRIAR PARTIDA</text>
    </g>
  </g>
</svg>`;

// ============================================================
// 4. BOTÃO ENTRAR NA PARTIDA (entrar-na-partida.png)
// ============================================================
export const btnEntrarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 140" width="700" height="140">
  <defs>
    <filter id="btn-comic-shadow-purple" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="6" dy="8" stdDeviation="0" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
    <linearGradient id="btn-purple-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#9a177e"/>
      <stop offset="15%" stop-color="#730e5f"/>
      <stop offset="70%" stop-color="#4d0540"/>
      <stop offset="100%" stop-color="#2a0023"/>
    </linearGradient>
    <linearGradient id="avatar-cream-p" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#eed8be"/>
    </linearGradient>
  </defs>

  <g filter="url(#btn-comic-shadow-purple)">
    <rect x="10" y="10" width="675" height="115" rx="36" fill="#0b0b0b"/>
    <rect x="15" y="14" width="665" height="106" rx="32" fill="url(#btn-purple-grad)" stroke="#000000" stroke-width="7"/>
    <path d="M 50,22 H 645" stroke="#d94ebc" stroke-width="5" stroke-linecap="round" opacity="0.65"/>
    <path d="M 50,112 H 645" stroke="#180014" stroke-width="5" stroke-linecap="round" opacity="0.8"/>

    <!-- ICON: 3 PLAYERS -->
    <g transform="translate(90, 68)">
      <circle cx="-26" cy="-12" r="14" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="4.5"/>
      <path d="M -44,18 C -44,2 -35,-2 -26,-2 C -17,-2 -8,2 -8,18 Z" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="4.5"/>
      <circle cx="26" cy="-12" r="14" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="4.5"/>
      <path d="M 8,18 C 8,2 17,-2 26,-2 C 35,-2 44,2 44,18 Z" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="4.5"/>
      <circle cx="0" cy="-18" r="18" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="5.5"/>
      <path d="M -24,20 C -24,0 -12,-6 0,-6 C 12,-6 24,0 24,20 Z" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="5.5"/>
    </g>

    <!-- TEXT -->
    <g transform="translate(425, 80)">
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="56" font-weight="900" fill="#fdf4e3" stroke="#000000" stroke-width="12" stroke-linejoin="round" text-anchor="middle" letter-spacing="3">ENTRAR NA PARTIDA</text>
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="56" font-weight="900" fill="#fdf4e3" text-anchor="middle" letter-spacing="3">ENTRAR NA PARTIDA</text>
    </g>
  </g>
</svg>`;

// ============================================================
// 5. PAREDE DO CENÁRIO (parede.png)
// ============================================================
export const paredeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 600" width="1920" height="600">
  <defs>
    <radialGradient id="parede-glow" cx="50%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#d61a24"/>
      <stop offset="35%" stop-color="#8c0a12"/>
      <stop offset="70%" stop-color="#460307"/>
      <stop offset="100%" stop-color="#180103"/>
    </radialGradient>
    <linearGradient id="parede-luz" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff7b39" stop-opacity="0.85"/>
      <stop offset="40%" stop-color="#e62020" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#8c0a12" stop-opacity="0"/>
    </linearGradient>
    <pattern id="parede-tijolos" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
      <path d="M 0,0 H 80 M 0,20 H 80 M 40,0 V 20 M 0,20 V 40 M 80,20 V 40" stroke="#000000" stroke-width="1.8" fill="none" opacity="0.3"/>
    </pattern>
  </defs>

  <!-- Base Wall -->
  <rect width="1920" height="600" fill="url(#parede-glow)"/>
  <rect width="1920" height="600" fill="url(#parede-tijolos)"/>

  <!-- Spotlight Cone on Wall -->
  <polygon points="960,0 350,600 1570,600" fill="url(#parede-luz)" opacity="0.6"/>

  <!-- Ceiling Chain & Industrial Lamp -->
  <line x1="960" y1="0" x2="960" y2="40" stroke="#000000" stroke-width="10"/>
  <path d="M 945,40 L 975,40 L 970,50 L 950,50 Z" fill="#111" stroke="#000000" stroke-width="3"/>
  <path d="M 950,50 C 940,60 890,75 870,88 L 1050,88 C 1030,75 980,60 970,50 Z" fill="#1b1c20" stroke="#000000" stroke-width="5"/>
  <ellipse cx="960" cy="88" rx="90" ry="12" fill="#ff7733" opacity="0.9"/>
  <ellipse cx="960" cy="90" rx="40" ry="12" fill="#fff4cc"/>
</svg>`;

// ============================================================
// 6. MESA DE JOGO 2.5D (mesa.png)
// ============================================================
export const mesaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" width="1400" height="800">
  <defs>
    <filter id="table-drop-shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="25" stdDeviation="15" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
    <radialGradient id="felt-grad" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#9a0e18"/>
      <stop offset="50%" stop-color="#60050c"/>
      <stop offset="85%" stop-color="#3b0207"/>
      <stop offset="100%" stop-color="#1f0104"/>
    </radialGradient>
    <linearGradient id="wood-rim-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3d140e"/>
      <stop offset="25%" stop-color="#240a06"/>
      <stop offset="70%" stop-color="#140402"/>
      <stop offset="100%" stop-color="#080101"/>
    </linearGradient>
    <linearGradient id="gold-trim" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c68a14"/>
      <stop offset="50%" stop-color="#ffea79"/>
      <stop offset="100%" stop-color="#c68a14"/>
    </linearGradient>
  </defs>

  <g filter="url(#table-drop-shadow)">
    <!-- OUTER SOLID BLACK CASING -->
    <ellipse cx="700" cy="400" rx="660" ry="360" fill="#0b0b0b"/>

    <!-- WOODEN LEATHER RIM WITH 3D DEPTH -->
    <ellipse cx="700" cy="392" rx="646" ry="346" fill="url(#wood-rim-grad)" stroke="#000000" stroke-width="8"/>
    
    <!-- GOLD INNER RIM ACCENT -->
    <ellipse cx="700" cy="390" rx="586" ry="296" fill="none" stroke="url(#gold-trim)" stroke-width="5"/>
    <ellipse cx="700" cy="390" rx="576" ry="288" fill="#000000" stroke="#000000" stroke-width="5"/>

    <!-- FELT PLAYING SURFACE -->
    <ellipse cx="700" cy="388" rx="568" ry="280" fill="url(#felt-grad)"/>

    <!-- FELT GEOMETRIC EMBOSSING RING -->
    <ellipse cx="700" cy="388" rx="420" ry="195" fill="none" stroke="#e62020" stroke-width="2.5" stroke-dasharray="14 10" opacity="0.35"/>
    <ellipse cx="700" cy="388" rx="430" ry="202" fill="none" stroke="#ffb703" stroke-width="1.5" opacity="0.2"/>

    <!-- RIM GOLD RIVETS / STUDS AROUND TABLE -->
    <g fill="#ffd166" stroke="#000000" stroke-width="2.5">
      <circle cx="700" cy="56" r="6"/>
      <circle cx="950" cy="90" r="6"/>
      <circle cx="1180" cy="180" r="6"/>
      <circle cx="1310" cy="330" r="6"/>
      <circle cx="1310" cy="450" r="6"/>
      <circle cx="1180" cy="600" r="6"/>
      <circle cx="950" cy="690" r="6"/>
      <circle cx="700" cy="726" r="6"/>
      <circle cx="450" cy="690" r="6"/>
      <circle cx="220" cy="600" r="6"/>
      <circle cx="90" cy="450" r="6"/>
      <circle cx="90" cy="330" r="6"/>
      <circle cx="220" cy="180" r="6"/>
      <circle cx="450" cy="90" r="6"/>
    </g>
  </g>
</svg>`;

// ============================================================
// 7. REDEMOINHO DO CENTRO DA MESA (redemoinho.png)
// ============================================================
export const redemoinhoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <radialGradient id="vortex-core" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="20%" stop-color="#ffbe0b" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#ff006e" stop-opacity="0.6"/>
      <stop offset="80%" stop-color="#8338ec" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#3a86ff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vortex-arm-1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffb703"/>
      <stop offset="50%" stop-color="#fb5607"/>
      <stop offset="100%" stop-color="#ff006e" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <g transform="translate(250, 250)">
    <!-- Outer Glow -->
    <circle cx="0" cy="0" r="230" fill="url(#vortex-core)" opacity="0.4"/>

    <!-- Swirling Spiral Blades -->
    <g stroke="url(#vortex-arm-1)" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.85">
      <path d="M 0,0 C 40,30 90,80 120,160 C 140,210 110,240 80,240"/>
      <path d="M 0,0 C -30,40 -80,90 -160,120 C -210,140 -240,110 -240,80"/>
      <path d="M 0,0 C -40,-30 -90,-80 -120,-160 C -140,-210 -110,-240 -80,-240"/>
      <path d="M 0,0 C 30,-40 80,-90 160,-120 C 210,-140 240,-110 240,-80"/>
    </g>

    <g stroke="#ffffff" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.9">
      <path d="M 0,0 C 25,20 60,50 80,105"/>
      <path d="M 0,0 C -20,25 -50,60 -105,80"/>
      <path d="M 0,0 C -25,-20 -60,-50 -80,-105"/>
      <path d="M 0,0 C 20,-25 50,-60 105,-80"/>
    </g>

    <!-- Swirling Sparks -->
    <circle cx="60" cy="40" r="6" fill="#ffea79"/>
    <circle cx="-50" cy="70" r="7" fill="#ff006e"/>
    <circle cx="-70" cy="-40" r="5" fill="#ffbe0b"/>
    <circle cx="40" cy="-60" r="8" fill="#ffd166"/>
    <circle cx="110" cy="110" r="4" fill="#ffffff"/>
    <circle cx="-120" cy="90" r="5" fill="#ffffff"/>
    <circle cx="-90" cy="-110" r="4" fill="#ffffff"/>
    <circle cx="100" cy="-100" r="5" fill="#ffffff"/>

    <!-- Center Bright Dot -->
    <circle cx="0" cy="0" r="28" fill="#ffffff" stroke="#ffb703" stroke-width="5"/>
  </g>
</svg>`;

// ============================================================
// 8. BARALHO DE CARTAS 3D (baralho.png)
// ============================================================
export const baralhoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 460" width="360" height="460">
  <defs>
    <filter id="deck-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="8" dy="14" stdDeviation="0" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
    <linearGradient id="deck-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe66d"/>
      <stop offset="50%" stop-color="#ffb703"/>
      <stop offset="100%" stop-color="#f77f00"/>
    </linearGradient>
    <linearGradient id="card-back-red" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e61919"/>
      <stop offset="40%" stop-color="#b80c14"/>
      <stop offset="100%" stop-color="#6b0308"/>
    </linearGradient>
  </defs>

  <g filter="url(#deck-shadow)">
    <!-- BOTTOM STACK CARDS -->
    <!-- Card Layer 4 -->
    <rect x="25" y="65" width="280" height="360" rx="18" fill="#0b0b0b"/>
    <rect x="28" y="62" width="274" height="354" rx="16" fill="#f0ebe1" stroke="#000000" stroke-width="5"/>

    <!-- Card Layer 3 -->
    <rect x="35" y="50" width="280" height="360" rx="18" fill="#0b0b0b"/>
    <rect x="38" y="47" width="274" height="354" rx="16" fill="#f8f4ec" stroke="#000000" stroke-width="5"/>

    <!-- Card Layer 2 -->
    <rect x="45" y="35" width="280" height="360" rx="18" fill="#0b0b0b"/>
    <rect x="48" y="32" width="274" height="354" rx="16" fill="#ffffff" stroke="#000000" stroke-width="5"/>

    <!-- TOP ACTIVE CARD (Card Layer 1) -->
    <rect x="55" y="20" width="280" height="360" rx="18" fill="#0b0b0b"/>
    <rect x="58" y="16" width="274" height="354" rx="16" fill="url(#card-back-red)" stroke="#000000" stroke-width="6"/>

    <!-- Card Border Inner Gold Frame -->
    <rect x="74" y="32" width="242" height="322" rx="12" fill="none" stroke="url(#deck-gold)" stroke-width="5"/>
    <rect x="80" y="38" width="230" height="310" rx="8" fill="#1a0204" stroke="#000000" stroke-width="4"/>

    <!-- Geometric Pattern Inside -->
    <g opacity="0.35" stroke="#ffb703" stroke-width="1.8" fill="none">
      <path d="M 80,38 L 310,348 M 310,38 L 80,348"/>
      <ellipse cx="195" cy="193" rx="80" ry="110"/>
    </g>

    <!-- Central Flame Emblem -->
    <g transform="translate(195, 175)">
      <!-- Outer Flame -->
      <path d="M 0,-65 C 20,-35 45,-25 45,10 C 45,35 25,55 0,55 C -25,55 -45,35 -45,10 C -45,-25 -20,-35 0,-65 Z" fill="#ffb703" stroke="#000000" stroke-width="5"/>
      <!-- Inner Flame -->
      <path d="M 0,-40 C 12,-20 28,-15 28,8 C 28,24 16,38 0,38 C -16,38 -28,24 -28,8 C -28,-15 -12,-20 0,-40 Z" fill="#ffffff" stroke="#e61919" stroke-width="3"/>
    </g>

    <!-- Deck Text Label -->
    <g transform="translate(195, 275)">
      <rect x="-85" y="-18" width="170" height="36" rx="8" fill="#0b0b0b" stroke="url(#deck-gold)" stroke-width="3"/>
      <text x="0" y="7" font-family="'Impact', 'Arial Black', sans-serif" font-size="22" font-weight="900" fill="#fdf4e3" stroke="#000000" stroke-width="2" text-anchor="middle" letter-spacing="2">MESA QUENTE</text>
    </g>
  </g>
</svg>`;

// ============================================================
// 9. MOLDURA DE JOGADORES (moldura-playeres.png)
// ============================================================
export const molduraPlayerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
  <defs>
    <filter id="player-frame-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="6" stdDeviation="0" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
    <linearGradient id="frame-gold-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffda00"/>
      <stop offset="50%" stop-color="#ff9f1c"/>
      <stop offset="100%" stop-color="#e65100"/>
    </linearGradient>
    <linearGradient id="nameplate-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#240508"/>
      <stop offset="100%" stop-color="#0d0002"/>
    </linearGradient>
  </defs>

  <g filter="url(#player-frame-shadow)">
    <!-- AVATAR RING MOLDURA -->
    <!-- Solid Black Outer Rim -->
    <circle cx="100" cy="85" r="76" fill="#0b0b0b"/>
    <circle cx="100" cy="85" r="70" fill="url(#frame-gold-border)" stroke="#000000" stroke-width="6"/>
    <circle cx="100" cy="85" r="60" fill="#1a0204" stroke="#000000" stroke-width="4"/>

    <!-- Clear Inner Window for Avatar Photo/Emoji to Sit Underneath -->
    <circle cx="100" cy="85" r="54" fill="none"/>

    <!-- Frame Rivets -->
    <circle cx="45" cy="45" r="4" fill="#ffffff" stroke="#000000" stroke-width="2"/>
    <circle cx="155" cy="45" r="4" fill="#ffffff" stroke="#000000" stroke-width="2"/>
    <circle cx="34" cy="95" r="4" fill="#ffffff" stroke="#000000" stroke-width="2"/>
    <circle cx="166" cy="95" r="4" fill="#ffffff" stroke="#000000" stroke-width="2"/>

    <!-- THICK BOTTOM NAMEPLATE BASE -->
    <g transform="translate(100, 190)">
      <rect x="-86" y="-22" width="172" height="44" rx="12" fill="#0b0b0b"/>
      <rect x="-82" y="-18" width="164" height="36" rx="9" fill="url(#nameplate-grad)" stroke="url(#frame-gold-border)" stroke-width="3"/>
      <!-- Decorative Screws on Nameplate -->
      <circle cx="-70" cy="0" r="3.5" fill="#ffd166" stroke="#000000" stroke-width="1.5"/>
      <circle cx="70" cy="0" r="3.5" fill="#ffd166" stroke="#000000" stroke-width="1.5"/>
    </g>
  </g>
</svg>`;

// ============================================================
// 10. BOTÃO ENGRENAGEM (engrenagem.png)
// ============================================================
export const engrenagemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <defs>
    <filter id="icon-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="6" stdDeviation="0" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
    <linearGradient id="gear-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff066"/>
      <stop offset="50%" stop-color="#ffb703"/>
      <stop offset="100%" stop-color="#f77f00"/>
    </linearGradient>
    <linearGradient id="gear-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3d090e"/>
      <stop offset="100%" stop-color="#140103"/>
    </linearGradient>
  </defs>

  <g filter="url(#icon-shadow)">
    <!-- Base Outer Circle -->
    <circle cx="80" cy="80" r="70" fill="#0b0b0b"/>
    <circle cx="80" cy="80" r="64" fill="url(#gear-bg)" stroke="#ffb703" stroke-width="5"/>

    <!-- Gear Teeth & Wheel -->
    <g transform="translate(80, 80)">
      <g fill="url(#gear-gold)" stroke="#000000" stroke-width="4.5" stroke-linejoin="round">
        <!-- 8 Teeth -->
        <rect x="-10" y="-48" width="20" height="96" rx="4"/>
        <rect x="-10" y="-48" width="20" height="96" rx="4" transform="rotate(45)"/>
        <rect x="-10" y="-48" width="20" height="96" rx="4" transform="rotate(90)"/>
        <rect x="-10" y="-48" width="20" height="96" rx="4" transform="rotate(135)"/>
        <!-- Outer Gear Body Ring -->
        <circle cx="0" cy="0" r="38"/>
      </g>
      <!-- Center Hole -->
      <circle cx="0" cy="0" r="16" fill="#140103" stroke="#000000" stroke-width="4"/>
    </g>
  </g>
</svg>`;

// ============================================================
// 11. BOTÃO REAÇÕES (reacoes.png)
// ============================================================
export const reacoesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <defs>
    <filter id="react-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="6" stdDeviation="0" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
    <linearGradient id="react-bubble" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff3b30"/>
      <stop offset="50%" stop-color="#ff007f"/>
      <stop offset="100%" stop-color="#7928ca"/>
    </linearGradient>
  </defs>

  <g filter="url(#react-shadow)">
    <!-- Base Outer Circle -->
    <circle cx="80" cy="80" r="70" fill="#0b0b0b"/>
    <circle cx="80" cy="80" r="64" fill="#1c0205" stroke="#ff007f" stroke-width="5"/>

    <!-- Speech / Reaction Bubble -->
    <g transform="translate(80, 75)">
      <path d="M -38,-28 Q 0,-36 38,-28 Q 48,0 36,26 Q 0,38 -20,30 L -36,40 L -30,22 Q -48,0 -38,-28 Z" fill="url(#react-bubble)" stroke="#000000" stroke-width="5" stroke-linejoin="round"/>
      
      <!-- Sparkle & Heart inside -->
      <!-- Heart -->
      <path d="M -8,-6 C -8,-14 -16,-14 -18,-6 C -20,2 -8,12 -8,12 C -8,12 4,2 2,-6 C 0,-14 -8,-14 -8,-6 Z" fill="#ffffff" stroke="#000000" stroke-width="2.5"/>
      
      <!-- Sparkle Star -->
      <path d="M 14,-12 L 17,-4 L 25,-1 L 17,2 L 14,10 L 11,2 L 3,-1 L 11,-4 Z" fill="#ffd166" stroke="#000000" stroke-width="2.5"/>
    </g>
  </g>
</svg>`;

// ============================================================
// 12. BOTÃO SAIR DA SALA (sair-da-sala.png)
// ============================================================
export const sairSalaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <defs>
    <filter id="exit-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="6" stdDeviation="0" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
    <linearGradient id="exit-red" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff3b30"/>
      <stop offset="100%" stop-color="#b80c14"/>
    </linearGradient>
  </defs>

  <g filter="url(#exit-shadow)">
    <!-- Base Outer Circle -->
    <circle cx="80" cy="80" r="70" fill="#0b0b0b"/>
    <circle cx="80" cy="80" r="64" fill="#180103" stroke="#e61919" stroke-width="5"/>

    <!-- Exit Door and Arrow -->
    <g transform="translate(80, 80)">
      <!-- Door Frame -->
      <rect x="-30" y="-35" width="34" height="70" rx="4" fill="#2c0508" stroke="#000000" stroke-width="5"/>
      <circle cx="-8" cy="4" r="3" fill="#ffd166" stroke="#000000" stroke-width="1.5"/>

      <!-- Arrow Running Right -->
      <path d="M -5,0 H 32 M 16,-16 L 34,0 L 16,16" fill="none" stroke="url(#exit-red)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M -5,0 H 32 M 16,-16 L 34,0 L 16,16" fill="none" stroke="#000000" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" style="z-index:-1;"/>
      <path d="M -5,0 H 32 M 16,-16 L 34,0 L 16,16" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
</svg>`;

// ============================================================
// 12. CARTAS DE CATEGORIA (CARTOON / COMIC)
// ============================================================
export function criarCardCategoriaSvg(titulo, icone, corGrad1, corGrad2, corBorda) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 220" width="160" height="220">
  <defs>
    <linearGradient id="card-grad-${corGrad1.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${corGrad1}"/>
      <stop offset="100%" stop-color="${corGrad2}"/>
    </linearGradient>
    <filter id="card-drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="6" stdDeviation="4" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <g filter="url(#card-drop-shadow)">
    <!-- Moldura Externa Preta Grossa -->
    <rect x="8" y="8" width="144" height="204" rx="14" fill="#0b0b0b" stroke="#000000" stroke-width="4"/>
    
    <!-- Fundo Interno da Carta -->
    <rect x="12" y="12" width="136" height="196" rx="10" fill="url(#card-grad-${corGrad1.replace('#','')})" stroke="${corBorda}" stroke-width="3"/>
    
    <!-- Borda Pontilhada Interna -->
    <rect x="18" y="18" width="124" height="184" rx="7" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1.5" stroke-dasharray="4,4"/>

    <!-- Ícone Central Flutuante -->
    <circle cx="80" cy="95" r="38" fill="#000000" opacity="0.35"/>
    <circle cx="80" cy="92" r="35" fill="#140306" stroke="${corBorda}" stroke-width="2.5"/>
    <text x="80" y="103" font-size="36" text-anchor="middle" font-family="'Outfit', sans-serif">${icone}</text>

    <!-- Faixa Inferior com Nome da Categoria -->
    <rect x="22" y="160" width="116" height="28" rx="6" fill="#0b0b0b" stroke="${corBorda}" stroke-width="2"/>
    <text x="80" y="179" font-size="11" font-weight="900" text-anchor="middle" fill="#ffffff" font-family="'Outfit', sans-serif" letter-spacing="0.5">${titulo}</text>
  </g>
</svg>`;
}

export const cardVotacaoSvg = criarCardCategoriaSvg("VOTAÇÃO", "🎯", "#e63946", "#670710", "#ffb703");
export const cardDilemasSvg = criarCardCategoriaSvg("DILEMAS", "🤐", "#9d4edd", "#3a0ca3", "#f72585");
export const cardBlefeSvg = criarCardCategoriaSvg("BLEFE", "🎭", "#4361ee", "#101f6e", "#4cc9f0");
export const cardDebateSvg = criarCardCategoriaSvg("DEBATE", "⚔️", "#d90429", "#590d22", "#ffb703");
export const cardSintoniaSvg = criarCardCategoriaSvg("SINTONIA", "🌡️", "#ff007f", "#7928ca", "#ffd166");
export const cardDesafiosSvg = criarCardCategoriaSvg("DESAFIO", "⚡", "#ff5400", "#7a1a00", "#ffda00");
export const cardCasaisSvg = cardSintoniaSvg;
export const cardSaficoSvg = cardDilemasSvg;
export const cardPicanteSvg = cardSintoniaSvg;
export const cardEspecialSvg = cardBlefeSvg;

// Write all assets to root filesystem so both direct file serving and routes work
try {
  fs.writeFileSync("background-lobby.svg", bgSvg);
  fs.writeFileSync("bg.svg", bgSvg);
  fs.writeFileSync("logo-mesa-quente.svg", logoSvg);
  fs.writeFileSync("criar-partida.svg", btnCriarSvg);
  fs.writeFileSync("entrar-partida.svg", btnEntrarSvg);
  fs.writeFileSync("entrar-na-partida.svg", btnEntrarSvg);
  fs.writeFileSync("parede.svg", paredeSvg);
  fs.writeFileSync("mesa.svg", mesaSvg);
  fs.writeFileSync("redemoinho.svg", redemoinhoSvg);
  fs.writeFileSync("baralho.svg", baralhoSvg);
  fs.writeFileSync("moldura-playeres.svg", molduraPlayerSvg);
  fs.writeFileSync("engrenagem.svg", engrenagemSvg);
  fs.writeFileSync("reacoes.svg", reacoesSvg);
  fs.writeFileSync("sair-da-sala.svg", sairSalaSvg);

  fs.writeFileSync("cartas-votação.png", cardVotacaoSvg);
  fs.writeFileSync("cartas-votacao.png", cardVotacaoSvg);
  fs.writeFileSync("cartas-votação.svg", cardVotacaoSvg);
  fs.writeFileSync("cartas-votacao.svg", cardVotacaoSvg);

  fs.writeFileSync("cartas-confissões.png", cardDilemasSvg);
  fs.writeFileSync("cartas-confissoes.png", cardDilemasSvg);
  fs.writeFileSync("cartas-confissões.svg", cardDilemasSvg);
  fs.writeFileSync("cartas-confissoes.svg", cardDilemasSvg);

  fs.writeFileSync("cartas-surpresa.png", cardBlefeSvg);
  fs.writeFileSync("cartas-surpresa.svg", cardBlefeSvg);

  fs.writeFileSync("cartas-contra-o-tempo.png", cardDebateSvg);
  fs.writeFileSync("cartas-contra-o-tempo.svg", cardDebateSvg);

  fs.writeFileSync("cartas-picantes.png", cardSintoniaSvg);
  fs.writeFileSync("cartas-picantes.svg", cardSintoniaSvg);
  fs.writeFileSync("cartas-picante.png", cardSintoniaSvg);
  fs.writeFileSync("cartas-picante.svg", cardSintoniaSvg);

  fs.writeFileSync("cartas-desafios.png", cardDesafiosSvg);
  fs.writeFileSync("cartas-desafios.svg", cardDesafiosSvg);
  fs.writeFileSync("cartas-desafio.png", cardDesafiosSvg);
  fs.writeFileSync("cartas-desafio.svg", cardDesafiosSvg);

  fs.writeFileSync("cartas-casais.svg", cardCasaisSvg);
  fs.writeFileSync("cartas-casais.png", cardCasaisSvg);
  fs.writeFileSync("cartas-safico.svg", cardSaficoSvg);
  fs.writeFileSync("cartas-safico.png", cardSaficoSvg);
  fs.writeFileSync("cartas-especial.svg", cardEspecialSvg);
  fs.writeFileSync("cartas-especial.png", cardEspecialSvg);

  console.log("All V3 vector assets and category cards generated successfully!");
} catch (err) {
  console.error("Error writing asset files:", err);
}

import os
import subprocess

# 1. Background SVG
bg_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <!-- Halftone Pattern Left -->
    <pattern id="halftone-left" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="5" fill="#150103" opacity="0.45"/>
    </pattern>
    <!-- Halftone Pattern Right -->
    <pattern id="halftone-right" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="14" cy="14" r="6" fill="#150103" opacity="0.5"/>
    </pattern>

    <!-- Wall Gradients -->
    <radialGradient id="wall-glow" cx="50%" cy="15%" r="65%" fx="50%" fy="0%">
      <stop offset="0%" stop-color="#dd181f" stop-opacity="1"/>
      <stop offset="35%" stop-color="#a30a11" stop-opacity="1"/>
      <stop offset="70%" stop-color="#550308" stop-opacity="1"/>
      <stop offset="100%" stop-color="#140103" stop-opacity="1"/>
    </radialGradient>

    <linearGradient id="lamp-light-cone" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff7b39" stop-opacity="0.85"/>
      <stop offset="25%" stop-color="#e62020" stop-opacity="0.55"/>
      <stop offset="70%" stop-color="#aa0c14" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#aa0c14" stop-opacity="0"/>
    </linearGradient>

    <!-- Floor Gradient -->
    <linearGradient id="floor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#58060a"/>
      <stop offset="15%" stop-color="#340306"/>
      <stop offset="100%" stop-color="#0f0102"/>
    </linearGradient>

    <radialGradient id="floor-spotlight" cx="50%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#ff4a22" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#a30c14" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <filter id="blur-cone" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="25"/>
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
  <rect width="1920" height="920" fill="url(#wall-glow)"/>

  <!-- Brick Texture Outlines Subtle -->
  <g stroke="#000000" stroke-width="1.5" opacity="0.22" fill="none">
    <!-- Left Bricks -->
    <path d="M 0,80 H 300 M 0,160 H 340 M 0,240 H 280 M 0,320 H 320 M 0,400 H 290 M 0,480 H 350 M 0,560 H 300 M 0,640 H 340 M 0,720 H 280 M 0,800 H 320"/>
    <path d="M 120,80 V 160 M 240,80 V 160 M 60,160 V 240 M 180,160 V 240 M 300,160 V 240 M 120,240 V 320 M 240,240 V 320 M 60,320 V 400 M 180,320 V 400 M 300,320 V 400 M 120,400 V 480 M 240,400 V 480 M 60,480 V 560 M 180,480 V 560 M 300,480 V 560 M 120,560 V 640 M 240,560 V 640 M 60,640 V 720 M 180,640 V 720 M 300,640 V 720 M 120,720 V 800 M 240,720 V 800"/>
    <!-- Right Bricks -->
    <path d="M 1600,80 H 1920 M 1560,160 H 1920 M 1620,240 H 1920 M 1580,320 H 1920 M 1630,400 H 1920 M 1570,480 H 1920 M 1620,560 H 1920 M 1560,640 H 1920 M 1640,720 H 1920 M 1580,800 H 1920"/>
    <path d="M 1740,80 V 160 M 1860,80 V 160 M 1680,160 V 240 M 180,160 V 240 M 1800,160 V 240 M 1740,240 V 320 M 1860,240 V 320 M 1680,320 V 400 M 1800,320 V 400 M 1740,400 V 480 M 1860,400 V 480 M 1680,480 V 560 M 1800,480 V 560 M 1740,560 V 640 M 1860,560 V 640 M 1680,640 V 720 M 1800,640 V 720 M 1740,720 V 800 M 1860,720 V 800"/>
  </g>

  <!-- Halftone Overlay Sides -->
  <rect x="0" y="0" width="400" height="920" fill="url(#halftone-left)"/>
  <rect x="1520" y="0" width="400" height="920" fill="url(#halftone-right)"/>

  <!-- Comic Grunge Splatters and Cracks -->
  <g stroke="#1a0204" stroke-width="2.5" fill="none" opacity="0.45">
    <!-- Left Cracks -->
    <path d="M 120,450 Q 180,480 230,440 T 320,510 M 230,440 L 260,390 M 180,480 L 160,540"/>
    <path d="M 80,220 Q 140,240 180,210 T 260,270"/>
    <!-- Right Cracks -->
    <path d="M 1780,420 Q 1720,460 1660,430 T 1560,490 M 1660,430 L 1630,370"/>
    <path d="M 1820,680 Q 1750,710 1700,670 T 1620,730"/>
    <!-- Center Splatters -->
    <circle cx="860" cy="380" r="14" fill="#300306" stroke="none" opacity="0.3"/>
    <circle cx="878" cy="395" r="6" fill="#300306" stroke="none" opacity="0.3"/>
    <circle cx="848" cy="365" r="4" fill="#300306" stroke="none" opacity="0.3"/>
    <circle cx="1090" cy="420" r="16" fill="#300306" stroke="none" opacity="0.3"/>
    <circle cx="1115" cy="440" r="7" fill="#300306" stroke="none" opacity="0.3"/>
  </g>

  <!-- Spotlight Cone from Lamp -->
  <polygon points="960,60 300,920 1620,920" fill="url(#lamp-light-cone)" filter="url(#blur-cone)"/>
  <polygon points="960,60 550,920 1370,920" fill="url(#lamp-light-cone)" opacity="0.6"/>

  <!-- Floor Base -->
  <rect x="0" y="900" width="1920" height="180" fill="url(#floor-grad)"/>

  <!-- Baseboard Line -->
  <rect x="0" y="896" width="1920" height="12" fill="#1a0204" stroke="#000000" stroke-width="2"/>
  <line x1="0" y1="902" x2="1920" y2="902" stroke="#44080c" stroke-width="2"/>

  <!-- Floor Spotlight Reflection -->
  <ellipse cx="960" cy="990" rx="680" ry="90" fill="url(#floor-spotlight)"/>

  <!-- Floor Cracks -->
  <g stroke="#0a0102" stroke-width="2.5" fill="none" opacity="0.6">
    <path d="M 400,960 Q 520,990 640,970 T 800,1010"/>
    <path d="M 1120,980 Q 1280,950 1440,990 T 1600,970"/>
    <path d="M 850,1030 Q 960,1010 1080,1040"/>
  </g>

  <!-- Ceiling Industrial Lamp Fixture -->
  <!-- Wire/Rod -->
  <line x1="960" y1="0" x2="960" y2="36" stroke="#000000" stroke-width="12"/>
  <line x1="960" y1="0" x2="960" y2="36" stroke="#2b2b2b" stroke-width="6"/>

  <!-- Lamp Shade -->
  <g id="lamp-fixture">
    <!-- Top Cap -->
    <path d="M 944,36 L 976,36 L 970,46 L 950,46 Z" fill="#181818" stroke="#000000" stroke-width="3"/>
    <!-- Dome Shade -->
    <path d="M 950,46 C 940,55 890,70 870,82 L 1050,82 C 1030,70 980,55 970,46 Z" fill="#1b1c20" stroke="#000000" stroke-width="5"/>
    <path d="M 952,48 C 944,56 905,69 888,80 L 1032,80 C 1015,69 976,56 968,48 Z" fill="#2d3038"/>
    <!-- Rim -->
    <ellipse cx="960" cy="82" rx="90" ry="12" fill="#15161a" stroke="#000000" stroke-width="5"/>
    <ellipse cx="960" cy="82" rx="84" ry="8" fill="#ff7733" opacity="0.8" filter="url(#lamp-glow-filter)"/>
    <!-- Bulb -->
    <ellipse cx="960" cy="84" rx="30" ry="14" fill="#fff4cc" filter="url(#lamp-glow-filter)"/>
  </g>
</svg>
"""

# 2. Logo Mesa Quente SVG
logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
  <defs>
    <!-- Drop Shadow Filter for Comic Feel -->
    <filter id="comic-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="8" dy="12" stdDeviation="0" flood-color="#000000" flood-opacity="0.95"/>
    </filter>

    <filter id="fire-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10" result="glow"/>
      <feMerge>
        <feMergeNode in="glow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
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
    <!-- Card Left (Red with Flame) -->
    <g transform="translate(140, 200) rotate(-18)">
      <rect x="0" y="0" width="170" height="250" rx="14" fill="#9b0e15" stroke="#000000" stroke-width="10"/>
      <rect x="8" y="8" width="154" height="234" rx="8" fill="#d61a23" stroke="#f6c28b" stroke-width="4"/>
      <!-- Inner Flame -->
      <path d="M 85,155 C 60,155 55,130 65,110 C 75,90 85,75 85,75 C 85,75 95,90 105,110 C 115,130 110,155 85,155 Z" fill="#ffea79" stroke="#b01018" stroke-width="3"/>
    </g>

    <!-- Card Right (Dark with Question Mark) -->
    <g transform="translate(720, 160) rotate(16)">
      <rect x="0" y="0" width="170" height="250" rx="14" fill="#110508" stroke="#000000" stroke-width="10"/>
      <rect x="8" y="8" width="154" height="234" rx="8" fill="#240f16" stroke="#f6c28b" stroke-width="4"/>
      <text x="85" y="145" font-family="'Impact', 'Arial Black', sans-serif" font-size="80" font-weight="900" fill="#fdf4e3" stroke="#000000" stroke-width="4" text-anchor="middle">?</text>
    </g>

    <!-- TOP FLAME BURST -->
    <g transform="translate(500, 140)">
      <!-- Outer Flame Silhouette -->
      <path d="M 0,-130 C 25,-80 75,-70 95,-30 C 115,10 105,60 65,80 C 15,100 -25,100 -75,75 C -115,55 -125,0 -95,-40 C -75,-65 -35,-85 0,-130 Z" fill="url(#fire-grad-outer)" stroke="#000000" stroke-width="12" stroke-linejoin="round"/>
      <!-- Inner Flame Core -->
      <path d="M 0,-85 C 18,-50 45,-45 55,-20 C 65,5 60,35 38,48 C 8,60 -15,60 -45,45 C -70,30 -75,0 -55,-25 C -45,-40 -20,-55 0,-85 Z" fill="url(#fire-grad-inner)"/>
    </g>

    <!-- MAIN LOGO CONTAINER OUTLINE CLOUD -->
    <path d="M 230,220 Q 500,160 770,220 Q 940,320 940,480 Q 920,620 500,640 Q 80,620 60,480 Q 60,320 230,220 Z" fill="#0b0b0b"/>
    <path d="M 235,225 Q 500,168 765,225 Q 930,323 930,477 Q 910,613 500,633 Q 90,613 70,477 Q 70,323 235,225 Z" fill="#000000" stroke="#f6a93b" stroke-width="7"/>

    <!-- TEXT "MESA" -->
    <g transform="translate(500, 360)">
      <!-- 3D Shadow Layers -->
      <text x="0" y="8" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="#000000" stroke="#000000" stroke-width="24" stroke-linejoin="round" text-anchor="middle" letter-spacing="4">MESA</text>
      <!-- Face -->
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="url(#mesa-grad)" stroke="#000000" stroke-width="14" stroke-linejoin="round" text-anchor="middle" letter-spacing="4">MESA</text>
      <!-- Top Gloss/Highlight line -->
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="url(#mesa-grad)" text-anchor="middle" letter-spacing="4">MESA</text>
    </g>

    <!-- TEXT "QUENTE" -->
    <g transform="translate(500, 525)">
      <!-- 3D Heavy Shadow Behind -->
      <text x="0" y="10" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="#000000" stroke="#000000" stroke-width="26" stroke-linejoin="round" text-anchor="middle" letter-spacing="2">QUENTE</text>
      <!-- Deep Red 3D Extrusion -->
      <text x="0" y="4" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="#660004" stroke="#000000" stroke-width="16" stroke-linejoin="round" text-anchor="middle" letter-spacing="2">QUENTE</text>
      <!-- Main Vibrant Face -->
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="url(#quente-top)" stroke="#000000" stroke-width="12" stroke-linejoin="round" text-anchor="middle" letter-spacing="2">QUENTE</text>
    </g>

    <!-- SUBTITLE BANNER: "O JOGO DAS RESPOSTAS" -->
    <g transform="translate(500, 610)">
      <path d="M -290,-30 Q 0,-40 290,-30 Q 305,8 270,18 Q 0,28 -270,18 Q -305,8 -290,-30 Z" fill="#000000" stroke="url(#gold-banner-border)" stroke-width="6"/>
      <text x="0" y="0" font-family="'Arial Black', 'Impact', sans-serif" font-size="34" font-weight="900" fill="#ffebc2" stroke="#000000" stroke-width="3" text-anchor="middle" letter-spacing="5">O JOGO DAS RESPOSTAS</text>
    </g>
  </g>
</svg>
"""

# 3. Button CRIAR PARTIDA SVG
btn_criar_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 140" width="700" height="140">
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
    <!-- Outer Heavy Black Outline Shape -->
    <rect x="10" y="10" width="675" height="115" rx="36" fill="#0b0b0b"/>
    <!-- Red Body -->
    <rect x="15" y="14" width="665" height="106" rx="32" fill="url(#btn-red-grad)" stroke="#000000" stroke-width="7"/>
    <!-- Top Highlight Line -->
    <path d="M 50,22 H 645" stroke="#ff7c74" stroke-width="5" stroke-linecap="round" opacity="0.65"/>
    <!-- Bottom Shadow Edge -->
    <path d="M 50,112 H 645" stroke="#480004" stroke-width="5" stroke-linecap="round" opacity="0.8"/>

    <!-- Comic Grunge Cracks on Button -->
    <g stroke="#380204" stroke-width="2.5" fill="none" opacity="0.6">
      <path d="M 35,45 L 60,65 L 45,95"/>
      <path d="M 645,35 L 625,60 L 650,85"/>
      <path d="M 230,22 L 245,38"/>
      <path d="M 460,114 L 475,98"/>
    </g>

    <!-- LEFT ICON: USER WITH PLUS BADGE -->
    <g transform="translate(85, 68)">
      <!-- Head Circle -->
      <circle cx="-10" cy="-18" r="20" fill="url(#avatar-cream)" stroke="#000000" stroke-width="6"/>
      <!-- Body Arc -->
      <path d="M -38,20 C -38,-4 -24,-10 -10,-10 C 4,-10 18,-4 18,20 Z" fill="url(#avatar-cream)" stroke="#000000" stroke-width="6"/>
      
      <!-- Plus Badge -->
      <circle cx="16" cy="6" r="16" fill="url(#avatar-cream)" stroke="#000000" stroke-width="5"/>
      <path d="M 16,-1 V 13 M 9,6 H 23" stroke="#000000" stroke-width="5" stroke-linecap="round"/>
    </g>

    <!-- BUTTON TEXT: CRIAR PARTIDA -->
    <g transform="translate(425, 80)">
      <!-- 3D Shadow Text -->
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="58" font-weight="900" fill="#fdf4e3" stroke="#000000" stroke-width="12" stroke-linejoin="round" text-anchor="middle" letter-spacing="3">CRIAR PARTIDA</text>
      <!-- Face -->
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="58" font-weight="900" fill="#fdf4e3" text-anchor="middle" letter-spacing="3">CRIAR PARTIDA</text>
    </g>
  </g>
</svg>
"""

# 4. Button ENTRAR EM PARTIDA SVG
btn_entrar_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 140" width="700" height="140">
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
    <!-- Outer Heavy Black Outline Shape -->
    <rect x="10" y="10" width="675" height="115" rx="36" fill="#0b0b0b"/>
    <!-- Purple Body -->
    <rect x="15" y="14" width="665" height="106" rx="32" fill="url(#btn-purple-grad)" stroke="#000000" stroke-width="7"/>
    <!-- Top Highlight Line -->
    <path d="M 50,22 H 645" stroke="#d94ebc" stroke-width="5" stroke-linecap="round" opacity="0.65"/>
    <!-- Bottom Shadow Edge -->
    <path d="M 50,112 H 645" stroke="#180014" stroke-width="5" stroke-linecap="round" opacity="0.8"/>

    <!-- Comic Grunge Cracks on Button -->
    <g stroke="#1e001a" stroke-width="2.5" fill="none" opacity="0.6">
      <path d="M 35,45 L 60,65 L 45,95"/>
      <path d="M 645,35 L 625,60 L 650,85"/>
      <path d="M 270,22 L 285,38"/>
      <path d="M 430,114 L 445,98"/>
    </g>

    <!-- LEFT ICON: 3 USERS SILHOUETTES -->
    <g transform="translate(90, 68)">
      <!-- Left User -->
      <circle cx="-26" cy="-12" r="14" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="4.5"/>
      <path d="M -44,18 C -44,2 -35,-2 -26,-2 C -17,-2 -8,2 -8,18 Z" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="4.5"/>

      <!-- Right User -->
      <circle cx="26" cy="-12" r="14" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="4.5"/>
      <path d="M 8,18 C 8,2 17,-2 26,-2 C 35,-2 44,2 44,18 Z" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="4.5"/>

      <!-- Center Big User (Foreground) -->
      <circle cx="0" cy="-18" r="18" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="5.5"/>
      <path d="M -24,20 C -24,0 -12,-6 0,-6 C 12,-6 24,0 24,20 Z" fill="url(#avatar-cream-p)" stroke="#000000" stroke-width="5.5"/>
    </g>

    <!-- BUTTON TEXT: ENTRAR NA PARTIDA -->
    <g transform="translate(425, 80)">
      <!-- 3D Shadow Text -->
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="56" font-weight="900" fill="#fdf4e3" stroke="#000000" stroke-width="12" stroke-linejoin="round" text-anchor="middle" letter-spacing="3">ENTRAR NA PARTIDA</text>
      <!-- Face -->
      <text x="0" y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="56" font-weight="900" fill="#fdf4e3" text-anchor="middle" letter-spacing="3">ENTRAR NA PARTIDA</text>
    </g>
  </g>
</svg>
"""

# Write SVG files
with open("/tmp_bg.svg", "w") as f:
    f.write(bg_svg)
with open("/tmp_logo.svg", "w") as f:
    f.write(logo_svg)
with open("/tmp_criar.svg", "w") as f:
    f.write(btn_criar_svg)
with open("/tmp_entrar.svg", "w") as f:
    f.write(btn_entrar_svg)

print("SVGs written successfully!")

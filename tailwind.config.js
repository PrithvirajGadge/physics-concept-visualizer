/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface2)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        success: 'var(--success)',
        fail: 'var(--fail)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 229, 255, 0.35)',
        glowOrange: '0 0 20px rgba(255, 107, 53, 0.35)',
      },
    },
  },
  plugins: [],
}

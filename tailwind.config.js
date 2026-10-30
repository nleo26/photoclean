export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14201c',
          soft: '#54655e',
          faint: '#8b9a94',
        },
        canvas: '#f0eee8',
        surface: '#ffffff',
        sand: '#f7f5f0',
        mint: {
          50: '#f2f9f5',
          100: '#e2f1e9',
          200: '#c6e5d5',
        },
        spruce: {
          DEFAULT: '#0f7a5a',
          deep: '#0a5540',
        },
        clay: {
          DEFAULT: '#bf4e3b',
          soft: '#fbeae6',
        },
        sun: '#e3a538',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '1.75rem',
        '5xl': '2.25rem',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
}

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        megrim: ['var(--font-megrim)', 'sans-serif'],
        Xeroda: ['Xeroda', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'aurora': 'aurora 60s linear infinite',
        'float3': 'float3 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 1.5s ease-out forwards',
      },
      keyframes: {
        aurora: {
          'from': { 'background-position': '50% 50%, 50% 50%' },
          'to': { 'background-position': '350% 50%, 350% 50%' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config 
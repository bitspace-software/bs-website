/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", "*.{js,ts,jsx,tsx,mdx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        accent: {
          DEFAULT: '#10B981',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        brand: {
          background: '#0F172A',
          text: '#E2E8F0',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.zinc.900'),
              '&:hover': {
                color: theme('colors.zinc.700'),
              },
              textDecoration: 'underline',
              textDecorationColor: theme('colors.zinc.400'),
              textUnderlineOffset: '2px',
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.zinc.900'),
            },
            code: {
              color: theme('colors.zinc.900'),
              backgroundColor: theme('colors.zinc.100'),
              borderRadius: theme('borderRadius.md'),
              padding: `${theme('padding.1')} ${theme('padding.1.5')}`,
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.zinc.100'),
              '&:hover': {
                color: theme('colors.zinc.300'),
              },
              textDecorationColor: theme('colors.zinc.700'),
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.zinc.100'),
            },
            code: {
              color: theme('colors.zinc.100'),
              backgroundColor: theme('colors.zinc.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#fef7ff', // Very light purple background
        'bg-surface': '#f3e8ff', // Light purple surface
        'bg-card': '#ffffff',
        'bg-input': '#faf5ff', // Light purple input
        border: 'rgba(147, 51, 234, 0.2)', // Purple border
        accent: '#8b5cf6', // Bright purple
        'accent-hover': '#7c3aed', // Darker purple
        'accent-dim': 'rgba(139, 92, 246, 0.1)',
        'accent-light': '#a78bfa', // Light purple
        secondary: '#06b6d4', // Bright cyan
        'secondary-hover': '#0891b2',
        success: '#10b981', // Bright emerald
        'success-hover': '#059669',
        warning: '#f59e0b', // Bright amber
        'warning-hover': '#d97706',
        danger: '#ef4444', // Bright red
        'danger-hover': '#dc2626',
        text: '#1e1b4b',
        'text-muted': '#6b7280',
        pink: '#ec4899', // Bright pink
        'pink-hover': '#db2777',
        indigo: '#6366f1', // Bright indigo
        'indigo-hover': '#4f46e5',
      },
      borderRadius: {
        'radius': '0.65rem',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      transitionDuration: {
        't': '0.2s',
      },
      transitionTimingFunction: {
        't': 'ease',
      },
    },
  },
  plugins: [],
}
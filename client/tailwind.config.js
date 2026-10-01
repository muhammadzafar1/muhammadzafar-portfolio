export default {
  future: {
    hoverOnlyWhenSupported: true
  },
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#4F46E5',
        accent: '#06B6D4',
        surface: '#F8FAFC',
        border: '#E5E7EB',
        text: '#111827'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.08)'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem'
      },
      keyframes: {
        lineflow: {
          '0%': { backgroundPosition: '-160px 0, 0 0' },
          '100%': { backgroundPosition: '620px 0, 100% 0' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        popIn: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        }
      },
      animation: {
        lineflow: 'lineflow 2.4s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 250ms cubic-bezier(.2,.8,.2,1) both',
        'slide-up': 'slideUp 400ms cubic-bezier(.2,.8,.2,1) both',
        'pop-in': 'popIn 350ms cubic-bezier(.2,.8,.2,1) both'
      }
    }
  },
  plugins: []
}

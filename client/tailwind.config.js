export default {
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
      }
    }
  },
  plugins: []
}

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        erase: {
          '0%': { width: '100%' },
          '100%': { width: '0' },
        },
      },
      animation: {
        typing: 'typing 3s steps(30, end) forwards',
        erase: 'erase 3s steps(30, end) forwards',
      },
      colors: {
        light: {
          1: '#0a0c10',   // text
          2: '#f4f6fa',   // background
          3: '#4266c7',   // primary
          4: '#90a8ea',   // secondary
          5: '#517cef',   // accent
        },
        dark: {
          1: '#eff1f5',   // text
          2: '#05070a',   // background
          3: '#385cbc',   // primary
          4: '#152d6f',   // secondary
          5: '#103aad',   // accent
        },
      },
    },
  },
  plugins: [],
};

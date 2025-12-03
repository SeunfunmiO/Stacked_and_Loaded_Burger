const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },

  darkMode:["class"],
  content:[
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme:{
    extend:{},
  }
};

export default config;

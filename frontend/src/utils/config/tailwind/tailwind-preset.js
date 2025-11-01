/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    backgroundImage: {
      "gradient-primary": "linear-gradient(135deg, #9935FF, #3D8BFF)",
      "gradient-secondary": "linear-gradient(135deg, #83a2ff, #141826)",
    },
    boxShadow: {
      glow: "0 0 40px rgba(154, 59, 255, 0.3)",
      "glow-accent": "0 0 40px rgba(61, 139, 255, 0.3)",
    },
    colors: {
      primary: {
        DEFAULT: "var(--color-primary)",
        100: "#3D8BFF",
      },
      secondary: {
        DEFAULT: "var(--color-secondary)",
        100: "#2e3a55",
        200: "#26344a",
        300: "#1E2433",
        400: "#161f30",
      },
      error: {
        DEFAULT: "var(--color-error)",
        100: "#f46a6a27",
        200: "#f46a6a5c",
      },
      black: {
        DEFAULT: "var(--color-black)",
      },
      white: {
        DEFAULT: "var(--color-white)",
      },
      grey: {
        DEFAULT: "var(--color-grey)",
      },
    },
  },
};

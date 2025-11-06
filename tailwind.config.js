/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        flame: "#ff4b2b",
        ember: "#ff416c",
        coal: "#0b0b0b",
      },
    },
  },
  plugins: [],
}

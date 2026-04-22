/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#030712",
                primary: "#3B82F6",
                secondary: "#8B5CF6",
                accent: "#60A5FA",
            },
        },
    },
    plugins: [],
}

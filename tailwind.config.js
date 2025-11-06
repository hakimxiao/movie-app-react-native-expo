/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    // content digunakan untuk mendeklarasikan file mana yang bisa mennggunakan tailwind.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        // NOTE PENTING : ini untuk custom class asli tailwind | Menambahkan hal baru.
        extend: {
            colors:{
                primary: "#030014",
                secondary: "#151312",
                ratingBox: "#221F3D",
                searchBar: "#0F0D23",
                text: "#9CA4AB",
                darkAccent: "#AB8BFF",
                accentText: "#A8B5DB",
                secondaryText: "#D6C7FF",
                // CUSTOM DENGAN VARIASI :
                light: {
                    100: "#D6C7FF",
                    200: "#A8B5DB",
                    300: "#9CA4AB",
                },
                dark: {
                  100: "#221f3d",
                  200: "#0f0d23"
                },
                accent: "#AB88FF"
            }
        },
    },
    plugins: [],
}
'use client'


import { useTheme } from "next-themes"
import { ToastContainer } from "react-toastify"

const ThemeComponent = () => {

        const { theme, systemTheme } = useTheme()

        const toastTheme =
            theme === "system"
                ? systemTheme === "dark"
                    ? "dark"
                    : "light"
                : theme

        return <ToastContainer theme={toastTheme} />

}

export default ThemeComponent
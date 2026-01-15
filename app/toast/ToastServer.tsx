"use server"

import { useTheme } from "next-themes"

const ToastServer = () => {

    const { theme, systemTheme } = useTheme()

    const toastTheme = theme === "system" ? systemTheme : theme
    return
}

export default ToastServer
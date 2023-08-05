import React, { useContext } from 'react'
import ThemeContext from '../context/themes/ThemeContext';

export default function ThemeButton() {

    const { theme, setTheme, themeBtn, setThemeBtn } = useContext(ThemeContext);

    const toggleTheme = () => {
        const theme = document.documentElement.getAttribute('data-bs-theme');

        if (theme === "") {
            document.documentElement.setAttribute('data-bs-theme', "dark");
            document.documentElement.setAttribute('data-color-mode', 'dark');
            setTheme("dark");
            setThemeBtn("sun")
        }

        else {
            document.documentElement.setAttribute('data-bs-theme', "");
            document.documentElement.setAttribute('data-color-mode', 'light');
            setTheme("light");
            setThemeBtn("moon");
        }
    }

    return (
        <i className={`fa fa-${themeBtn}-o btn btn-${theme === 'dark' ? 'light' : 'dark'} me-2 my-4 rounded-5`} onClick={toggleTheme}
            style={{ fontSize: "24px" }}></i>
    )
}

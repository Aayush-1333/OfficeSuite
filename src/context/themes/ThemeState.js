import ThemeContext from "./ThemeContext";
import { useState } from 'react'

const ThemeState = function (props) {

    const [theme, setTheme] = useState("light");
    const [themeBtn, setThemeBtn] = useState("moon");

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themeBtn, setThemeBtn }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeState;

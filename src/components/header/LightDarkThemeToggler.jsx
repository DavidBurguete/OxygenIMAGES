import { useTheme } from "../ThemeProvider";

function LightDarkThemeToggler({img, size}){
    const {isDark, toggleTheme} = useTheme();

    return ( 
        <button onClick={toggleTheme} style={{width:size, height: size}}>
            <img src={img + (isDark?"dark":"light") + ".png"} style={{width:size, height: size}}></img>
        </button>
    );
}

export default LightDarkThemeToggler;
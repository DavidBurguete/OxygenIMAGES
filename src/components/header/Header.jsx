import { useTheme } from "../ThemeProvider";

function Header({children, logoText}){
    const {isDark} = useTheme();
    return (
        <header className={"header_"+(isDark?"dark":"light")}>
            <h1>{logoText}</h1>
            <div>
                {children}
            </div>
        </header>
    );
}

export default Header;
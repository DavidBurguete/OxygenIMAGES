import { useTheme } from "../ThemeProvider";

function Header({children, logoText}){
    const {isDark} = useTheme();
    return (
        <header style={{
            backgroundColor: "#"+(isDark?"3C3C3C":"5D00C8"),
            boxShadow: "0px 0px 6px 6px #"+(isDark?"000000":"764BA8")+"A0"
        }}>
            <h1>{logoText}</h1>
            <div>
                {children}
            </div>
        </header>
    );
}

export default Header;
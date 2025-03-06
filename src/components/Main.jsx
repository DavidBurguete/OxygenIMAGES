import { useTheme } from "./ThemeProvider";

function Main({children}){
    const { isDark } = useTheme();

    return <main className={"main_background--"+(isDark?"dark":"light")}>{children}</main>
}

export default Main;
import { useTheme } from "./ThemeProvider";

function ErrorMessage({message}){
    const { isDark } = useTheme();

    return <p className={"error error--"+(isDark?"dark":"light")}>{message}</p>;
}

export default ErrorMessage;
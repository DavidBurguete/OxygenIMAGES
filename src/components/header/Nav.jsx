import { NavLink } from "react-router-dom";
import { useTheme } from "../ThemeProvider";

function Nav({isMenuDeployed}){
    const { isDark } = useTheme();

    return <nav className={"nav_"+(isDark?"dark":"light") + " deploy_nav--" + (isMenuDeployed?"active":"non_active")}>
        <NavLink className={"active--"+(isDark?"dark":"light")} to="/">Home</NavLink>
        <NavLink className={"active--"+(isDark?"dark":"light")} to="/myphotos">My Photos</NavLink>
        <NavLink className={"active--"+(isDark?"dark":"light")} to="/about">About</NavLink>
    </nav>;
}

export default Nav;
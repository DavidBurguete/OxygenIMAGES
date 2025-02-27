import { useTheme } from "../components/ThemeProvider";

function About(){
    const { isDark } = useTheme();

    return (<main className="about">
        <h2 className={"info_link--"+(isDark?"dark":"light")}>powered by <a href="https://unsplash.com/es">unsplash</a></h2>
        <h2 className={"info_link--"+(isDark?"dark":"light")}>icons from <a href="https://www.flaticon.com/">flaticon</a></h2>
        <h2 className={"info_link--"+(isDark?"dark":"light")}>created by David Burguete</h2>
        <img className="logo" src={"src/img/OxygenIMAGES-"+(isDark?"dark":"light")+".png"} alt="OxygenIMAGES logo" />
    </main>);
}

export default About;
import { useEffect, useState } from "react";
import { useTheme } from "../components/ThemeProvider";
import Loading from "../components/Loading";

function Home(){
    const { isDark } = useTheme();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    // const images = async () => await fetch("https://api.unsplash.com/photos/?client_id=Zws9gh0kAQ4lmheTh2imCNYIzl0ZpQYd6HqFDJS0XrI");

    // console.log(images());

    useEffect(() => {
        fetch("https://api.unsplash.com/photos/?client_id=Zws9gh0kAQ4lmheTh2imCNYIzl0ZpQYd6HqFDJS0XrI").then((response) => {
            if(!response.ok){
                console.log("Error obtención datos");
            }
            return response.json();
        }).then((data) => {
            const images = {};
            for(let i = 0; i < data.length; i++){
                images[i] = {
                    date: data[i]["created_at"].split("T")[0],
                    width: data[i]["width"],
                    height: data[i]["height"],
                    description: data[i]["description"],
                    alt: data[i]["alt_description"],
                    link: data[i]["urls"]["regular"],
                    likes: data[i]["likes"],
                    liked_by_user: data[i]["liked_by_user"]
                };
            }
            setData({type: "data", images: images});
            setIsLoading(false);
        }).catch(() => {
            setData({type: "error", errorMessage: "There was an error while fetching the images"});
            setIsLoading(false);
        });
    }, []);

    if(!isLoading)
        return <main className={"main_background--"+(isDark?"dark":"light")}></main>
    else
        return <Loading src="assets/img/loading.png"/>
}

export default Home;
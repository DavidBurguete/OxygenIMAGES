import { useEffect, useState } from "react";
import { useTheme } from "../components/ThemeProvider";
import Loading from "../components/Loading";
import Images from "../components/Images";

function Home(){
    const { isDark } = useTheme();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("https://api.unsplash.com/photos?page=1&per_page=30&client_id=Zws9gh0kAQ4lmheTh2imCNYIzl0ZpQYd6HqFDJS0XrI").then((response) => {
        //fetch("https://api.unsplash.com/search/photos?query={SEARCH_QUERY}&page=1&per_page=30&client_id=Zws9gh0kAQ4lmheTh2imCNYIzl0ZpQYd6HqFDJS0XrI").then((response) => {
            if(!response.ok){
                throw new Error("The app resolved in a connection error");
            }
            return response.json();
        }).then((data) => {
            const images = {};
            for(let i = 0; i < data.length; i++){
                images[i] = {
                    id: data[i]["id"],
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
        }).catch((error) => {
            setData({type: "error", errorMessage: error.message});
            setIsLoading(false);
        });
    }, []);

    if(!isLoading)
        return <main className={"main_background--"+(isDark?"dark":"light")}><Images data={data}/></main>
    else
        return <Loading src="assets/img/loading.png"/>
}

export default Home;
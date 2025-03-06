import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Images from "../components/Images";
import Main from "../components/Main";

function Home(){
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(334);

    const prevPage = () => setPage(page-1<=0?page:page-1);
    const firstPage = () => setPage(1);
    const priorToPriorPage = () => setPage(page-2);
    const priorPage = () => setPage(page-1);
    const goTolastPage = () => setPage(lastPage);
    const posteriorPage = () => setPage(page+1);
    const posteriorToPosteriorPage = () => setPage(page+2);
    const nextPage = () => setPage(page+1>lastPage?page:page+1);

    useEffect(() => {
        fetch(`https://api.unsplash.com/photos?page=${page}&per_page=30&client_id=Zws9gh0kAQ4lmheTh2imCNYIzl0ZpQYd6HqFDJS0XrI`).then(async (response) => {
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
                    download: data[i]["links"]["download_location"],
                    likes: data[i]["likes"],
                    liked_by_user: data[i]["liked_by_user"]
                };
            }
            setLastPage(334);
            setData({type: "data", images: images});
            setIsLoading(false);
        }).catch((error) => {
            setData({type: "error", errorMessage: error.message});
            setIsLoading(false);
        });
    }, [page]);

    if(!isLoading)
        return <Main><Images data={data} actions={
            {next: nextPage, 
            prev: prevPage, 
            first: firstPage, 
            thisPage: page, 
            thisLastPage: lastPage, 
            prior: priorPage, 
            ptp: priorToPriorPage, 
            posterior: posteriorPage,
            ptTpt: posteriorToPosteriorPage,
            lastPage: goTolastPage}
        }/></Main>
    else
        return <Loading src="assets/img/loading.png"/>
}

export default Home;
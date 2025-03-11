import { useState } from "react";
import Loading from "../components/Loading";
import Images from "../components/Images";
import Main from "../components/Main";
import { useSelector } from "react-redux";
import {
    prevPage,
    firstPage,
    priorToPriorPage,
    priorPage,
    goToLastPage,
    posteriorPage,
    posteriorToPosteriorPage,
    nextPage
} from "../redux/paginationSlice";

function Home(){
    const { page, lastPage } = useSelector((state) => state.pagination);
    const { images, pending, error } = useSelector((state) => state.search);

    if(!pending)
        return <Main><Images data={{images: images, error: error}} actions={
            {next: nextPage, 
            prev: prevPage, 
            first: firstPage, 
            thisPage: page, 
            thisLastPage: lastPage, 
            prior: priorPage, 
            ptp: priorToPriorPage, 
            posterior: posteriorPage,
            ptTpt: posteriorToPosteriorPage,
            lastPage: goToLastPage}
        }/></Main>
    else
        return <Loading src="assets/img/loading.png"/>
}

export default Home;
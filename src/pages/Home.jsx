import Loading from "../components/Loading";
import Images from "../components/Images";
import Main from "../components/Main";
import { useSelector } from "react-redux";
import {
    goToPage
} from "../redux/searchSlice";

function Home(){
    const { images, page, lastPage, pending, error } = useSelector((state) => state.search);

    if(!pending)
        return <Main><Images data={{images: images, error: error}} actions={
            {goToPage: goToPage,
            thisPage: page, 
            thisLastPage: lastPage,}
        }/></Main>
    else
        return <Loading src="assets/img/loading.png"/>
}

export default Home;
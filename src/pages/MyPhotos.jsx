import MyImages from "../components/MyImages";
import Main from "../components/Main";
import { useSelector } from "react-redux";

function MyPhotos(){
    const { favorites } = useSelector((state) => state.favorites);

    return <Main><MyImages data={{images: favorites}}/></Main>
}

export default MyPhotos;
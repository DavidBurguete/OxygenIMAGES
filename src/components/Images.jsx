import ErrorMessage from "./ErrorMessage";
import ImageCard from "./ImageCard";
import Paginate from "./Paginate";
import { useTheme } from "./ThemeProvider";

function Images({data, actions}){
    const { isDark } = useTheme();

    if(data.type === "data")
        return (<><ImageCard images={data.images}/><Paginate actions={actions}/></>);
    else{
        return <ErrorMessage message={data.errorMessage}/>
    }
}

export default Images;
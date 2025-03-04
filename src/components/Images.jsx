import ImageCard from "./ImageCard";
import { useTheme } from "./ThemeProvider";

function Images({data}){
    const { isDark } = useTheme();

    if(data.type === "data")
        return <ImageCard images={data.images}/>
    else{

        return <p className={"error error--"+(isDark?"dark":"light")}>{data.errorMessage}</p>
    }
}

export default Images;
import ErrorMessage from "./ErrorMessage";
import MyImageCard from "./MyImageCard";
import Paginate from "./Paginate";

function MyImages({data}){
    if(data.images == false)
        return <ErrorMessage message="There are no images to display"/>
    else
        return (<><MyImageCard fetchedImages={data.images}/></>);
}

export default MyImages;
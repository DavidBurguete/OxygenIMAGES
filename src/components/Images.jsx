import ErrorMessage from "./ErrorMessage";
import ImageCard from "./ImageCard";
import Paginate from "./Paginate";

function Images({data, actions}){
    if(data.images == false)
        return <ErrorMessage message="There are no images to display"/>
    else if(data.error === null)
        return (<><ImageCard fetchedImages={data.images}/><Paginate actions={actions}/></>);
    else{
        return <ErrorMessage message={data.error}/>
    }
}

export default Images;
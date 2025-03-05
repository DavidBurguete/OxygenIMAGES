import ErrorMessage from "../components/ErrorMessage";
import Main from "../components/Main";

function Error404(){
    return <Main><ErrorMessage message="404: Page not found"/></Main>
}

export default Error404;
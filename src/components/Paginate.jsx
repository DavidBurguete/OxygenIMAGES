import { useTheme } from "./ThemeProvider";

function Paginate({actions}){
    const { isDark } = useTheme();
    const isNotFirstPage = parseInt(actions.thisPage)!==1;
    const isNotLastPage = parseInt(actions.thisPage)!==actions.thisLastPage;

    return (<footer className="paginator">
        <div className={"paginate paginate--"+(isDark?"dark":"light")}>
            <button className="paginate__button" onClick={actions.prev}>&lt;</button>
            {isNotFirstPage && <button className="paginate__button" onClick={actions.first}>1</button>}
            {actions.thisPage>4 && <button className="paginate__button paginate__button--dots--pc" disabled>...</button>}
            {actions.thisPage-2>1 && <button className="paginate__button paginate__button--pc" onClick={actions.ptp}>{actions.thisPage-2}</button>}
            {(actions.thisPage-1!==1 && isNotFirstPage) && <button className="paginate__button paginate__button--pc" onClick={actions.prior}>{actions.thisPage-1}</button>}
            <button className="paginate__button" disabled><strong>{actions.thisPage}</strong></button>
            {(actions.thisPage+1!==actions.thisLastPage && isNotLastPage) && <button className="paginate__button paginate__button--pc" onClick={actions.posterior}>{actions.thisPage+1}</button>}
            {actions.thisPage+2<actions.thisLastPage && <button className="paginate__button paginate__button--pc" onClick={actions.ptTpt}>{actions.thisPage+2}</button>}
            {actions.thisPage<=actions.thisLastPage-4 && <button className="paginate__button paginate__button--dots--pc" disabled>...</button>}
            {isNotLastPage && <button className="paginate__button" onClick={actions.lastPage}>{actions.thisLastPage}</button>}
            <button className="paginate__button" onClick={actions.next}>&gt;</button>
        </div>
    </footer>);
}

export default Paginate;
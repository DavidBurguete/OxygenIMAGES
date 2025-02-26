function BurgerMenu({classname}){
    return (
        <div className={classname}>
            <div className={classname+"--first"}></div>
            <div className={classname+"--middle"}></div>
            <div className={classname+"--last"}></div>
        </div>
    );
}

export default BurgerMenu;
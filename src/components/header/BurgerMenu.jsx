import { useState } from "react";

function BurgerMenu({isDeployed, onClick, classname}){
    return (
        <div className={classname} onClick={onClick}>
            <div className={classname+"--first " + (isDeployed?classname+"--first--crossed":"")}></div>
            <div className={classname+"--middle " + (isDeployed?classname+"--middle--crossed":"")}></div>
            <div className={classname+"--last " + (isDeployed?classname+"--last--crossed":"")}></div>
        </div>
    );
}

export default BurgerMenu;
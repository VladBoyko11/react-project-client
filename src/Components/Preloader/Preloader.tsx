import React from "react";
import * as style from './Preloader.module.scss'
import preloader from "../../assets/preloader.svg"

const Preloader: React.FC = () => {
    return <div><img className={style.preloader} alt="preloader" src={preloader}/></div>
}

export default Preloader
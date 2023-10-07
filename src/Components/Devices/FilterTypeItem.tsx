import React from "react";
import { Type } from "../../redux/types";
import * as style from './Devices.module.scss'

const FilterTypeItem = (props: {type: Type}) => {
    return <button className={style.btnFilterBrandItem}>
        <div className={style.inputSquare}></div>
        <div>{props.type.name}</div>
    </button>
}

export default FilterTypeItem
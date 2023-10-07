import React, {useEffect, useState} from "react";
import * as style from './Devices.module.scss';
import {useParams} from "react-router-dom";
import { Brand } from "../../redux/types";

type FilterBrandItemType = {
    btnSelectBrand(brandId: number, toggleCheckboxBtn: boolean): void
    brand: Brand
    key: number
}

const FilterBrandItem: React.FC<FilterBrandItemType> = (props) => {
    const typeName = useParams()
    const [toggleCheckboxBtn, setToggleCheckboxBtn] = useState(true)

    useEffect(() =>{
        setToggleCheckboxBtn(true)
    }, [typeName.typeName])

    return <button className={style.btnFilterBrandItem} onClick={() => {
        if(toggleCheckboxBtn) {
            if(props.brand.id) props.btnSelectBrand(props.brand.id, toggleCheckboxBtn)
            setToggleCheckboxBtn(false)
        }
        else {
            if(props.brand.id) props.btnSelectBrand(props.brand.id, toggleCheckboxBtn)
            setToggleCheckboxBtn(true)
        }
    }
    }>
        <div className={toggleCheckboxBtn ? style.inputSquare : style.activeInputSquare}>
            <div className={!toggleCheckboxBtn ? style.check : undefined}></div>
        </div>
        <div>{props.brand.name}</div>
    </button>
}

export default FilterBrandItem
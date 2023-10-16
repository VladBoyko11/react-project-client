import React, {useEffect, useState} from "react";
import * as style from './Devices.module.scss';
import {useParams} from "react-router-dom";
import { Brand } from "../../redux/types";
import { Button } from "@mui/material";

type FilterBrandItemType = {
    btnSelectBrand(brandId: number | undefined, toggleCheckboxBtn: boolean): void,
    selectedBrand: number
    brand: Brand
    key: number
}

const FilterBrandItem: React.FC<FilterBrandItemType> = (props) => {
    const typeName = useParams()
    const [toggleCheckboxBtn, setToggleCheckboxBtn] = useState(true)

    useEffect(() =>{
        setToggleCheckboxBtn(true)
    }, [typeName.typeName])

    return <Button variant="contained" className={style.btnFilterBrandItem} onClick={() => {
        if(props.brand.id && toggleCheckboxBtn) props.btnSelectBrand(props.brand.id, toggleCheckboxBtn)
        if(props.brand.id && !toggleCheckboxBtn) props.btnSelectBrand(undefined, toggleCheckboxBtn)
    }
    }>
        <div className={props.brand.id === props.selectedBrand ? style.activeInputSquare : style.inputSquare}>
            <div className={props.brand.id === props.selectedBrand ? style.check : undefined}></div>
        </div>
        <div>{props.brand.name}</div>
    </Button>
}

export default FilterBrandItem
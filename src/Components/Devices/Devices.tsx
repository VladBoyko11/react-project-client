import React, { useState } from "react";
import Device from "./Device";
import FilterBrandItem from "./FilterBrandItem";
import Pagination from "../Pagination/Pagination";
import { Brand, Device as DeviceType } from "../../redux/types";

import { Container } from '@mui/material';
import * as style from './Devices.module.scss'
type DevicesPropsType = {
    devices: Array<DeviceType>
    brands: Array<Brand>
    totalPages: number
    basketId?: number,
    selectedBrand: number,
    btnSelectBrand(brandId: number, toggleCheckboxBtn: boolean): void
    onPageChanged(page: number): void
}

const Devices: React.FC<DevicesPropsType> = (props) => {
    let key = 0
    return (
        <Container maxWidth='lg' sx={{
            display: 'flex',
            justifyContent: 'center' 
        }}>
            <div className={'col-2'}>
                <div>Brands</div>
                <div className={`w-100`}>
                    {props.brands.map((brand: Brand) => {
                        key++
                        return <FilterBrandItem selectedBrand={props.selectedBrand} btnSelectBrand={props.btnSelectBrand} key={key} brand={brand}/>
                    })}
                </div>
            </div>
            <div className={style.devicesContainer}>
                {props.devices.map((device: DeviceType) => {
                    key++
                    if(props.basketId) return <Device basketId={props.basketId} key={key} device={device}/>
                })}
                {props.totalPages > 1 ? <Pagination onPageChanged={props.onPageChanged} /> : null}
            </div>
        </Container>
    )
}

export default Devices
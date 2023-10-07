import React from "react";
import Device from "./Device";
import FilterBrandItem from "./FilterBrandItem";
import Pagination from "../Pagination/Pagination";
import { Brand, Device as DeviceType } from "../../redux/types";

type DevicesPropsType = {
    devices: Array<DeviceType>
    brands: Array<Brand>
    totalPages: number
    basketId?: number
    btnSelectBrand(brandId: number, toggleCheckboxBtn: boolean): void
    onPageChanged(page: number): void
}

const Devices: React.FC<DevicesPropsType> = (props) => {
    let key = 0
    return (
        <div className='container d-flex flex-wrap justify-content-between'>
            <div className={'border-top border-end col-2'}>
                <div>Brands</div>
                <div className={`w-100`}>
                    {props.brands.map((brand: Brand) => {
                        key++
                        return <FilterBrandItem btnSelectBrand={props.btnSelectBrand} key={key} brand={brand}/>
                    })}
                </div>
            </div>
            <div className='d-flex flex-wrap col-10 justify-content-center'>
                {props.devices.map((device: DeviceType) => {
                    key++
                    if(props.basketId) return <Device basketId={props.basketId} key={key} device={device}/>
                })}
                {props.totalPages > 1 ? <Pagination onPageChanged={props.onPageChanged} /> : null}
            </div>
        </div>
    )
}

export default Devices
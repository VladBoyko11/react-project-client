import React, {useEffect, useState} from "react";
import Devices from "./Devices";
import {
    deleteType,
    getBrandsThunk,
    getDevicesThunk,
    getTypesThunk, getTypeThunk, setCurrentPage,
} from '../../redux/deviceSlice'
import {connect, ConnectedProps } from "react-redux";
import {useParams} from "react-router-dom";
import {addDeviceToBasket, deleteDeviceFromBasket, getDevicesFromBasket, getOneDevice} from "../../redux/basketSlice";
import {setNotification} from "../../redux/notificationSlice";
import { RootState } from "../../redux/store";
import Preloader from "../Preloader/Preloader";
import { useAppDispatch } from "src/hook";

const DevicesContainer: React.FC<DevicesContainerProps> = (props) => {
    const totalPages = Math.ceil(props.totalCount / props.limit)
    const typeName = useParams()
    const [brand, setBrand] = useState<number>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        props.getBrandsThunk()
        props.setCurrentPage({page: 1})
    }, [])
    useEffect(()=>{
        if(props.basketId){
            props.getDevicesFromBasket({basketId: props.basketId, dispatch})
        }
    }, [props.basketId])

    useEffect(() => {
        if(typeName.typeName) {
            props.getTypeThunk({typeName: typeName.typeName})
            props.setCurrentPage({page: 1})
        } else {
            props.getDevicesThunk({limit: props.limit, page: props.currentPage})
            props.deleteType()
            props.setCurrentPage({page: 1})
        }
    }, [typeName.typeName])

    useEffect(() => {
        if(props.type.id) props.getDevicesThunk({typeId: props.type.id, limit: props.limit, page: 1})
    }, [props.type])

    const onPageChanged = (page: number) => {
        props.setCurrentPage({page});
        if(!props.type.id && !brand) props.getDevicesThunk({limit: props.limit, page})
        if(props.type.id && !brand) props.getDevicesThunk({typeId: props.type.id, limit: props.limit, page})
        if(!props.type.id && brand) props.getDevicesThunk({brandId: brand, limit: props.limit, page})
        if(props.type.id && brand) props.getDevicesThunk({brandId: brand ,typeId: props.type.id, limit: props.limit, page})
    };

    const btnSelectBrand = async (brandId: number, toggleCheckboxBtn: boolean) => {
        setBrand(brandId)
        props.setCurrentPage({page: 1})
        if(toggleCheckboxBtn) {
            props.getDevicesThunk({brandId, typeId: props.type.id, limit: props.limit, page: props.currentPage})
        } else {
            setBrand(undefined)
        }
    }
    return (
        <div>
            <div>
                {props.devices.length !== 0 ? <Devices basketId={props.basketId} btnSelectBrand={btnSelectBrand} onPageChanged={onPageChanged} totalPages={totalPages} brands={props.brands} devices={props.devices}
                /> : <Preloader />}
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        devices: state.devicesPage.devices,
        brands: state.devicesPage.brands,
        types: state.devicesPage.types,
        type: state.devicesPage.type,
        limit: state.devicesPage.limit,
        totalCount: state.devicesPage.totalCount,
        currentPage: state.devicesPage.currentPage,
        isFetching: state.devicesPage.isFetching,
        basketId: state.basketPage.basket.id,
        devicesFromBasket: state.basketPage.devices
    }
}

const connector =  connect(mapStateToProps, {
    getDevicesThunk, getBrandsThunk, getTypesThunk, setCurrentPage, deleteType, addDeviceToBasket, getDevicesFromBasket,
    deleteDeviceFromBasket, setNotification, getOneDevice, getTypeThunk
})

type PropsFromRedux = ConnectedProps<typeof connector>
type DevicesContainerProps = PropsFromRedux  

export default connector(DevicesContainer)

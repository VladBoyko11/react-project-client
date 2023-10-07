import React, {useEffect, useState} from "react";
import BasketPage from "./BasketPage";
import {connect, ConnectedProps} from "react-redux";
import {getDevicesFromBasket, getOneDevice, setTotalPrice} from "src/redux/basketSlice";
import { RootState } from "src/redux/store";
import Preloader from "../Preloader/Preloader";
import { useAppDispatch } from "src/hook";

const BasketContainer: React.FC<BasketContainerPropsType> = (props) => {

    const [toggleDownloadReady, setToggleDownloadReady] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(props.basketId){
            props.getDevicesFromBasket({basketId: props.basketId, dispatch})
        }
    }, [props.basketId])
    useEffect(()=>{
        if(props.devices.length !== 0) setToggleDownloadReady(true)
    }, [props.devices])
    return (
        <div>
            {toggleDownloadReady ? <div>
                <BasketPage devices={props.devices} setTotalPrice={props.setTotalPrice} totalPrice={props.totalPrice} basketDevices={props.basketDevices}/>
            </div> : <Preloader />}
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    basketId: state.basketPage.basket.id,
    devices: state.basketPage.devices,
    totalPrice: state.basketPage.totalPrice,
    basketDevices: state.basketPage.basketDevices
})

const connector = connect(mapStateToProps, {getDevicesFromBasket, getOneDevice, setTotalPrice})
type ReduxPropsType = ConnectedProps<typeof connector>
type BasketContainerPropsType = ReduxPropsType

export default connector(BasketContainer)
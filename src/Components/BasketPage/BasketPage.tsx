import React, { useEffect } from "react";
import { BasketDevice as TypeBasketDevice, Device } from "src/redux/types";
import BasketDevice from "./BasketDevice";
import style from './Basket.module.scss'

type BasketPagePropsType = {
    devices: Array<Device>,
    setTotalPrice(): void,
    totalPrice: number,
    basketDevices: Array<TypeBasketDevice>,
}
const BasketPage: React.FC<BasketPagePropsType> = (props) => {
    useEffect(() => {
        props.setTotalPrice()
    }, [props.devices])

    useEffect(()=>{
        props.setTotalPrice()
    }, [props.basketDevices])

    return (
        <div className="d-flex flex-wrap justify-content-center">
            <h1 className={style.shoppingCart}>Shopping cart</h1>
            <div className={style.basketDevicesContainer}>
                {Array.isArray(props.devices) ? props.devices.map((device: Device) => {
                    const basketDevice = props.basketDevices.find(basketDevice => {
                        if(basketDevice.deviceId === device.id) {
                            return basketDevice.countOfProducts
                        }
                    })
                    return <BasketDevice key={device.id} device={device} countOfProducts={basketDevice?.countOfProducts} />
                }) : null}
            </div>
            <div className={style.totalPrice}>
                <div>
                    <span>Total Price: {props.totalPrice}</span>
                    <span>₴</span>
                </div>
                <button className={`btn-warning btn mt-2 + ${style.btnValidePurchase}`} onClick={() => {
                    console.log(props.basketDevices)
                    console.log("totalPrice: " + props.totalPrice)
                }}>Valide purchase</button>
            </div>
        </div>
    )
}

export default BasketPage
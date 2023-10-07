import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {faCartShopping, faCircleCheck} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as style from './Devices.module.scss'
import {addDeviceToBasket, deleteDeviceFromBasket, getDevicesFromBasket, getOneDevice} from "../../redux/basketSlice";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store";
import { setNotification } from "../../redux/notificationSlice";
import { deleteType, getBrandsThunk, getDevicesThunk, getTypesThunk, setCurrentPage } from "../../redux/deviceSlice";
import { Device as DeviceType } from "../../redux/types";
import RatingStars from "../common/RatingStars/RatingStars";
import { useAppDispatch } from "src/hook";

const Device: React.FC<DevicePropsType> = (props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const redirectToSomePage = (redirectPath: string) =>{
        navigate(redirectPath, {replace: true})
    }
    const [toggleBasketBtn, setToggleBasketBtn] = useState(false)
    const checkBasketBtn = () => {
        if(Array.isArray(props.devicesFromBasket)){
            let check = true
            props.devicesFromBasket.forEach((device: DeviceType)=>{
                if(device.id === props.device.id) {
                    setToggleBasketBtn(true)
                    check = false
                }
            })
            if(check) {
                setToggleBasketBtn(false)
            }
        }
    }
    useEffect(()=>{
        checkBasketBtn()
    }, [props.devicesFromBasket])
    useEffect(()=>{
        checkBasketBtn()
    }, [props.device])

    return (
        <div className={`${style.deviceCard}`}>
            <div className={style.deviceCardImg}>
                <img src={`http://localhost:5000/${props.device.img}`}
                    alt={'device'} onClick={() => {
                    redirectToSomePage(`/device/${props.device.id}`)
                }} />
            </div>
            <div className={'card-body'}>
                <div className={style.cardTextName}>{props.device.name}</div>
                <div className={style.cardTextPrice}>
                    <span>Price: {props.device.price}</span>
                    <span>₴</span>
                </div>
                <div className={style.cardTextRating}>
                    Rating: {props.device.rating ? <RatingStars rating={props.device.rating}/> : <RatingStars rating={0}/>}   
                </div>
                <div className={style.shoppingBtn} onClick={()=>{
                    if(props.basketId) {
                        if(toggleBasketBtn){
                            if(props.device.id) props.deleteDeviceFromBasket({basketId: props.basketId, deviceId: props.device.id, dispatch})
                            setToggleBasketBtn(false)
                        } else {
                            if(props.device.id) { 
                                props.addDeviceToBasket({basketId: props.basketId, deviceId: props.device.id})
                                props.getOneDevice({deviceId: props.device.id})
                            }
                            setToggleBasketBtn(true)
                        }
                    } else {
                        redirectToSomePage('/auth')
                        props.setNotification('Вы не вошли в свой аккаунт, ввойдите перед покупкой', true)
                        setTimeout(()=>{
                            props.setNotification('', false)
                        }, 2000)
                    }

                }}>
                    <FontAwesomeIcon className={style.shoppingBtnIcon} icon={faCartShopping as IconProp}/>
                    {toggleBasketBtn ?
                        <FontAwesomeIcon className={style.deviceInBasketIcon} icon={faCircleCheck as IconProp}/> : null}
                </div>
            </div>
        </div>
    )
}

type ownPropsType = {
    basketId: number,
    key: number,
    device: DeviceType
}

const mapStateToProps = (state: RootState) => {
    return {
        devicesFromBasket: state.basketPage.devices
    }
}

const connector =  connect(mapStateToProps, {
    getDevicesThunk, getBrandsThunk, getTypesThunk, setCurrentPage, deleteType, addDeviceToBasket, getDevicesFromBasket,
    deleteDeviceFromBasket, setNotification, getOneDevice
})

type PropsFromRedux = ConnectedProps<typeof connector>
type DevicePropsType = PropsFromRedux & ownPropsType 

export default connector(Device)
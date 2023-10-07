import React from "react";
import style from "../BasketPage/Basket.module.scss";
import {useNavigate} from "react-router-dom";
import { Device } from "../../redux/types";
import RatingStars from "../common/RatingStars/RatingStars";
import { changeCountOfProducts, deleteDeviceFromBasket } from "src/redux/basketSlice";
import { connect, ConnectedProps } from "react-redux";
import { useAppDispatch } from "src/hook";
import { RootState } from "src/redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const BasketDevice: React.FC<BasketDevicePropsType> = (props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const redirectToSomePage = (redirectPath: string) =>{
        navigate(redirectPath, {replace: true})
    }
    return (
        <div className={style.basketItem}>
            <div className='col-3'>
                <img className='w-75' src={`http://localhost:5000/${props.device.img}`}
                    alt={'device'} onClick={() => {
                    redirectToSomePage(`/device/${props.device.id}`)
                }} />
            </div>
            <div className='col-6'>
                <div className={style.cardTextName}>{props.device.name}</div>
                <div className={style.cardTextRating}>
                    Rating: {props.device.rating ? <RatingStars rating={props.device.rating}/> : <RatingStars rating={0}/>}   
                </div>
                <div className='d-flex mt-2'>
                    <div className={props.countOfProducts === 1 || props.countOfProducts === 0 ? `${style.btnChangeCountOfProductNotActive} ${style.btnChangeCountOfProduct}` : `${style.btnChangeCountOfProductActive} ${style.btnChangeCountOfProduct}`} onClick={() => {
                        if(props.countOfProducts) {
                            if(props.countOfProducts > 1) {
                                if(props.device.id) props.changeCountOfProducts({deviceId: props.device.id, countOfProducts: props.countOfProducts - 1})
                            }
                        }
                    }}>—</div>
                    <input className='w-25 ms-2 me-2 text-center rounded-1' value={props.countOfProducts} onChange={(e) => {
                        if(!isNaN(Number(e.target.value))) {
                            if(props.countOfProducts) {
                                if(props.countOfProducts > 1) {
                                    if(props.device.id) props.changeCountOfProducts({deviceId: props.device.id, countOfProducts: Number(e.target.value)})
                                }
                            }
                        }
                    }}/>
                    <div className={`${style.btnChangeCountOfProduct}`} onClick={() => {
                        if(props.countOfProducts) {
                            if(props.countOfProducts >= 0) {
                                if(props.device.id) props.changeCountOfProducts({deviceId: props.device.id, countOfProducts: props.countOfProducts + 1})
                            }
                        }
                    }}>+</div>
                </div>
            </div>
            <div className='col-2 position-relative'>
                <div className='h-25 text-end' onClick={() => {
                    if(props.basketId && props.device.id) {
                        props.deleteDeviceFromBasket({basketId: props.basketId, deviceId: props.device.id, dispatch})
                    }
                }}>
                    <FontAwesomeIcon className='btn' icon={faTrash as IconProp}/>
                </div>
                <div className={style.devicePrice}>
                     <span>Price: {props.device.price}</span>
                    <span>₴</span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    basketId: state.basketPage.basket.id
})

const connector = connect(mapStateToProps, {changeCountOfProducts, deleteDeviceFromBasket})
type ReduxPropsType = ConnectedProps<typeof connector>

type BasketDeviceOwnProps = {
    device: Device,
    countOfProducts?: number,
}
type BasketDevicePropsType = ReduxPropsType & BasketDeviceOwnProps

export default connector(BasketDevice)
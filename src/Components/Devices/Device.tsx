import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faCartShopping, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as style from './Devices.module.scss'
import { addDeviceToBasket, deleteDeviceFromBasket, getDevicesFromBasket, getOneDevice } from "../../redux/basketSlice";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store";
import { setNotification } from "../../redux/notificationSlice";
import { deleteType, getBrandsThunk, getDevicesThunk, getTypesThunk, setCurrentPage } from "../../redux/deviceSlice";
import { Device as DeviceType } from "../../redux/types";
import RatingStars from "../common/RatingStars/RatingStars";
import { useAppDispatch } from "src/hook";


import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Device: React.FC<DevicePropsType> = (props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const redirectToSomePage = (redirectPath: string) => {
        navigate(redirectPath, { replace: true })
    }
    const [toggleBasketBtn, setToggleBasketBtn] = useState(false)
    const checkBasketBtn = () => {
        if (Array.isArray(props.devicesFromBasket)) {
            let check = true
            props.devicesFromBasket.forEach((device: DeviceType) => {
                if (device.id === props.device.id) {
                    setToggleBasketBtn(true)
                    check = false
                }
            })
            if (check) {
                setToggleBasketBtn(false)
            }
        }
    }
    useEffect(() => {
        checkBasketBtn()
    }, [props.devicesFromBasket])
    useEffect(() => {
        checkBasketBtn()
    }, [props.device])

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    interface ExpandMoreProps extends IconButtonProps {
        expand: boolean;
    }

    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    return (
        // <div className={`${style.deviceCard}`}>
        //     <div className={style.deviceCardImg}>
        //         <img src={`http://localhost:5000/${props.device.img}`}
        //             alt={'device'} onClick={() => {
        //             redirectToSomePage(`/device/${props.device.id}`)
        //         }} />
        //     </div>
        //     <div className={'card-body'}>
        //         <div className={style.cardTextName}>{props.device.name}</div>
        //         <div className={style.cardTextPrice}>
        //             <span>Price: {props.device.price}</span>
        //             <span>₴</span>
        //         </div>
        // <div className={style.cardTextRating}>
        //     Rating: {props.device.rating ? <RatingStars rating={props.device.rating}/> : <RatingStars rating={0}/>}   
        // </div>
        //         <div className={style.shoppingBtn} onClick={()=>{
        //             if(props.basketId) {
        //                 if(toggleBasketBtn){
        //                     if(props.device.id) props.deleteDeviceFromBasket({basketId: props.basketId, deviceId: props.device.id, dispatch})
        //                     setToggleBasketBtn(false)
        //                 } else {
        //                     if(props.device.id) { 
        //                         props.addDeviceToBasket({basketId: props.basketId, deviceId: props.device.id})
        //                         props.getOneDevice({deviceId: props.device.id})
        //                     }
        //                     setToggleBasketBtn(true)
        //                 }
        //             } else {
        //                 redirectToSomePage('/auth')
        //                 props.setNotification('Вы не вошли в свой аккаунт, ввойдите перед покупкой', true)
        //                 setTimeout(()=>{
        //                     props.setNotification('', false)
        //                 }, 2000)
        //             }

        //         }}>
        //             <FontAwesomeIcon className={style.shoppingBtnIcon} icon={faCartShopping as IconProp}/>
        //             {toggleBasketBtn ?
        //                 <FontAwesomeIcon className={style.deviceInBasketIcon} icon={faCircleCheck as IconProp}/> : null}
        //         </div>
        //     </div>
        // </div> 
        <Card sx={{ maxWidth: 275, marginBottom: '1rem', marginX: '1rem' }} >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title={props.device.name}
            />
            <CardMedia onClick={() => {
                navigate(`/device/${props.device.id}`, { replace: true })
            }}
                sx={{ ":hover": { cursor: 'pointer' } }}
                component="img"
                height="194"
                image={`http://localhost:5000/${props.device.img}`}
                alt={props.device.name}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    {`${props.device.title}`}
                    <div className={style.cardTextRating}>
                        Rating: {props.device.rating ? <RatingStars rating={props.device.rating} /> : <RatingStars rating={0} />}
                    </div>
                </Typography>
                <Typography variant="h5">
                    {`Price: ${props.device.price} грн`}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <div onClick={() => {
                        if (props.basketId) {
                            if (toggleBasketBtn) {
                                if (props.device.id) props.deleteDeviceFromBasket({ basketId: props.basketId, deviceId: props.device.id, dispatch })
                                setToggleBasketBtn(false)
                            } else {
                                if (props.device.id) {
                                    props.addDeviceToBasket({ basketId: props.basketId, deviceId: props.device.id })
                                    props.getOneDevice({ deviceId: props.device.id })
                                }
                                setToggleBasketBtn(true)
                            }
                        } else {
                            redirectToSomePage('/auth')
                            props.setNotification('Вы не вошли в свой аккаунт, ввойдите перед покупкой', true)
                            setTimeout(() => {
                                props.setNotification('', false)
                            }, 2000)
                        }

                    }}>
                        <FontAwesomeIcon className={style.shoppingBtnIcon} icon={faCartShopping as IconProp} />
                        {toggleBasketBtn ?
                            <FontAwesomeIcon className={style.deviceInBasketIcon} icon={faCircleCheck as IconProp} /> : null}
                    </div>
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{props.device.description}</Typography>
                </CardContent>
            </Collapse>
        </Card>
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

const connector = connect(mapStateToProps, {
    getDevicesThunk, getBrandsThunk, getTypesThunk, setCurrentPage, deleteType, addDeviceToBasket, getDevicesFromBasket,
    deleteDeviceFromBasket, setNotification, getOneDevice
})

type PropsFromRedux = ConnectedProps<typeof connector>
type DevicePropsType = PropsFromRedux & ownPropsType

export default connector(Device)
import React, {useEffect} from "react";
import {connect, ConnectedProps} from "react-redux";
import DevicePage from "./DevicePage";
import {useNavigate, useParams} from "react-router-dom";
import {addYourDeviceRatingThunk, getBrandThunk, getDeviceThunk} from "../../../redux/deviceSlice";
import {setNotification} from "../../../redux/notificationSlice";
import { RootState } from "../../../redux/store";

const DevicePageContainer: React.FC<DevicePageContainerPropsType> = (props) => {
    const params = useParams()
    const navigate = useNavigate()
    const redirectToSomePage = (redirectPath: string) =>{
        navigate(redirectPath, {replace: true})
    }
    useEffect(() => {
        props.getDeviceThunk({deviceId: Number(params.deviceId)})
    }, [])

    useEffect(()=>{
        if(props.device.id){
            if(props.device.brandId) props.getBrandThunk({brandId: props.device.brandId})
        }
    }, [props.device])
    return (
        <div>
            {props.device.id && props.brand.id ?
                <DevicePage redirectToSomePage={redirectToSomePage} />
                : null}
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    device: state.devicesPage.device,
    brand: state.devicesPage.brand
})

const connector = connect(mapStateToProps, {getBrandThunk, addYourDeviceRatingThunk, setNotification, getDeviceThunk})
type PropsFromRedux = ConnectedProps<typeof connector>
type DevicePageContainerPropsType = PropsFromRedux

export default connector(DevicePageContainer)
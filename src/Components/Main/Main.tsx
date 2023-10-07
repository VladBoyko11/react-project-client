import React, {useEffect} from "react";
import './Main.module.scss'
import DevicesContainer from "../Devices/DevicesContainer";
import {Route, Routes} from "react-router-dom";
import Login from "../Login/Login";
import AdminPage from "../AdminPage/AdminPage";
import User from "../UserPage/User";
import Registration from "../Login/Registration";
import {connect, ConnectedProps} from "react-redux";
import {getTypesThunk} from "../../redux/deviceSlice";
import DevicePageContainer from "../Devices/DevicePage/DevicePageContainer";
import NotificationContainer from "../common/Notification/NotificationContainer";
import BasketContainer from "../BasketPage/BasketContainer";
import { RootState } from "../../redux/store";
import { Device, Type } from "../../redux/types";

const Main: React.FC<MainProps> = (props) => {

    useEffect(() => {
        props.getTypesThunk({typeName: undefined})
    }, [])

    return (
        <main>
            <Routes>
                <Route path="/devices/" element={
                    <DevicesContainer />}
                >
                    <Route path={`:typeName`} element={<DevicesContainer />}/>
                </Route>
                <Route path='/device'>
                    <Route path={':deviceId'} element={<DevicePageContainer />}/>
                </Route>
                <Route path="/auth" element={
                    <Login />}
                />
                <Route path="/admin-page/*" element={
                    <AdminPage />}
                />
                <Route path="/user/*" element={
                    <User />}
                />
                <Route path="/registration" element={
                    <Registration />}
                />
                <Route path="/basket" element={
                    <BasketContainer />}
                />
            </Routes>
            {props.toggleNotification ? <NotificationContainer /> : null}
        </main>
    )
}

type mapStateToPropsType = {
    types: Array<Type>
    devices: Array<Device>
    toggleNotification: boolean
    message: string
    store: any
}

const mapStateToProps = (state: RootState) => ({
    types: state.devicesPage.types,
    devices: state.devicesPage.devices,
    toggleNotification: state.notificationPage.toggleNotification,
    message: state.notificationPage.message
})

const connector = connect(mapStateToProps, {getTypesThunk})
type PropsFromRedux = ConnectedProps<typeof connector>
type MainProps = PropsFromRedux & mapStateToPropsType

export default connector(Main)
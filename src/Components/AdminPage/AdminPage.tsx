import React from "react";
import {Route, useNavigate, Routes} from "react-router-dom";
import AddNewDevice from "./AddNewDevice";
import AddNewType from "./AddNewType";
import AddNewBrand from "./AddNewBrand";
import { Button } from "@mui/material";
import * as style from './AdminPage.scss'

const AdminPage: React.FC = () => {
    const navigate = useNavigate()
    const redirectToSomePage = (redirectPath: string) =>{
        navigate(redirectPath, {replace: true})
    }

    return (
        <div className={style.adminPage}>
            <h2 className={style.adminPageHeader}>ADMIN PAGE</h2>
            <div className={style.adminPageButtons}>
                <Button variant="contained" fullWidth onClick={() => {
                    redirectToSomePage('/admin-page/add-new-device')}}>Add new device</Button>
                <Button variant="contained" fullWidth onClick={() => {
                    redirectToSomePage('/admin-page/add-new-type')}}>Add new type</Button>
                <Button variant="contained" fullWidth onClick={() => {
                    redirectToSomePage('/admin-page/add-new-brand')}}>Add new brand</Button>
            </div>
            <div className={style.rightMainContant}>
                <Routes >
                    <Route path="add-new-device" element={
                        <AddNewDevice />}
                    />
                    <Route path="add-new-type" element={
                        <AddNewType />}
                    />
                    <Route path="add-new-brand" element={
                        <AddNewBrand />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default AdminPage
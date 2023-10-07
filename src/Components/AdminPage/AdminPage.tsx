import React from "react";
import {Route, useNavigate, Routes} from "react-router-dom";
import AddNewDevice from "./AddNewDevice";
import AddNewType from "./AddNewType";
import AddNewBrand from "./AddNewBrand";

const AdminPage: React.FC = () => {

    const navigate = useNavigate()
    const redirectToSomePage = (redirectPath: string) =>{
        navigate(redirectPath, {replace: true})
    }

    return (
        <div className={'d-flex flex-wrap'}>
            <h2 className={'w-100 text-center'}>ADMIN PAGE</h2>
            <div className={'navbar w-25 border-top border-end h-25'}>
                <button className='btn-warning m-2 w-100 d-flex' onClick={() => {
                    redirectToSomePage('/admin-page/add-new-device')}}>Add new device</button>
                <button className='btn-warning m-2 w-100 mb-2 d-flex' onClick={() => {
                    redirectToSomePage('/admin-page/add-new-type')}}>Add new type</button>
                <button className='btn-warning m-2 w-100 mb-2 d-flex' onClick={() => {
                    redirectToSomePage('/admin-page/add-new-brand')}}>Add new brand</button>
            </div>
            <div className={'ms-5'}>
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
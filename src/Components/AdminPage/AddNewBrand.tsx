import React from "react";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import {renderField} from "../common/FormControl";
import {connect, ConnectedProps} from "react-redux";
import {addBrand} from '../../redux/adminPageSlice';
import { Brand } from "../../redux/types";
import { Button, FormGroup, FormLabel } from "@mui/material";

import * as style from './AdminPage.scss'
import { useNavigate } from "react-router-dom";
const AddNewBrand: React.FC<AddNewBrandPropsType> = (props) => {
    const navigate = useNavigate()
    const submitForm: FormSubmitHandler = (formData: {brand?: string}) => {
        props.addBrand({name: formData.brand})
        // redirectToSomePage('/admin-page', {replace: true})
        navigate('/admin-page', {replace: true})
    }
    return (
        <AddNewBrandReduxForm onSubmit={submitForm}/>
    )
}

const AddNewBrandForm: React.FC<InjectedFormProps<Brand>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={style.addNewTypeBrandForm}>
            <FormGroup>
                <FormLabel htmlFor="brand">New brand</FormLabel>
                <Field id="brand" placeholder='brand' name='brand' component={renderField}></Field>
            </FormGroup>
            <Button variant="contained" type='submit'>Create</Button>
        </form>
    )
}

const AddNewBrandReduxForm = reduxForm({
    form: 'addNewBrand'
})(AddNewBrandForm)

const connector = connect(() => ({}), { addBrand })
type ReduxPropsType = ConnectedProps<typeof connector>
type AddNewBrandPropsType = ReduxPropsType

export default connector(AddNewBrand)
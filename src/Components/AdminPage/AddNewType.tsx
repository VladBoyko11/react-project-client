import React from "react";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import {renderField} from "../common/FormControl";
import {connect, ConnectedProps} from "react-redux";
import {addType} from "../../redux/adminPageSlice";
import { RootState } from "../../redux/store";
import useRedirectToSomePage from "../common/RedirectToSomePage";
import { Type } from "../../redux/types";
import { Button, FormGroup, FormLabel } from "@mui/material";
import * as style from './AdminPage.scss'
import { useNavigate } from "react-router-dom";

const AddNewType: React.FC<AddNewTypeProps> = (props) => {
    const navigate = useNavigate();
    const submitForm: FormSubmitHandler = (formData: {type?: string}) => {
        if(formData.type) props.addType({name: formData.type})
        // useRedirectToSomePage('/admin-page', {replace: true})
        navigate('/admin-page', {replace: true})
    }
    return (
        <AddNewTypeReduxForm onSubmit={submitForm}/>
    )
}

const AddNewTypeForm: React.FC<InjectedFormProps<Type>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={style.addNewTypeBrandForm}>
            <FormGroup>
                <FormLabel htmlFor="type">New type</FormLabel>
                <Field id="type" placeholder='type' name='type' component={renderField}/>
            </FormGroup>
            <Button variant="contained" type='submit'>Create</Button>
        </form>
    )
}

const AddNewTypeReduxForm = reduxForm({
    form: 'addNewType'
})(AddNewTypeForm)

const mapStateToProps = (state: RootState) => ({
    type: state.adminPage.type
})

const connector = connect(mapStateToProps, { addType })
type ReduxPropsType = ConnectedProps<typeof connector>
type AddNewTypeProps = ReduxPropsType

export default connector(AddNewType)
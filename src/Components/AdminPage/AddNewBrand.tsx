import React from "react";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import {renderField} from "../common/FormControl";
import {connect, ConnectedProps} from "react-redux";
import {addBrand} from '../../redux/adminPageSlice';
import redirectToSomePage from '../common/RedirectToSomePage'
import { Brand } from "../../redux/types";

const AddNewBrand: React.FC<AddNewBrandPropsType> = (props) => {

    const submitForm: FormSubmitHandler = (formData: {brandName?: string}) => {
        props.addBrand({name: formData.brandName})
        redirectToSomePage('/admin-page', {replace: true})
    }
    return (
        <AddNewBrandReduxForm onSubmit={submitForm}/>
    )
}

const AddNewBrandForm: React.FC<InjectedFormProps<Brand>> = ({handleSubmit}) => {
    return (
        <form className="" onSubmit={handleSubmit}>
            <form>
                <label htmlFor="brand">New brand</label>
                <Field id="brand" placeholder='brand' name='brand' component={renderField}/>
            </form>
            <button className={'btn-warning'} type='submit'>Create</button>
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
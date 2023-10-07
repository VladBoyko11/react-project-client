import React from "react";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import {renderField} from "../common/FormControl";
import {connect, ConnectedProps} from "react-redux";
import {addType} from "../../redux/adminPageSlice";
import { RootState } from "../../redux/store";
import redirectToSomePage from "../common/RedirectToSomePage";
import { Type } from "../../redux/types";

const AddNewType: React.FC<AddNewTypeProps> = (props) => {

    const submitForm: FormSubmitHandler = (formData: {type?: string}) => {
        if(formData.type) props.addType({name: formData.type})
        redirectToSomePage('/admin-page', {replace: true})
    }
    return (
        <AddNewTypeReduxForm onSubmit={submitForm}/>
    )
}

const AddNewTypeForm: React.FC<InjectedFormProps<Type>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="type">New type</label>
                <Field id="type" placeholder='type' name='type' component={renderField}/>
            </div>
            <button className={'btn-warning'} type='submit'>Create</button>
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
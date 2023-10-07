import React, {useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {setNewEmail} from "../../redux/authSlice";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import style from './User.module.scss'
import {email} from "../common/Validators/Validators";
import { RootState } from "../../redux/store";
import { renderField } from "../common/FormControl";

const PersonalData: React.FC<PersonalDataPropsType> = (props) => {
    const [formEditEmailActive, setFormEditEmailActive] = useState(false)

    const submitForm: FormSubmitHandler = (formData: {newEmail?: string}) => {
        if(formData.newEmail) props.setNewEmail({email: formData.newEmail, id: props.userId})
    }
    return (
        <div className={'ms-4'}>
            <h4>Your email address: {props.email}</h4>
            {formEditEmailActive ? <EditEmailReduxForm onSubmit={submitForm}/>: null}
            <div>
                <button className={'btn btn-warning w-25'} onClick={() => {
                    setFormEditEmailActive(true)
                }
                }>Edit email</button>
            </div>
            <div/>
        </div>
    )
}

const EditEmailForm:  React.FC<InjectedFormProps> = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit} className={'w-75'}>
        <>
            <label>New email: </label>
            {error && <div className={'bg-danger'}>ERROR</div>}
            <Field className={'w-50'} placeholder='enter your new email' name='newEmail' component={renderField} validate={[email]}/>
        </>
        <button type='submit' className={style.submitBtn}>Enter</button>
    </form>
}

const EditEmailReduxForm = reduxForm({
    form: 'editEmailForm'
})(EditEmailForm)

const mapStateToProps = (state: RootState) => ({
    userId: state.auth.id,
    email: state.auth.email
})

const connector = connect(mapStateToProps, {setNewEmail})
type ReduxPropsType = ConnectedProps<typeof connector>
type PersonalDataPropsType = ReduxPropsType

export default connector(PersonalData)
import React from "react";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import {registration} from "../../redux/authSlice";
import {connect, ConnectedProps} from "react-redux";
import {useNavigate} from "react-router-dom";
import {renderField} from "../common/FormControl";
import { RootState } from "../../redux/store";
import { FormComponent } from "./FormComponent";

const Registration: React.FC<RegistrationPropsType> = (props) => {

    const submitForm: FormSubmitHandler = (formData: {email?: string, password?: string}) => {
        // if(formData.email && formData.password) props.registration({email: formData.email, password: formData.password})
        console.log(formData.email + ": " + formData.password)
    }

    const navigate = useNavigate()
    if(props.isAuth){
        navigate('/user', {replace: true})
        return null
    }

    return (
        <div>
            <h1>Registration</h1>
            <LoginReduxForm {...props} onSubmit={submitForm}/>
        </div>
    )
}

const LoginForm: React.FC<InjectedFormProps> = (props) => {
    return <FormComponent {...props}/>
}

const LoginReduxForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth
})

const connector =  connect(mapStateToProps, { registration })

type PropsFromRedux = ConnectedProps<typeof connector>
type RegistrationPropsType = PropsFromRedux  

export default connector(Registration)
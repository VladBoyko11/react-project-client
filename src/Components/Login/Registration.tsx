import React, { useEffect } from "react";
import { Field, FormSubmitHandler, InjectedFormProps, reduxForm } from "redux-form";
import { registration } from "../../redux/authSlice";
import { connect, ConnectedProps } from "react-redux";
import { useNavigate } from "react-router-dom";
import { renderField } from "../common/FormControl";
import { RootState } from "../../redux/store";
import { FormComponent } from "./FormComponent";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as style from './Login.module.scss'
import { setBasketThunk } from "src/redux/basketSlice";

const Registration: React.FC<RegistrationPropsType> = (props) => {

    const submitForm: FormSubmitHandler = (formData: { email?: string, password?: string }) => {
        if(formData.email && formData.password) props.registration({email: formData.email, password: formData.password})
        // console.log(formData.email + ": " + formData.password)
    }

    const navigate = useNavigate()
    if (props.isAuth) {
        navigate('/user', { replace: true })
        return null
    }

    useEffect(() => {
        if (props.isAuth) {
            props.setBasketThunk({ userId: props.userId })
        }
    }, [props.isAuth])

    const theme = createTheme({
        palette: {
            primary: {
                main: '#6610f2',
            },
        },
    });

    return (
        <ThemeProvider theme={theme} >
            <div className={style.authPage}>
                <h1 className={style.authHeader}>Registration</h1>
                <LoginReduxForm {...props} onSubmit={submitForm} />
            </div>
        </ThemeProvider>
    )
}

const LoginForm: React.FC<InjectedFormProps> = (props) => {
    return <FormComponent {...props} variant={'Registration'}/>
}

const LoginReduxForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.id
})

const connector = connect(mapStateToProps, { registration, setBasketThunk })

type PropsFromRedux = ConnectedProps<typeof connector>
type RegistrationPropsType = PropsFromRedux

export default connector(Registration)
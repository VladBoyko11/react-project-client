import React, { useEffect } from "react";
import { Field, FormSubmitHandler, InjectedFormProps, reduxForm } from "redux-form";
import { login } from "../../redux/authSlice";
import { connect, ConnectedProps } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {Input} from "../common/FormControl";
import { setBasketThunk } from "../../redux/basketSlice";
import { RootState } from "../../redux/store";
import { renderField } from "../common/FormControl";
import { email, required } from "../common/Validators/Validators";
import { FormComponent } from "./FormComponent";

import Input from '@mui/material/Input';
import * as style from './Login.module.scss'
import { Alert, Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
const Login: React.FC<LoginPropsType> = (props) => {
    const submitForm: FormSubmitHandler = (formData: { email?: string, password?: string }) => {
        if (formData.email && formData.password) props.login({ email: formData.email, password: formData.password })
    }

    useEffect(() => {
        if (props.isAuth) {
            props.setBasketThunk({ userId: props.id })
        }
    }, [props.isAuth])

    const navigate = useNavigate()
    if (props.isAuth) {
        navigate('/user', { replace: true })
        return null
    }

    const registrationAccount = () => {
        navigate('/registration', { replace: true })
        return null
    }

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
                <h1 className={style.authHeader}>Login</h1>
                <LoginReduxForm {...props} onSubmit={submitForm} />
                <Alert variant="filled" sx={{ marginTop: '0.5rem' }} color="warning" severity="warning">If you don`t have account please <Button onClick={registrationAccount} variant="contained" sx={{marginX: '5px'}}>registration it</Button></Alert>
            </div>
        </ThemeProvider>
    )
}

const LoginForm: React.FC<InjectedFormProps> = (props) => {
    return <FormComponent {...props} variant={'Login'}/>
}

const LoginReduxForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
    id: state.auth.id
})

const connector = connect(mapStateToProps, { login, setBasketThunk })
type ReduxPropsType = ConnectedProps<typeof connector>
type LoginPropsType = ReduxPropsType

export default connector(Login)
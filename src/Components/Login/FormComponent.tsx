import React from 'react'
import { Field, InjectedFormProps } from "redux-form"
import { renderField } from "../common/FormControl"
import { email, required } from "../common/Validators/Validators"
import { Button, FormControl } from '@mui/material'
import * as style from './Login.module.scss'

export const FormComponent: React.FC<InjectedFormProps & {variant: string}> = (props) => {
    return (
            <form onSubmit={props.handleSubmit} className={style.formAuth}>
                <FormControl className={style.formGroup}>
                    <Field id="email" label='Email address' name='email' type="email" component={renderField} validate={[required, email]} />
                </FormControl>
                <FormControl className={style.formGroup}>
                    <Field id="password" label='Password' name='password' type="password" component={renderField} validate={[required]} />
                </FormControl>
                <Button variant='contained' sx={{width: '80%', margin: '0 auto', borderRadius: '2rem'}} type='submit'>{props.variant}</Button>
            </form>
    )
}
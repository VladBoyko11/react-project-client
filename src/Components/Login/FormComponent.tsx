import React from 'react'
import { Field, InjectedFormProps } from "redux-form"
import { renderField } from "../common/FormControl"
import { email, required } from "../common/Validators/Validators"

export const FormComponent: React.FC<InjectedFormProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset className=" form-control">
                <Field id="email" label='Email address' name='email' type="email" component={renderField} validate={[required, email]}/>
            </fieldset>
            <fieldset className=" form-control">
                <Field id="password" label='Password' name='password' type="password" component={renderField} validate={[required]}/>
            </fieldset>
                <div> <button type='submit'>Login</button> </div>
        </form>
    )
}
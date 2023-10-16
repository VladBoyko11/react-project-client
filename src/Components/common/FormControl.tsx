import { FormLabel, Input } from "@mui/material"
import React, { HTMLInputTypeAttribute } from "react"
import { WrappedFieldProps } from "redux-form"
import * as style from './FormControl.scss';

// export const Textarea = ({input, meta, ...props}) => {
//     return (
//         <div className={style.inputPostContainer}>
//             <textarea {...input} {...props} className={meta.error && meta.touched ? style.formError + ' '
//                 + style.inputPost : style.inputPost} />
//             {meta.error && meta.touched && <div><span className={style.error}>{meta.error}</span></div>}
//         </div>
//     )
// }

// export const TextareaMessage = ({input, meta, ...props}) => {
//     return (
//         <div>
//             <textarea {...input} {...props} className={meta.error && meta.touched ? style.formError + ' '
//                 + style.inputPost : style.inputPost} />
//             {meta.error && meta.touched && <div><span className={style.error}>{meta.error}</span></div>}
//         </div>
//     )
// }
import { Alert } from '@mui/material';

interface IRenderField {
    id?: string,
    label: string,
    type: HTMLInputTypeAttribute
}

export const renderField = ({ input, id, label, type, meta: { touched, error, warning } }: IRenderField & WrappedFieldProps) => {
    return <div className={style.formGroup}>
            <FormLabel sx={{ fontSize: '0.875rem'}} color="primary" htmlFor={id}>{label}</FormLabel>
            <div>
                <Input sx={{ fontSize: '0.875rem'}} className={style.formAuthInput} color="primary" id={id} {...input} placeholder={label} type={type} />
                {touched && ((error && <Alert variant="filled" sx={{marginTop: '0.5rem'}} color="error" severity="error">{error}</Alert>) || (warning && <Alert color="warning" severity="warning">{warning}</Alert>))}
            </div>
    </div>
}
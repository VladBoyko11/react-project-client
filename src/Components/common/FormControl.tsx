import React, { HTMLInputTypeAttribute } from "react"
import { WrappedFieldProps } from "redux-form"

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

interface IRenderField {
    id?: string,
    label: string, 
    type: HTMLInputTypeAttribute
}

export const renderField = ({ input, id, label, type, meta: { touched, error, warning } }: IRenderField & WrappedFieldProps) => {
    return <div>
        <label htmlFor={id}>{label}</label>
        <div>
            <input id={id} {...input} placeholder={label} type={type} />
            {touched && ((error && <div>{error}</div>) || (warning && <div>{warning}</div>))}
        </div>
    </div>
}
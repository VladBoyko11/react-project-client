export const required = (value: any) => {
    if(value) return undefined
    return 'This field is required'
}

export const maxLength = (length: number) => (value: any) => {
    if(value.length <= length) return undefined
    return `max length is ${length}`
}

export const email = (value: string) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
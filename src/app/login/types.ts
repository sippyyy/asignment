
export enum EFormType {
    LOGIN = 'login',
    REGISTER = 'register'
}
export interface ILoginFormData {
    email: string
    password: string
}

export interface IAuthenticationFormData extends ILoginFormData {
    confirmPassword?: string
}

export type TFormType = EFormType.LOGIN | EFormType.REGISTER

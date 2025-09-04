import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import StyledTextField from '../../reusableComponents/StyledTextField';
import { authenticationInfoSchema, registerInfoSchema } from '../constants'
import { EFormType, IAuthenticationFormData, ILoginFormData, TFormType } from '../types'
import { useUsersStore } from '../../store/usersStore'
import { useAuthStore } from '../../store/authStore'
import StyledButton from '@/app/reusableComponents/StyledButton';
import { useRouter } from 'next/navigation';

const LoginForm = () => {

    const [rememberMe, setRememberMe] = useState(false)
    const [formType, setFormType] = useState<TFormType>(EFormType.LOGIN)
    const { addUser } = useUsersStore()
    const { login } = useAuthStore()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<IAuthenticationFormData>({
        resolver: yupResolver(formType === EFormType.LOGIN ? authenticationInfoSchema : registerInfoSchema)
    })

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail')
        if (savedEmail) {
            setValue('email', savedEmail)
            setRememberMe(true)
        }
    }, [setValue])


    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked
        setRememberMe(isChecked)

        if (!isChecked) {
            localStorage.removeItem('rememberedEmail')
        }
    }

    const onSubmit = async (data: ILoginFormData) => {
        try {
            if (formType === EFormType.REGISTER) {
                const isSuccess = addUser(data)
                if (isSuccess) {
                    setFormType(EFormType.LOGIN)
                    setValue('email', '')
                    setValue('password', '')
                }
            }
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', data.email)
            } else {
                localStorage.removeItem('rememberedEmail')
            }
            const isSuccess = login(data)
            if (isSuccess) return router.replace('/')
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-xxl min-h-[70%] w-full m-md md:w-2/3 lg:w-1/3 ">
            <div className="text-center mb-8">
                <h1 className="text-title-xl font-bold text-main-venice mb-2">
                    {formType === 'login' ? 'Welcome Back' : 'Create an Account'}
                </h1>
                <p className="text-md text-gray-600">
                    {formType === 'login' ? 'Sign in to your account' : 'Create an account to get started'}
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <StyledTextField
                        label="Email Address"
                        id="email"
                        placeholder="Enter your email"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <StyledTextField
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                    )}
                </div>

                {formType === EFormType.REGISTER && (
                    <div>
                        <StyledTextField
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                )}

                {formType === EFormType.LOGIN && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                                className="h-4 w-4 text-main-shine focus:ring-main-shine border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm text-main-venice hover:text-main-shine transition-colors">
                            Forgot password?
                        </a>
                    </div>
                )}

                <StyledButton
                    textTitle={formType === EFormType.LOGIN ? 'Sign In' : 'Sign Up'}
                    isDisabled={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                />
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                    <span className="text-sm text-gray-600">{formType === EFormType.LOGIN ? "Don't have an account? " : "Already have an account? "}</span>
                    <span onClick={() => setFormType(formType === EFormType.LOGIN ? EFormType.REGISTER : EFormType.LOGIN)} className="text-sm cursor-pointer font-medium text-main-venice hover:text-main-shine transition-colors">
                        {formType === EFormType.LOGIN ? 'Sign up here' : 'Sign in here'}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
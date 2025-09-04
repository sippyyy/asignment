'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Container from '../reusableComponents/Container';
import { useAuthStore } from '../store/authStore'
import LoginForm from './components/LoginForm'
import { Dialog } from 'radix-ui'
import DialogPopUp from '../reusableComponents/DialogPopUp'
import { useRouter } from 'next/navigation'

const Login = () => {
  const { error, clearLoginError } = useAuthStore()  
  const {isAuthenticated} = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.replace('/')
  },[isAuthenticated,router])

  return (
    <div className="flex relative h-screen">
      <Image src="/image/login_bg.jpg" alt="Login Background" width={100} height={100} className='object-cover absolute w-full h-full z-[-1]' />
      <Container className='flex items-center  justify-center lg:justify-end'>
        <LoginForm />
      </Container>
      {error && <DialogPopUp isOpen={!!error} details={{title:"Error", description:error}} onClose={()=>clearLoginError()} />}
    </div>
  )
}

export default Login;
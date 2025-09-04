import {create} from 'zustand'
import { ILoginFormData } from '../login/types'
import { useUsersStore } from './usersStore'

interface AuthState {
    isAuthenticated: boolean
    error: string | null
    currentUserEmail: string | null
    login: (data: ILoginFormData) => boolean
    clearLoginError: () => void
    logout: () => void
} 

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    error: null,
    currentUserEmail: null,
    clearLoginError: () => {
        set({ error: null })
    },
    login: (data: ILoginFormData) => {
        const { email, password } = data
        const isValid = useUsersStore.getState().validateUser(email, password)
        if (isValid){
            set({ isAuthenticated: true, error: null, currentUserEmail: email })
            return true
        }
        set({ isAuthenticated: false, error: 'Invalid email or password', currentUserEmail: null })
        return false
    },
    logout: () => {
        set({ isAuthenticated: false, error: null, currentUserEmail: null })
    }
}))
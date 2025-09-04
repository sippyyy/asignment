import {create} from 'zustand'
import { ILoginFormData } from '../login/types'

interface UsersStore {
  users: ILoginFormData[]
  addUser: (user: ILoginFormData) => boolean
  findUserByEmail: (email: string) => ILoginFormData | undefined
  validateUser: (email: string, password: string) => boolean
}

export const useUsersStore = create<UsersStore>((set, get) => ({
  users: [
    {
      email: "test123@gmail.com",
      password: "123456"
    }
  ],
  
  addUser: (user: ILoginFormData) => {
    set((state) => ({
      users: [...state.users, user]
    }));
    return true;
  },
  
  findUserByEmail: (email: string) => {
    return get().users.find(user => user.email === email)
  },
  
  validateUser: (email: string, password: string) => {
    const user = get().findUserByEmail(email)
    return user ? user.password === password : false
  }
}))


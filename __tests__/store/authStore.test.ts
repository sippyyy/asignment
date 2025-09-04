import { renderHook, act } from '@testing-library/react'
import { useAuthStore } from '../../src/app/store/authStore'
import { ILoginFormData } from '../../src/app/login/types'

jest.mock('../../src/app/store/usersStore', () => ({
  useUsersStore: {
    getState: jest.fn(),
  },
}))

describe('authStore', () => {
  let mockValidateUser: jest.Mock

  beforeEach(() => {
    useAuthStore.setState({
      isAuthenticated: false,
      currentUserEmail: null,
      error: null,
    })

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    })

    mockValidateUser = jest.fn()
    const mockUsersStore = require('../../src/app/store/usersStore')
    mockUsersStore.useUsersStore.getState.mockReturnValue({
      validateUser: mockValidateUser,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useAuthStore())
      
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.currentUserEmail).toBe(null)
      expect(result.current.error).toBe(null)
    })
  })

  describe('Login', () => {
    it('should successfully login with valid credentials', () => {
      mockValidateUser.mockReturnValue(true)
      
      const { result } = renderHook(() => useAuthStore())
      const loginData: ILoginFormData = { email: 'test123@gmail.com', password: '123456' }
      
      act(() => {
        const success = result.current.login(loginData)
        expect(success).toBe(true)
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.currentUserEmail).toBe('test123@gmail.com')
      expect(result.current.error).toBe(null)
      expect(mockValidateUser).toHaveBeenCalledWith('test123@gmail.com', '123456')
    })

    it('should fail login with invalid credentials', () => {
      mockValidateUser.mockReturnValue(false)
      
      const { result } = renderHook(() => useAuthStore())
      const loginData: ILoginFormData = { email: 'wrong@email.com', password: 'wrongpassword' }
      
      act(() => {
        const success = result.current.login(loginData)
        expect(success).toBe(false)
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.currentUserEmail).toBe(null)
      expect(result.current.error).toBe('Invalid email or password')
      expect(mockValidateUser).toHaveBeenCalledWith('wrong@email.com', 'wrongpassword')
    })

    it('should clear previous errors on successful login', () => {
      mockValidateUser.mockReturnValue(false)
      const { result } = renderHook(() => useAuthStore())
      const wrongLoginData: ILoginFormData = { email: 'wrong@email.com', password: 'wrongpassword' }
      
      act(() => {
        result.current.login(wrongLoginData)
      })
      
      expect(result.current.error).toBe('Invalid email or password')

      mockValidateUser.mockReturnValue(true)
      const correctLoginData: ILoginFormData = { email: 'test123@gmail.com', password: '123456' }
      
      act(() => {
        const success = result.current.login(correctLoginData)
        expect(success).toBe(true)
      })

      expect(result.current.error).toBe(null)
      expect(result.current.isAuthenticated).toBe(true)
    })
  })

  describe('Logout', () => {
    it('should logout and clear user data', () => {
      const { result } = renderHook(() => useAuthStore())
      
      mockValidateUser.mockReturnValue(true)
      const loginData: ILoginFormData = { email: 'test123@gmail.com', password: '123456' }
      act(() => {
        result.current.login(loginData)
      })
      
      expect(result.current.isAuthenticated).toBe(true)
      
      act(() => {
        result.current.logout()
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.currentUserEmail).toBe(null)
      expect(result.current.error).toBe(null)
    })
  })

  describe('Error Management', () => {
    it('should clear login error', () => {
      mockValidateUser.mockReturnValue(false)
      const { result } = renderHook(() => useAuthStore())
      
      const wrongLoginData: ILoginFormData = { email: 'wrong@email.com', password: 'wrongpassword' }
      act(() => {
        result.current.login(wrongLoginData)
      })
      
      expect(result.current.error).toBe('Invalid email or password')
      
      act(() => {
        result.current.clearLoginError()
      })
      
      expect(result.current.error).toBe(null)
    })
  })
}) 
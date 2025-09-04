import { renderHook, act } from '@testing-library/react'
import { useUsersStore } from '../../src/app/store/usersStore'

describe('usersStore', () => {
  beforeEach(() => {
    useUsersStore.setState({
      users: [{ email: 'test123@gmail.com', password: '123456' }],
    })
  })

  describe('Initial State', () => {
    it('should have initial user in the store', () => {
      const { result } = renderHook(() => useUsersStore())
      
      expect(result.current.users).toHaveLength(1)
      expect(result.current.users[0]).toEqual({
        email: 'test123@gmail.com',
        password: '123456',
      })
    })
  })

  describe('addUser', () => {
    it('should add a new user to the store', () => {
      const { result } = renderHook(() => useUsersStore())
      const newUser = { email: 'newuser@test.com', password: 'newpassword123' }
      
      act(() => {
        result.current.addUser(newUser)
      })

      expect(result.current.users).toHaveLength(2)
      expect(result.current.users).toContainEqual(newUser)
    })

    it('should add users even with duplicate email (no validation)', () => {
      const { result } = renderHook(() => useUsersStore())
      const duplicateUser = { email: 'test123@gmail.com', password: 'differentpassword' }
      
      act(() => {
        result.current.addUser(duplicateUser)
      })

      expect(result.current.users).toHaveLength(2)
      expect(result.current.users[1]).toEqual(duplicateUser)
    })
  })

  describe('findUserByEmail', () => {
    it('should find existing user by email', () => {
      const { result } = renderHook(() => useUsersStore())
      
      const foundUser = result.current.findUserByEmail('test123@gmail.com')
      
              expect(foundUser).toEqual({
          email: 'test123@gmail.com',
          password: '123456',
        })
    })

    it('should return undefined for non-existing user', () => {
      const { result } = renderHook(() => useUsersStore())
      
      const foundUser = result.current.findUserByEmail('nonexistent@test.com')
      
      expect(foundUser).toBeUndefined()
    })

    it('should be case sensitive', () => {
      const { result } = renderHook(() => useUsersStore())
      
      const foundUser = result.current.findUserByEmail('TEST123@GMAIL.COM')
      
      expect(foundUser).toBeUndefined()
    })
  })

  describe('validateUser', () => {
    it('should validate user with correct credentials', () => {
      const { result } = renderHook(() => useUsersStore())
      
      const isValid = result.current.validateUser('test123@gmail.com', '123456')
      
      expect(isValid).toBe(true)
    })

    it('should reject user with incorrect password', () => {
      const { result } = renderHook(() => useUsersStore())
      
      const isValid = result.current.validateUser('test123@gmail.com', 'wrongpassword')
      
      expect(isValid).toBe(false)
    })

    it('should reject non-existing user', () => {
      const { result } = renderHook(() => useUsersStore())
      
      const isValid = result.current.validateUser('nonexistent@test.com', 'anypassword')
      
      expect(isValid).toBe(false)
    })

    it('should reject user with empty credentials', () => {
      const { result } = renderHook(() => useUsersStore())
      
      const isValid = result.current.validateUser('', '')
      
      expect(isValid).toBe(false)
    })
  })
}) 
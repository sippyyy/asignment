import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LoginForm from '../../src/app/login/components/LoginForm'
import { useAuthStore } from '../../src/app/store/authStore'
import { useUsersStore } from '../../src/app/store/usersStore'

jest.mock('../../src/app/store/authStore', () => ({
  useAuthStore: jest.fn(),
}))
jest.mock('../../src/app/store/usersStore', () => ({
  useUsersStore: jest.fn(),
}))
const mockRouter = { replace: jest.fn(), push: jest.fn() }
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}))

jest.mock('../../src/app/reusableComponents/StyledTextField', () => {
  return React.forwardRef<HTMLInputElement, any>(({ label, ...props }, ref) => (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} data-testid={props.id} />
    </div>
  ))
})

jest.mock('../../src/app/reusableComponents/StyledButton', () => {
  return ({ textTitle, isDisabled, onClick, type }: any) => (
    <button 
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      data-testid="submit-button"
    >
      {textTitle}
    </button>
  )
})

const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>
const mockUseUsersStore = useUsersStore as jest.MockedFunction<typeof useUsersStore>
const mockLogin = jest.fn()
const mockAddUser = jest.fn()

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    mockUseAuthStore.mockReturnValue({
      login: mockLogin,
      logout: jest.fn(),
      clearLoginError: jest.fn(),
      isAuthenticated: false,
      currentUserEmail: null,
      error: null,
    })
    
    mockUseUsersStore.mockReturnValue({
      addUser: mockAddUser,
      users: [],
      findUserByEmail: jest.fn(),
      validateUser: jest.fn(),
    })

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    })
  })

  describe('Initial Rendering', () => {
    it('should render login form by default', () => {
      render(<LoginForm />)
      
      expect(screen.getByText('Welcome Back')).toBeInTheDocument()
      expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
      expect(screen.getByText('Email Address')).toBeInTheDocument()
      expect(screen.getByText('Password')).toBeInTheDocument()
      expect(screen.getByTestId('submit-button')).toHaveTextContent('Sign In')
    })

    it('should render remember me checkbox in login mode', () => {
      render(<LoginForm />)
      
      expect(screen.getByLabelText('Remember me')).toBeInTheDocument()
      expect(screen.getByText('Forgot password?')).toBeInTheDocument()
    })

    it('should render form toggle link', () => {
      render(<LoginForm />)
      
      expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
      expect(screen.getByText('Sign up here')).toBeInTheDocument()
    })
  })

  describe('Form Type Switching', () => {
    it('should switch to register form when clicking sign up link', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      
      await user.click(screen.getByText('Sign up here'))
      
      expect(screen.getByText('Create an Account')).toBeInTheDocument()
      expect(screen.getByText('Create an account to get started')).toBeInTheDocument()
      expect(screen.getByText('Confirm Password')).toBeInTheDocument()
      expect(screen.getByTestId('submit-button')).toHaveTextContent('Sign Up')
    })

    it('should switch back to login form when clicking sign in link', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      
      await user.click(screen.getByText('Sign up here'))
      expect(screen.getByText('Create an Account')).toBeInTheDocument()
      
      await user.click(screen.getByText('Sign in here'))
      expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    })

    it('should not show remember me in register mode', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      
      await user.click(screen.getByText('Sign up here'))
      
      expect(screen.queryByLabelText('Remember me')).not.toBeInTheDocument()
      expect(screen.queryByText('Forgot password?')).not.toBeInTheDocument()
    })
  })

  describe('Remember Me Functionality', () => {
    it('should load saved email on mount', () => {
      ;(localStorage.getItem as jest.Mock).mockReturnValue('saved@email.com')
      
      render(<LoginForm />)
      
      expect(localStorage.getItem).toHaveBeenCalledWith('rememberedEmail')
    })

    it('should handle remember me checkbox toggle', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      
      const rememberCheckbox = screen.getByLabelText('Remember me')
      
      expect(rememberCheckbox).not.toBeChecked()
      
      await user.click(rememberCheckbox)
      expect(rememberCheckbox).toBeChecked()
      
      await user.click(rememberCheckbox)
      expect(rememberCheckbox).not.toBeChecked()
      expect(localStorage.removeItem).toHaveBeenCalledWith('rememberedEmail')
    })
  })

  describe('Form Validation', () => {
    it('should display validation errors for empty fields', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      
      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument()
        expect(screen.getByText('Password is required')).toBeInTheDocument()
      })
    })

    it('should display email format validation error', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      
      const emailField = screen.getByTestId('email')
      const submitButton = screen.getByTestId('submit-button')
      
      await user.type(emailField, 'invalid-email')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
      })
    })

    it('should display password length validation error', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      
      const passwordField = screen.getByTestId('password')
      const submitButton = screen.getByTestId('submit-button')
      
      await user.type(passwordField, '123')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument()
      })
    })

    it('should validate password confirmation in register mode', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      
      await user.click(screen.getByText('Sign up here'))
      
      const emailField = screen.getByTestId('email')
      const passwordField = screen.getByTestId('password')
      const confirmPasswordField = screen.getByTestId('confirmPassword')
      const submitButton = screen.getByTestId('submit-button')
      
      await user.type(emailField, 'test@example.com')
      await user.type(passwordField, 'password123')
      await user.type(confirmPasswordField, 'different123')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Passwords must match')).toBeInTheDocument()
      })
    })
  })

  describe('Form Submission', () => {
    it('should handle successful login', async () => {
      const user = userEvent.setup()
      mockLogin.mockReturnValue(true)
      
      render(<LoginForm />)
      
      const emailField = screen.getByTestId('email')
      const passwordField = screen.getByTestId('password')
      const submitButton = screen.getByTestId('submit-button')
      
      await user.type(emailField, 'test@example.com')
      await user.type(passwordField, 'password123')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
        })
        expect(mockRouter.replace).toHaveBeenCalledWith('/')
      })
    })

    it('should handle failed login', async () => {
      const user = userEvent.setup()
      mockLogin.mockReturnValue(false)
      
      render(<LoginForm />)
      
      const emailField = screen.getByTestId('email')
      const passwordField = screen.getByTestId('password')
      const submitButton = screen.getByTestId('submit-button')
      
      await user.type(emailField, 'wrong@example.com')
      await user.type(passwordField, 'wrongpassword')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'wrong@example.com',
          password: 'wrongpassword',
        })
        expect(mockRouter.replace).not.toHaveBeenCalled()
      })
    })

    it('should handle user registration', async () => {
      const user = userEvent.setup()
      mockAddUser.mockReturnValue(true)
      mockLogin.mockReturnValue(true)
      
      render(<LoginForm />)
      
      await user.click(screen.getByText('Sign up here'))
      
      const emailField = screen.getByTestId('email')
      const passwordField = screen.getByTestId('password')
      const confirmPasswordField = screen.getByTestId('confirmPassword')
      const submitButton = screen.getByTestId('submit-button')
      
      await user.type(emailField, 'newuser@example.com')
      await user.type(passwordField, 'password123')
      await user.type(confirmPasswordField, 'password123')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockAddUser).toHaveBeenCalledWith({
          email: 'newuser@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        })
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'newuser@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        })
      })
    })

    it('should save email to localStorage when remember me is checked', async () => {
      const user = userEvent.setup()
      mockLogin.mockReturnValue(true)
      
      render(<LoginForm />)
      
      const emailField = screen.getByTestId('email')
      const passwordField = screen.getByTestId('password')
      const rememberCheckbox = screen.getByLabelText('Remember me')
      const submitButton = screen.getByTestId('submit-button')
      
      await user.type(emailField, 'test@example.com')
      await user.type(passwordField, 'password123')
      await user.click(rememberCheckbox)
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith('rememberedEmail', 'test@example.com')
      })
    })

    it('should remove email from localStorage when remember me is unchecked', async () => {
      const user = userEvent.setup()
      mockLogin.mockReturnValue(true)
      
      render(<LoginForm />)
      
      const emailField = screen.getByTestId('email')
      const passwordField = screen.getByTestId('password')
      const submitButton = screen.getByTestId('submit-button')
      
      await user.type(emailField, 'test@example.com')
      await user.type(passwordField, 'password123')     
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(localStorage.removeItem).toHaveBeenCalledWith('rememberedEmail')
      })
    })
  })

  describe('Form State Management', () => {
    it('should render submit button correctly', () => {
      render(<LoginForm />)
      
      const submitButton = screen.getByTestId('submit-button')
      
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('type', 'submit')
      expect(submitButton).toHaveTextContent('Sign In')
    })
  })

  describe('Error Handling', () => {
    it('should handle submission errors gracefully', async () => {
      const user = userEvent.setup()
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      mockLogin.mockImplementation(() => {
        throw new Error('Network error')
      })
      
      render(<LoginForm />)
      
      const emailField = screen.getByTestId('email')
      const passwordField = screen.getByTestId('password')
      const submitButton = screen.getByTestId('submit-button')
      
      await user.type(emailField, 'test@example.com')
      await user.type(passwordField, 'password123')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Login error:', expect.any(Error))
      })
      
      consoleSpy.mockRestore()
    })
  })
}) 
import * as yup from 'yup'

  const authenticationInfoSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const registerInfoSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
})

describe('Validation Schemas', () => {
  describe('authenticationInfoSchema', () => {
    it('should validate correct email and password', async () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      }

      await expect(authenticationInfoSchema.validate(validData)).resolves.toEqual(validData)
    })

    it('should reject invalid email format', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      }

      await expect(authenticationInfoSchema.validate(invalidData)).rejects.toThrow('Invalid email format')
    })

    it('should reject missing email', async () => {
      const invalidData = {
        password: 'password123',
      }

      await expect(authenticationInfoSchema.validate(invalidData)).rejects.toThrow('Email is required')
    })

    it('should reject short password', async () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123',
      }

      await expect(authenticationInfoSchema.validate(invalidData)).rejects.toThrow('Password must be at least 6 characters')
    })

    it('should reject missing password', async () => {
      const invalidData = {
        email: 'test@example.com',
      }

      await expect(authenticationInfoSchema.validate(invalidData)).rejects.toThrow('Password is required')
    })
  })

  describe('registerInfoSchema', () => {
    it('should validate correct registration data', async () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      await expect(registerInfoSchema.validate(validData)).resolves.toEqual(validData)
    })

    it('should reject mismatched passwords', async () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different123',
      }

      await expect(registerInfoSchema.validate(invalidData)).rejects.toThrow('Passwords must match')
    })

    it('should reject missing confirm password', async () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
      }

      await expect(registerInfoSchema.validate(invalidData)).rejects.toThrow('Please confirm your password')
    })

    it('should reject invalid email in registration', async () => {
      const invalidData = {
        email: 'invalid.email',
        password: 'password123',
        confirmPassword: 'password123',
      }

      await expect(registerInfoSchema.validate(invalidData)).rejects.toThrow('Invalid email format')
    })

    it('should reject short password in registration', async () => {
      const invalidData = {
        email: 'test@example.com',
        password: '12345',
        confirmPassword: '12345',
      }

      await expect(registerInfoSchema.validate(invalidData)).rejects.toThrow('Password must be at least 6 characters')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty string for email', async () => {
      const invalidData = {
        email: '',
        password: 'password123',
      }

      await expect(authenticationInfoSchema.validate(invalidData)).rejects.toThrow('Email is required')
    })

    it('should handle whitespace-only email', async () => {
      const invalidData = {
        email: '   ',
        password: 'password123',
      }

      await expect(authenticationInfoSchema.validate(invalidData)).rejects.toThrow('Invalid email format')
    })

    it('should handle very long valid email', async () => {
      const validData = {
        email: 'very.long.email.address.with.many.dots@very.long.domain.name.example.com',
        password: 'password123',
      }

      await expect(authenticationInfoSchema.validate(validData)).resolves.toEqual(validData)
    })
  })
}) 
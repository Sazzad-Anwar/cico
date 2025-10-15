import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { z } from 'zod'

// SignupSchema from signup.tsx
export const SignupSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.email('Invalid email address'),
    phoneNumber: z
      .string()
      .min(10, 'Phone number must be at least 10 digits long'),
    dateOfBirth: z.string(),
    nid: z.string().min(10, 'NID must be at least 10 characters long'),
    kebeleId: z.string().min(5, 'Kebele ID must be at least 5 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    // confirmPassword field to match password
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignupData = z.infer<typeof SignupSchema>

// Interface for stored user data (includes password)
interface RegisteredUser extends User {
  password: string
}

// Helper functions for user storage
const REGISTERED_USERS_KEY = 'registeredUsers'

const getRegisteredUsers = async (): Promise<RegisteredUser[]> => {
  try {
    const usersData = await AsyncStorage.getItem(REGISTERED_USERS_KEY)
    return usersData ? JSON.parse(usersData) : []
  } catch (error) {
    console.error('Error getting registered users:', error)
    return []
  }
}

const saveRegisteredUser = async (user: RegisteredUser): Promise<void> => {
  try {
    const users = await getRegisteredUsers()
    const existingUserIndex = users.findIndex((u) => u.email === user.email)

    if (existingUserIndex >= 0) {
      users[existingUserIndex] = user // Update existing user
    } else {
      users.push(user) // Add new user
    }

    await AsyncStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
  } catch (error) {
    console.error('Error saving registered user:', error)
    throw new Error('Failed to save user data')
  }
}

const findUserByEmail = async (
  email: string,
): Promise<RegisteredUser | null> => {
  try {
    const users = await getRegisteredUsers()
    return users.find((u) => u.email === email) || null
  } catch (error) {
    console.error('Error finding user by email:', error)
    return null
  }
}

// Types for our auth state
export interface User {
  id: string
  name: string
  email: string
  phoneNumber: string
  accountNumber?: string
  dateOfBirth: string
  nid: string
  kebeleId: string
  avatar?: string
  deposit: { type: 'ETB' | 'USD'; amount: number }[]
}

export interface AuthState {
  // State
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (userData: SignupData) => Promise<void>
  logout: () => Promise<void>
  deleteLoginData: () => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
  clearError: () => void
  setLoading: (loading: boolean) => void

  // Utility
  checkAuthStatus: () => Promise<void>
}

// Create the auth store with persistence
export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Login action
  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null })

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Basic validation
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required')
      }

      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      // Check if user is registered
      const registeredUser = await findUserByEmail(credentials.email)

      if (!registeredUser) {
        throw new Error(
          'No account found with this email. Please sign up first.',
        )
      }

      // Verify password
      if (registeredUser.password !== credentials.password) {
        throw new Error('Invalid password. Please try again.')
      }

      // Create user data without password for state
      const userData: User = {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
        phoneNumber: registeredUser.phoneNumber,
        dateOfBirth: registeredUser.dateOfBirth,
        nid: registeredUser.nid,
        kebeleId: registeredUser.kebeleId,
        avatar: registeredUser.avatar,
        deposit: [
          {
            type: 'ETB',
            amount: 0,
          },
          { type: 'USD', amount: 0 },
        ],
      }

      // Generate a simple token
      const token = `token_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`

      // Update state with user data and token
      set({
        user: userData,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      // Store user data in AsyncStorage (without password)
      await AsyncStorage.setItem('userToken', token)
      await AsyncStorage.setItem('userData', JSON.stringify(userData))
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      })
      // throw error;
    }
  },

  // Register action
  register: async (userData) => {
    try {
      set({ isLoading: true, error: null })

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Validation
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('Email, password, and username are required')
      }

      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userData.email)) {
        throw new Error('Please enter a valid email address')
      }

      // Password confirmation check
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      // Check if user already exists
      const existingUser = await findUserByEmail(userData.email)
      if (existingUser) {
        throw new Error(
          'An account with this email already exists. Please use a different email or login.',
        )
      }

      // Create registered user data (with password)
      const registeredUser: RegisteredUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        dateOfBirth: userData.dateOfBirth,
        nid: userData.nid,
        kebeleId: userData.kebeleId,
        avatar: 'https://picsum.photos/200',
        password: userData.password, // Store password for login validation
        deposit: [
          { type: 'ETB', amount: 0 },
          { type: 'USD', amount: 0 },
        ],
      }

      // Save to registered users storage
      await saveRegisteredUser(registeredUser)

      // Create user data for state (without password)
      const newUser: User = {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
        phoneNumber: registeredUser.phoneNumber,
        dateOfBirth: registeredUser.dateOfBirth,
        nid: registeredUser.nid,
        kebeleId: registeredUser.kebeleId,
        avatar: registeredUser.avatar,
        deposit: [
          { type: 'ETB', amount: 0 },
          { type: 'USD', amount: 0 },
        ],
      }

      // Generate token
      const token = `token_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`

      // Update state with new user data
      set({
        user: newUser,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      // Store in AsyncStorage (without password)
      await AsyncStorage.setItem('userToken', token)
      await AsyncStorage.setItem('userData', JSON.stringify(newUser))
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      })
      throw error
    }
  },

  // Logout action
  logout: async () => {
    try {
      set({ isLoading: true })

      // Simulate slight delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Clear AsyncStorage
      await AsyncStorage.multiRemove(['userToken', 'userData'])

      // Reset state
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Logout failed',
      })
    }
  },

  // Update user profile
  updateUser: async (userData) => {
    try {
      set({ isLoading: true, error: null })

      const { user } = get()
      if (!user) {
        throw new Error('Not authenticated')
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Merge user data
      const updatedUser = { ...user, ...userData }

      // Update state
      set({
        user: updatedUser,
        isLoading: false,
        error: null,
      })

      // Update AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser))
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Update failed',
      })
      throw error
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Set loading state
  setLoading: (loading) => set({ isLoading: loading }),

  // Check authentication status on app start
  checkAuthStatus: async () => {
    try {
      set({ isLoading: true })

      const [token, userDataString] = await AsyncStorage.multiGet([
        'userToken',
        'userData',
      ])

      const storedToken = token[1]
      const storedUserData = userDataString[1]

      if (!storedToken || !storedUserData) {
        set({ isAuthenticated: false, isLoading: false })
        return
      }

      // Parse stored user data
      const userData = JSON.parse(storedUserData)

      // Simple token validation (check if it's not expired)
      const tokenData = storedToken.split('_')
      const tokenTimestamp = parseInt(tokenData[1])
      const now = Date.now()
      const tokenAge = now - tokenTimestamp
      const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 days

      if (tokenAge > maxAge) {
        // Token expired, clear storage
        await AsyncStorage.multiRemove(['userToken', 'userData'])
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
        return
      }

      // Token is valid, restore session
      set({
        user: userData,
        token: storedToken,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('Auth check failed:', error)
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },

  // Delete login data (for "Delete Login Data" feature)
  deleteLoginData: async () => {
    try {
      set({ isLoading: true })

      // Simulate slight delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Clear AsyncStorage
      await AsyncStorage.multiRemove(['userToken', 'userData'])
      await AsyncStorage.removeItem(REGISTERED_USERS_KEY)

      // Reset state
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Operation failed',
      })
    }
  },
}))

// Selectors for common use cases
export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthError = () => useAuthStore((state) => state.error)

export default useAuthStore

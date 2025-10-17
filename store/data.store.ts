import dayjs from 'dayjs'
import { create } from 'zustand'
import { User } from './auth.store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  generateAccountNumber,
  initialTransfers,
  initialUsers,
} from '../lib/data'

export type Transfer = {
  userId: string
  date: string
  amount: number
  transactionId: string
  type: 'sent' | 'received'
  currencyType?: 'ETB' | 'USD'
  user: User
}

interface DataStore {
  selectedUser: User | null
  users: User[]
  transfers: Transfer[]
  transfer: Transfer | null
  loadData: () => Promise<void>
  deleteUser: (userId: string) => void
  setSelectedUser: (user: User | null) => void
  addUser: (user: User) => void
  addTransfer: (transfer: Transfer) => void
  deleteTransfer: (transactionId: string) => void
  searchTransaction: (query: string) => void
  refillDB: () => void
  isLoading: Boolean
  error: string | null
}

const loadUsers = async (): Promise<{
  users: User[]
  transfers: Transfer[]
}> => {
  try {
    const usersData = await AsyncStorage.getItem('users')
    const transfers = await AsyncStorage.getItem('transfers')
    if (usersData && transfers) {
      return { users: JSON.parse(usersData), transfers: JSON.parse(transfers) }
    } else {
      await AsyncStorage.setItem('users', JSON.stringify(initialUsers))
      await AsyncStorage.setItem('transfers', JSON.stringify(initialTransfers))
      return {
        users: initialUsers,
        transfers: initialTransfers,
      }
    }
  } catch (error) {
    console.log(error)
    return {
      users: [],
      transfers: [],
    }
  }
}

const useDataStore = create<DataStore>((set, get) => ({
  selectedUser: null,
  transfer: null,
  users: [],
  isLoading: false,
  error: null,
  transfers: initialTransfers,
  loadData: async () => {
    try {
      set((state) => ({ ...state, isLoading: true, error: null }))
      const data = await loadUsers()
      set((state) => ({
        ...state,
        isLoading: false,
        users: data.users,
        transfers: data.transfers,
      }))
    } catch (error) {
      console.log(error)
      set((state) => ({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Load data failed',
      }))
    }
  },
  setSelectedUser: (user) => set(() => ({ selectedUser: user })),
  deleteUser: async (userId) => {
    try {
      const users = get().users
      const userExists = users.find((user) => user.id === userId)

      if (!userExists) return

      const transfers = get().transfers.filter(
        (transfer) => transfer.userId !== userExists?.id,
      )
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
        transfers,
      }))
      await AsyncStorage.setItem('users', JSON.stringify(get().users))
      await AsyncStorage.setItem('transfers', JSON.stringify(transfers))
    } catch (error) {
      console.log(error)
      set({
        error: error instanceof Error ? error.message : 'Delete user failed',
      })
    }
  },
  addUser: async (user) => {
    try {
      set((state) => ({ ...state, isLoading: true, error: null }))
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const users = get().users
      user = {
        ...user,
        accountNumber: generateAccountNumber(),
        avatar: user.avatar,
        deposit: [
          { type: 'ETB', amount: 0 },
          { type: 'USD', amount: 0 },
        ],
      }
      set((state) => ({
        ...state,
        users: [user, ...users],
        isLoading: false,
      }))

      await AsyncStorage.setItem('users', JSON.stringify(get().users))
    } catch (error) {
      console.log(error)
      set({
        error: error instanceof Error ? error.message : 'Add user failed',
      })
    }
  },
  refillDB: async () => {
    try {
      set((state) => ({ ...state, isLoading: true, error: null }))
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await AsyncStorage.setItem('users', JSON.stringify(initialUsers))
      await AsyncStorage.setItem('transfers', JSON.stringify(initialTransfers))
      set((state) => ({
        ...state,
        isLoading: false,
        users: initialUsers,
        transfers: initialTransfers,
      }))
    } catch (error) {
      console.log(error)
      console.log(error)
      set((state) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Refill DB failed',
      }))
    }
  },
  deleteTransfer: async (transactionId) => {
    try {
      const transfers = get().transfers
      const transferExists = transfers.find(
        (t) => t.transactionId === transactionId,
      )

      if (!transferExists) return

      const updatedTransfers = transfers.filter(
        (t) => t.transactionId !== transactionId,
      )
      set(() => ({
        transfers: updatedTransfers,
      }))
      await AsyncStorage.setItem('transfers', JSON.stringify(updatedTransfers))
    } catch (error) {
      console.log(error)
      set({
        error:
          error instanceof Error ? error.message : 'Delete transfer failed',
      })
    }
  },
  addTransfer: async (transfer) => {
    try {
      const newTransfer = {
        ...transfer,
        transactionId: transfer.transactionId || `TXN_${Date.now()}`,
        date: transfer.date || dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }
      set((state) => ({
        transfers: [newTransfer, ...state.transfers],
        transfer: newTransfer,
      }))

      await AsyncStorage.setItem('transfers', JSON.stringify(get().transfers))
    } catch (error) {
      console.log(error)
      set({
        error: error instanceof Error ? error.message : 'Add transfer failed',
      })
    }
  },
  searchTransaction: async (query) => {
    set((state) => ({ ...state, isLoading: true }))

    await new Promise((resolve) => setTimeout(resolve, 500))

    set((state) => ({
      transfers: query.length
        ? state.transfers.filter(
            (transfer) =>
              transfer.user.name.toLowerCase().includes(query.toLowerCase()) ||
              transfer.transactionId.includes(query),
          )
        : initialTransfers,
      isLoading: false,
    }))
  },
}))

// // Initialize users after store creation
// loadUsers().then((data) => {
//   useDataStore.setState({ users: data.users, transfers: data.transfers })
// })

export default useDataStore

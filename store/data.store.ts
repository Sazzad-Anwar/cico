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
      user = {
        ...user,
        id: `USER_${Date.now()}`,
        accountNumber: generateAccountNumber(),
        avatar: user.avatar,
        deposit: [
          { type: 'ETB', amount: 0 },
          { type: 'USD', amount: 0 },
        ],
      }
      set((state) => ({
        users: [...state.users, user],
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
  searchTransaction: (query) => {
    const findUser = initialUsers.find((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()),
    )
    const userId = findUser ? findUser.id : null
    if (userId) {
      set((state) => ({
        transfers: query.length
          ? state.transfers.filter(
              (transfer) =>
                transfer.userId === userId &&
                transfer.transactionId
                  .toLowerCase()
                  .includes(query.toLowerCase()),
            )
          : initialTransfers,
      }))
    } else {
      set((state) => ({
        transfers: query.length
          ? state.transfers.filter((transfer) =>
              transfer.transactionId
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
          : initialTransfers,
      }))
    }
  },
}))

// Initialize users after store creation
loadUsers().then((data) => {
  useDataStore.setState({ users: data.users, transfers: data.transfers })
})

export default useDataStore

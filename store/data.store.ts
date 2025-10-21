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
  searchUser: (query: string) => void
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
    // if (usersData && transfers) {
    //   return { users: JSON.parse(usersData), transfers: JSON.parse(transfers) }
    // } else {
    //   await AsyncStorage.setItem('users', JSON.stringify(initialUsers))
    //   await AsyncStorage.setItem('transfers', JSON.stringify(initialTransfers))
    //   return {
    //     users: initialUsers,
    //     transfers: initialTransfers.sort((a, b) =>
    //       dayjs(b.date).isBefore(dayjs(a.date)) ? 1 : -1,
    //     ),
    //   }
    // }
    return {
      users: JSON.parse(usersData || '[]'),
      transfers: (JSON.parse(transfers || '[]') as Transfer[]).sort(
        (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
      ),
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
  transfers: initialTransfers.sort(
    (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
  ),
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
  setSelectedUser: (user) =>
    set((state) => ({ ...state, selectedUser: user, isLoading: false })),
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
        isLoading: false,
        error: error instanceof Error ? error.message : 'Add user failed',
      })
    }
  },
  refillDB: async () => {
    try {
      set((state) => ({ ...state, isLoading: true, error: null }))
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const sortedTransfers = initialTransfers.sort(
        (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
      )
      await AsyncStorage.setItem('users', JSON.stringify(initialUsers))
      await AsyncStorage.setItem('transfers', JSON.stringify(sortedTransfers))
      set((state) => ({
        ...state,
        isLoading: false,
        users: initialUsers,
        transfers: sortedTransfers,
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
    set((state) => ({ ...state, isLoading: true, error: null }))
    await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      const transfers = [...get().transfers, transfer].sort(
        (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
      )

      await AsyncStorage.setItem('transfers', JSON.stringify(transfers))
      set((state) => ({
        ...state,
        transfers,
        transfer,
        isLoading: false,
      }))
    } catch (error) {
      console.log(error)
      set({
        error: error instanceof Error ? error.message : 'Add transfer failed',
      })
    }
  },
  searchUser: async (query) => {
    set((state) => ({ ...state, isLoading: true }))

    await new Promise((resolve) => setTimeout(resolve, 500))

    set((state) => ({
      users: query.length
        ? state.users.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase()),
          )
        : initialUsers,
      isLoading: false,
    }))
  },
  searchTransaction: async (query) => {
    set((state) => ({ ...state, isLoading: true }))

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (query.length) {
      // Filter current transfers based on search query and sort by date descending
      set((state) => ({
        transfers: state.transfers
          .filter(
            (transfer) =>
              transfer.user.name.toLowerCase().includes(query.toLowerCase()) ||
              transfer.transactionId.includes(query),
          )
          .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()),
        isLoading: false,
      }))
    } else {
      // Load all transfers from AsyncStorage when search is empty
      try {
        const transfers = await AsyncStorage.getItem('transfers')
        const allTransfers = transfers ? JSON.parse(transfers) : []
        set((state) => ({
          transfers: (allTransfers as Transfer[]).sort(
            (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
          ),
          isLoading: false,
        }))
      } catch (error) {
        console.log(error)
        set((state) => ({
          transfers: state.transfers, // Keep current state if loading fails
          isLoading: false,
        }))
      }
    }
  },
}))

// // Initialize users after store creation
// loadUsers().then((data) => {
//   useDataStore.setState({ users: data.users, transfers: data.transfers })
// })

export default useDataStore

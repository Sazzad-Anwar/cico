import { Image, Text, View } from 'moti'
import useDataStore from '@/store/data.store'
import { FlatList } from 'react-native'
import dayjs from 'dayjs'
import { cn } from '@/lib/utils'
import Loader from '@/components/loader'
import History from '@/components/history'

export default function AllTransactionsScreen() {
  return <History transactionType="all" />
}

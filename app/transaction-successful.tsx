import { Image, Text, View } from 'moti'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import useDataStore from '../store/data.store'
import dayjs from 'dayjs'
import Button from '../components/custom-button'
import Loader from '../components/loader'

export default function TransactionSuccessful() {
  const { top } = useSafeAreaInsets()
  const { push } = useRouter()
  const { transfer, setSelectedUser, isLoading } = useDataStore()

  if (isLoading) {
    return (
      <Loader
        isFullScreen
        loaderText="Loading ..."
      />
    )
  }

  return (
    <View
      style={{ paddingTop: top }}
      className="flex-1 flex-col items-center justify-center bg-white px-4"
    >
      <Image
        source={require('../assets/images/trx-successfull.png')}
        className="size-40"
      />
      <Text className="mt-8 w-11/12 text-center font-anton text-5xl leading-[58px]">
        Transaction successfully
      </Text>
      <Text className="mt-4 text-center font-dmSans text-sm text-[#6D6D6D]">
        Your money has been sent securely.
      </Text>
      <View className="mt-4 w-full rounded-xl border border-button">
        <View className="flex flex-row">
          <Text className="w-1/2 border-b border-r border-gray-200 p-3">
            Amount Sent
          </Text>
          <Text className="w-1/2 border-b border-gray-200 p-3 font-light">
            ${transfer?.amount}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="w-1/2 border-b border-r border-gray-200 p-3">
            To
          </Text>
          <Text className="w-1/2 border-b border-gray-200 p-3 font-light">
            {transfer?.user?.name}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="w-1/2 border-b border-r border-gray-200 p-3">
            Account Number
          </Text>
          <Text className="w-1/2 border-b border-gray-200 p-3 font-light">
            {transfer?.user?.accountNumber}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="w-1/2 border-b border-r border-gray-200 p-3">
            Transaction ID
          </Text>
          <Text className="w-1/2 border-b border-gray-200 p-3 font-light">
            {transfer?.transactionId}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="w-1/2 border-r border-gray-200 p-3">Date</Text>
          <Text className="w-1/2 border-gray-200 p-3 text-xs font-light">
            {dayjs(transfer?.date).format('DD MMM YYYY, hh:mm A')}
          </Text>
        </View>
      </View>
      <Button
        className="mt-4 w-full"
        title="Back to home page"
        onPress={() => {
          setSelectedUser(null)
          push('/(tabs)/home')
        }}
      />
    </View>
  )
}

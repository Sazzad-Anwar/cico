import { Image, Text, View } from 'moti'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useDataStore from '../store/data.store'
import Header from '../components/header'
import Transfers from '../components/transfers'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { cn } from '../lib/utils'
import { Input, InputField } from '../components/ui/input'
import useAuthStore, { User } from '../store/auth.store'
import Button from '../components/custom-button'
import Loader from '../components/loader'

export default function SendMoneyScreen() {
  const { selectedUser, setSelectedUser, isLoading, users } = useDataStore()
  const { user } = useAuthStore()
  const [amount, setAmount] = useState(100)
  const [selectedTab, setSelectedTab] = useState('USD')
  const { user: paramsUser } = useLocalSearchParams<{ user: string }>()

  useEffect(() => {
    if (paramsUser) {
      const selectedUser = JSON.parse(paramsUser) as User
      const foundUser = users.find(
        (u) => u.email === selectedUser.email,
      ) as User
      setSelectedUser(foundUser)
    }
    return () => {
      setSelectedUser(null)
    }
  }, [user])

  return (
    <View className="relative flex-1">
      <Header
        className="px-4"
        title="Send Money"
      />

      <Transfers
        title="Recent Contacts"
        isUserSelectable={true}
      />

      <View className="my-3 px-4">
        <Text className="mb-3 font-inter font-medium leading-[20px] text-base text-[#121212]">
          Enter Amount
        </Text>
        <View className="bg-white rounded-2xl p-5">
          <View className="flex flex-row relative justify-between items-center bg-gray-100 w-32 mx-auto p-1.5 rounded-full">
            <View
              animate={{
                left: selectedTab === 'USD' ? 7 : 58,
              }}
              transition={{
                type: 'spring',
                duration: 400,
              }}
              className="absolute h-full w-14 bg-white rounded-full"
            />
            <Pressable onPress={() => setSelectedTab('USD')}>
              <Text
                className={cn(
                  'font-dmSans font-medium text-sm pl-4 py-1 rounded-full',
                )}
              >
                USD
              </Text>
            </Pressable>
            <Pressable onPress={() => setSelectedTab('ETB')}>
              <Text
                className={cn(
                  'font-dmSans font-medium text-sm pr-3 py-1 rounded-full',
                )}
              >
                ETB
              </Text>
            </Pressable>
          </View>
          <View className="my-7 flex flex-row items-center justify-center gap-1 w-32 mx-auto">
            <Text className="text-2xl font-semibold font-dmSans leading-[24px] text-button ios:mt-1">
              {selectedTab === 'USD' ? '$' : 'ETB'}
            </Text>
            <Input className="w-11/12 mx-auto ml-0 border-0">
              <InputField
                className="w-full pl-0 text-3xl text-left font-semibold font-dmSans leading-[24px] text-button"
                value={amount.toString()}
                onChangeText={(value) => setAmount(Number(value))}
                keyboardType="number-pad"
              />
            </Input>
            <Text className="text-3xl font-semibold font-dmSans leading-[24px] text-button mt-2"></Text>
          </View>
          <View className="w-40 mx-auto flex justify-center items-center">
            <Text className="text-sm text-[#5D5D5D]">
              Usable balance: {selectedTab === 'USD' ? '$' : ''}
              {
                user?.deposit?.find((item) => item.type === selectedTab)?.amount
              }{' '}
              {selectedTab === 'ETB' ? 'ETB' : ''}
            </Text>
          </View>
        </View>

        {selectedUser && (
          <View className="my-5">
            <Text className="mb-3 font-inter font-medium leading-[20px] text-base text-[#121212]">
              Selected user
            </Text>

            <View className="bg-white rounded-2xl p-5">
              <View className="flex flex-row items-center gap-3">
                <View className="rounded-full size-14 overflow-hidden flex justify-center items-center gap-3">
                  {selectedUser?.avatar ? (
                    <Image
                      source={{
                        uri: selectedUser?.avatar.toString(),
                      }}
                      className="rounded-full size-full"
                    />
                  ) : (
                    <Text className="text-2xl font-bold text-gray-400">
                      {selectedUser?.name?.charAt(0)}
                    </Text>
                  )}
                </View>
                <View className="space-y-2">
                  <Text className="text-base font-semibold">
                    {selectedUser?.name}
                  </Text>
                  <Text className="text-sm">{selectedUser?.email}</Text>
                  <Text className="text-sm">{selectedUser?.accountNumber}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      {selectedUser && (
        <View className="absolute bottom-5 px-4 w-full flex flex-row justify-between items-center gap-2">
          <Button
            className="bg-transparent data-[active=true]:border-[#D1D1D1] border border-[#D1D1D1] w-1/2"
            buttonTextClassName="text-black"
            title="Cancel"
            onPress={() => setSelectedUser(null)}
          />
          <Button
            className="w-1/2"
            title="Send"
            disabled={
              amount <= 0 ||
              amount >
                (user?.deposit?.find((item) => item.type === selectedTab)
                  ?.amount || 0)
            }
          />
        </View>
      )}
    </View>
  )
}

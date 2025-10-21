import { Image, Text, View } from 'moti'
import Header from '@/components/header'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Pressable } from 'react-native'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Input, InputField } from '@/components/ui/input'
import useAuthStore, { User } from '@/store/auth.store'
import Button from '@/components/custom-button'
import { useSnackbarContext } from '@/components/ui/snackbar'
import Loader from '../../components/loader'

export default function InstitutePaymentScreen() {
  const snackbar = useSnackbarContext()
  const { user, updateUser, isLoading } = useAuthStore()
  const router = useRouter()
  const [amount, setAmount] = useState(0)
  const [selectedTab, setSelectedTab] = useState('USD')
  const { institute, type } = useLocalSearchParams<{
    institute: string
    type: string
  }>()

  const handleConfirm = () => {
    updateUser({
      ...user,
      deposit: user?.deposit?.map((item) => {
        if (item.type === selectedTab) {
          return {
            ...item,
            amount: item.amount - amount,
          }
        }
        return item
      }),
    } as User)

    if (!isLoading) {
      snackbar.success('Bill Payment Successfull', {
        position: 'bottom',
      })
      router.back()
    }
  }

  if (isLoading) {
    return (
      <Loader
        isFullScreen
        loaderText="Loading ..."
      />
    )
  }

  return (
    <>
      <View className="px-5">
        <Header title="Pay Bill" />
        <View className="mt-5">
          <Text className="text-lg font-semibold">Receiver</Text>
          <View className="flex flex-row items-center gap-2 mt-2">
            <Image
              source={require('@/assets/images/document.png')}
              className="size-12 rounded-2xl"
            />
            <View>
              <Text className="font-dmSans text-base font-semibold">
                {institute}
              </Text>
              <Text className="text-sm text-[#5D5D5D]">{type}</Text>
            </View>
          </View>
        </View>

        <View className="my-5">
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
                  user?.deposit?.find((item) => item.type === selectedTab)
                    ?.amount
                }{' '}
                {selectedTab === 'ETB' ? 'ETB' : ''}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="absolute bottom-7 flex w-full flex-row items-center justify-center gap-2 mt-4 android:mb-2">
        <Button
          className="bg-transparent data-[active=true]:border-[#D1D1D1] border border-[#D1D1D1] w-1/2"
          buttonTextClassName="text-button"
          title="Cancel"
          onPress={() => router.back()}
        />
        <Button
          title="Confirm"
          onPress={() => handleConfirm()}
          className="w-[45%]"
        />
      </View>
    </>
  )
}

import { Image, Text, View } from 'moti'
import Header from '@/components/header'
import { KeyboardAvoidingView, Pressable, TouchableOpacity } from 'react-native'
import { cn } from '@/lib/utils'
import { Input, InputField } from '@/components/ui/input'
import { useState } from 'react'
import useAuthStore from '@/store/auth.store'
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetScrollView,
} from '@/components/ui/actionsheet'
import { X } from 'lucide-react-native'
import Button from '@/components/custom-button'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loader from '@/components/loader'
import { Stack, useRouter } from 'expo-router'

const CardTopUpSchema = z.object({
  cardNumber: z.string().min(16, { message: 'Card number must be 16 digits' }),
  expiryDate: z.string().min(5, { message: 'Expiry date is required' }),
  cvc: z.string().min(3, { message: 'CVC must be at least 3 digits' }),
})

type CardTopUpForm = z.infer<typeof CardTopUpSchema>

export default function TopUpScreen() {
  const { user, updateUser, isLoading } = useAuthStore()
  const [amount, setAmount] = useState(100)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('')
  const [selectedTab, setSelectedTab] = useState('USD')
  const { navigate } = useRouter()
  const paymentMethods = [
    {
      name: 'Credit Cards',
      id: 'credit-cards',
      icon: require('@/assets/images/credit-cards-icon.png'),
    },
    {
      name: 'Bank',
      id: 'bank',
      icon: require('@/assets/images/wallet-to-bank-icon.png'),
    },
    {
      name: 'Hawil Pay',
      id: 'hawil-pay',
      icon: require('@/assets/images/hawil-pay-icon.png'),
    },
  ]

  if (isLoading) {
    return (
      <Loader
        isFullScreen
        loaderText="Adding money..."
      />
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="px-5">
        <Header title="Top Up" />

        <View className="mt-5">
          <Text className="text-lg font-semibold font-dmSans">
            Top up method
          </Text>

          <View className="flex flex-row justify-between items-center mt-3">
            {paymentMethods.map((method, index) => (
              <View
                from={{ translateY: 20, scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  translateY: 0,
                }}
                transition={{
                  type: 'timing',
                  duration: index * 400,
                  delay: index * 100,
                }}
                key={method.name}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (method.id === 'credit-cards') {
                      navigate(
                        `/top-up/credit-cards?amount=${amount}&currency=${selectedTab}`,
                      )
                    } else {
                      setIsModalOpen(true)
                      setSelectedMethod(method.id)
                    }
                  }}
                  className="p-3 gap-2 flex flex-col justify-center items-center bg-white rounded-xl w-28"
                >
                  <Image
                    className="size-6"
                    source={method.icon}
                  />
                  <Text className="text-[10px] font-medium font-dmSans">
                    {method.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
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

        <Actionsheet
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ActionsheetBackdrop />
          <ActionsheetContent className="p-0">
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <View className="p-4 pb-5 border-b border-[#E7E7E7] w-full flex flex-row justify-between items-center">
              <Text className="text-lg font-semibold text-[#3D3D3D]">
                {selectedMethod === 'credit-cards'
                  ? 'Card Details'
                  : selectedMethod === 'bank'
                  ? 'Choose your bank'
                  : 'Hawil Pay'}
              </Text>
              <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                <X
                  size={22}
                  color="#3D3D3D"
                />
              </TouchableOpacity>
            </View>
            {selectedMethod === 'bank' && (
              <View className="p-5 flex flex-row justify-between items-center flex-wrap gap-1 w-full">
                {[
                  'BRAC Bank',
                  'Dutch Bangla Bank',
                  'City Bank',
                  'Islami Bank',
                  'EBL',
                  'Prime Bank',
                  'SCB',
                  'UCB',
                ].map((name, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalOpen(false)
                      navigate(
                        `/top-up/${name}?amount=${amount}&currency=${selectedTab}`,
                      )
                    }}
                    key={name + '-bank'}
                    className="flex w-[85px] h-20 flex-col items-center justify-center gap-2"
                  >
                    <Image
                      className="size-7 mx-auto"
                      source={require('@/assets/images/wallet-to-bank-icon.png')}
                    />
                    <Text className="text-sm font-medium font-dmSans text-center">
                      {name.length > 9 ? name.slice(0, 9) + '...' : name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {selectedMethod === 'hawil-pay' && (
              <View className="w-full p-5">
                <Text className="text-lg font-semibold text-[#3D3D3D]">
                  This feature is coming soon!
                </Text>
                <Text className="text-sm text-[#5D5D5D]">
                  Please check back later for Hawil Pay top-up options.
                </Text>
              </View>
            )}
          </ActionsheetContent>
        </Actionsheet>
      </View>
    </>
  )
}

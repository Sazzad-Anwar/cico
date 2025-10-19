import { Image, Text, View } from 'moti'
import Header from '../components/header'
import { Pressable, TouchableOpacity } from 'react-native'
import { cn } from '../lib/utils'
import { Input, InputField } from '../components/ui/input'
import { useState } from 'react'
import useAuthStore from '../store/auth.store'
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@/components/ui/actionsheet'
import { X } from 'lucide-react-native'
import Button from '../components/custom-button'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loader from '../components/loader'
import { useRouter } from 'expo-router'

const CardTopUpSchema = z.object({
  cardNumber: z.string().min(16, { message: 'Card number must be 16 digits' }),
  expiryDate: z.string().min(5, { message: 'Expiry date is required' }),
  cvc: z.string().min(3, { message: 'CVC must be at least 3 digits' }),
})

type CardTopUpForm = z.infer<typeof CardTopUpSchema>

export default function TopUpScreen() {
  const form = useForm<CardTopUpForm>({
    resolver: zodResolver(CardTopUpSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  })
  const { user, updateUser, isLoading } = useAuthStore()
  const [amount, setAmount] = useState(100)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('')
  const [selectedTab, setSelectedTab] = useState('USD')
  const { navigate } = useRouter()
  const paymentMethods = [
    {
      name: 'Credit Cards',
      icon: require('@/assets/images/credit-cards-icon.png'),
    },
    {
      name: 'Bank',
      icon: require('@/assets/images/wallet-to-bank-icon.png'),
    },
    {
      name: 'Hawil Pay',
      icon: require('@/assets/images/hawil-pay-icon.png'),
    },
  ]

  const handleTopUp = (data: CardTopUpForm) => {
    updateUser({
      ...user,
      deposit: user?.deposit?.map((item) =>
        item.type === selectedTab
          ? { ...item, amount: item.amount + amount }
          : item,
      ),
    })
    setIsModalOpen(false)
    setSelectedMethod('')
    navigate('/(tabs)/home')
  }

  if (isLoading) {
    return (
      <Loader
        isFullScreen
        loaderText="Adding money..."
      />
    )
  }

  return (
    <View className="px-5">
      <Header title="Top Up" />

      <View className="mt-5">
        <Text className="text-lg font-semibold font-dmSans">Top up method</Text>

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
                  setIsModalOpen(true)
                  setSelectedMethod('credit-cards')
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
                user?.deposit?.find((item) => item.type === selectedTab)?.amount
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
              {selectedMethod === 'credit-cards' ? 'Card Details' : ''}
            </Text>
            <TouchableOpacity onPress={() => setIsModalOpen(false)}>
              <X
                size={22}
                color="#3D3D3D"
              />
            </TouchableOpacity>
          </View>
          <View className="p-5 flex flex-col gap-4 w-full">
            <Controller
              control={form.control}
              name="cardNumber"
              render={({
                field: { onChange, value, ref, onBlur },
                fieldState,
              }) => (
                <View className="flex flex-col gap-3 w-full">
                  <Text className="font-semibold font-dmSans text-sm">
                    Card Number
                  </Text>
                  <Input className="border border-[#D1D1D1] rounded-xl h-12 data-[focus]:border-[#D1D1D1]">
                    <InputField
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      autoComplete="cc-number"
                      placeholder="0000 0000 0000 0000"
                      value={value || ''}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      ref={ref}
                    />
                  </Input>
                  {fieldState.error && (
                    <Text className="mt-px text-sm text-red-500">
                      {fieldState.error.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <View className="flex flex-row justify-between w-full items-center">
              <Controller
                control={form.control}
                name="cvc"
                render={({
                  field: { value, onChange, onBlur, ref },
                  fieldState,
                }) => (
                  <View className="flex flex-col gap-3 w-[48%]">
                    <Text className="font-semibold font-dmSans text-sm">
                      CVC
                    </Text>
                    <Input className="border border-[#D1D1D1] rounded-xl h-12 data-[focus]:border-[#D1D1D1]">
                      <InputField
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        autoComplete="cc-csc"
                        placeholder="000"
                        value={value || ''}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        ref={ref}
                      />
                    </Input>
                    {fieldState.error && (
                      <Text className="mt-px text-sm text-red-500">
                        {fieldState.error.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={form.control}
                name="expiryDate"
                render={({
                  field: { value, onChange, onBlur, ref },
                  fieldState,
                }) => (
                  <View className="flex flex-col gap-3 w-[48%]">
                    <Text className="font-semibold font-dmSans text-sm">
                      Expire Date
                    </Text>
                    <Input className="border border-[#D1D1D1] rounded-xl h-12 data-[focus]:border-[#D1D1D1]">
                      <InputField
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        autoComplete="cc-exp"
                        placeholder="00/00"
                        value={value || ''}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        ref={ref}
                      />
                    </Input>
                    {fieldState.error && (
                      <Text className="mt-px text-sm text-red-500">
                        {fieldState.error.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>

            <Button
              title="Next"
              onPress={form.handleSubmit(handleTopUp)}
            />
          </View>
        </ActionsheetContent>
      </Actionsheet>
    </View>
  )
}

import { Image, Text, View } from 'moti'
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from '@/components/ui/select'
import { Dimensions, Platform, TouchableOpacity } from 'react-native'
import { ChevronDownIcon, Eye, EyeOff, Wallet } from 'lucide-react-native'
import { useEffect, useRef, useState } from 'react'
import useAuthStore from '../store/auth.store'
import { useSharedValue } from 'react-native-reanimated'
import { ImageBackground } from './ui/image-background'

export default function WalletCard() {
  const { user } = useAuthStore()
  const [isShowingBalance, setIsShowingBalance] = useState(true)
  const [selectedDeposit, setSelectedDeposit] = useState('ALL')
  const { width, height } = Dimensions.get('screen')
  return (
    <View
      style={{
        width: width - 10,
        height: height / 3,
      }}
      className="relative mx-auto overflow-hidden flex justify-center rounded-2xl"
    >
      <AnimatedWalletCard
        selectedType={selectedDeposit as 'USD' | 'ETB' | 'ALL'}
        isShowingBalance={isShowingBalance}
      />
      <View className="android:top-[115px] z-50 ios:top-[135px] absolute left-5 right-5 flex items-center justify-center">
        <View className="flex-row items-center justify-center gap-4">
          <Text className="font-dmSans text-xl font-semibold text-white">
            {isShowingBalance
              ? user?.deposit
                  ?.find((item) => item.type === selectedDeposit)
                  ?.amount.toFixed(2) ||
                user?.deposit?.reduce((a, b) => a + b.amount, 0).toFixed(2)
              : Array.from({ length: 5 })
                  .map(() => '*')
                  .join('')}
          </Text>
          <Select
            defaultValue={selectedDeposit}
            onValueChange={setSelectedDeposit}
          >
            <SelectTrigger
              variant="outline"
              size="md"
              className="w-auto rounded-full border-0 bg-[#3D3D3D]"
            >
              <SelectInput
                placeholder="Select"
                className="text-white/40"
              />
              <SelectIcon
                className="mr-3"
                as={ChevronDownIcon}
              />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {['ALL', 'USD', 'ETB'].map((name) => (
                  <SelectItem
                    key={name}
                    label={name}
                    value={name}
                  >
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </View>
        <Text className="mt-2 text-sm text-[#FDFDFDB0]">Total Balance</Text>
        <TouchableOpacity
          onPress={() => setIsShowingBalance(!isShowingBalance)}
          className="mt-3 flex flex-row items-center gap-2 rounded-full border border-white/40 px-3 py-1.5"
        >
          {isShowingBalance ? (
            <Eye
              size={16}
              color="#FDFDFDB0"
            />
          ) : (
            <EyeOff
              size={16}
              color="#FDFDFDB0"
            />
          )}
          <Text className="text-xs text-[#FDFDFDB0]">
            {isShowingBalance ? 'Hide Balance' : 'Show Balance'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function AnimatedWalletCard({
  selectedType,
  isShowingBalance,
}: {
  selectedType: 'USD' | 'ETB' | 'ALL'
  isShowingBalance: boolean
}) {
  const { user } = useAuthStore()
  const depositAmount = (type: string) =>
    user?.deposit?.find((item) => item.type === type)?.amount?.toFixed(2)

  return (
    <View className="relative h-[250px]">
      <Image
        style={{
          resizeMode: Platform.OS === 'ios' ? 'cover' : 'contain',
        }}
        className="absolute h-[200px] w-full z-40 left-0 right-0 bottom-0"
        source={require('@/assets/images/wallet-cover-front.png')}
      />
      <View
        animate={{
          bottom:
            selectedType === 'USD'
              ? Platform.OS === 'ios'
                ? 90
                : 80
              : selectedType === 'ALL'
              ? Platform.OS === 'ios'
                ? 44
                : 40
              : 30,
        }}
        transition={{
          type: 'spring',
          duration: 400,
        }}
        className="absolute h-[178px] ios:px-3 android:px-4 z-30 left-0 right-0 backdrop-blur-md overflow-hidden rounded-3xl"
      >
        <ImageBackground
          className="h-full w-full flex flex-row justify-between p-4"
          resizeMode={'stretch'}
          source={require('@/assets/images/virtual-card-2.png')}
        >
          <Text className="text-white block text-base font-bold">USD</Text>
          <Text className="text-white block text-base font-bold">
            ${isShowingBalance ? depositAmount('USD') : '****'}
          </Text>
        </ImageBackground>
      </View>

      <View
        animate={{
          bottom:
            selectedType === 'ETB'
              ? Platform.OS === 'ios'
                ? 90
                : 80
              : selectedType === 'ALL'
              ? Platform.OS === 'ios'
                ? 64
                : 60
              : 34,
        }}
        transition={{
          type: 'spring',
          duration: 400,
        }}
        className="absolute h-[178px] w-full ios:px-3 android:px-4 z-20 left-0 right-0 rounded-3xl backdrop-blur-md"
      >
        <ImageBackground
          className="h-full w-full flex flex-row justify-between p-4"
          resizeMode={'stretch'}
          source={require('@/assets/images/virtual-card.png')}
        >
          <Text className="text-white block text-base font-bold">ETB</Text>
          <Text className="text-white text-base font-bold flex justify-center items-center">
            {isShowingBalance ? depositAmount('ETB') : '****'} ETB
          </Text>
        </ImageBackground>
      </View>
      <Image
        style={{
          resizeMode: Platform.OS === 'ios' ? 'cover' : 'contain',
        }}
        className="absolute h-[250px] w-full z-10 left-0 right-0 ios:top-8 bottom-0"
        source={require('@/assets/images/wallet-cover-back.png')}
      />
    </View>
  )
}

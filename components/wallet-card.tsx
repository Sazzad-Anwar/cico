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
import { ChevronDownIcon, Eye } from 'lucide-react-native'
import { useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useAuthStore from '../store/auth.store'

export default function WalletCard() {
  const insets = useSafeAreaInsets()
  const { user } = useAuthStore()
  const [selectedDeposit, setSelectedDeposit] = useState('USD')

  return (
    <View className="relative mt-5 h-72">
      <Image
        source={require('../assets/images/wallet.png')}
        className={`ios:h-[315px] ios:w-[390px] android:h-[280px] android:w-[350px] mx-auto`}
      />
      <View className="android:top-[110px] ios:top-[130px] absolute left-5 right-5 flex items-center justify-center">
        <View className="flex-row items-center justify-center gap-4">
          <Text className="font-dmSans text-xl font-semibold text-white">
            {user?.deposit
              ?.find((item) => item.type === selectedDeposit)
              ?.amount.toFixed(2)}
          </Text>
          {/* <Select>
            <SelectTrigger
              ref={ref}
              className="w-auto rounded-full border-0 bg-[#3D3D3D] text-white/40"
              onTouchStart={onTouchStart}>
              <SelectValue className="text-white/60" placeholder="Select" />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className="w-auto" align="end">
              {['All', 'USD', 'ETB'].map((name) => (
                <SelectItem key={name} label={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
          <Select
            defaultValue="USD"
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
                {['USD', 'ETB'].map((name) => (
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
        <TouchableOpacity className="mt-3 flex flex-row items-center gap-2 rounded-full border border-white/40 px-3 py-1.5">
          <Eye
            size={16}
            color="#FDFDFDB0"
          />
          <Text className="text-xs text-[#FDFDFDB0]">Hide Balance</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

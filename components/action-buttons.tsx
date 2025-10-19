import { Href, Link, useRouter } from 'expo-router'
import { CornerUpRight, Grip, Plus, ReceiptText, X } from 'lucide-react-native'
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@/components/ui/actionsheet'

import { Image, Text, View } from 'moti'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const options = [
  {
    name: 'Top Up',
    icon: Plus,
    href: '/top-up' as Href,
  },
  {
    name: 'Transfer',
    icon: CornerUpRight,
    href: '/transfer' as Href,
  },
  {
    name: 'Bill Pay',
    icon: ReceiptText,
    href: '/paybills' as Href,
  },
]

const moreOptions = [
  {
    name: 'Send money',
    image: require('../assets/images/send-money-icon.png'),
    href: '/send-money' as Href,
  },
  {
    name: 'Recharge',
    image: require('../assets/images/mobile-icon.png'),
    href: '/recharge' as Href,
  },
  {
    name: 'Cash out',
    image: require('../assets/images/cash-out-icon.png'),
    href: '/cash-out' as Href,
  },
  {
    name: 'Payment',
    image: require('../assets/images/payment-icon.png'),
    href: '/payment' as Href,
  },
  {
    name: 'Savings',
    image: require('../assets/images/savings-icon.png'),
    href: '/savings' as Href,
  },
  {
    name: 'Insurance',
    image: require('../assets/images/insurance-icon.png'),
    href: '/insurance' as Href,
  },
  {
    name: 'Merchant',
    image: require('../assets/images/marchant-icon.png'),
    href: '/merchant' as Href,
  },
  {
    name: 'Donation',
    image: require('../assets/images/donation-icon.png'),
    href: '/donation' as Href,
  },
  {
    name: 'Wallet to bank',
    image: require('../assets/images/wallet-to-bank-icon.png'),
    href: '/wallet-to-bank' as Href,
  },
]

export default function ActionButtons() {
  const { navigate } = useRouter()
  const [isMoreOptionOpen, setIsMoreOptionOpen] = useState(false)
  return (
    <View className="flex flex-row items-center justify-between gap-2 mt-4 px-3">
      {options.map((option, index) => (
        <View
          key={option.name}
          from={{ translateY: 20, scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            type: 'timing',
            duration: index * 100 + 300,
            delay: index * 100,
          }}
        >
          <TouchableOpacity
            onPress={() => navigate(option.href as any)}
            className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-2 rounded-xl bg-white"
          >
            <option.icon
              size={24}
              color="#329600"
            />
            <Text className="text-xs font-medium text-[#3D3D3D]">
              {option.name}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      <View
        from={{ translateY: 20, scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          type: 'timing',
          duration: 3 * 100 + 300,
          delay: 3 * 100,
        }}
      >
        <TouchableOpacity
          onPress={() => setIsMoreOptionOpen(true)}
          className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-2 rounded-xl bg-white"
        >
          <Grip
            size={24}
            color="#329600"
          />
          <Text className="text-xs font-medium text-[#3D3D3D]">More</Text>
        </TouchableOpacity>
      </View>
      <Actionsheet
        isOpen={isMoreOptionOpen}
        onClose={() => setIsMoreOptionOpen(false)}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent className="p-0">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <View className="p-4 pb-5 border-b border-[#E7E7E7] w-full flex flex-row justify-between items-center">
            <Text className="text-lg font-semibold text-[#3D3D3D]">
              More Options
            </Text>
            <TouchableOpacity onPress={() => setIsMoreOptionOpen(false)}>
              <X
                size={22}
                color="#3D3D3D"
              />
            </TouchableOpacity>
          </View>
          <View className="flex mx-auto flex-row flex-wrap items-center justify-between gap-4 px-5 py-3">
            {moreOptions.map((option) => (
              <TouchableOpacity
                key={option.image}
                onPress={() => {
                  navigate(option.href)
                  setIsMoreOptionOpen(false)
                }}
                className="flex h-20 w-20 flex-col items-center justify-center gap-3"
              >
                <Image
                  source={option.image}
                  className="h-auto w-auto"
                />
                <Text className="text-center font-dmSans text-[10px] font-light leading-none">
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
            {/* <View className="flex h-16 w-16 flex-col items-center justify-center gap-3" /> */}
          </View>
        </ActionsheetContent>
      </Actionsheet>
    </View>
  )
}

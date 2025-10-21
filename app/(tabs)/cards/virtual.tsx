import { Image, Text, View } from 'moti'
import { Alert, TouchableOpacity } from 'react-native'
import useAuthStore from '@/store/auth.store'
import { cn } from '@/lib/utils'
import VirtualCard from '@/components/virtual-card'
import {
  CornerUpRight,
  Plus,
  ReceiptText,
  Snowflake,
} from 'lucide-react-native'
import Transactions from '@/components/transactions'
import { Href, useRouter } from 'expo-router'

export default function VirtualCardScreen() {
  const { user } = useAuthStore()
  const router = useRouter()
  const options = [
    {
      name: 'Top Up',
      icon: Plus,
      href: '/top-up' as Href,
    },
    {
      name: 'Send',
      icon: CornerUpRight,
      href: '/send-money' as Href,
    },
    {
      name: 'Bill Pay',
      icon: ReceiptText,
      href: '/bill-pay' as Href,
    },
    {
      name: 'Freeze',
      icon: Snowflake,
    },
  ]

  return (
    <View>
      <View className="relative">
        <Image
          className="h-48 w-full rounded-2xl"
          source={require('@/assets/images/virtual-card.png')}
        />
        <Text className="absolute left-5 top-5 font-dmSans text-base font-medium text-white/80">
          ETB
        </Text>
        <Text className="absolute right-5 top-5 font-dmSans text-base font-medium text-white/80">
          {user?.deposit?.find((d) => d.type === 'ETB')?.amount.toFixed(2) ??
            '0.00'}
        </Text>

        <Text className="absolute bottom-10 left-5 font-dmSans text-base font-medium text-white/80">
          {user?.name}
        </Text>
        <Text className="absolute bottom-10 left-36 font-dmSans text-base font-medium text-white/80">
          10/24
        </Text>
        <View className="absolute bottom-5 left-5 flex flex-row items-center gap-1 font-dmSans text-base font-medium text-white/80">
          {Array.from({ length: 12 }).map((_, index) => (
            <View
              key={index}
              className={cn(
                'size-1 rounded-full bg-white/80',
                [5, 9].includes(index + 1) ? 'ml-3' : '',
              )}
            />
          ))}
          <Text className="ml-3 font-medium text-white/80">1810</Text>
        </View>
        <Image
          className="absolute bottom-5 right-5 h-8 w-16"
          source={require('@/assets/images/cico-logo.png')}
        />
      </View>

      <View className="mt-5 flex flex-row items-center justify-between gap-2">
        {options.map((option) => (
          <TouchableOpacity
            key={option.name}
            onPress={() => {
              if (option?.href) {
                router.push(option.href)
              } else {
                Alert.alert('Info', 'This feature is coming soon!')
              }
            }}
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
        ))}
      </View>
      <Transactions className="mt-4" />
    </View>
  )
}

import { ScrollView, Text, View } from 'moti'
import { Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useAuthStore from '../../store/auth.store'
import { Bell } from 'lucide-react-native'
import WalletCard from '@/components/wallet-card'
import ActionButtons from '../../components/action-buttons'
import Transfers from '../../components/transfers'
import Transactions from '../../components/transactions'

export default function HoomeScreen() {
  const { top } = useSafeAreaInsets()
  const { user } = useAuthStore()

  return (
    <>
      <View className="h-screen bg-gray-200">
        <ScrollView>
          {/* Header */}
          <View
            style={{ marginTop: top }}
            className="andriod:pt-5 ios:pt-1 flex-row items-center justify-between px-3"
          >
            <View className="h-12 min-w-36 flex-row items-center justify-between gap-3 rounded-full bg-white p-1">
              <Image
                className="size-10 rounded-full"
                source={{ uri: user?.avatar }}
              />
              <Text className="w-24 truncate text-left text-sm font-medium leading-none">
                {user?.name}
              </Text>
            </View>
            <TouchableOpacity className="flex size-12 items-center justify-center rounded-full bg-white p-3">
              <Bell
                size={24}
                color="#3D3D3D"
              />
            </TouchableOpacity>
          </View>

          {/* Wallet card */}
          <WalletCard />

          {/* Action buttons */}
          <ActionButtons />

          {/* Quick transfers */}
          {/* <Transfers /> */}

          {/* Transactions */}
          {/* <Transactions /> */}

          <View className="h-24" />
        </ScrollView>
      </View>
    </>
  )
}

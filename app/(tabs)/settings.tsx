import { Image, Text, View } from 'moti'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/header'
import useAuthStore from '../../store/auth.store'
import { Platform, Pressable, TouchableOpacity } from 'react-native'
import {
  Bell,
  ChevronRight,
  DatabaseBackup,
  DatabaseZap,
  LogOut,
  MessageCircle,
  SquarePen,
  TableOfContents,
  Trash,
} from 'lucide-react-native'
import { Switch } from '../../components/ui/switch'
import { useState } from 'react'
import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import useDataStore from '../../store/data.store'
import Loader from '../../components/loader'

export default function SettingsScreen() {
  const { user, logout, deleteLoginData } = useAuthStore()
  const { refillDB, isLoading } = useDataStore()
  const [checked, setChecked] = useState(true)
  const router = useRouter()

  function onPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setChecked((prev) => !prev)
  }

  function onCheckedChange(checked: boolean) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setChecked(checked)
  }

  return (
    <View className="relative flex-1 bg-gray-200 px-4">
      <Header title="Settings" />

      <View className="mt-5 flex flex-row items-center justify-between rounded-xl bg-white py-2 pl-2 pr-3">
        <View className="flex flex-row items-center gap-3">
          <Image
            source={{ uri: user?.avatar }}
            className="size-14 rounded-xl"
          />
          <View className="flex flex-col pl-px">
            <Text className="font-dmSans text-base font-semibold">
              {user?.name}
            </Text>
            <Text className="font-dmSans text-sm text-[#667085]">
              {user?.email}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/user-details-edit')}>
          <SquarePen
            size={20}
            color="#6D6D6D"
          />
        </TouchableOpacity>
      </View>

      <Pressable onPress={onPress}>
        <View className="mt-5 flex flex-row items-center justify-between rounded-xl bg-white py-2 pl-2 pr-3">
          <View className="flex flex-row items-center gap-2">
            <View className="flex size-10 items-center justify-center rounded-lg bg-[#F6F6F6]">
              <Bell size={20} />
            </View>
            <Text className="font-dmSans text-base font-medium">
              Notification
            </Text>
          </View>
          <Switch
            size={Platform.OS === 'ios' ? 'sm' : 'md'}
            trackColor={{
              false: Platform.OS === 'ios' ? '#ffff' : '#D1D1D1',
              true: '#329600',
            }}
            thumbColor="#ffff"
            value={checked}
            onToggle={onCheckedChange}
          />
        </View>
      </Pressable>

      <TouchableOpacity className="mt-5 flex flex-row items-center justify-between rounded-xl bg-white py-2 pl-2 pr-3">
        <View className="flex flex-row items-center gap-2">
          <View className="flex size-10 items-center justify-center rounded-lg bg-[#F6F6F6]">
            <MessageCircle size={20} />
          </View>
          <Text className="font-dmSans text-base font-medium">
            Support/Help
          </Text>
        </View>
        <ChevronRight
          size={24}
          color="#6D6D6D"
        />
      </TouchableOpacity>

      <TouchableOpacity className="mt-5 flex flex-row items-center justify-between rounded-xl bg-white py-2 pl-2 pr-3">
        <View className="flex flex-row items-center gap-2">
          <View className="flex size-10 items-center justify-center rounded-lg bg-[#F6F6F6]">
            <TableOfContents size={20} />
          </View>
          <Text className="font-dmSans text-base font-medium">FAQ</Text>
        </View>
        <ChevronRight
          size={24}
          color="#6D6D6D"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/(show-data)/users')}
        className="mt-5 flex flex-row items-center justify-between rounded-xl bg-white py-2 pl-2 pr-3"
      >
        <View className="flex flex-row items-center gap-2">
          <View className="flex size-10 items-center justify-center rounded-lg bg-[#F6F6F6]">
            <DatabaseZap size={20} />
          </View>
          <Text className="font-dmSans text-base font-medium">Database</Text>
        </View>
        <ChevronRight
          size={24}
          color="#6D6D6D"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          refillDB()
          router.push('/(show-data)/users')
        }}
        className="mt-5 flex flex-row items-center justify-between rounded-xl bg-white py-2 pl-2 pr-3"
      >
        <View className="flex flex-row items-center gap-2">
          <View className="flex size-10 items-center justify-center rounded-lg bg-[#F6F6F6]">
            <DatabaseBackup size={20} />
          </View>
          <Text className="font-dmSans text-base font-medium">Refill DB</Text>
        </View>
        <ChevronRight
          size={24}
          color="#6D6D6D"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          deleteLoginData()
          router.push('/login')
        }}
        className="mt-5 flex flex-row items-center justify-between rounded-xl bg-white py-2 pl-2 pr-3"
      >
        <View className="flex flex-row items-center gap-2">
          <View className="flex size-10 items-center justify-center rounded-lg bg-[#F6F6F6]">
            <Trash
              size={20}
              color="#8B1E20"
            />
          </View>
          <Text className="font-dmSans text-base font-medium">
            Delete Login Data
          </Text>
        </View>
        <ChevronRight
          size={24}
          color="#6D6D6D"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          logout()
          router.push('/login')
        }}
        className="mt-5 flex flex-row items-center justify-between rounded-xl bg-white py-2 pl-2 pr-3"
      >
        <View className="flex flex-row items-center gap-2">
          <View className="flex size-10 items-center justify-center rounded-lg bg-[#F6F6F6]">
            <LogOut
              color="#8B1E20"
              size={20}
            />
          </View>
          <Text className="font-dmSans text-base font-medium">Log Out</Text>
        </View>
        <ChevronRight
          size={24}
          color="#6D6D6D"
        />
      </TouchableOpacity>
    </View>
  )
}

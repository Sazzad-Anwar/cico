import { Link, useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import { AnimatePresence, Image, Text, View } from 'moti'
import useDataStore from '../store/data.store'
import { Dimensions, Pressable, TouchableOpacity } from 'react-native'
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetFlatList,
} from '@/components/ui/actionsheet'
import { Check, Plus, Search, X } from 'lucide-react-native'
import { cn } from '../lib/utils'
import Loader from './loader'
import { useEffect, useState } from 'react'
import UserCard from './user-card'
import { User } from '../store/auth.store'
import { Input, InputField } from './ui/input'
import { useDebounceValue } from 'usehooks-ts'
import { Skeleton } from './ui/skeleton'

export default function Transfers({
  className,
  title = 'Quick Transfer',
  isUserSelectable = false,
}: {
  className?: string
  title?: string
  isUserSelectable?: boolean
}) {
  const {
    setSelectedUser,
    isLoading,
    users,
    searchUser,
    transfers,
    selectedUser,
  } = useDataStore()
  const { push } = useRouter()
  const [open, setOpen] = useState(false)
  const pathName = usePathname()
  const [searchText, setSearchText] = useState('')
  const [debouncedValue] = useDebounceValue(searchText, 700)
  const { userId } = useLocalSearchParams<{ userId: string }>()
  const isHomePage = pathName === '/' || pathName === '/home'
  const { height } = Dimensions.get('screen')

  useEffect(() => {
    if (!!debouncedValue) {
      searchUser(debouncedValue)
    } else {
      searchUser('')
    }
  }, [debouncedValue])

  return (
    <>
      <View className={cn('mt-4 px-3', className)}>
        <View className="mb-2 flex flex-row items-center justify-between">
          <Text className="font-dmSans text-lg font-semibold">{title}</Text>
          {isHomePage ? (
            <Link
              href="/history/all"
              className="font-dmSans text-sm font-semibold text-[#245C0B]"
            >
              View All
            </Link>
          ) : (
            <Pressable onPress={() => setOpen(true)}>
              <Text className="font-dmSans text-sm font-semibold text-[#245C0B]">
                View All
              </Text>
            </Pressable>
          )}
        </View>
        <View className="flex flex-row items-center justify-between rounded-xl bg-white px-3 py-3">
          {users?.length === 0 ? (
            <>
              <Skeleton className="android:gap-1 ios:gap-2 h-16 rounded-2xl items-center justify-center pt-1 w-16" />
              <Skeleton className="android:gap-1 ios:gap-2 h-16 rounded-2xl items-center justify-center pt-1 w-16" />
              <Skeleton className="android:gap-1 ios:gap-2 h-16 rounded-2xl items-center justify-center pt-1 w-16" />
              <Skeleton className="android:gap-1 ios:gap-2 h-16 rounded-2xl items-center justify-center pt-1 w-16" />
            </>
          ) : (
            <>
              {transfers.slice(0, 4).map((transfer, index) => (
                <TouchableOpacity
                  key={transfer.transactionId + '_' + index}
                  onPress={() => {
                    if (isUserSelectable) {
                      setSelectedUser(transfer.user)
                    } else {
                      push(`/send-money?userId=${transfer.user.id}`)
                    }
                  }}
                >
                  <View
                    from={{ scale: 0.8 }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      type: 'spring',
                      duration: 800,
                      delay: index * 100,
                    }}
                    className="android:gap-1 ios:gap-2 relative flex flex-col items-center justify-center pt-1 w-16"
                  >
                    <Image
                      className="size-12 rounded-xl"
                      source={{ uri: transfer.user.avatar }}
                    />
                    <Text className="text-center font-dmSans text-xs font-medium leading-none">
                      {transfer.user.name.split(' ')[0]}
                    </Text>
                    {selectedUser?.id === transfer.user.id ? (
                      <View className="absolute right-1 top-0 rounded-full bg-green-700">
                        <Check
                          size={14}
                          color="#ffffff"
                        />
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* <View className="h-16 w-px bg-gray-300" /> */}
          <TouchableOpacity
            onPress={() => push('/add-user')}
            className="flex flex-col items-center justify-center gap-2 border-l border-gray-300 w-20"
          >
            <View className="android:size-11 ios:size-12 flex items-center justify-center rounded-full bg-gray-200">
              <Plus
                size={30}
                color="#329600"
              />
            </View>
            <Text className="text-center font-dmSans text-xs font-medium leading-none">
              Add new
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Actionsheet
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <View className="py-2 w-full flex flex-row justify-between items-center">
            <Text className="text-lg font-semibold text-[#3D3D3D]">
              Contacts
            </Text>
            <TouchableOpacity
              onPress={() => {
                setOpen(false)
                setSearchText('')
              }}
            >
              <X
                size={22}
                color="#3D3D3D"
              />
            </TouchableOpacity>
          </View>
          <View className="mt-2 flex h-14 w-full flex-row items-center overflow-hidden rounded-full border border-[#E7E7E7] bg-white py-2 pl-5">
            <Search
              size={18}
              color="#667085"
            />
            <Input className="h-full w-full border-0 p-0 pl-1 shadow-none">
              <InputField
                placeholder="Search By"
                value={searchText}
                onChangeText={setSearchText}
              />
            </Input>
          </View>
          {isLoading ? (
            <View style={{ height: height * 0.6 }}>
              <Loader
                className="h-full flex flex-col justify-center items-center"
                loaderText="Adding contact..."
              />
            </View>
          ) : (
            <AnimatePresence>
              <ActionsheetFlatList
                className="mt-1 h-3/5"
                data={users}
                contentContainerStyle={{
                  paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <UserCard
                    user={item as User}
                    index={index}
                    onClick={() => setOpen(false)}
                  />
                )}
                keyExtractor={(item, index) =>
                  (item as User).id || `user-${index}`
                }
                ListEmptyComponent={
                  <View className="w-full py-10 h-96 flex flex-col justify-center items-center">
                    <Text className="text-lg text-center">No user found</Text>
                  </View>
                }
              />
            </AnimatePresence>
          )}
        </ActionsheetContent>
      </Actionsheet>
    </>
  )
}

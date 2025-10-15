import { Link, useRouter } from 'expo-router'
import { Image, Text, View } from 'moti'
import useDataStore from '../store/data.store'
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { Check, Plus, X } from 'lucide-react-native'
import { cn } from '../lib/utils'
import { Dispatch, SetStateAction, useState } from 'react'
import { UserDeatils } from '../store/data.store'
import Loader from './loader'

export default function Transfers({
  className,
  title = 'Quick Transfer',
  isUserSelectable = false,
}: {
  className?: string
  title?: string
  isUserSelectable?: boolean
}) {
  const { transfers, setSelectedUser, selectedUser } = useDataStore()
  const [isLoading, setIsLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { navigate } = useRouter()

  const handleAddContact = () => {
    setDialogOpen(false)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // navigate('/added-successfully');
    }, 2000)
  }

  return (
    <>
      {isLoading && (
        <Loader
          isFullScreen
          loaderText="Adding contact..."
        />
      )}
      <View className={cn('mt-4 px-3', className)}>
        <View className="mb-2 flex flex-row items-center justify-between">
          <Text className="font-dmSans text-lg font-semibold">{title}</Text>
          <Link
            href="/history"
            className="font-dmSans text-sm font-semibold text-[#245C0B]"
          >
            View All
          </Link>
        </View>
        <View className="android:gap-1 ios:gap-3 flex flex-row items-center justify-between rounded-xl bg-white px-3 py-2">
          {transfers.slice(0, 4).map((user, index) => (
            <TouchableOpacity
              onPress={() => {
                isUserSelectable ? setSelectedUser(user) : null
              }}
              key={user.name + '_' + index}
              className="android:gap-1 ios:gap-2 relative flex flex-col items-center justify-center pt-1"
            >
              <Image
                className="size-12 rounded-xl"
                source={user.image}
              />
              <Text className="text-center font-dmSans text-xs font-medium leading-none">
                {user.name.split(' ')[0]}
              </Text>
              {selectedUser?.name === user.name ? (
                <View className="absolute right-0 top-0 rounded-full bg-green-700">
                  <Check
                    size={10}
                    color="#ffffff"
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          ))}
          <View className="h-16 w-px bg-gray-300" />
          {/* <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
              <TouchableOpacity className="flex flex-col items-center justify-center gap-2">
                <View className="android:size-11 ios:size-12 flex items-center justify-center rounded-full bg-gray-200">
                  <Plus size={30} color="#329600" />
                </View>
                <Text className="text-center font-dmSans text-xs font-medium leading-none">
                  Add new
                </Text>
              </TouchableOpacity>
            </AlertDialogTrigger>
            <AlertDialogContent
              overlayClassName="justify-end bottom-0 pb-5 px-0 py-0 w-full"
              className="rounded-3xl px-0 py-0">
              <AlertDialogHeader className="mt-0 flex flex-row items-center justify-between border-b border-[#E7E7E7] px-5 py-4">
                <AlertDialogTitle>Add new contact</AlertDialogTitle>
                <AlertDialogCancel className="h-5 border-0 p-0 shadow-none">
                  <X size={20} />
                </AlertDialogCancel>
              </AlertDialogHeader>
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View className="block w-screen gap-2 px-5 pb-10">
                  <View className="gap-2">
                    <Label>Contact Name</Label>
                    <Input placeholder="Enter full name" className="w-full" />
                  </View>
                  <View className="gap-2">
                    <Label>Contact Name</Label>
                    <Input
                      placeholder="Number"
                      inputMode="numeric"
                      keyboardType="number-pad"
                      className="w-full"
                    />
                  </View>
                  <Button
                    onPress={() => handleAddContact()}
                    title="Add Contact"
                    className="w-full"
                  />
                </View>
              </KeyboardAvoidingView>
            </AlertDialogContent>
          </AlertDialog> */}
        </View>
      </View>
    </>
  )
}

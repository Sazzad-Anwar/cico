import { Image, Text, View, MotiView, AnimatePresence } from 'moti'
import useDataStore from '../../store/data.store'
import useAuthStore, { User } from '../../store/auth.store'
import { FlatList, TouchableOpacity } from 'react-native'
import { Trash } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import Loader from '../../components/loader'
import { useState, useRef, useEffect } from 'react'
import { LinearTransition } from 'react-native-reanimated'

export default function Users() {
  const { users, isLoading, loadData } = useDataStore()

  useEffect(() => {
    if (users.length === 0) {
      loadData()
    }
  }, [])

  if (isLoading) {
    return (
      <Loader
        isFullScreen
        loaderText="Loading data..."
        className="h-full"
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>Hello</Text> */}
      <AnimatePresence>
        <FlatList
          className="mt-2"
          data={users}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <UserCard
              user={item}
              index={index}
            />
          )}
          keyExtractor={(item, index) => item?.id || `user-${index}`}
        />
      </AnimatePresence>
    </View>
  )
}

function UserCard({ user, index }: { user: User | null; index: number }) {
  const { deleteUser } = useDataStore()
  const { user: loggedInUser, deleteLoginData } = useAuthStore()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  if (!user) return null

  const handleDelete = () => {
    setIsDeleting(true)
    // The actual deletion will be handled in the onDidAnimate callback
  }

  return (
    <View
      layout={LinearTransition.springify().damping(40).stiffness(400)} // 👈 enable automatic layout animation
      from={{
        opacity: 0,
        translateY: isDeleting ? 0 : 50,
        translateX: 0,
        scale: isDeleting ? 1 : 0.9,
      }}
      animate={
        isDeleting
          ? {
              opacity: 0,
              translateX: 300,
            }
          : {
              opacity: 1,
              translateY: 0,
              scale: 1,
            }
      }
      transition={{
        type: index !== 0 ? 'timing' : 'spring',
        duration: isDeleting ? 400 : 600,
        delay: isDeleting ? 0 : index * 100,
      }}
      exit={{
        translateX: 300,
        opacity: 0,
        scale: 0.8,
      }}
      onDidAnimate={() => {
        if (isDeleting) {
          if (user?.id === loggedInUser?.id) {
            deleteLoginData()
            router.push('/login')
          } else {
            deleteUser(user?.id)
          }
        }
      }}
      className="bg-white rounded-2xl p-3 flex flex-row border border-gray-300 justify-between items-center gap-3 mt-3"
    >
      <View className="flex flex-row items-center gap-3">
        <View className="rounded-full size-14 overflow-hidden flex justify-center items-center gap-3">
          {user?.avatar ? (
            <Image
              source={{
                uri: user?.avatar.toString(),
              }}
              className="rounded-full size-full"
            />
          ) : (
            <Text className="text-2xl font-bold text-gray-400">
              {user?.name?.charAt(0)}
            </Text>
          )}
        </View>
        <View className="space-y-2">
          <Text className="text-base font-semibold">{user?.name}</Text>
          <Text className="text-sm">{user?.email}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleDelete}
        className="bg-red-500 px-2 py-2 rounded-full"
      >
        <Trash
          color="white"
          size={20}
        />
      </TouchableOpacity>
    </View>
  )
}

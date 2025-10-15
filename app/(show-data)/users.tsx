import { Image, Text, View } from 'moti'
import useDataStore from '../../store/data.store'
import useAuthStore, { User } from '../../store/auth.store'
import { FlatList, TouchableOpacity } from 'react-native'
import { Trash } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import Loader from '../../components/loader'

export default function Users() {
  const { users, isLoading } = useDataStore()

  if (isLoading) {
    return (
      <Loader
        isFullScreen
        loaderText="Fetching data..."
        className="h-full"
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        className="mt-2"
        data={users}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item, index) => item?.id || `user-${index}`}
      />
    </View>
  )
}

function UserCard({ user }: { user: User | null }) {
  const { deleteUser } = useDataStore()
  const { user: loggedInUser, deleteLoginData } = useAuthStore()
  const router = useRouter()

  if (!user) return null

  return (
    <View className="bg-white rounded-xl p-3 flex flex-row border border-gray-300 justify-between items-center gap-3 mt-3">
      <View className="flex flex-row items-center gap-3">
        <View className="rounded-full size-14 overflow-hidden flex justify-center items-center gap-3">
          {user?.avatar ? (
            <Image
              source={{
                uri: user?.avatar.toString() + `?random=${Math.random()}`,
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
        onPress={() => {
          if (user?.id === loggedInUser?.id) {
            deleteLoginData()
            router.push('/login')
          } else {
            deleteUser(user?.id)
          }
        }}
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

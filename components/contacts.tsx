import { View, AnimatePresence } from 'moti'
import useDataStore from '@/store/data.store'
import { FlatList } from 'react-native'
import Loader from '@/components/loader'
import UserCard from './user-card'

export default function Contacts() {
  const { users, isLoading } = useDataStore()

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

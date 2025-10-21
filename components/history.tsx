import { Image, Text, View } from 'moti'
import useDataStore from '../store/data.store'
import Loader from './loader'
import dayjs from 'dayjs'
import { cn } from '../lib/utils'
import { FlatList } from 'react-native'
import { LinearTransition } from 'react-native-reanimated'

export default function History({
  transactionType,
}: {
  transactionType: 'all' | 'sent' | 'received'
}) {
  const { transfers, isLoading } = useDataStore()

  if (isLoading) {
    return (
      <Loader
        loaderText="Searching ..."
        className="h-[90%] w-full flex flex-col justify-center items-center mt-3 rounded-2xl"
      />
    )
  }

  return (
    <View className="mt-1 bg-white rounded-2xl p-5 pb-0 mb-2">
      <FlatList
        data={
          transactionType === 'all'
            ? transfers
            : transfers.filter((item) => item.type === transactionType)
        }
        renderItem={({ item, index }) => (
          <View
            layout={LinearTransition.springify().damping(40).stiffness(400)}
            from={{
              opacity: 0,
              translateY: 50,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
              scale: 1,
            }}
            transition={{
              type: index !== 0 ? 'timing' : 'spring',
              duration: 600,
              delay: index * 100,
            }}
            exit={{
              translateX: 300,
              opacity: 0,
              scale: 0.8,
            }}
            key={item.transactionId}
            className={cn(
              'flex flex-row items-center justify-between',
              index === transfers.length - 1 ? '' : 'mb-4',
            )}
          >
            <View className="flex flex-row items-center gap-2">
              <Image
                className="size-12 rounded-xl"
                source={{ uri: item.user.avatar }}
                alt={item.user.name}
              />
              <View>
                <Text className="font-dmSans text-base font-semibold">
                  {item.user.name}
                </Text>
                <Text className="text-sm text-[#5D5D5D]">
                  {dayjs(item.date).format('DD MMM YYYY')}
                </Text>
              </View>
            </View>
            <View className="flex flex-col">
              <Text
                className={cn(
                  'text-right font-dmSans text-base font-semibold',
                  item.type === 'sent' ? 'text-red-700' : 'text-green-700',
                )}
              >
                {item.type === 'sent' ? '-' : '+'} ${item.amount}
              </Text>
              <Text className="text-right font-dmSans text-sm text-[#5D5D5D]">
                {dayjs(item.date).format('hh:mm a')}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item?.transactionId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        ListEmptyComponent={
          <View className="p-5">
            <Text className="text-center text-gray-500">
              No transactions found.
            </Text>
          </View>
        }
      />
    </View>
  )
}

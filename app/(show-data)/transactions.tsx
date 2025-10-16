import { Image, Text, View } from 'moti'
import useDataStore, { Transfer } from '../../store/data.store'
import { FlatList } from 'react-native'
import { User } from '../../store/auth.store'
import dayjs from 'dayjs'
import { cn } from '../../lib/utils'
import Loader from '../../components/loader'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  LinearTransition,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { scheduleOnRN, scheduleOnUI, runOnJS } from 'react-native-worklets'
import { Trash } from 'lucide-react-native'
import { useEffect, useState } from 'react'

type TransferType = Transfer & {
  user: User
}

export default function TransactionsScreen() {
  const { transfers, isLoading, loadData } = useDataStore()

  useEffect(() => {
    if (transfers.length === 0) {
      loadData()
    }
  }, [])

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
    <View>
      <FlatList
        data={transfers.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )}
        className="mt-2"
        renderItem={({ item, index }) => (
          <TransferCard
            item={item as TransferType}
            index={index}
          />
        )}
        keyExtractor={(item) => item?.transactionId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      />
    </View>
  )
}

function TransferCard({ item, index }: { item: TransferType; index: number }) {
  const { deleteTransfer } = useDataStore()
  const translateX = useSharedValue(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAnimateEnded, setIsAnimateEnded] = useState(false)
  const THRESHOLD = 120 // distance to trigger delete

  // 👇 Create a pan gesture using the new API
  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .failOffsetY([-10, 10])
    .onUpdate((event) => {
      translateX.value = Math.max(0, event.translationX)
    })
    .onEnd(() => {
      if (translateX.value > THRESHOLD) {
        translateX.value = withTiming(300, { duration: 200 })
        scheduleOnRN(setIsDeleting, true)
        scheduleOnRN(deleteTransfer, item.transactionId)
      } else {
        translateX.value = withTiming(0, { duration: 200 })
      }
    })
  const composed = Gesture.Simultaneous(panGesture)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  return (
    <View className="relative">
      {isAnimateEnded && (
        <View className="absolute left-0 right-0 top-0 bottom-0 justify-start pl-5 bg-red-100 flex flex-row items-center my-1  p-3 rounded-2xl border border-red-100">
          <View className="bg-red-500 px-2 py-2 rounded-full">
            <Trash
              color="white"
              size={24}
            />
          </View>
          <Text className="pl-3 text-red-500 font-dmSans font-bold">
            Deleting...
          </Text>
        </View>
      )}
      <GestureDetector gesture={composed}>
        <Animated.View style={animatedStyle}>
          <View
            layout={LinearTransition.springify().damping(40).stiffness(400)}
            from={{
              opacity: 0,
              translateY: isDeleting ? 0 : 50,
              scale: isDeleting ? 1 : 0.9,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
              scale: 1,
            }}
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
            onDidAnimate={() => setIsAnimateEnded(true)}
            key={item.transactionId}
            className="flex flex-row items-center justify-between my-1 bg-white p-3 rounded-2xl border border-gray-300"
          >
            <View className="flex flex-row items-center gap-2">
              {item?.user?.avatar ? (
                <Image
                  className="size-12 rounded-xl"
                  source={{
                    uri: item.user.avatar + `?random=${Math.random()}`,
                  }}
                />
              ) : (
                <View className="size-12 rounded-xl bg-gray-300 flex justify-center items-center">
                  <Text className="text-white font-bold text-lg">
                    {item.user.name.charAt(0)}
                  </Text>
                </View>
              )}

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
                  item.type === 'sent' ? 'text-red-500' : 'text-green-500',
                )}
              >
                {item.type === 'sent' ? '-' : '+'}
                {item.currencyType === 'USD' ? '$' : ''}
                {item.amount}
                {item.currencyType === 'ETB' ? 'ETB' : ''}
              </Text>
              <Text className="text-right font-dmSans text-sm text-[#5D5D5D]">
                {dayjs(item.date).format('hh:mm a')}
              </Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

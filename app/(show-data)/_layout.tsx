import { HandCoins, UsersRound } from 'lucide-react-native'
import { cn } from '@/lib/utils'
import { Text, View } from 'moti'
import { Tabs, TabTrigger, TabList, TabSlot } from 'expo-router/ui'
import Header from '@/components/header'
import { Href, usePathname } from 'expo-router'
import { Dimensions } from 'react-native'

export default function ShowDataRootLayout() {
  const pathName = usePathname()
  const { width } = Dimensions.get('screen')

  const tabs = [
    {
      name: 'users',
      title: 'Users',
      icon: UsersRound,
      component: '/(show-data)/users' as Href,
      isFocused: pathName === '/users' || pathName === '/(show-data)/users',
    },
    {
      name: 'transactions',
      title: 'Transactions',
      icon: HandCoins,
      component: '/(show-data)/transactions' as Href,
      isFocused:
        pathName === '/transactions' ||
        pathName === '/(show-data)/transactions',
    },
  ]

  return (
    <View className="flex-1 px-3 android:mt-3">
      <Header title="Show Data" />
      <View className="h-5" />
      <Tabs>
        <TabList className="w-full relative bg-white py-1 px-3 rounded-full flex justify-between flex-row items-center mb-2">
          <View
            from={{ left: 4 }}
            animate={{
              left: pathName === '/users' ? 4 : width / 2 - 4,
            }}
            transition={{
              type: 'spring',
              duration: 400,
            }}
            className="absolute z-0 w-1/2 h-full rounded-full bg-button"
          />
          {tabs.map((tab) => (
            <TabTrigger
              key={tab.name}
              name={tab.name}
              href={tab.component}
              className={cn('h-full rounded-full w-1/2 py-2.5')}
            >
              <Text
                className={cn(
                  tab.isFocused
                    ? 'text-white font-semibold'
                    : 'text-[#6D6D6D] font-medium',
                  'text-base w-full',
                  tab.name === 'users'
                    ? 'text-center mx-auto pr-4'
                    : 'text-center mx-auto pl-3',
                )}
              >
                {tab.title}
              </Text>
            </TabTrigger>
          ))}
        </TabList>
        <TabSlot />
      </Tabs>
    </View>
  )
}

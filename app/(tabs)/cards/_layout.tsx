import Header from '@/components/header'
import { Text, View } from 'moti'
import { Tabs, TabTrigger, TabList, TabSlot } from 'expo-router/ui'
import { Href, usePathname } from 'expo-router'
import { Dimensions } from 'react-native'
import { cn } from '@/lib/utils'

export default function CardsLayout() {
  const pathName = usePathname()
  const { width } = Dimensions.get('screen')

  const tabs = [
    {
      name: 'virtualCard',
      title: 'Virtual Card',
      component: '/cards/virtual' as Href,
      isFocused: pathName === '/cards/virtual' || pathName === '/cards',
    },
    {
      name: 'physicalCard',
      title: 'Physical Card',
      component: '/cards/physical' as Href,
      isFocused: pathName === '/cards/physical',
    },
  ]

  return (
    <View className="flex-1 px-3 android:mt-3">
      <Header title="Digital Card Access" />
      <View className="h-5" />
      <Tabs>
        <TabList className="w-full relative bg-white py-1 px-3 rounded-full flex justify-between flex-row items-center mb-2">
          <View
            from={{ left: 4 }}
            animate={{
              left:
                pathName === '/cards/virtual' || pathName === '/cards'
                  ? 4
                  : width / 2 - 4,
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
                  tab.name === 'virtualCard'
                    ? 'text-center mx-auto pr-4'
                    : 'text-center mx-auto pl-4',
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

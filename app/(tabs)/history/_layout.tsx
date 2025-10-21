import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui'
import { Text, View } from 'moti'
import { cn } from '@/lib/utils'
import Header from '@/components/header'
import { Search } from 'lucide-react-native'
import { Input, InputField } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import useDataStore from '@/store/data.store'
import { useDebounceValue } from 'usehooks-ts'
import { Href, usePathname } from 'expo-router'
import { Dimensions } from 'react-native'

export default function RootHistoryLayout() {
  const [searchText, setSearchText] = useState('')
  const { searchTransaction } = useDataStore()
  const [debouncedValue] = useDebounceValue(searchText, 700)
  const pathName = usePathname()
  const { width } = Dimensions.get('screen')

  useEffect(() => {
    searchTransaction(debouncedValue)
  }, [debouncedValue])

  const tabs = [
    {
      name: 'all',
      title: 'All',
      component: '/(tabs)/history/all' as Href,
      isFocused:
        pathName === '/history/all' || pathName === '/tabs)/history/all',
    },
    {
      name: 'sent',
      title: 'Sent',
      component: '/(tabs)/history/sent' as Href,
      isFocused:
        pathName === '/history/sent' || pathName === '/tabs)/history/sent',
    },
    {
      name: 'received',
      title: 'Received',
      component: '/(tabs)/history/received' as Href,
      isFocused:
        pathName === '/history/received' ||
        pathName === '/tabs)/history/received',
    },
  ]

  return (
    <View className="flex-1 px-3 android:mt-3">
      <Header title="History" />
      <View className="h-5" />
      <View className="mb-3 flex h-14 w-full flex-row items-center overflow-hidden rounded-full border border-[#E7E7E7] bg-white py-2 pl-5">
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
      <Tabs>
        <TabList className="w-full relative bg-white py-1 px-2 rounded-full flex flex-row items-center mb-2">
          <View
            from={{ left: 4 }}
            animate={{
              left:
                pathName === '/history/all'
                  ? 4
                  : pathName === '/history/sent'
                  ? width / 3
                  : (width / 3) * 2 - 7,
            }}
            transition={{
              type: 'spring',
              duration: 400,
            }}
            style={{
              width: width / 3 - 8 - 10,
            }}
            className="absolute z-0 h-full rounded-full bg-button"
          />
          {tabs.map((tab) => (
            <TabTrigger
              key={tab.name}
              name={tab.name}
              href={tab.component}
              style={{
                width: width / 3 - 8 - 10,
              }}
              className={cn('h-full rounded-full py-2.5')}
            >
              <Text
                className={cn(
                  tab.isFocused
                    ? 'text-white font-semibold'
                    : 'text-[#6D6D6D] font-medium',
                  'text-base w-full text-center mx-auto',
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

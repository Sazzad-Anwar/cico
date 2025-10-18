import { Tabs } from 'expo-router'
import { Text, View } from 'moti'
import { Platform } from 'react-native'
import { cn } from '@/lib/utils'
import Header from '@/components/header'
import { Search } from 'lucide-react-native'
import { Input, InputField } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import useDataStore from '@/store/data.store'
import { useDebounceValue } from 'usehooks-ts'

export default function RootHistoryLayout() {
  const [searchText, setSearchText] = useState('')
  const { searchTransaction } = useDataStore()
  const [debouncedValue] = useDebounceValue(searchText, 700)

  useEffect(() => {
    searchTransaction(debouncedValue)
  }, [debouncedValue])

  const tabs = [
    {
      name: 'all',
      title: 'All',
      component: 'all',
    },
    {
      name: 'sent',
      title: 'Sent',
      component: 'sent',
    },
    {
      name: 'received',
      title: 'Received',
      component: 'received',
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
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarPosition: 'top',
        }}
      >
        {tabs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIconStyle: { display: 'none' },
              tabBarBackground: () => <View className="bg-white" />,
              headerShown: false,
              animation: 'shift',
              tabBarStyle: {
                marginTop: 0,
                paddingTop: 0,
                top: 0,
                padding: 6,
                maxHeight: 50,
                borderRadius: 100,
                backgroundColor: 'white',
                height: Platform.OS === 'ios' ? 80 : 75,
              },
              tabBarLabel: ({ focused }) => {
                return (
                  <View
                    className={cn(
                      'h-full rounded-full w-full flex justify-center items-center',
                      focused ? 'bg-button ' : 'bg-white',
                    )}
                  >
                    <Text
                      className={cn(
                        focused
                          ? 'text-white font-semibold'
                          : 'text-[#6D6D6D] font-medium',
                        'text-base',
                      )}
                    >
                      {tab.title}
                    </Text>
                  </View>
                )
              },
            }}
          />
        ))}
      </Tabs>
    </View>
  )
}

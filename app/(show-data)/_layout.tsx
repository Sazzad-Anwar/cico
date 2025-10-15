import { HandCoins, UsersRound } from 'lucide-react-native'
import { cn } from '../../lib/utils'
import { Text, View } from 'moti'
import { Platform } from 'react-native'
import { Tabs } from 'expo-router'
import { Icon } from '../../components/ui/icon'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../components/header'

export default function ShowDataRootLayout() {
  const { top } = useSafeAreaInsets()
  const tabs = [
    {
      name: 'users',
      title: 'Users',
      icon: UsersRound,
      component: 'users',
    },
    {
      name: 'transactions',
      title: 'Transactions',
      icon: HandCoins,
      component: 'transactions',
    },
  ]

  return (
    <View className="flex-1 px-3 android:mt-3">
      <Header title="Show Data" />
      <View className="h-5" />
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
                        'text-sm',
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

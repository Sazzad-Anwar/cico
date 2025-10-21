import { Tabs } from 'expo-router'
import {
  Bolt,
  History,
  House,
  Scan,
  ScanLine,
  WalletCards,
} from 'lucide-react-native'
import { Text, View } from 'moti'
import { Icon } from '../../components/ui/icon'
import { cn } from '../../lib/utils'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeRootLayout() {
  const { bottom } = useSafeAreaInsets()
  const tabs = [
    {
      name: 'home',
      title: 'Home',
      icon: House,
      component: 'home',
    },
    {
      name: 'cards',
      title: 'Cards',
      icon: WalletCards,
      component: 'cards',
    },
    {
      name: 'scan',
      title: 'Scan',
      icon: ScanLine,
      component: 'scan',
    },
    {
      name: 'history',
      title: 'History',
      icon: History,
      component: 'history',
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: Bolt,
      component: 'settings',
    },
  ]
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIconStyle: { display: 'none' },
            tabBarBackground: () => <View className="bg-white" />,
            animation: 'shift',
            tabBarStyle: {
              marginTop: 0,
              paddingTop: 0,
              marginBottom: Platform.OS === 'android' ? bottom : 0,
              paddingBottom: Platform.OS === 'ios' ? bottom : 0,
              top: 0,
              backgroundColor: 'white',
              height: Platform.OS === 'ios' ? 80 : 75,
            },
            tabBarLabel: ({ focused }) => {
              if (tab.name === 'scan') {
                return (
                  <View
                    className={cn(
                      'flex size-12 items-center justify-center rounded-full bg-button text-white',
                    )}
                  >
                    <Icon
                      as={tab.icon}
                      size={24}
                      color="white"
                    />
                  </View>
                )
              }
              return (
                <View
                  className={cn(
                    'absolute top-0 mt-0 flex size-[60px] items-center justify-center border-t-4 pt-0 font-semibold',
                    focused ? 'border-button' : 'border-transparent',
                  )}
                >
                  <Icon
                    as={tab.icon}
                    size={24}
                    color={focused ? '#329600' : '#6D6D6D'}
                  />
                  <Text
                    className={cn(
                      'text-center text-[12px] font-medium leading-[20px]',
                      focused ? 'text-button' : 'text-[#6D6D6D]',
                    )}
                  >
                    {tab.title}{' '}
                  </Text>
                </View>
              )
            },
          }}
        />
      ))}
    </Tabs>
  )
}

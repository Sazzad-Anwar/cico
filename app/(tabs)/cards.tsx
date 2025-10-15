import { Text, View } from 'moti'
import { Button } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useAuthStore from '../../store/auth.store'
import Header from '../../components/header'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react'
import { cn } from '../../lib/utils'
import VirtualCard from '../../components/virtual-card'

export default function CardsScreen() {
  const { top } = useSafeAreaInsets()
  const { logout } = useAuthStore()
  const [value, setValue] = useState('virtualCard')

  return (
    <View className="relative flex-1 bg-gray-200 px-4">
      <Header title="Digital Card Access" />
      {/* <Tabs value={value} onValueChange={setValue} className="mt-3 w-full">
        <TabsList className="mx-auto h-10 w-full justify-between rounded-full">
          <TabsTrigger
            value="virtualCard"
            className={cn(
              'h-10 w-1/2 rounded-full py-0',
              value === 'virtualCard' ? 'bg-button' : ''
            )}>
            <Text className={value === 'virtualCard' ? 'text-white' : 'text-black'}>
              Virtual Card
            </Text>
          </TabsTrigger>
          <TabsTrigger
            value="physicalCard"
            className={cn(
              'h-10 w-1/2 rounded-full py-0',
              value === 'physicalCard' ? 'bg-button' : ''
            )}>
            <Text className={value === 'physicalCard' ? 'text-white' : ''}>Physical Card</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="virtualCard">
          <VirtualCard />
        </TabsContent>
        <TabsContent value="physicalCard">
          <VirtualCard isPhysicalCard={true} />
        </TabsContent>
      </Tabs> */}
    </View>
  )
}

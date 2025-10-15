import { Search } from 'lucide-react-native'
import { Image, ScrollView, Text, View } from 'moti'
import { Input } from '../../components/ui/input'
import { useEffect, useState } from 'react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '../../lib/utils'
import useDataStore from '../../store/data.store'
import { useDebounceValue } from 'usehooks-ts'
import dayjs from 'dayjs'
import Header from '../../components/header'

export default function HistoryScreen() {
  const { transfers, searchTransaction } = useDataStore()
  const [value, setValue] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [debouncedValue] = useDebounceValue(searchText, 700)

  useEffect(() => {
    searchTransaction(debouncedValue)
  }, [debouncedValue])

  return (
    <View className="relative flex-1 bg-gray-200 px-4">
      <Header title="History" />

      <View className="mt-5 flex h-11 w-full flex-row items-center overflow-hidden rounded-full border border-[#E7E7E7] bg-white py-2 pl-3">
        <Search
          size={18}
          color="#667085"
        />
        {/* <Input
          onChangeText={setSearchText}
          value={searchText}
          className="h-10 w-full border-0 p-0 pl-3 shadow-none"
          placeholder="Search By"
        /> */}
      </View>

      {/* <Tabs value={value} onValueChange={setValue} className="mt-3 w-full">
        <TabsList className="mx-auto h-9 rounded-full">
          <TabsTrigger
            value="all"
            className={cn('h-9 w-1/3 rounded-full py-0', value === 'all' ? 'bg-button' : '')}>
            <Text className={value === 'all' ? 'text-white' : 'text-black'}>All</Text>
          </TabsTrigger>
          <TabsTrigger
            value="sent"
            className={cn('h-9 w-1/3 rounded-full py-0', value === 'sent' ? 'bg-button' : '')}>
            <Text className={value === 'sent' ? 'text-white' : 'text-black'}>Sent</Text>
          </TabsTrigger>
          <TabsTrigger
            value="received"
            className={cn('h-9 w-1/3 rounded-full py-0', value === 'received' ? 'bg-button' : '')}>
            <Text className={value === 'received' ? 'text-white' : ''}>Received</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Text className="font-dmSans text-lg font-semibold">Recent Activity</Text>
          <ScrollView>
            <View className="mt-3 gap-3 rounded-xl bg-white p-3">
              {transfers.length ? (
                transfers
                  .sort(() => Math.random() - 0.5)
                  .map((transfer, index) => (
                    <View
                      key={transfer.name + '_' + index}
                      className="flex flex-row items-center justify-between">
                      <View className="flex flex-row items-center gap-2">
                        <Image className="size-12 rounded-xl" source={transfer.image} />
                        <View>
                          <Text className="font-dmSans text-base font-semibold">
                            {transfer.name}
                          </Text>
                          <Text className="text-sm text-[#5D5D5D]">
                            {dayjs(transfer.date).format('DD MMM YYYY')}
                          </Text>
                        </View>
                      </View>
                      <View className="flex flex-col">
                        <Text className="text-right font-dmSans text-base font-semibold">
                          ${transfer.amount}
                        </Text>
                        <Text className="text-right font-dmSans text-sm text-[#5D5D5D]">
                          {dayjs(transfer.date).format('hh:mm a')}
                        </Text>
                      </View>
                    </View>
                  ))
              ) : (
                <View className="flex flex-1 flex-row items-center justify-center bg-white">
                  <Text className="text-gray-500">No transactions found</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </TabsContent>
        <TabsContent value="sent">
          <Text className="font-dmSans text-lg font-semibold">Recent Activity</Text>
          <ScrollView>
            <View className="mt-3 gap-3 rounded-xl bg-white p-3">
              {transfers.length ? (
                transfers
                  .sort(() => Math.random() - 0.5)
                  .map((transfer, index) => (
                    <View
                      key={transfer.name + '_' + index}
                      className="flex flex-row items-center justify-between">
                      <View className="flex flex-row items-center gap-2">
                        <Image className="size-12 rounded-xl" source={transfer.image} />
                        <View>
                          <Text className="font-dmSans text-base font-semibold">
                            {transfer.name}
                          </Text>
                          <Text className="text-sm text-[#5D5D5D]">
                            {dayjs(transfer.date).format('DD MMM YYYY')}
                          </Text>
                        </View>
                      </View>
                      <View className="flex flex-col">
                        <Text className="text-right font-dmSans text-base font-semibold">
                          ${transfer.amount}
                        </Text>
                        <Text className="text-right font-dmSans text-sm text-[#5D5D5D]">
                          {dayjs(transfer.date).format('hh:mm a')}
                        </Text>
                      </View>
                    </View>
                  ))
              ) : (
                <View className="flex flex-1 flex-row items-center justify-center bg-white">
                  <Text className="text-gray-500">No transactions found</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </TabsContent>
        <TabsContent value="received">
          <Text className="font-dmSans text-lg font-semibold">Recent Activity</Text>
          <ScrollView>
            <View className="mt-3 gap-3 rounded-xl bg-white p-3">
              {transfers.length ? (
                transfers
                  .sort(() => Math.random() - 0.5)
                  .map((transfer, index) => (
                    <View
                      key={transfer.name + '_' + index}
                      className="flex flex-row items-center justify-between">
                      <View className="flex flex-row items-center gap-2">
                        <Image className="size-12 rounded-xl" source={transfer.image} />
                        <View>
                          <Text className="font-dmSans text-base font-semibold">
                            {transfer.name}
                          </Text>
                          <Text className="text-sm text-[#5D5D5D]">
                            {dayjs(transfer.date).format('DD MMM YYYY')}
                          </Text>
                        </View>
                      </View>
                      <View className="flex flex-col">
                        <Text className="text-right font-dmSans text-base font-semibold">
                          ${transfer.amount}
                        </Text>
                        <Text className="text-right font-dmSans text-sm text-[#5D5D5D]">
                          {dayjs(transfer.date).format('hh:mm a')}
                        </Text>
                      </View>
                    </View>
                  ))
              ) : (
                <View className="flex flex-1 flex-row items-center justify-center bg-white">
                  <Text className="text-gray-500">No transactions found</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </TabsContent>
      </Tabs> */}
    </View>
  )
}

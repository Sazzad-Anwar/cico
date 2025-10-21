import { Image, View, Text, ScrollView, AnimatePresence } from 'moti'
import Header from '@/components/header'
import { Search, X } from 'lucide-react-native'
import { Input, InputField } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { Dimensions, TouchableOpacity } from 'react-native'
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetScrollView,
} from '@/components/ui/actionsheet'

import { cn } from '@/lib/utils'
import { useRouter } from 'expo-router'
import { LinearTransition } from 'react-native-reanimated'

const serviceItems = [
  {
    name: 'Water',
    icon: require('@/assets/images/water.png'),
  },
  {
    name: 'Electricity',
    icon: require('@/assets/images/electricity.png'),
  },
  {
    name: 'Internet',
    icon: require('@/assets/images/internet.png'),
  },
  {
    name: 'Credit Card',
    icon: require('@/assets/images/credit-cards-icon.png'),
  },
  {
    name: 'Insurance',
    icon: require('@/assets/images/insurance.png'),
  },
  {
    name: 'GOV. Fee',
    icon: require('@/assets/images/govt-fee.png'),
  },
]

const instituitionItems = [
  {
    name: 'DESCO',
    type: 'Electricity',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'NESCO',
    type: 'Electricity',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'DPDC',
    type: 'Electricity',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'BPDP',
    type: 'Electricity',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'Dhaka WASA',
    type: 'Water',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'Chattogram WASA',
    type: 'Water',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'Rajshahi WASA',
    type: 'Water',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'Khulna WASA',
    type: 'Water',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'Link3',
    type: 'Internet',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'AmberIT',
    type: 'Internet',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'Carnival',
    type: 'Internet',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'Sam Online',
    type: 'Internet',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'Dot Internet',
    type: 'Internet',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'City Bank Amex card',
    type: 'Credit Card',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'Visa Credit Card Bill',
    type: 'Credit Card',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'NID Service',
    type: 'GOV. Fee',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: 'City Corporation Tax',
    type: 'GOV. Fee',
    icon: require('@/assets/images/document.png'),
  },
  {
    name: "Gov't School fee",
    type: 'GOV. Fee',
    icon: require('@/assets/images/document.png'),
  },
]

export default function BillPaymentScreen() {
  const [searchText, setSearchText] = useState('')
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [debouncedValue] = useDebounceValue(searchText, 700)
  const [institutions, setInstituitions] = useState(instituitionItems)
  const [openActionsheet, setOpenActionsheet] = useState(false)
  const router = useRouter()
  const { width } = Dimensions.get('screen')

  useEffect(() => {
    if (!!debouncedValue) {
      const filteredInstitutions = instituitionItems.filter((item) =>
        item.name.toLowerCase().includes(debouncedValue.toLowerCase()),
      )
      setInstituitions(filteredInstitutions)
    } else {
      setInstituitions(instituitionItems)
    }
    return () => setSelectedService(null)
  }, [])

  const onSelectInstitute = ({
    name,
    type,
  }: {
    name: string
    type: string
  }) => {
    router.navigate(`/bill-pay/${name}?type=${type}`)
    setOpenActionsheet(false)
  }

  return (
    <View className="relative flex-1 bg-gray-200 px-4">
      <Header title="Bill Payments" />

      <View className="mt-5 flex h-11 w-full flex-row items-center overflow-hidden rounded-full border border-[#E7E7E7] bg-white py-2 pl-3">
        <Search
          size={18}
          color="#667085"
        />
        <Input className="h-10 w-full border-0 p-0 pl-3 shadow-none">
          <InputField
            onChangeText={setSearchText}
            value={searchText}
            placeholder="Search institutions"
          />
        </Input>
      </View>

      <View className="mt-5 gap-3">
        <Text className="font-dmSans text-lg font-semibold">
          Select Service
        </Text>
        <View className="flex flex-row flex-wrap items-center justify-between gap-y-4">
          {serviceItems.map((item, index) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                setSelectedService(item.name)
                setOpenActionsheet(true)
              }}
              style={{ width: width / 4 }}
            >
              <View
                from={{ translateY: 20, scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  translateY: 0,
                }}
                transition={{
                  type: 'timing',
                  duration: index * 200,
                  delay: index * 50,
                }}
                className={cn(
                  'flex min-w-[80px] flex-col items-center justify-center gap-1.5 rounded-lg border border-transparent bg-white px-3 py-2',
                  selectedService === item.name
                    ? 'border-button bg-green-100/50'
                    : 'bg-white',
                )}
              >
                <Image
                  className="size-6"
                  source={item.icon}
                />
                <Text className="font-dmSans text-[10px] font-light">
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mt-5 gap-3">
        <Text className="font-dmSans text-lg font-semibold">
          Recent Transaction
        </Text>
        <ScrollView
          className="max-h-[600px] gap-y-2 rounded-2xl bg-white p-3"
          showsVerticalScrollIndicator={false}
        >
          <AnimatePresence>
            {institutions.slice(0, 4).map((institution, index) => (
              <View
                layout={LinearTransition.springify().damping(40).stiffness(400)} // 👈 enable automatic layout animation
                from={{
                  opacity: 0,
                  translateY: 50,
                  translateX: 0,
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
                key={institution.name + '_' + index}
                className="mb-4 flex flex-row items-center gap-2"
              >
                <Image
                  source={require('@/assets/images/document.png')}
                  className="size-12 rounded-2xl"
                />
                <View>
                  <Text className="font-dmSans text-base font-semibold">
                    WAPDA
                  </Text>
                  <Text className="text-sm text-[#5D5D5D]">Water</Text>
                </View>
              </View>
            ))}
          </AnimatePresence>
        </ScrollView>
      </View>

      <Actionsheet
        isOpen={openActionsheet}
        onClose={() => setOpenActionsheet(false)}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <View className="p-4 pb-5 border-b border-[#E7E7E7] w-full flex flex-row justify-between items-center">
            <Text className="text-lg font-semibold text-[#3D3D3D]">
              Select Instituition
            </Text>
            <TouchableOpacity
              onPress={() => {
                setOpenActionsheet(false)
                setSelectedService(null)
              }}
            >
              <X
                size={22}
                color="#3D3D3D"
              />
            </TouchableOpacity>
          </View>
          <ActionsheetScrollView className="h-1/2">
            {institutions
              .filter((institution) => institution.type === selectedService)
              .map((institution, index) => (
                <ActionsheetItem
                  key={institution.name}
                  onPress={() => onSelectInstitute(institution)}
                >
                  <View
                    layout={LinearTransition.springify()
                      .damping(40)
                      .stiffness(400)} // 👈 enable automatic layout animation
                    from={{
                      opacity: 0,
                      translateY: 50,
                      translateX: 0,
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
                    className="flex flex-row items-center gap-2"
                  >
                    <Image
                      source={require('@/assets/images/document.png')}
                      className="size-12 rounded-2xl"
                    />
                    <View>
                      <Text className="font-dmSans text-base font-semibold">
                        {institution.name}
                      </Text>
                      <Text className="text-sm text-[#5D5D5D]">
                        {institution.type}
                      </Text>
                    </View>
                  </View>
                </ActionsheetItem>
              ))}
          </ActionsheetScrollView>
        </ActionsheetContent>
      </Actionsheet>
    </View>
  )
}

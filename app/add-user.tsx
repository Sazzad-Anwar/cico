import { ScrollView, Text, View } from 'moti'
import { useState } from 'react'
import { Platform, Pressable, TouchableOpacity } from 'react-native'
import { User, UserSchema } from '../store/auth.store'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateAccountNumber } from '../lib/data'
import dayjs from 'dayjs'
import useDataStore from '../store/data.store'
import uuid from 'react-native-uuid'
import { CalendarDays, X } from 'lucide-react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { Input, InputField } from '../components/ui/input'
import ReactNativePhoneInput from 'react-native-phone-input'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import CustomButton from '../components/custom-button'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../components/header'
import Loader from '../components/loader'

export default function AddUserScreen() {
  const { top } = useSafeAreaInsets()
  const { addUser, isLoading } = useDataStore()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const form = useForm<Partial<User>>({
    resolver: zodResolver(UserSchema.partial()),
    defaultValues: {
      id: '',
      name: '',
      email: '',
      phoneNumber: '',
      avatar:
        'https://picsum.photos/200?random=' + Math.floor(Math.random() * 1000),
      accountNumber: generateAccountNumber(),
      dateOfBirth: dayjs().subtract(18, 'year').format('YYYY-MM-DD'),
      nid: '',
      kebeleId: '',
    },
  })
  const { push, navigate, dismissTo } = useRouter()

  const handleSubmit = async (data: Partial<User>) => {
    try {
      addUser({
        id: data.id || uuid.v4().toString(),
        name: data.name!,
        email: data.email!,
        phoneNumber: data.phoneNumber!,
        dateOfBirth: data.dateOfBirth!,
        nid: data.nid!,
        kebeleId: data.kebeleId!,
        avatar: data.avatar,
        accountNumber: data.accountNumber,
        deposit: [
          { type: 'ETB', amount: Math.random() * 1000 },
          { type: 'USD', amount: Math.random() * 1000 },
        ],
      })
      push('/send-money')
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <Loader
        isFullScreen
        loaderText="Adding user..."
      />
    )
  }

  return (
    <View
      style={{ marginTop: Platform.OS === 'android' ? top : 0 }}
      className="w-full"
    >
      <View className="px-5">
        <Header title="Add Contact" />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 40,
          borderRadius: 25,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          // keyboardShouldPersistTaps="handled"
          className="flex flex-col gap-4 h-full w-11/12 mb-8 android:mb-28"
        >
          <Input className="hidden">
            <InputField
              className="hidden"
              value={uuid.v4()}
            />
          </Input>

          <Controller
            control={form.control}
            name="name"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <View className="mt-5">
                <Text className="mb-2 text-base">Username</Text>
                <Input className="border h-11 rounded-md data-[focus=true]:border-[#D1D1D1] border-[#D1D1D1]">
                  <InputField
                    placeholder="Enter your full name"
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </Input>
                {error && (
                  <Text className="mt-1 text-sm text-red-500">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <View className="mt-5">
                <Text className="mb-2 text-base">Email</Text>
                <Input className="border h-11 rounded-md data-[focus=true]:border-[#D1D1D1] border-[#D1D1D1]">
                  <InputField
                    placeholder="Enter your email"
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </Input>
                {error && (
                  <Text className="mt-1 text-sm text-red-500">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={form.control}
            name="phoneNumber"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View className="mt-5">
                <Text className="mb-2 text-base">Phone Number</Text>
                <ReactNativePhoneInput
                  initialValue={value}
                  onChangePhoneNumber={(number) => onChange(number)}
                  disabled={false}
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D1D1',
                    borderRadius: 6,
                    height: 40,
                    padding: 10,
                  }}
                />
                {error && (
                  <Text className="mt-1 text-sm text-red-500">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={form.control}
            name="dateOfBirth"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <View className="mt-5">
                <Text className="mb-2 text-base">Date of Birth</Text>
                <TouchableOpacity className="mb-1 h-11 flex flex-row items-center gap-x-2 rounded-md border border-[#D1D1D1] overflow-hidden py-0 pl-3 pr-1 backdrop-blur-md">
                  <CalendarDays
                    size={20}
                    color="#888888"
                  />
                  <View className="w-full flex-row justify-between items-center">
                    <Pressable
                      className="w-full bg-transparent flex justify-start items-center"
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Text className="text-black w-full text-left">
                        {dayjs(value).format('MMMM D, YYYY')}
                      </Text>
                    </Pressable>
                    <DateTimePickerModal
                      isVisible={showDatePicker}
                      mode="date"
                      date={dayjs(value).toDate()}
                      accentColor="#329600"
                      textColor="#000"
                      onConfirm={(date) => {
                        onChange(dayjs(date).format('YYYY-MM-DD'))
                        setShowDatePicker(false)
                      }}
                      onCancel={() => setShowDatePicker(false)}
                    />
                  </View>
                </TouchableOpacity>

                {error && (
                  <Text className="mt-1 text-sm text-red-500">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={form.control}
            name="nid"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <View className="mt-5">
                <Text className="mb-2 text-base">NID</Text>
                <Input className="border rounded-md h-11 data-[focus=true]:border-[#D1D1D1] border-[#D1D1D1]">
                  <InputField
                    placeholder="Enter your NID"
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </Input>
                {error && (
                  <Text className="mt-1 text-sm text-red-500">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={form.control}
            name="kebeleId"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <View className="mt-5">
                <Text className="mb-2 text-base">Kebele ID</Text>
                <Input className="border rounded-md h-11 data-[focus=true]:border-[#D1D1D1] border-[#D1D1D1]">
                  <InputField
                    placeholder="Enter your Kebele ID"
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </Input>
                {error && (
                  <Text className="mt-1 text-sm text-red-500">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
          <Controller
            control={form.control}
            name="accountNumber"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <View className="mt-5">
                <Text className="mb-2 text-base">Account Number</Text>
                <Input className="border rounded-md h-11 data-[focus=true]:border-[#D1D1D1] border-[#D1D1D1]">
                  <InputField
                    placeholder="Enter your Account Number"
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </Input>
                {error && (
                  <Text className="mt-1 text-sm text-red-500">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
          <CustomButton
            onPress={form.handleSubmit(handleSubmit)}
            className="mt-8 bg-button mb-5"
            title="Continue"
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  )
}

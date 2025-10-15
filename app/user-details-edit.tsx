import { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useAuthStore, { SignupData, SignupSchema } from '../store/auth.store'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import Loader from '../components/loader'
import { Image, ScrollView, Text, View } from 'moti'
import Header from '../components/header'
import { Input, InputField } from '../components/ui/input'
import PhoneInput from 'react-native-phone-input'
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import CustomButton from '../components/custom-button'
import { Icon } from '../components/ui/icon'
import {
  CalendarDays,
  CircleUserRound,
  Eye,
  EyeOff,
  User,
} from 'lucide-react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useRouter } from 'expo-router'
import z from 'zod'

export const UserUpdateSchema = SignupSchema.safeExtend({
  avatar: z.string().optional(),
}).partial()

type UserUpdateData = Partial<z.infer<typeof UserUpdateSchema>>

export default function UserDetailsEdit() {
  const [showPassword, setShowPassword] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const { navigate } = useRouter()
  const { user, updateUser, isLoading } = useAuthStore()

  const form = useForm<UserUpdateData>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      ...user,
    },
  })

  const handleSubmit = async (data: UserUpdateData) => {
    try {
      data.avatar = 'https://picsum.photos/200' // Temporary static avatar
      await updateUser(data)
      // Successfully registered, navigate to home
      navigate('/home')
    } catch (error) {
      // Error is handled by the auth store
      console.log('Registration failed:', error)
    }
  }

  if (isLoading) {
    return (
      <Loader
        isFullScreen
        loaderText="Updating details..."
        className="mt-10"
      />
    )
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <ScrollView className="bg-white px-5">
        <Header title="Details" />
        <View className="pb-10 pt-5">
          <View className="flex justify-center items-center">
            <View className="h-24 w-24 overflow-hidden justify-center items-center rounded-full shadow-md bg-gray-50 border border-gray-100">
              {!!user?.avatar ? (
                <Image
                  source={{ uri: user?.avatar }}
                  className="h-24 w-24 rounded-full"
                />
              ) : (
                <User size={44} />
              )}
            </View>
          </View>

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
                <PhoneInput
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
            name="password"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <View className="mt-5">
                <Text className="mb-2 text-base">Password</Text>
                <View className="relative h-11">
                  <Input className="border h-full rounded-md data-[focus=true]:border-[#D1D1D1] border-[#D1D1D1] pr-12">
                    <InputField
                      ref={ref}
                      secureTextEntry={!showPassword}
                      placeholder="Enter your password"
                      className=""
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </Input>
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 h-11 pt-0.5 top-1/2 -translate-y-1/2"
                    style={{ transform: [{ translateY: -12 }] }}
                  >
                    <Icon
                      as={showPassword ? EyeOff : Eye}
                      size={20}
                      className="text-[#D1D1D1]"
                    />
                  </TouchableOpacity>
                </View>
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
            name="confirmPassword"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <View className="mt-5">
                <Text className="mb-2 text-base">Confirm Password</Text>
                <View className="relative h-11">
                  <Input className="border h-full rounded-md data-[focus=true]:border-[#D1D1D1] border-[#D1D1D1] pr-12">
                    <InputField
                      ref={ref}
                      secureTextEntry={!showPassword}
                      placeholder="Confirm your password"
                      className=""
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </Input>
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 h-11 pt-0.5 top-1/2 -translate-y-1/2"
                    style={{ transform: [{ translateY: -12 }] }}
                  >
                    <Icon
                      as={showPassword ? EyeOff : Eye}
                      size={20}
                      className="text-[#D1D1D1]"
                    />
                  </TouchableOpacity>
                </View>
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
            className="mt-8 bg-button"
            title="Update"
          />
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

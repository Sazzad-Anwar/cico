import { Link, useRouter } from 'expo-router'
import { ScrollView, Text, View } from 'moti'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { set, z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, InputField } from '../components/ui/input'
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '../components/ui/checkbox'
import { useEffect, useState } from 'react'
// import { Label } from '../components/ui/label';
// import Button from '../components/ButtonComponent';
import { Icon } from '../components/ui/icon'
import { CheckIcon, Eye, EyeOff } from 'lucide-react-native'
import Loader from '../components/loader'
import { BlurView } from 'expo-blur'
import useAuthStore from '../store/auth.store'
import Button from '../components/custom-button'
import {
  KeyboardAwareScrollView,
  KeyboardProvider,
  KeyboardToolbar,
} from 'react-native-keyboard-controller'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string({ message: 'Invalid password' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  isRemembered: z.boolean(),
})

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      isRemembered: false,
    },
  })
  const { top } = useSafeAreaInsets()
  const { push } = useRouter()
  const { isLoading, login, isAuthenticated, error, clearError } =
    useAuthStore()

  // Load saved credentials when component mounts
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const credentials = await AsyncStorage.getItem('credentials')
        if (credentials) {
          const { email, password, isRemembered } = JSON.parse(credentials)
          form.reset({ email, password, isRemembered })
        }
      } catch (error) {
        console.error('Error loading credentials:', error)
      }
    }
    loadCredentials()
  }, [])

  const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      if (data.isRemembered) {
        // Save email to secure storage or AsyncStorage
        await AsyncStorage.setItem(
          'credentials',
          JSON.stringify({
            email: data.email,
            password: data.password,
            isRemembered: data.isRemembered,
          }),
        )
      }
      await login(data)
      if (isAuthenticated) {
        push('/home')
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        clearError()
      }, 10000)
      form.reset()
      return () => clearTimeout(timeout)
    }
  }, [error])

  if (isLoading) {
    return (
      <Loader
        isFullScreen
        loaderText="Logging in..."
      />
    )
  }

  return (
    <KeyboardAwareScrollView
      bottomOffset={20}
      contentContainerStyle={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="flex-1 bg-white p-5 h-screen"
      >
        <View style={{ marginTop: top }}>
          <Text className="font-dmSans text-xl android:font-bold ios:font-semibold">
            Log in
          </Text>
          <Text className="mt-3 font-dmSans text-sm text-[#888888]">
            Access your account and stay connected.
          </Text>
        </View>
        {error && (
          <Text
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 300 }}
            className="mt-2 rounded-md bg-red-50 p-2 text-sm text-red-500"
          >
            {error}
          </Text>
        )}

        <Controller
          control={form.control}
          name="email"
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <View className="mt-5">
              <Text className="mb-2 text-base">Email</Text>
              <Input className="border data-[focus=true]:border-[#D1D1D1] border-[#D1D1D1]">
                <InputField
                  placeholder="Enter your email"
                  ref={ref}
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  keyboardType="email-address"
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
              <View className="relative">
                <Input className="border data-[focus=true]:border-[#D1D1D1] border-[#D1D1D1] pr-12">
                  <InputField
                    ref={ref}
                    secureTextEntry={!showPassword}
                    placeholder="Enter your password"
                    value={value || ''}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </Input>
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
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
          name="isRemembered"
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <View className="mt-3 flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-3">
                <Checkbox
                  onChange={(data) => onChange(Boolean(data))}
                  value={value?.toString() || 'false'}
                  isChecked={value || false}
                  ref={ref}
                  onBlur={onBlur}
                >
                  <CheckboxIndicator className="data-[checked=true]:border-button border border-button">
                    <CheckboxIcon
                      className="bg-button border border-transparent"
                      as={CheckIcon}
                    />
                  </CheckboxIndicator>
                  <CheckboxLabel>Remember me</CheckboxLabel>
                </Checkbox>
              </View>
              <Text>{error?.message}</Text>
              <Text>Forgot Password ?</Text>
            </View>
          )}
        />

        <Button
          onPress={() => form.handleSubmit(handleSubmit)()}
          className="mt-8 bg-button"
          title="Continue"
        />

        <View className="android:px-5 ios:px-px android:pt-80 ios:pt-96 text-[#888888]">
          <Text className="text-center text-[#888888]">
            By signing up, you agree to our{' '}
            <Text className="text-[#329600]">Terms of Service</Text> and{' '}
            <Text className="text-[#329600]"> Privacy Policy </Text>, ensuring
            your information is protected.
          </Text>
          <View className="mt-3 flex flex-row items-center justify-center">
            <Text className="text-base font-medium">
              Do not have an Account?
            </Text>
            <Link
              href="/signup"
              className="ml-1 text-base font-semibold text-[#329600]"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

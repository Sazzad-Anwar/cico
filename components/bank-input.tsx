import { useLocalSearchParams, useRouter } from 'expo-router'
import useAuthStore from '../store/auth.store'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text, View } from 'moti'
import { Input, InputField } from './ui/input'
import Button from './custom-button'
import z from 'zod'
import { useSnackbar, useSnackbarContext } from './ui/snackbar'
import { ExampleApp } from './ui/snackbar/example'

const CardTopUpSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  accountNumber: z
    .string()
    .min(16, { message: 'Card number must be 16 digits' }),
  bankName: z.string().min(2, { message: 'Bank name is required' }),
  branch: z.string().min(2, { message: 'Branch is required' }),
})

type CardTopUpForm = z.infer<typeof CardTopUpSchema>

export default function BankInput() {
  const snackbar = useSnackbarContext()
  const { dismiss } = useRouter()
  const { user, updateUser, isLoading } = useAuthStore()
  const { amount, currency, method } = useLocalSearchParams()
  const form = useForm<CardTopUpForm>({
    resolver: zodResolver(CardTopUpSchema),
    defaultValues: {
      name: '',
      accountNumber: '',
      bankName: method as string,
      branch: 'Main Branch',
    },
  })
  const handleTopUp = (data: CardTopUpForm) => {
    updateUser({
      ...user,
      deposit: user?.deposit?.map((item) =>
        item.type === currency
          ? { ...item, amount: item.amount + Number(amount) }
          : item,
      ),
    })
    if (!isLoading) {
      snackbar.success('Top up successful!', {
        duration: 3000,
        title: 'Success',
        position: 'bottom',
      })
    }

    dismiss()
  }

  return (
    <View className="flex flex-col gap-6 h-full">
      <Controller
        control={form.control}
        name="name"
        render={({ field: { onChange, value, ref, onBlur }, fieldState }) => (
          <View className="flex flex-col gap-3 w-full">
            <Text className="font-semibold font-dmSans text-sm">Name</Text>
            <Input className="border border-[#D1D1D1] rounded-xl h-12 data-[focus]:border-[#D1D1D1]">
              <InputField
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="name"
                placeholder="John Doe"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={ref}
              />
            </Input>
            {fieldState.error && (
              <Text className="mt-px text-sm text-red-500">
                {fieldState.error.message}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="accountNumber"
        render={({ field: { value, onChange, onBlur, ref }, fieldState }) => (
          <View className="flex flex-col gap-3 w-full">
            <Text className="font-semibold font-dmSans text-sm">
              Account Number
            </Text>
            <Input className="border border-[#D1D1D1] rounded-xl h-12 data-[focus]:border-[#D1D1D1]">
              <InputField
                keyboardType="number-pad"
                autoCapitalize="none"
                placeholder="000000000000000000"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={ref}
              />
            </Input>
            {fieldState.error && (
              <Text className="mt-px text-sm text-red-500">
                {fieldState.error.message}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="bankName"
        render={({ field: { value, onChange, onBlur, ref }, fieldState }) => (
          <View className="flex flex-col gap-3 w-full">
            <Text className="font-semibold font-dmSans text-sm">Bank Name</Text>
            <Input className="border border-[#D1D1D1] rounded-xl h-12 data-[focus]:border-[#D1D1D1]">
              <InputField
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="name"
                placeholder="Bank Name"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={ref}
              />
            </Input>
            {fieldState.error && (
              <Text className="mt-px text-sm text-red-500">
                {fieldState.error.message}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="branch"
        render={({ field: { value, onChange, onBlur, ref }, fieldState }) => (
          <View className="flex flex-col gap-3 w-full">
            <Text className="font-semibold font-dmSans text-sm">Branch</Text>
            <Input className="border border-[#D1D1D1] rounded-xl h-12 data-[focus]:border-[#D1D1D1]">
              <InputField
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="name"
                placeholder="Branch Name"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={ref}
              />
            </Input>
            {fieldState.error && (
              <Text className="mt-px text-sm text-red-500">
                {fieldState.error.message}
              </Text>
            )}
          </View>
        )}
      />

      <Button
        title="Next"
        onPress={form.handleSubmit(handleTopUp)}
      />
    </View>
  )
}

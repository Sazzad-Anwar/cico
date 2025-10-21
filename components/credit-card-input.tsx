import { useLocalSearchParams, useRouter } from 'expo-router'
import useAuthStore from '../store/auth.store'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text, View } from 'moti'
import { Input, InputField } from './ui/input'
import Button from './custom-button'
import z from 'zod'
import { useSnackbarContext } from './ui/snackbar'
import {
  CreditCardFormData,
  CreditCardInput,
  validateCardNumber,
  validateExpiryDate,
} from './ui/creadit-card-input'

const creditCardSchema = z.object({
  cardholderName: z.string().min(2, 'Name must be at least 2 characters'),
  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .refine(validateCardNumber, 'Invalid card number'),
  expiryDate: z
    .string()
    .min(1, 'Expiry date is required')
    .refine(validateExpiryDate, 'Invalid expiry date'),
  cvv: z
    .string()
    .min(3, 'CVV must be at least 3 digits')
    .max(4, 'CVV must be at most 4 digits')
    .regex(/^\d+$/, 'CVV must contain only numbers'),
})

export default function CreditCardInputComponent() {
  const snackbar = useSnackbarContext()
  const router = useRouter()
  const { user, updateUser, isLoading } = useAuthStore()
  const { amount, currency } = useLocalSearchParams()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreditCardFormData>({
    resolver: zodResolver(creditCardSchema),
    mode: 'onChange',
    defaultValues: {
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  })

  const onSubmit = (data: CreditCardFormData) => {
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

    router.back()
  }

  return (
    <View className="flex flex-col gap-6 h-full ">
      <CreditCardInput
        control={control}
        cardNumberName="cardNumber"
        expiryDateName="expiryDate"
        cvvName="cvv"
        cardholderNameName="cardholderName"
        className="flex flex-col gap-4"
      />
      <Button
        title="Top up"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
        className={`mt-2`}
      />
      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <View className="mt-4 p-3 bg-red-50 rounded-lg">
          <Text className="text-red-600 font-medium mb-2">
            Please fix the following errors:
          </Text>
          {errors.cardholderName && (
            <Text className="text-red-500 text-sm">
              • {errors.cardholderName.message}
            </Text>
          )}
          {errors.cardNumber && (
            <Text className="text-red-500 text-sm">
              • {errors.cardNumber.message}
            </Text>
          )}
          {errors.expiryDate && (
            <Text className="text-red-500 text-sm">
              • {errors.expiryDate.message}
            </Text>
          )}
          {errors.cvv && (
            <Text className="text-red-500 text-sm">• {errors.cvv.message}</Text>
          )}
        </View>
      )}
    </View>
  )
}

import React from 'react'
import { View, Text } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  CreditCardInput,
  CreditCardFormData,
  detectCardType,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
} from './index'
import CustomButton from '../../custom-button'

// Validation schema
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

export default function CreditCardExample() {
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
    console.log('Credit Card Data:', data)
    // Process the credit card data here
  }

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <Text className="text-2xl font-bold mb-6 text-center">
        Add Payment Method
      </Text>

      <CreditCardInput
        control={control}
        cardNumberName="cardNumber"
        expiryDateName="expiryDate"
        cvvName="cvv"
        cardholderNameName="cardholderName"
        className="mb-6 flex flex-col gap-4"
      />

      <CustomButton
        title="Add Card"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
        className={`mt-4 ${!isValid ? 'opacity-50' : ''}`}
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

import React, { forwardRef, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react-native'
import { cn } from '../../../lib/utils'
import { Input, InputField, InputSlot, InputIcon } from '../input'

// Types
export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown'

// Utility functions
export const detectCardType = (cardNumber: string): CardType => {
  const cleanNumber = cardNumber.replace(/\s/g, '')
  if (/^4/.test(cleanNumber)) return 'visa'
  if (/^5[1-5]/.test(cleanNumber)) return 'mastercard'
  if (/^3[47]/.test(cleanNumber)) return 'amex'
  if (/^6(?:011|5)/.test(cleanNumber)) return 'discover'
  return 'unknown'
}

export const formatCardNumber = (value: string): string => {
  const cleanValue = value.replace(/\s/g, '').replace(/[^0-9]/gi, '')
  const cardType = detectCardType(cleanValue)

  if (cardType === 'amex') {
    return cleanValue
      .substring(0, 15)
      .replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3')
      .trim()
  } else {
    return cleanValue
      .substring(0, 16)
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim()
  }
}

export const formatExpiryDate = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')
  if (cleanValue.length >= 2) {
    return cleanValue.substring(0, 4).replace(/(\d{2})(\d{2})/, '$1/$2')
  }
  return cleanValue
}

// Validation functions
export const validateCardNumber = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\s/g, '')
  if (!/^\d+$/.test(cleanNumber) || cleanNumber.length < 13) return false

  // Luhn algorithm
  let sum = 0
  let isEven = false

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

export const validateExpiryDate = (expiryDate: string): boolean => {
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false

  const [month, year] = expiryDate.split('/').map((num) => parseInt(num, 10))
  if (!month || !year || month < 1 || month > 12) return false

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  if (year < currentYear) return false
  if (year === currentYear && month < currentMonth) return false

  return true
}

export const validateCVV = (cvv: string, cardType: CardType): boolean => {
  const expectedLength = cardType === 'amex' ? 4 : 3
  return cvv.length === expectedLength && /^\d+$/.test(cvv)
}

// Component interfaces
interface BaseInputProps {
  value?: string
  onChangeText?: (text: string) => void
  error?: boolean
  className?: string
  inputStyle?: StyleProp<TextStyle>
}

// Card Number Input
interface CardNumberInputProps extends BaseInputProps {
  placeholder?: string
  disabled?: boolean
}

const CardNumberInputComponent = forwardRef<
  React.ComponentRef<typeof InputField>,
  CardNumberInputProps
>(
  (
    { value = '', onChangeText, error, className, inputStyle, ...props },
    ref,
  ) => {
    const handleChangeText = (text: string) => {
      const formatted = formatCardNumber(text)
      onChangeText?.(formatted)
    }

    return (
      <Input
        variant="outline"
        size="md"
        isInvalid={error}
        className={cn(className)}
      >
        <InputField
          ref={ref}
          value={value}
          onChangeText={handleChangeText}
          placeholder="1234 5678 9012 3456"
          keyboardType="numeric"
          maxLength={19}
          style={inputStyle}
          {...props}
        />
      </Input>
    )
  },
)

// Expiry Date Input
interface ExpiryDateInputProps extends BaseInputProps {
  placeholder?: string
  disabled?: boolean
}

const ExpiryDateInputComponent = forwardRef<
  React.ComponentRef<typeof InputField>,
  ExpiryDateInputProps
>(
  (
    { value = '', onChangeText, error, className, inputStyle, ...props },
    ref,
  ) => {
    const handleChangeText = (text: string) => {
      const formatted = formatExpiryDate(text)
      onChangeText?.(formatted)
    }

    return (
      <Input
        variant="outline"
        size="md"
        isInvalid={error}
        className={cn(className)}
      >
        <InputField
          ref={ref}
          value={value}
          onChangeText={handleChangeText}
          placeholder="MM/YY"
          keyboardType="numeric"
          maxLength={5}
          style={inputStyle}
          {...props}
        />
      </Input>
    )
  },
)

// CVV Input
interface CVVInputProps extends BaseInputProps {
  cardType?: CardType
  containerStyle?: ViewStyle
  placeholder?: string
  disabled?: boolean
}

const CVVInputComponent = forwardRef<
  React.ComponentRef<typeof InputField>,
  CVVInputProps
>(
  (
    {
      value = '',
      onChangeText,
      error,
      cardType = 'unknown',
      className,
      containerStyle,
      inputStyle,
      ...props
    },
    ref,
  ) => {
    const [showCVV, setShowCVV] = useState(false)
    const maxLength = cardType === 'amex' ? 4 : 3

    const handleChangeText = (text: string) => {
      const cleanValue = text.replace(/\D/g, '').substring(0, maxLength)
      onChangeText?.(cleanValue)
    }

    return (
      <Input
        variant="outline"
        size="md"
        isInvalid={error}
        className={cn(className)}
        style={containerStyle}
      >
        <InputField
          ref={ref}
          value={value}
          onChangeText={handleChangeText}
          placeholder={cardType === 'amex' ? '1234' : '123'}
          keyboardType="numeric"
          maxLength={maxLength}
          secureTextEntry={!showCVV}
          style={inputStyle}
          {...props}
        />
        <InputSlot className="pr-3">
          <TouchableOpacity onPress={() => setShowCVV(!showCVV)}>
            <InputIcon as={showCVV ? EyeOff : Eye} />
          </TouchableOpacity>
        </InputSlot>
      </Input>
    )
  },
)

// Main Credit Card Form
export interface CreditCardFormData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
}

interface CreditCardInputProps<T extends FieldValues> {
  control: Control<T>
  cardNumberName: Path<T>
  expiryDateName: Path<T>
  cvvName: Path<T>
  cardholderNameName: Path<T>
  className?: string
  style?: ViewStyle
}

function CreditCardInputComponent<T extends FieldValues>({
  control,
  cardNumberName,
  expiryDateName,
  cvvName,
  cardholderNameName,
  className,
  style,
}: CreditCardInputProps<T>) {
  const [cardType, setCardType] = useState<CardType>('unknown')

  return (
    <View
      className={cn('space-y-4', className)}
      style={style}
    >
      <Controller
        control={control}
        name={cardholderNameName}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <View className="flex flex-col gap-3 w-full">
            <Text className="font-semibold font-dmSans text-sm">
              Cardholder Name
            </Text>
            <Input
              variant="outline"
              size="md"
              isInvalid={!!error}
              className="border border-[#D1D1D1] rounded-xl h-12 data-[focus]:border-[#D1D1D1]"
            >
              <InputField
                ref={ref}
                value={value || ''}
                onChangeText={onChange}
                placeholder="John Doe"
                autoCapitalize="words"
              />
            </Input>
            {error && (
              <Text className="text-red-500 text-sm mt-1">{error.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name={cardNumberName}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <View className="flex flex-col gap-3 w-full">
            <Text className="font-semibold font-dmSans text-sm">
              Card Number
            </Text>
            <CardNumberInputComponent
              className="border border-[#D1D1D1] rounded-xl h-12 data-[focus]:border-[#D1D1D1]"
              ref={ref}
              value={value || ''}
              onChangeText={(text) => {
                onChange(text)
                setCardType(detectCardType(text))
              }}
              error={!!error}
            />
            {error && (
              <Text className="text-red-500 text-sm mt-1">{error.message}</Text>
            )}
          </View>
        )}
      />

      <View className="flex flex-row justify-between w-full gap-3 items-center">
        <Controller
          control={control}
          name={expiryDateName}
          render={({
            field: { onChange, value, ref },
            fieldState: { error },
          }) => (
            <View className="flex-1 flex flex-col gap-3">
              <Text className="font-semibold font-dmSans text-sm">
                Expiry Date
              </Text>
              <ExpiryDateInputComponent
                className="border border-[#D1D1D1] rounded-xl h-12 data-[focus]:border-[#D1D1D1]"
                ref={ref}
                value={value || ''}
                onChangeText={onChange}
                error={!!error}
              />
              {error && (
                <Text className="text-red-500 text-sm mt-1">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name={cvvName}
          render={({
            field: { onChange, value, ref },
            fieldState: { error },
          }) => (
            <View className="flex-1 flex flex-col gap-3">
              <Text className="font-semibold font-dmSans text-sm">CVV</Text>
              <CVVInputComponent
                className="border border-[#D1D1D1] rounded-xl h-12 data-[focus]:border-[#D1D1D1]"
                ref={ref}
                value={value || ''}
                onChangeText={onChange}
                cardType={cardType}
                error={!!error}
              />
              {error && (
                <Text className="text-red-500 text-sm mt-1">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />
      </View>
    </View>
  )
}

export const CardNumberInput = CardNumberInputComponent
export const ExpiryDateInput = ExpiryDateInputComponent
export const CVVInput = CVVInputComponent
export const CreditCardInput = CreditCardInputComponent

export default CreditCardInputComponent

# Credit Card Input Component

A comprehensive, reusable credit card input component for React Native with React Hook Form integration, built with TypeScript and the custom Input UI components from the design system.

## Features

- 🎯 **React Hook Form Integration**: Seamless integration with react-hook-form and validation
- 🔍 **Card Type Detection**: Automatic detection of Visa, Mastercard, American Express, and Discover
- ✨ **Real-time Formatting**: Auto-formatting for card numbers, expiry dates, and CVV
- 🔒 **Secure CVV Input**: Toggle visibility for CVV field with eye icon using InputSlot and InputIcon
- ⚡ **TypeScript Support**: Full TypeScript support with proper type definitions
- 🎨 **Design System Integration**: Built with the custom Input components from `components/ui/input`
- ✅ **Built-in Validation**: Luhn algorithm validation, expiry date validation, and more

## Components

### Individual Input Components

- `CardNumberInput`: Formatted card number input with type detection using `<Input><InputField /></Input>`
- `ExpiryDateInput`: MM/YY formatted expiry date input using `<Input><InputField /></Input>`
- `CVVInput`: Secure CVV input with visibility toggle using `<Input><InputField /><InputSlot /></Input>`

### Complete Form Component

- `CreditCardInput`: Complete credit card form with all fields

## Installation

The component requires the following dependencies:

```bash
npm install react-hook-form lucide-react-native
```

## Usage

### Basic Usage with React Hook Form

```tsx
import React from 'react'
import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  CreditCardInput,
  CreditCardFormData,
  validateCardNumber,
  validateExpiryDate,
} from './components/ui/creadit-card-input'

const schema = z.object({
  cardholderName: z.string().min(2, 'Name required'),
  cardNumber: z.string().refine(validateCardNumber, 'Invalid card'),
  expiryDate: z.string().refine(validateExpiryDate, 'Invalid expiry'),
  cvv: z.string().min(3, 'CVV required'),
})

export default function PaymentForm() {
  const { control, handleSubmit } = useForm<CreditCardFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: CreditCardFormData) => {
    console.log('Card data:', data)
  }

  return (
    <View className="p-4">
      <CreditCardInput
        control={control}
        cardNumberName="cardNumber"
        expiryDateName="expiryDate"
        cvvName="cvv"
        cardholderNameName="cardholderName"
      />
    </View>
  )
}
```

### Individual Component Usage

```tsx
import {
  CardNumberInput,
  ExpiryDateInput,
  CVVInput,
} from './components/ui/creadit-card-input'

function CustomForm() {
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  return (
    <View>
      <CardNumberInput
        value={cardNumber}
        onChangeText={setCardNumber}
        placeholder="1234 5678 9012 3456"
      />

      <ExpiryDateInput
        value={expiryDate}
        onChangeText={setExpiryDate}
        placeholder="MM/YY"
      />

      <CVVInput
        value={cvv}
        onChangeText={setCvv}
        cardType="visa"
        placeholder="123"
      />
    </View>
  )
}
```

## API Reference

### CreditCardInput Props

| Prop                 | Type         | Required | Description                    |
| -------------------- | ------------ | -------- | ------------------------------ |
| `control`            | `Control<T>` | ✅       | React Hook Form control object |
| `cardNumberName`     | `Path<T>`    | ✅       | Field name for card number     |
| `expiryDateName`     | `Path<T>`    | ✅       | Field name for expiry date     |
| `cvvName`            | `Path<T>`    | ✅       | Field name for CVV             |
| `cardholderNameName` | `Path<T>`    | ✅       | Field name for cardholder name |
| `className`          | `string`     | ❌       | Additional CSS classes         |
| `style`              | `ViewStyle`  | ❌       | React Native style object      |

### Individual Input Props

| Prop             | Type                     | Required | Description                   |
| ---------------- | ------------------------ | -------- | ----------------------------- |
| `value`          | `string`                 | ❌       | Input value                   |
| `onChangeText`   | `(text: string) => void` | ❌       | Change handler                |
| `error`          | `boolean`                | ❌       | Error state styling           |
| `className`      | `string`                 | ❌       | Additional CSS classes        |
| `inputStyle`     | `StyleProp<TextStyle>`   | ❌       | Input style object            |
| `cardType`       | `CardType`               | ❌       | Card type for CVV input       |
| `containerStyle` | `ViewStyle`              | ❌       | Container style for CVV input |

### Utility Functions

#### `detectCardType(cardNumber: string): CardType`

Detects the card type based on the card number.

#### `formatCardNumber(value: string): string`

Formats card number with appropriate spacing.

#### `formatExpiryDate(value: string): string`

Formats expiry date as MM/YY.

#### `validateCardNumber(cardNumber: string): boolean`

Validates card number using Luhn algorithm.

#### `validateExpiryDate(expiryDate: string): boolean`

Validates expiry date format and ensures it's not expired.

#### `validateCVV(cvv: string, cardType: CardType): boolean`

Validates CVV length based on card type.

## Card Types Supported

- **Visa**: 4xxx xxxx xxxx xxxx
- **Mastercard**: 5xxx xxxx xxxx xxxx
- **American Express**: 3xxx xxxxxx xxxxx
- **Discover**: 6xxx xxxx xxxx xxxx

## Styling

The component uses NativeWind/Tailwind CSS classes for styling. You can customize the appearance by:

1. **Passing className props**: Add additional Tailwind classes
2. **Using style props**: Pass React Native style objects
3. **Modifying the component**: Fork and customize the component directly

## Validation Schema Example

```tsx
import * as z from 'zod'
import {
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  detectCardType,
} from './components/ui/creadit-card-input'

const creditCardSchema = z.object({
  cardholderName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name too long'),

  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .refine(validateCardNumber, 'Invalid card number'),

  expiryDate: z
    .string()
    .min(1, 'Expiry date is required')
    .refine(validateExpiryDate, 'Card has expired or invalid date'),

  cvv: z
    .string()
    .min(3, 'CVV must be at least 3 digits')
    .max(4, 'CVV must be at most 4 digits')
    .regex(/^\d+$/, 'CVV must contain only numbers'),
})
```

## TypeScript

The component is fully typed with TypeScript. Import the types you need:

```tsx
import type {
  CardType,
  CreditCardFormData,
  CardInfo,
} from './components/ui/creadit-card-input'
```

## License

This component is part of the digital wallet project and follows the same license terms.

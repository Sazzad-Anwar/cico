import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'moti'
import Header from '@/components/header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import CreditCardInput from '@/components/credit-card-input'
import BankInput from '@/components/bank-input'

export default function TopUpMethodScreen() {
  const { method } = useLocalSearchParams()

  return (
    <>
      <Header
        title={method as string}
        className="px-5"
      />
      <KeyboardAwareScrollView
        bottomOffset={20}
        contentContainerStyle={{ flex: 1 }}
      >
        <ScrollView className="mt-10 bg-white p-5 h-screen rounded-3xl">
          {method.includes('credit-cards') && <CreditCardInput />}
          {method.includes('Bank') && <BankInput />}
        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  )
}

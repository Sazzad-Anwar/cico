import { ScrollView, Text } from 'moti'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import Header from '../../components/header'

export default function TransactionsScreen() {
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <ScrollView className="px-5">
        <Text>TrTextctions</Text>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

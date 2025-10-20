// Simple test for credit card utilities
import {
  detectCardType,
  formatCardNumber,
  formatExpiryDate,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
} from './index'

// Test card numbers (test numbers, not real)
console.log('=== Card Type Detection Tests ===')
console.log('4111111111111111 ->', detectCardType('4111111111111111')) // Should be 'visa'
console.log('5555555555554444 ->', detectCardType('5555555555554444')) // Should be 'mastercard'
console.log('378282246310005 ->', detectCardType('378282246310005')) // Should be 'amex'
console.log('6011111111111117 ->', detectCardType('6011111111111117')) // Should be 'discover'

console.log('\n=== Formatting Tests ===')
console.log('4111111111111111 ->', formatCardNumber('4111111111111111'))
console.log('378282246310005 ->', formatCardNumber('378282246310005'))
console.log('1225 ->', formatExpiryDate('1225'))
console.log('12/25 ->', formatExpiryDate('12/25'))

console.log('\n=== Validation Tests ===')
console.log(
  '4111111111111111 valid?',
  validateCardNumber('4111 1111 1111 1111'),
)
console.log('12/25 valid?', validateExpiryDate('12/25'))
console.log('123 valid for visa?', validateCVV('123', 'visa'))
console.log('1234 valid for amex?', validateCVV('1234', 'amex'))

export default null

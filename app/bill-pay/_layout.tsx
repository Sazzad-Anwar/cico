import { Stack } from 'expo-router'

export default function BillPayRootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[institute]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

import { Stack } from 'expo-router'

export default function TopUpRootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[method]"
        options={{
          headerShown: false,
          presentation: 'containedModal',
        }}
      />
    </Stack>
  )
}

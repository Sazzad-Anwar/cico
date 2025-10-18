import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import useAuthStore from '../store/auth.store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useDataStore from '../store/data.store'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Anton: require('../assets/fonts/Anton-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])
  return <RootLayoutNav />
}

function RootLayoutNav() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light')
  const { isAuthenticated, isLoading } = useAuthStore()
  const { loadData } = useDataStore()

  useEffect(() => {
    loadData()
  }, [])

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider mode={colorMode}>
          <ThemeProvider
            value={colorMode === 'dark' ? DarkTheme : DefaultTheme}
          >
            <KeyboardProvider>
              <Stack
                screenOptions={{
                  animation: 'slide_from_right',
                }}
              >
                <Stack.Protected guard={!isAuthenticated}>
                  <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="slider-screen"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="login"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="signup"
                    options={{ headerShown: false }}
                  />
                </Stack.Protected>

                <Stack.Protected guard={isAuthenticated || isLoading}>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="user-details-edit"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(show-data)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="send-money"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="add-user"
                    options={{
                      headerShown: false,
                      presentation: 'containedModal',
                    }}
                  />
                  <Stack.Screen
                    name="top-up"
                    options={{
                      headerShown: false,
                    }}
                  />
                </Stack.Protected>
              </Stack>
            </KeyboardProvider>
            {/* <Slot />
        {pathname === '/' && (
          <Fab
            onPress={() =>
              setColorMode(colorMode === 'dark' ? 'light' : 'dark')
            }
            className="m-6"
            size="lg"
          >
            <FabIcon as={colorMode === 'dark' ? MoonIcon : SunIcon} />
          </Fab>
        )} */}
          </ThemeProvider>
        </GluestackUIProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

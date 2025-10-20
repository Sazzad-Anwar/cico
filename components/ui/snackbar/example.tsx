// Example usage of the Snackbar component
// This file shows how to integrate and use the snackbar in your app

import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { SnackbarProvider, useSnackbarContext } from './index'

// Example component using the snackbar
const ExampleScreen = () => {
  const snackbar = useSnackbarContext()

  const showSuccessSnackbar = () => {
    snackbar.success('Operation completed successfully!', {
      title: 'Success',
      duration: 3000,
    })
  }

  const showErrorSnackbar = () => {
    snackbar.error('Something went wrong. Please try again.', {
      title: 'Error',
      duration: 5000,
      action: {
        label: 'Retry',
        onPress: () => {
          console.log('Retry pressed')
        },
      },
    })
  }

  const showWarningSnackbar = () => {
    snackbar.warning('Your session will expire in 5 minutes', {
      title: 'Warning',
      persistent: true,
      position: 'bottom',
    })
  }

  const showInfoSnackbar = () => {
    snackbar.info('New features are available in settings', {
      title: 'Info',
      duration: 4000,
      action: {
        label: 'View',
        onPress: () => {
          console.log('View pressed')
        },
      },
    })
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <TouchableOpacity
        onPress={showSuccessSnackbar}
        style={{
          backgroundColor: '#10B981',
          padding: 15,
          borderRadius: 8,
          minWidth: 200,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Show Success</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={showErrorSnackbar}
        style={{
          backgroundColor: '#EF4444',
          padding: 15,
          borderRadius: 8,
          minWidth: 200,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Show Error</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={showWarningSnackbar}
        style={{
          backgroundColor: '#F59E0B',
          padding: 15,
          borderRadius: 8,
          minWidth: 200,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Show Warning</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={showInfoSnackbar}
        style={{
          backgroundColor: '#3B82F6',
          padding: 15,
          borderRadius: 8,
          minWidth: 200,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Show Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => snackbar.hideAll()}
        style={{
          backgroundColor: '#6B7280',
          padding: 15,
          borderRadius: 8,
          minWidth: 200,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Hide All</Text>
      </TouchableOpacity>
    </View>
  )
}

// App wrapper with SnackbarProvider
export const ExampleApp = () => {
  return (
    <SnackbarProvider>
      <ExampleScreen />
    </SnackbarProvider>
  )
}

// Usage in _layout.tsx or App.tsx:
/*
import { SnackbarProvider } from '@/components/ui/snackbar'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SnackbarProvider>
        <YourAppContent />
      </SnackbarProvider>
    </SafeAreaProvider>
  )
}
*/

// Usage in any component:
/*
import { useSnackbarContext } from '@/components/ui/snackbar'

const MyComponent = () => {
  const snackbar = useSnackbarContext()

  const handleAction = async () => {
    try {
      await someAsyncOperation()
      snackbar.success('Data saved successfully!')
    } catch (error) {
      snackbar.error('Failed to save data', {
        action: {
          label: 'Retry',
          onPress: handleAction,
        },
      })
    }
  }

  return (
    <TouchableOpacity onPress={handleAction}>
      <Text>Save Data</Text>
    </TouchableOpacity>
  )
}
*/

import React, { useEffect } from 'react'
import { Platform, Text, TouchableOpacity, ViewStyle } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  Easing,
  withTiming,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  AlertCircle,
} from 'lucide-react-native'

// Snackbar Types
export type SnackbarType = 'success' | 'error' | 'warning' | 'info'
export type SnackbarPosition = 'top' | 'bottom'

// Snackbar Configuration
export interface SnackbarConfig {
  id?: string
  type?: SnackbarType
  title?: string
  message: string
  duration?: number
  position?: SnackbarPosition
  action?: {
    label: string
    onPress: () => void
  }
  onDismiss?: () => void
  persistent?: boolean
  style?: ViewStyle
}

// Theme Configuration
const SNACKBAR_THEMES = {
  success: {
    backgroundColor: '#D1FAE5',
    textColor: '#065F46',
    icon: CheckCircle,
  },
  error: {
    backgroundColor: '#FEE2E2',
    textColor: '#991B1B',
    icon: AlertCircle,
  },
  warning: {
    backgroundColor: '#FEF3C7',
    textColor: '#92400E',
    icon: AlertTriangle,
  },
  info: {
    backgroundColor: '#DBEAFE',
    textColor: '#1E3A8A',
    icon: Info,
  },
}

// Animation Configuration
const ANIMATION_CONFIG = {
  springConfig: {
    damping: 15,
    stiffness: 100,
    mass: 1,
  },
  timingConfig: {
    duration: 300,
    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
  },
}

// Individual Snackbar Component
interface SnackbarItemProps extends SnackbarConfig {
  onRemove: (id: string) => void
}

export const SnackbarItem: React.FC<SnackbarItemProps> = ({
  id = '',
  type = 'info',
  title,
  message,
  duration = 4000,
  position = 'top',
  action,
  onDismiss,
  persistent = false,
  style,
  onRemove,
}) => {
  const insets = useSafeAreaInsets()
  const translateY = useSharedValue(position === 'top' ? -100 : 100)
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.9)

  const theme = SNACKBAR_THEMES[type]
  const IconComponent = theme.icon

  useEffect(() => {
    // Entry animation
    translateY.value = withSpring(0, ANIMATION_CONFIG.springConfig)
    opacity.value = withTiming(1, ANIMATION_CONFIG.timingConfig)
    scale.value = withSpring(1, ANIMATION_CONFIG.springConfig)

    // Auto dismiss
    if (!persistent && duration > 0) {
      const timer = setTimeout(() => {
        dismiss()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    translateY.value = withSpring(
      position === 'top' ? -100 : 100,
      ANIMATION_CONFIG.springConfig,
      () => {
        // runOnJS(onRemove)(id)
        scheduleOnRN(onRemove, id)
        onDismiss?.()
      },
    )
    opacity.value = withTiming(0, ANIMATION_CONFIG.timingConfig)
    scale.value = withSpring(0.9, ANIMATION_CONFIG.springConfig)
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
      opacity: opacity.value,
    }
  })

  const containerStyle: ViewStyle = {
    position: 'absolute',
    left: 8,
    right: 8,
    zIndex: 9999,
    ...(position === 'top'
      ? { top: insets.top }
      : {
          bottom: Platform.OS === 'android' ? insets.bottom + 8 : insets.bottom,
        }),
  }

  return (
    <Animated.View style={[containerStyle, animatedStyle]}>
      <Animated.View
        style={[
          {
            backgroundColor: theme.backgroundColor,
            borderRadius: 12,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'flex-start',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
          },
          style,
        ]}
      >
        {/* Icon */}
        <IconComponent
          size={18}
          color={theme.textColor}
          style={{ marginRight: 12, marginTop: 2 }}
        />

        {/* Content */}
        <Animated.View style={{ flex: 1 }}>
          {title && (
            <Text
              style={{
                color: theme.textColor,
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 4,
              }}
            >
              {title}
            </Text>
          )}
          <Text
            style={{
              color: theme.textColor,
              fontSize: 14,
              lineHeight: 20,
              opacity: 0.9,
            }}
          >
            {message}
          </Text>

          {/* Action Button */}
          {action && (
            <TouchableOpacity
              onPress={action.onPress}
              style={{
                marginTop: 12,
                alignSelf: 'flex-start',
              }}
            >
              <Text
                style={{
                  color: theme.textColor,
                  fontSize: 14,
                  fontWeight: '600',
                  textDecorationLine: 'underline',
                }}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Close Button */}
        <TouchableOpacity
          onPress={dismiss}
          style={{
            marginLeft: 12,
            padding: 4,
          }}
        >
          <X
            size={16}
            color={theme.textColor}
          />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  )
}

// Snackbar Container Component
interface SnackbarContainerProps {
  snackbars: (SnackbarConfig & { id: string })[]
  onRemove: (id: string) => void
}

export const SnackbarContainer: React.FC<SnackbarContainerProps> = ({
  snackbars,
  onRemove,
}) => {
  return (
    <>
      {snackbars.map((snackbar) => (
        <SnackbarItem
          key={snackbar.id}
          {...snackbar}
          onRemove={onRemove}
        />
      ))}
    </>
  )
}

// Snackbar Hook for State Management
export const useSnackbar = () => {
  const [snackbars, setSnackbars] = React.useState<
    (SnackbarConfig & { id: string })[]
  >([])

  const show = (config: SnackbarConfig) => {
    const id = config.id || Date.now().toString()
    const snackbar = { ...config, id }

    setSnackbars((prev) => {
      // Replace existing snackbar with same ID or add new one
      const existingIndex = prev.findIndex((item) => item.id === id)
      if (existingIndex !== -1) {
        const newSnackbars = [...prev]
        newSnackbars[existingIndex] = snackbar
        return newSnackbars
      }
      return [...prev, snackbar]
    })

    return id
  }

  const hide = (id: string) => {
    setSnackbars((prev) => prev.filter((item) => item.id !== id))
  }

  const hideAll = () => {
    setSnackbars([])
  }

  const success = (message: string, config?: Partial<SnackbarConfig>) => {
    return show({ ...config, message, type: 'success' })
  }

  const error = (message: string, config?: Partial<SnackbarConfig>) => {
    return show({ ...config, message, type: 'error' })
  }

  const warning = (message: string, config?: Partial<SnackbarConfig>) => {
    return show({ ...config, message, type: 'warning' })
  }

  const info = (message: string, config?: Partial<SnackbarConfig>) => {
    return show({ ...config, message, type: 'info' })
  }

  return {
    snackbars,
    show,
    hide,
    hideAll,
    success,
    error,
    warning,
    info,
  }
}

// Provider Component for Global Snackbar Management
interface SnackbarProviderProps {
  children: React.ReactNode
}

const SnackbarContext = React.createContext<ReturnType<
  typeof useSnackbar
> | null>(null)

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const snackbar = useSnackbar()

  return (
    <SnackbarContext.Provider value={snackbar}>
      {children}
      <SnackbarContainer
        snackbars={snackbar.snackbars}
        onRemove={snackbar.hide}
      />
    </SnackbarContext.Provider>
  )
}

// Hook to use Snackbar from Context
export const useSnackbarContext = () => {
  const context = React.useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbarContext must be used within a SnackbarProvider')
  }
  return context
}

// Convenience function for one-off usage
export const showSnackbar = (config: SnackbarConfig) => {
  // This would need to be implemented with a global ref or event emitter
  // For now, recommend using the hook-based approach
  console.warn(
    'Use useSnackbar hook or SnackbarProvider for better integration',
  )
}

// Default export
export default {
  SnackbarItem,
  SnackbarContainer,
  SnackbarProvider,
  useSnackbar,
  useSnackbarContext,
  showSnackbar,
}

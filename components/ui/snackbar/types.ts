import { ViewStyle } from 'react-native'

export type SnackbarType = 'success' | 'error' | 'warning' | 'info'
export type SnackbarPosition = 'top' | 'bottom'

export interface SnackbarAction {
  label: string
  onPress: () => void
}

export interface SnackbarConfig {
  id?: string
  type?: SnackbarType
  title?: string
  message: string
  duration?: number
  position?: SnackbarPosition
  action?: SnackbarAction
  onDismiss?: () => void
  persistent?: boolean
  style?: ViewStyle
}

export interface SnackbarTheme {
  backgroundColor: string
  textColor: string
  icon: React.ComponentType<any>
}

export interface SnackbarAnimationConfig {
  springConfig: {
    damping: number
    stiffness: number
    mass: number
  }
  timingConfig: {
    duration: number
    easing: any
  }
}

export interface SnackbarHook {
  snackbars: (SnackbarConfig & { id: string })[]
  show: (config: SnackbarConfig) => string
  hide: (id: string) => void
  hideAll: () => void
  success: (message: string, config?: Partial<SnackbarConfig>) => string
  error: (message: string, config?: Partial<SnackbarConfig>) => string
  warning: (message: string, config?: Partial<SnackbarConfig>) => string
  info: (message: string, config?: Partial<SnackbarConfig>) => string
}

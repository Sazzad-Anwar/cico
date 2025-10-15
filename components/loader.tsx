import { BlurView } from 'expo-blur'
import { Text, View } from 'moti'
import { MotiView } from 'moti'
import { Chase, Plane } from 'react-native-animated-spinkit'
import { cn } from '../lib/utils'

export default function Loader({
  className,
  isFullScreen = false,
  loaderText = 'Loading...',
}: {
  className?: string
  isFullScreen?: boolean
  loaderText?: string
}) {
  if (isFullScreen) {
    return (
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        className={cn(
          'absolute inset-0 z-50 h-screen flex-1 flex-col items-center justify-center bg-[#80B34F]/10 backdrop-blur-2xl backdrop-opacity-20',
          className,
        )}
      >
        {/* Main container with fade in animation */}
        <Chase
          size={48}
          color="#329600"
        />
        <Text className="mt-5 text-center text-base font-medium text-button">
          {loaderText}
        </Text>
      </BlurView>
    )
  }
  return (
    <View className={`bg-white ${className}`}>
      {/* Main container with fade in animation */}
      <Chase
        size={48}
        color="#329600"
      />
      <Text className="mt-5 text-center text-base font-medium text-button">
        {loaderText}
      </Text>
    </View>
  )
}

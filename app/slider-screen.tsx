import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useWindowDimensions, View } from 'react-native'
import { Image, MotiView, Text } from 'moti'
import { cn } from '../lib/utils'
import { useEffect, useState, useRef } from 'react'
import Button from '../components/custom-button'
import useAuthStore from '../store/auth.store'

export default function SliderScreen() {
  const { top } = useSafeAreaInsets()
  const { navigate } = useRouter()
  const { isAuthenticated } = useAuthStore()
  const isMountedRef = useRef(true)

  // Cleanup function to prevent navigation after unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const handleAnimationComplete = () => {
    // Only navigate if the component is still mounted
    if (isMountedRef.current) {
      navigate(isAuthenticated ? '/home' : '/login')
    }
  }

  const handleContinuePress = () => {
    // Mark component as unmounted to prevent auto-navigation
    isMountedRef.current = false
    if (isAuthenticated) {
      navigate('/home')
    } else {
      navigate('/login')
    }
  }

  const sliders = [
    {
      image: require('../assets/images/hero-1.png'),
      title: 'Your Money.\n Your Way.',
      subtitle:
        'Manage all your finances in one place send, receive, and track your money anytime, anywhere.',
    },
    {
      image: require('../assets/images/hero-2.png'),
      title: 'Send & Receive \n Money in Seconds',
      subtitle:
        'Instantly transfer funds to friends, family, or businesses all from your phone.',
    },
    {
      image: require('../assets/images/hero-3.png'),
      title: 'Secure & Reliable',
      subtitle:
        'Your money and data are protected with bank-grade encryption and 24/7 support.',
    },
  ]

  return (
    <View
      style={{ paddingTop: top }}
      className="relative flex-1 bg-white px-2"
    >
      <View className="h-2 w-full android:mt-3 rounded-full bg-[#E7E7E7]">
        <MotiView
          onDidAnimate={handleAnimationComplete}
          from={{
            width: '0%',
          }}
          animate={{
            width: '100%',
          }}
          transition={{
            type: 'timing',
            duration: 10000,
          }}
          className="h-2 rounded-full bg-button"
        />
      </View>
      <View className="relative h-screen overflow-hidden">
        {sliders.map((slider, index) => (
          <MotiView
            key={slider.title + '-' + index}
            className={cn(
              'absolute bottom-0 left-0 right-0 top-0 mt-10 flex-col items-center bg-white',
              `z-[${(sliders.length - index) * 10}]`,
            )}
            from={{ opacity: 0, translateY: -20 }} // Start smaller and transparent
            animate={{ opacity: 1, translateY: 0 }} // Animate to full size and opacity
            exit={{ opacity: 0 }} // Animate out to the right
            transition={{
              type: 'timing',
              duration: 1300,
              delay: index * 3300, // Stagger the animations
            }}
          >
            <Image
              source={slider.image}
              className={cn('android:mb-10 ios:mb-20')}
            />
            <Text className="android:text-[36px] ios:text-[44px] text-center font-anton leading-[54px] text-title">
              {slider.title}
            </Text>
            <Text className="mt-8 w-11/12 text-center font-dmSans text-[16px] leading-[21px] text-[#6D6D6D]">
              {slider.subtitle}
            </Text>
          </MotiView>
        ))}
      </View>

      <Button
        onPress={handleContinuePress}
        className="absolute bottom-10 left-5 right-5 bg-button"
        title="Continue"
      />
    </View>
  )
}

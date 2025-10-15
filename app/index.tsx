import React from 'react'

import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image, Text, View } from 'moti'
import Button from '../components/custom-button'
import { Alert } from 'react-native'

export default function Home() {
  const { top } = useSafeAreaInsets()
  const { navigate } = useRouter()
  return (
    <View className="relative h-screen flex-1 bg-[#80B34F]/70 p-5">
      <View
        style={{ marginTop: top }}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600 }}
      >
        <Text className="android:text-[50px] ios:text-[56px] mt-5 text-left font-anton leading-[64px] text-title">
          Welcome to CICO - Your Smart Digital Wallet
        </Text>
      </View>

      <View
        from={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 600 }}
        className="android:bottom-24 ios:bottom-52 absolute right-0"
      >
        <Image source={require('../assets/images/cash.png')} />
      </View>

      <Button
        onPress={() => navigate('/slider-screen')}
        className="absolute bottom-10 left-5 right-5"
        title="Continue"
      />
    </View>
  )
}

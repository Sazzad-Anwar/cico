import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ScrollView, Text, View } from 'moti'
import { Controller, useForm } from 'react-hook-form'
import Header from '../../components/header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, InputField } from '../../components/ui/input'
import Button from '../../components/custom-button'
import useAuthStore from '../../store/auth.store'
import { useState } from 'react'
import Loader from '../../components/loader'
import CreditCardInput from '../../components/credit-card-input'
import BankInput from '../../components/bank-input'
import { SnackbarProvider } from '../../components/ui/snackbar'

export default function TopUpMethodScreen() {
  const { isLoading } = useAuthStore()

  const { method } = useLocalSearchParams()

  //   if (isLoading) {
  //     return (
  //       <Loader
  //         isFullScreen
  //         loaderText="Adding ..."
  //       />
  //     )
  //   }

  return (
    <>
      <Header
        title={method as string}
        className="px-5"
      />
      <KeyboardAwareScrollView
        bottomOffset={20}
        contentContainerStyle={{ flex: 1 }}
      >
        <ScrollView className="mt-10 bg-white p-5 h-screen rounded-3xl">
          {method.includes('credit-cards') && <CreditCardInput />}
          {method.includes('Bank') && <BankInput />}
        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  )
}

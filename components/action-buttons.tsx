import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'expo-router';
import { CornerUpRight, Grip, Plus, ReceiptText, X } from 'lucide-react-native';

import { Image, ScrollView, Text, View } from 'moti';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const options = [
  {
    name: 'Top Up',
    icon: Plus,
    href: '/top-up',
  },
  {
    name: 'Transfer',
    icon: CornerUpRight,
    href: '/transfer',
  },
  {
    name: 'Bill Pay',
    icon: ReceiptText,
    href: '/paybills',
  },
];

const moreOptions = [
  {
    name: 'Send money',
    image: require('../assets/images/send-money-icon.png'),
    href: '/send-money',
  },
  {
    name: 'Recharge',
    image: require('../assets/images/mobile-icon.png'),
    href: '/recharge',
  },
  {
    name: 'Cash out',
    image: require('../assets/images/cash-out-icon.png'),
    href: '/cash-out',
  },
  {
    name: 'Payment',
    image: require('../assets/images/payment-icon.png'),
    href: '/payment',
  },
  {
    name: 'Savings',
    image: require('../assets/images/savings-icon.png'),
    href: '/savings',
  },
  {
    name: 'Insurance',
    image: require('../assets/images/insurance-icon.png'),
    href: '/insurance',
  },
  {
    name: 'Merchant',
    image: require('../assets/images/marchant-icon.png'),
    href: '/merchant',
  },
  {
    name: 'Donation',
    image: require('../assets/images/donation-icon.png'),
    href: '/donation',
  },
  {
    name: 'Wallet to bank',
    image: require('../assets/images/wallet-to-bank-icon.png'),
    href: '/wallet-to-bank',
  },
];

export default function ActionButtons() {
  const { navigate } = useRouter();
  const [isMoreOptionOpen, setIsMoreOptionOpen] = useState(false);
  return (
    <View className="flex flex-row items-center justify-between gap-2 px-3">
      {options.map((option) => (
        <TouchableOpacity
          onPress={() => navigate(option.href as any)}
          key={option.name}
          className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-2 rounded-xl bg-white">
          <option.icon size={24} color="#329600" />
          <Text className="text-xs font-medium text-[#3D3D3D]">{option.name}</Text>
        </TouchableOpacity>
      ))}

      <AlertDialog open={isMoreOptionOpen} onOpenChange={setIsMoreOptionOpen}>
        <AlertDialogTrigger asChild>
          <TouchableOpacity className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-2 rounded-xl bg-white">
            <Grip size={24} color="#329600" />
            <Text className="text-xs font-medium text-[#3D3D3D]">More</Text>
          </TouchableOpacity>
        </AlertDialogTrigger>
        <AlertDialogContent
          overlayClassName="justify-end bottom-0 pb-5 px-0 py-0"
          className="rounded-3xl px-0 py-0">
          <AlertDialogHeader className="mt-0 flex flex-row items-center justify-between border-b border-[#E7E7E7] px-5 py-4">
            <AlertDialogTitle>More Options</AlertDialogTitle>
            <AlertDialogCancel className="h-5 border-0 p-0 shadow-none">
              <X size={20} />
            </AlertDialogCancel>
          </AlertDialogHeader>

          <View className="flex flex-row flex-wrap items-center justify-between gap-2 px-5 pb-3">
            {moreOptions.map((option) => (
              <TouchableOpacity
                key={option.image}
                onPress={() => {
                  setIsMoreOptionOpen(false);
                  navigate(option.href as any);
                }}
                className="flex h-16 w-16 flex-col items-center justify-center gap-3">
                <Image source={option.image} className="h-auto w-auto" />
                <Text className="text-center font-dmSans text-[10px] font-light leading-none">
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}

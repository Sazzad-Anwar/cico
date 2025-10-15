import { Image, Text, View } from 'moti';
import { cn } from '../lib/utils';
import { CreditCard, Plus, ReceiptText, Snowflake } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import Transactions from './transactions';

export default function VirtualCard({ isPhysicalCard = false }: { isPhysicalCard?: boolean }) {
  const options = [
    {
      name: 'Top Up',
      icon: Plus,
      href: '/top-up',
    },
    {
      name: 'Details',
      icon: CreditCard,
      href: '/transfer',
    },
    {
      name: 'Bill Pay',
      icon: ReceiptText,
      href: '/bill-pay',
    },
    {
      name: 'Freeze',
      icon: Snowflake,
      href: '/snow',
    },
  ];

  return (
    <View>
      <View className="relative">
        <Image
          className="h-48 w-full rounded-2xl"
          source={
            isPhysicalCard
              ? require('@/assets/images/virtual-card-2.png')
              : require('@/assets/images/virtual-card.png')
          }
        />
        <Text className="absolute left-5 top-5 font-dmSans text-base font-medium text-white/80">
          USD
        </Text>
        <Text className="absolute right-5 top-5 font-dmSans text-base font-medium text-white/80">
          $150,080
        </Text>

        <Text className="absolute bottom-10 left-5 font-dmSans text-base font-medium text-white/80">
          USER NAME
        </Text>
        <Text className="absolute bottom-10 left-36 font-dmSans text-base font-medium text-white/80">
          10/24
        </Text>
        <View className="absolute bottom-5 left-5 flex flex-row items-center gap-1 font-dmSans text-base font-medium text-white/80">
          {Array.from({ length: 12 }).map((_, index) => (
            <View
              key={index}
              className={cn(
                'size-1 rounded-full bg-white/80',
                [5, 9].includes(index + 1) ? 'ml-3' : ''
              )}
            />
          ))}
          <Text className="ml-3 font-medium text-white/80">1810</Text>
        </View>
        <Image
          className="absolute bottom-5 right-5 h-8 w-16"
          source={require('@/assets/images/cico-logo.png')}
        />
      </View>

      <View className="mt-5 flex flex-row items-center justify-between gap-2">
        {options.map((option) => (
          <TouchableOpacity
            key={option.name}
            className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-2 rounded-xl bg-white">
            <option.icon size={24} color="#329600" />
            <Text className="text-xs font-medium text-[#3D3D3D]">{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Transactions className="mt-4" />
    </View>
  );
}

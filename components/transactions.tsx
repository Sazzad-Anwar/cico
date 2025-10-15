import { Link } from 'expo-router';
import { Image, ScrollView, Text, View } from 'moti';
import useDataStore from '../store/data.store';
import dayjs from 'dayjs';

export default function Transactions({
  title = 'Transactions',
  className = 'mt-4 px-3',
}: {
  title?: string;
  className?: string;
}) {
  const { transfers } = useDataStore();

  return (
    <View className={className}>
      <View className="flex flex-row items-center justify-between">
        <Text className="font-dmSans text-lg font-semibold">{title}</Text>
        <Link href="/history" className="font-dmSans text-sm font-semibold text-[#245C0B]">
          View All
        </Link>
      </View>

      <ScrollView>
        <View className="mt-3 gap-3 rounded-xl bg-white p-3">
          {transfers.map((transfer, index) => (
            <View
              key={transfer.name + '_' + index}
              className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-2">
                <Image className="size-12 rounded-xl" source={transfer.image} />
                <View>
                  <Text className="font-dmSans text-base font-semibold">{transfer.name}</Text>
                  <Text className="text-sm text-[#5D5D5D]">
                    {dayjs(transfer.date).format('DD MMM YYYY')}
                  </Text>
                </View>
              </View>
              <View className="flex flex-col">
                <Text className="text-right font-dmSans text-base font-semibold">
                  ${transfer.amount}
                </Text>
                <Text className="text-right font-dmSans text-sm text-[#5D5D5D]">
                  {dayjs(transfer.date).format('hh:mm a')}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

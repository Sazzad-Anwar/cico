import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "moti";
import useDataStore from "../store/data.store";
import dayjs from "dayjs";
import { LinearTransition } from "react-native-reanimated";

export default function Transactions({
  title = "Transactions",
  className = "mt-4 px-3",
}: {
  title?: string;
  className?: string;
}) {
  const { transfers } = useDataStore();

  return (
    <View className={className}>
      <View className="flex flex-row items-center justify-between">
        <Text className="font-dmSans text-lg font-semibold">{title}</Text>
        <Link
          href="/history/all"
          className="font-dmSans text-sm font-semibold text-[#245C0B]"
        >
          View All
        </Link>
      </View>

      <View className="h-auto rounded-xl bg-white mt-3">
        <View className="mt-3 gap-3  p-3">
          {transfers.slice(0, 5).map((transfer, index) => (
            <View
              layout={LinearTransition.springify().damping(40).stiffness(400)}
              from={{
                opacity: 0,
                translateY: 50,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
                scale: 1,
              }}
              transition={{
                type: index !== 0 ? "timing" : "spring",
                duration: 600,
                delay: index * 100,
              }}
              exit={{
                translateX: 300,
                opacity: 0,
                scale: 0.8,
              }}
              key={transfer.user.name + "_" + index}
              className="flex flex-row items-center justify-between"
            >
              <View className="flex flex-row items-center gap-2">
                <Image
                  className="size-12 rounded-xl"
                  source={{ uri: transfer.user.avatar }}
                />
                <View>
                  <Text className="font-dmSans text-base font-semibold">
                    {transfer.user.name}
                  </Text>
                  <Text className="text-sm text-[#5D5D5D]">
                    {dayjs(transfer.date).format("DD MMM YYYY")}
                  </Text>
                </View>
              </View>
              <View className="flex flex-col">
                <Text className="text-right font-dmSans text-base font-semibold">
                  ${transfer.amount}
                </Text>
                <Text className="text-right font-dmSans text-sm text-[#5D5D5D]">
                  {dayjs(transfer.date).format("hh:mm a")}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

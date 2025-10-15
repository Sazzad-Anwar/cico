import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Text, View } from 'moti';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({ title }: { title: string }) {
  const { top } = useSafeAreaInsets();
  const { back } = useRouter();
  return (
    <View style={{ marginTop: top }} className="flex flex-row items-center justify-between">
      <TouchableOpacity
        onPress={() => back()}
        className="flex size-10 items-center justify-center rounded-full bg-white">
        <ArrowLeft size={20} />
      </TouchableOpacity>
      <Text className="font-dmSans text-xl font-semibold">{title}</Text>
      <View className="size-10" />
    </View>
  );
}

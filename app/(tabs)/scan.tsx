import { Image, Text, View } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
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
import { X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const moreOptions = [
  {
    name: 'Cash out',
    image: require('@/assets/images/cash-out-icon.png'),
    href: '/cash-out',
  },
  {
    name: 'Payment',
    image: require('@/assets/images/payment-icon.png'),
    href: '/payment',
  },
  {
    name: 'Paybill',
    image: require('@/assets/images/paybill.png'),
    href: '/paybill',
  },
  {
    name: 'Merchant',
    image: require('@/assets/images/marchant-icon.png'),
    href: '/merchant',
  },
  {
    name: 'Donation',
    image: require('@/assets/images/donation-icon.png'),
    href: '/donation',
  },
];

export default function ScanScreen() {
  const { top } = useSafeAreaInsets();
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isMoreOptionOpen, setIsMoreOptionOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const { navigate } = useRouter();

  useEffect(() => {
    if (!isMoreOptionOpen) {
      setSelectedRoute(null);
      setIsMoreOptionOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  return (
    <View className="flex-1 bg-gray-200">
      <View className="absolute inset-0 z-10 h-screen w-screen">
        <Image className="h-full w-full" source={require('@/assets/images/qr-image.jpg')} />
      </View>

      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        className="z-20 h-screen w-screen flex-1 items-center justify-center">
        <View className="h-[322px] w-[322px] overflow-hidden rounded-2xl border-4 border-white">
          {!permission?.granted ? (
            <View className="flex items-center justify-center">
              <Text className="text-base font-semibold text-white">
                We need your permission to show the camera
              </Text>
            </View>
          ) : (
            <>
              {selectedRoute ? (
                <CameraView
                  style={{ flex: 1, borderRadius: 16 }}
                  barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                  }}
                  onBarcodeScanned={(event) => {
                    navigate(`/scanOption/${selectedRoute}`);
                  }}
                  facing={facing}
                />
              ) : null}
            </>
          )}
        </View>
      </BlurView>

      <AlertDialog open={isMoreOptionOpen} onOpenChange={setIsMoreOptionOpen}>
        <AlertDialogContent
          overlayClassName="justify-end bottom-0 pb-5 px-0 py-0"
          className="rounded-3xl px-0 py-0">
          <AlertDialogHeader className="mt-0 flex flex-row items-center justify-between border-b border-[#E7E7E7] px-5 py-4">
            <AlertDialogTitle>More Options</AlertDialogTitle>
            <AlertDialogCancel className="h-5 border-0 p-0 shadow-none">
              <X size={20} />
            </AlertDialogCancel>
          </AlertDialogHeader>

          <View className="flex w-screen flex-row flex-wrap items-center justify-between gap-2 px-5 pb-3">
            {moreOptions.map((option) => (
              <TouchableOpacity
                key={option.image}
                onPress={() => {
                  setIsMoreOptionOpen(false);
                  setSelectedRoute(option.href);
                }}
                className="flex h-16 w-20 flex-col items-center justify-center gap-3">
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

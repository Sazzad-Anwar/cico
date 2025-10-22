import { Image, Text, View } from "moti";
import { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";

export default function ScanScreen() {
  const [facing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  return (
    <View className="flex-1 bg-gray-200">
      <View className="absolute inset-0 z-10 h-screen w-screen">
        <Image
          className="h-full w-full"
          source={require("@/assets/images/qr-image.jpg")}
        />
      </View>

      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        className="z-20 h-screen w-screen flex-1 items-center justify-center"
      >
        <View className="h-[322px] w-[322px] overflow-hidden rounded-2xl border-4 border-white">
          {!permission?.granted ? (
            <View className="flex items-center justify-center">
              <Text className="text-base font-semibold text-white">
                We need your permission to show the camera
              </Text>
            </View>
          ) : (
            <>
              <CameraView
                style={{ flex: 1, borderRadius: 16 }}
                barcodeScannerSettings={{
                  barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={(event) => {
                  router.navigate(`/marchant-qr-payment`);
                }}
                facing={facing}
              />
            </>
          )}
        </View>
      </BlurView>
    </View>
  );
}

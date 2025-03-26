import { useConfigStore } from "@/store/useConfig";
import { CameraView } from "expo-camera";
import { forwardRef, PropsWithChildren, Ref } from "react";
import { StyleSheet } from "react-native";

const Camera = function (
  { children }: PropsWithChildren,
  ref: Ref<CameraView>,
) {
  const facingBack = useConfigStore((state) => state.facingBack);
  return (
    <CameraView
      ref={ref}
      facing={facingBack ? "back" : "front"}
      animateShutter={false}
      style={styles.camera}
    >
      {children}
    </CameraView>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});

export default forwardRef(Camera);

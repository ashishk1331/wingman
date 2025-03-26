import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";

type AnimatedTextChunkProps = {
  text: string;
  delay?: number;
  onAnimationComplete?: () => void;
};

const AnimatedTextChunk = ({
  text,
  delay = 0,
  onAnimationComplete = () => {},
}: AnimatedTextChunkProps) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Start the animation after the specified delay
    const timeout = setTimeout(() => {
      opacity.value = withTiming(
        1,
        {
          duration: 300,
          easing: Easing.ease,
        },
        (finished) => {
          if (finished) {
            runOnJS(onAnimationComplete)();
          }
        },
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.Text style={[styles.chunkText, animatedStyle]}>
      {text}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  chunkText: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
  },
});

export default AnimatedTextChunk;

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { svgPathProperties } from "svg-path-properties"; // Library for SVG path calculations

const AnimatedPath = Animated.createAnimatedComponent(Path);

const RocketAnimation = () => {
  const progress = useSharedValue(0);

  // Define the SVG path
  const path =
    "M8,102 C15,83 58,25 131,24 206,24 233,63 259,91 292,125 328,155 377,155 464,155 497,97 504,74";

  // Pre-calculate the path properties
  const properties = new svgPathProperties(path);
  const totalLength = properties.getTotalLength();

  // Animated props for the dotted progress line
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: totalLength * (1 - progress.value), // Animate the stroke dash offset
    };
  });

  // Function to get the position and angle on the path based on progress
  const getPathData = (t: number) => {
    const point = properties.getPointAtLength(t * totalLength);
    const nextPoint = properties.getPointAtLength(
      Math.min(t * totalLength + 1, totalLength)
    );

    // Calculate angle for orientation
    const angle =
      Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) *
      (180 / Math.PI);

    return { x: point.x, y: point.y, angle };
  };

  // Animated style for the rocket image
  const animatedStyle = useAnimatedStyle(() => {
    const { x, y, angle } = getPathData(progress.value);

    return {
      transform: [
        { translateX: x - 25 }, // Adjust to center the rocket image
        { translateY: y - 25 },
        { rotate: `${angle}deg` }, // Rotate the rocket
      ],
    };
  });

  useEffect(() => {
    // Start the animation
    progress.value = withTiming(1, {
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Svg height="200" width="550" viewBox="0 0 550 200">
        {/* The dotted blue progress line */}
        <AnimatedPath
          d={path}
          stroke="blue" // Dotted line color
          strokeWidth={2}
          fill="none"
          strokeDasharray={8} // Dotted effect
          animatedProps={animatedProps} // Animate the progress
        />

        {/* Static path for reference */}
        <Path d={path} stroke="gray" strokeWidth={1} fill="none" />
      </Svg>

      {/* The animated rocket */}
      <Animated.Image
        source={require("@/assets/icon/rocket.png")} // Replace with your rocket image path
        style={[styles.rocket, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#000", // Background color
  },
  rocket: {
    position: "absolute",
    width: 50,
    height: 50,
  },
});

export default RocketAnimation;

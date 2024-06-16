import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View, Button, createStyleSheet, useWindowDimensions, StyleSheet } from "react-native";
import { useMemo } from "react";

export default function AnimatedStyleUpdateExample(props) {
  const randomWidth = useSharedValue(10);

  const {width, height} = useWindowDimensions()

  const boxes = useMemo(() => {
    return Array(12).fill(0).map((_, index) => <View style={styles.box(Math.min(height, width, 300), index)} key={index} />)
  })

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View style={styles.main}>
      <View style={styles.ground(Math.min(height, width, 300))} >
        {boxes}

        <View style={styles.bigCenterCircle(Math.min(height, width, 300))} />
        <View style={styles.akrep(Math.min(height, width, 300))} />
        <View style={styles.midCenterCircle(Math.min(height, width, 300))} />
        <View style={styles.yelkovan(Math.min(height, width, 300))} />
        <View style={styles.smallCenterCircle(Math.min(height, width, 300))} />
        <View style={styles.saniye(Math.min(height, width, 300))} />
        
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  ground : (edge) => ({
    width: edge,
    height: edge,
    borderRadius: edge/2,
    backgroundColor: '#020202'
  }),

  box: (edge, index) => ({
    position: 'absolute',
    width : edge/20,
    height: edge/10,
    backgroundColor: '#6A7062',
    transformOrigin: '50% 475%',
    transform: [{translateX: edge*19/40}, {translateY: edge/40}, {rotate: `${index*30}deg`}],
  }),

  bigCenterCircle: (edge) => ({
    position: 'absolute',
    width : edge/10,
    height: edge/10,
    borderRadius: edge/12,
    borderColor: '#6A7062',
    borderWidth: 1,
    backgroundColor: '#DCE2C8',
    transform: [{translateX: edge*9/20}, {translateY: edge*9/20}],
  }),

  midCenterCircle: (edge) => ({
    position: 'absolute',
    width : edge/12,
    height: edge/12,
    borderRadius: edge/20,
    borderColor: '#6A7062',
    borderWidth: 1,
    backgroundColor: '#DCE2C8',
    transform: [{translateX: edge*11/24}, {translateY: edge*11/24}],
  }),

  smallCenterCircle: (edge) => ({
    position: 'absolute',
    width : edge/24,
    height: edge/24,
    borderRadius: edge/48,
    backgroundColor: '#A41623',
    transform: [{translateX: edge*23/48}, {translateY: edge*23/48}],
  }),

  akrep: (edge) => ({
    position: 'absolute',
    width : edge/20,
    height: edge*7/20,
    backgroundColor: '#DCE2C8',
    transformOrigin: '50% 100%',
    transform: [{translateX: edge*19/40}, {translateY: edge*3/20}, {rotate: '30deg'}],
  }),

  yelkovan: (edge) => ({
    position: 'absolute',
    width : edge/20,
    height: edge*17/40,
    backgroundColor: '#DCE2C8',
    transformOrigin: '50% 100%',
    transform: [{translateX: edge*19/40}, {translateY: edge*3/40}, {rotate: '270deg'}],
  }),

  saniye: (edge) => ({
    position: 'absolute',
    width : edge/40,
    height: edge*3/5,
    backgroundColor: '#A41623',
    transformOrigin: '50% 79%',
    transform: [{translateX: edge*39/80}, {translateY: edge/40}, {rotate: '120deg'}],
  })
})
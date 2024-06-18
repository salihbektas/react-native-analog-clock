import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { useEffect, useMemo } from "react";
import colors from "./colors";

export default function App() {
  const hours = useSharedValue((new Date).getHours()*5 + Math.floor((new Date()).getMinutes()/12))

  const minutes = useSharedValue((new Date).getMinutes())

  const seconds = useSharedValue((new Date).getSeconds())

  const {width, height} = useWindowDimensions()

  const edge = Math.min(height, width)

  const boxes = useMemo(() => {
    return Array(12).fill(0).map((_, index) => <View style={styles.box(edge, index)} key={index} />)
  }, [])

  const hoursStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${hours.value*6}deg`}],
    };
  });

  const minutesStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${minutes.value*6}deg`}],
    };
  });

  const secondsStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${seconds.value*6}deg`}],
    };
  });


  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()

      hours.value = date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0
        ? withTiming(120, {duration: 50}, () => {hours.value = 0})
        : withTiming(date.getHours()*5 + Math.floor(date.getMinutes()/12), {duration: 50})

      minutes.value = date.getMinutes() === 0 && date.getSeconds() === 0
        ? withTiming(60, {duration: 50}, () => {minutes.value = 0})
        : withTiming(date.getMinutes(), {duration: 50})

      seconds.value = date.getSeconds() === 0 
        ? withTiming(60, {duration: 50}, () => {seconds.value = 0})
        : withTiming(date.getSeconds(), {duration: 50})
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.main}>
      <View style={styles.ground(edge)} >
        {boxes}

        <View style={styles.bigCenterCircle(edge)} />
        <Animated.View style={[styles.akrep(edge), hoursStyle]} />
        <View style={styles.midCenterCircle(edge)} />
        <Animated.View style={[styles.yelkovan(edge), minutesStyle]} />
        <View style={styles.smallCenterCircle(edge)} />
        <Animated.View style={[styles.saniye(edge), secondsStyle]} />
        
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
    backgroundColor: colors.black
  }),

  box: (edge, index) => ({
    position: 'absolute',
    width : edge/20,
    height: edge/10,
    backgroundColor: colors.gray,
    transformOrigin: '50% 475%',
    top: edge/40,
    left: edge*19/40,
    transform: [{rotate: `${index*30}deg`}],
  }),

  bigCenterCircle: (edge) => ({
    position: 'absolute',
    width : edge/10,
    height: edge/10,
    borderRadius: edge/12,
    borderColor: colors.gray,
    borderWidth: 1,
    backgroundColor: colors.white,
    top: edge*9/20,
    left: edge*9/20,
  }),

  midCenterCircle: (edge) => ({
    position: 'absolute',
    width : edge/12,
    height: edge/12,
    borderRadius: edge/20,
    borderColor: colors.gray,
    borderWidth: 1,
    backgroundColor: colors.white,
    top: edge*11/24,
    left: edge*11/24,
  }),

  smallCenterCircle: (edge) => ({
    position: 'absolute',
    width : edge/24,
    height: edge/24,
    borderRadius: edge/48,
    backgroundColor: colors.red,
    top: edge*23/48,
    left: edge*23/48,
  }),

  akrep: (edge) => ({
    position: 'absolute',
    width : edge/20,
    height: edge*7/20,
    backgroundColor: colors.white,
    transformOrigin: '50% 100%',
    top: edge*3/20,
    left: edge*19/40,
  }),

  yelkovan: (edge) => ({
    position: 'absolute',
    width : edge/20,
    height: edge*17/40,
    backgroundColor: colors.white,
    transformOrigin: '50% 100%',
    top: edge*3/40,
    left: edge*19/40,
  }),

  saniye: (edge) => ({
    position: 'absolute',
    width : edge/40,
    height: edge*3/5,
    backgroundColor: colors.red,
    transformOrigin: '50% 79%',
    top: edge/40,
    left: edge*39/80,
  })
})
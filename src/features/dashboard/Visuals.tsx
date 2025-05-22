import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import { darkWeatherColors } from '@utils/Constants'
import LottieView from 'lottie-react-native'
import { View, Text, StyleSheet, Dimensions, Animated, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { interpolate, useAnimatedStyle } from 'react-native-reanimated'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const Visuals = () => {
    const { scrollY } = useCollapsibleContext()
    const headerAnimationStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, 120], [1, 0])
        return { opacity }
    })
    return (
        <Animated.View style={[styles.container, headerAnimationStyle]}>
            <LinearGradient colors={darkWeatherColors} style={styles.gradient} />
            <Image source={require('@assets/images/cloud.png')} style={styles.cloud} />
            <LottieView
                autoPlay={true}
                enableMergePathsAndroidForKitKatAndAbove={true}
                loop
                style={styles.lottie}
                source={require('@assets/animations/raining.json')} />
        </Animated.View>
    )
}

export default Visuals

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
    },
    lottie: {
        width: '100%',
        height: 150,
        position: 'absolute',
        transform: [{ scaleX: -1 }]
    },
    gradient: {
        width: '100%',
        height: screenHeight * 0.4,
        position: 'absolute'
    },
    cloud: {
        width: screenWidth,
        height: 100,
        resizeMode: 'stretch'
    }
})
import { View, Text, ViewStyle, Animated, TouchableOpacity } from 'react-native'

interface ScalePressProps {
    onPress?: () => void,
    children: React.ReactElement
    style?: ViewStyle
}
const ScalePress = ({ onPress, children, style }: ScalePressProps) => {
    const scaleValue = new Animated.Value(1)
    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.92,
            useNativeDriver: true
        })
    }
    const onPressOut = () => {
        Animated.timing(scaleValue, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }
    return (
        <TouchableOpacity
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}
            style={{ ...style }}
            activeOpacity={1}
        >
            <Animated.View style={{ transform: [{ scale: scaleValue }], width: '100%' }}>
                {children}
            </Animated.View >

        </TouchableOpacity>
    )
}

export default ScalePress
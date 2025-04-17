import { View, StyleSheet, Animated, Image, Keyboard, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors, Fonts, lightColors } from '@utils/Constants'
import {
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    State,
} from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'
import CustomText from '@components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { resetAndNavigate } from '@utils/NavigationUtils'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '@components/ui/CustomInput'
import CustomButton from '@components/ui/CustomButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type GestureEventType = PanGestureHandlerGestureEvent
const bottomColors = [...lightColors].reverse()

const CustomerLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gestureSequence, setGestureSequence] = React.useState<string[]>([])
    const animatedValue = useRef(new Animated.Value(0)).current
    const keyboardOffsetHeight = useKeyboardOffsetHeight()

    useEffect(() => {
        if (keyboardOffsetHeight === 0) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start()
        }
        else {
            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.84,
                duration: 1000,
                useNativeDriver: true,
            }).start()
        }
    }, [keyboardOffsetHeight])

    const handleGesture = ({ nativeEvent }: GestureEventType) => {
        if (nativeEvent.state === State.END) {
            const { translationX, translationY } = nativeEvent
            let direction = ''

            if (Math.abs(translationX) > Math.abs(translationY)) {
                direction = translationX > 0 ? 'right' : 'left'
            } else {
                direction = translationY > 0 ? 'down' : 'up'
            }

            const newSequence = [...gestureSequence, direction].slice(-5)
            setGestureSequence(newSequence)

            console.log('Gesture sequence:', newSequence)

            if (newSequence.join(' ') === 'up up down left right') {
                setGestureSequence([])
                resetAndNavigate('DeliveryLogin')
            }
        }
    }
    const handleAuth = async () => {
        Keyboard.dismiss()
        try {
            setIsLoading(() => true)
            setIsLoading(() => false)
            resetAndNavigate('ProductDashboard')
        } catch (error) {
            console.log(error)
            Alert.alert('Error', 'An error occurred while logging in. Please try again later.', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ])
            setIsLoading(false)
        }
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <CustomSafeAreaView>
                <ProductSlider />

                <PanGestureHandler onHandlerStateChange={handleGesture}>
                    <Animated.ScrollView
                        bounces={false}
                        style={{ transform: [{ translateY: animatedValue }] }}
                        keyboardDismissMode={'on-drag'}
                        keyboardShouldPersistTaps={'handled'}
                        contentContainerStyle={styles.subContainer}
                    >
                        <LinearGradient colors={bottomColors} style={styles.gradient} />
                        <View style={styles.content}>
                            <Image source={require('@assets/images/logo.jpeg')} style={styles.logo} />
                            <CustomText variant='h2' fontFamily={Fonts.Bold}>
                                Grocery Delivery App
                            </CustomText>
                            <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>
                                Log in or sign up
                            </CustomText>
                            <CustomInput onClear={() => setPhoneNumber('')} onChangeText={text => setPhoneNumber(text.slice(0, 10))} value={phoneNumber} placeholder='Phone Number'
                                left={
                                    <CustomText
                                        variant='h6'
                                        style={styles.phoneText}
                                        fontFamily={Fonts.SemiBold}>
                                        +91</CustomText>
                                } right={true}
                            />
                            <CustomButton disabled={phoneNumber.length < 10} title='Continue' onPress={() => handleAuth()} loading={isLoading} />
                        </View>
                    </Animated.ScrollView>
                </PanGestureHandler>
                <View style={styles.footer}>
                    <CustomText fontSize={RFValue(6)}>
                        By Continuing, you agree to our Terms of services & Privacy Policy
                    </CustomText>
                </View>
                <TouchableOpacity style={styles.switchButton} onPress={() => resetAndNavigate('DeliveryLogin')}>
                    <Icon name='bike-fast' color="#000" size={RFValue(18)} />
                </TouchableOpacity>
            </CustomSafeAreaView>
        </GestureHandlerRootView>
    )
}

export default CustomerLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    phoneText: {
        marginLeft: 10,
    },
    text: {
        marginTop: 2,
        marginBottom: 0.8,
        opacity: 0.8
    },
    footer: {
        borderTopWidth: 0.8,
        borderColor: Colors.border,
        paddingBottom: 10,
        zIndex: 2,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f9fc',
        width: '100%',
    },
    subContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20, // gives room for footer
    },
    gradient: {
        paddingTop: 80,
        width: '100%',
    },
    content: {
        // justifyContent: "center",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 20,
        marginVertical: 10
    },
    switchButton: {
        position: 'absolute',
        top: 10,
        zIndex: 99,
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 12,
        elevation: 10,
        shadowOpacity: 0.5,
        padding: 10,
        right: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

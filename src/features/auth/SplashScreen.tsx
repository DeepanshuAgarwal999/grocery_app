import { Colors } from '@utils/Constants'
import { View, Text, StyleSheet, Image, Alert, BackHandler, Linking } from 'react-native'
import Logo from '@assets/images/logo.jpeg'
import { screenHeight, screenWidth } from '@utils/Scaling'
import { useEffect } from 'react'
import { navigate, resetAndNavigate } from '@utils/NavigationUtils'
import Geolocation from '@react-native-community/geolocation'
import { useAuthStore } from '@state/authStore'
import { tokenStorage } from '@state/storage'
import { jwtDecode } from 'jwt-decode'
import { reverseGeocode } from 'services/map.service'

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto'
})


interface DecodedToken {
    exp: number
}

const SplashScreen = () => {
    const { user, setUser } = useAuthStore()

    const tokenCheck = async () => {
        const accessToken = tokenStorage.getString('accessToken') as string
        const refreshToken = tokenStorage.getString('refreshToken') as string

        if (accessToken) {
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken)
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)

            const currentTime = Math.floor(Date.now() / 1000)

            if (decodedRefreshToken?.exp < currentTime) {
                resetAndNavigate("CustomerLogin")
                Alert.alert("Your session has expired. Please login again.")
                return false
            }
            else if (decodedAccessToken?.exp < currentTime) {
                try {
                    resetAndNavigate("CustomerLogin")
                    // refetchUser(setUSer)
                    // TODO: Implement refresh token
                } catch (error) {
                    Alert.alert("Your session has expired. Please login again.")
                    return false
                }
            }
            if (user?.role === USER_ROLE.CUSTOMER) {
                resetAndNavigate("ProductDashboard")
            }
            else {
                resetAndNavigate("DeliveryLogin")
            }
        }
        else {
            return false
        }
        return true
    }
    useEffect(() => {
        const initialStartup = async () => {
            Geolocation.requestAuthorization(
                () => {
                    console.log('Location permission granted')
                },
                (error) => {
                    console.log('Location permission not granted:', error)
                    Alert.alert(
                        'Location Permission Required',
                        'This app requires location permission to function properly. Would you like to open settings?',
                        [
                            {
                                text: 'Open Settings', onPress: () => {
                                    BackHandler.exitApp()
                                    Linking.openSettings()
                                }
                            },
                            { text: 'Exit App', onPress: () => BackHandler.exitApp() }
                        ]
                    )
                }
            )

            const isTokenValid = await tokenCheck()
            if (!isTokenValid) {
                navigate('ProductDashboard')
            }
            else {
                navigate('CustomerLogin')
            }
        }
        const timer = setTimeout(initialStartup, 1000);
        return () => clearTimeout(timer);
    }, [])
    return (
        <View style={styles.container}>
            <Image source={Logo} alt='grocery_app' style={styles.logoImage} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: "center"
    },
    logoImage: {
        height: screenHeight * 0.7,
        width: screenWidth * 0.7,
        resizeMode: 'contain'
    }
})
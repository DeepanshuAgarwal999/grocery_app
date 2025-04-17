import { Colors } from '@utils/Constants'
import { View, Text, StyleSheet, Image } from 'react-native'
import Logo from '@assets/images/logo.jpeg'
import { screenHeight, screenWidth } from '@utils/Scaling'
import { useEffect } from 'react'
import { navigate } from '@utils/NavigationUtils'
import Geolocation from '@react-native-community/geolocation'
import { useAuthStore } from '@state/authStore'
import { tokenStorage } from '@state/storage'
import  {jwtDecode} from 'jwt-decode' 

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
        const accessToken = tokenStorage.getString('accessToken')
        const refreshToken = tokenStorage.getString('refreshToken')
        if (accessToken ) {
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken) 
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('CustomerLogin')
        }, 1000);
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
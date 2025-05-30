import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useAuthStore } from '@state/authStore'
import Geolocation from '@react-native-community/geolocation'
import { reverseGeocode } from 'services/map.service'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Header = ({ showNotice }: { showNotice: () => void }) => {
    const { user, setUser } = useAuthStore()

    const updateUserLocation = () => {
        Geolocation.requestAuthorization()
        Geolocation.getCurrentPosition(
            (position) => {
                setUser({
                    ...user,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                // reverseGeocode()
            },
            (error) => {
                console.log(error)
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 1000
            }
        )
    }
    // useEffect(() => {
    //     updateUserLocation()
    // }, [])

    return (
        <View style={styles.subContainer}>
            <TouchableOpacity activeOpacity={0.8}>
                <CustomText fontFamily={Fonts.Bold} variant='h2' style={styles.text}>
                    Delivery in
                </CustomText>
                <View style={styles.flexRowGap}>
                    <CustomText fontFamily={Fonts.SemiBold} variant='h2' style={styles.text}>
                        15 minutes
                    </CustomText>
                    <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
                        <CustomText
                            fontSize={RFValue(5)}
                            fontFamily={Fonts.SemiBold}
                            style={{ color: '#3B4886' }}
                        >
                            🌧️ Rain
                        </CustomText>
                    </TouchableOpacity>
                </View>
                <View style={styles.flexRow}>
                    <CustomText variant='body' numberOfLines={1} fontFamily={Fonts.SemiBold}
                        style={styles.text2}>
                        {user?.address || "Knowhere, Somewhere 😅"}
                    </CustomText>
                    <Icon name='menu-down' color={'#fff'} size={RFValue(20)} style={{ bottom: -1 }} />
                </View>

            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        color: "#fff"
    },
    text2: {
        color: "#fff",
        width: "90%",
        textAlign: "center"
    },
    flexRow: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 2,
        width: '70%'
    },
    subContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 5,
        justifyContent: "space-between",
    },
    flexRowGap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    noticeBtn: {
        backgroundColor: "#E8EAf5",
        borderRadius: 100,
        paddingHorizontal: 8,
        paddingVertical: 2,
        bottom: -2
    }
})

export default Header
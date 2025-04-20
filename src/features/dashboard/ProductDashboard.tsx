import { View, Text, StyleSheet, Platform, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import {
  CollapsibleContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  CollapsibleHeaderContainer,
  withCollapsibleContext
} from "@r0b0t3d/react-native-collapsible"
import { NoticeHeight, screenHeight } from '@utils/Scaling'
import Geolocation from '@react-native-community/geolocation'
import { reverseGeocode } from 'services/map.service'
import { useAuthStore } from '@state/authStore'
import NoticeAnimation from './NoticeAnimation'
import Visuals from './Visuals'

const NOTICE_HEIGHT = -(NoticeHeight + 12)

const ProductDashboard = () => {
  const { user, setUser } = useAuthStore()
  const noticePosition = useRef(new Animated.Value(NOTICE_HEIGHT)).current

  const slideUp = () => {
    Animated.timing(noticePosition, {
      toValue: NoticeHeight,
      duration: 1200,
      useNativeDriver: false,
    }).start()
  }
  const slideDown = () => {
    Animated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start()
  }

  useEffect(() => {
    const UpdateUser = () => {
      Geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        reverseGeocode(latitude, longitude, setUser)
      }, (error) => {
        console.log(error)
      })
    }
    slideDown()
  }, [])
  return (
    // <NoticeAnimation noticePosition={noticePosition}>
      <>
        {/* <Visuals /> */}
        <CustomSafeAreaView>
          <View>

          </View>
        </CustomSafeAreaView>
      </>
    // </NoticeAnimation>
  )
}
const styles = StyleSheet.create({
  panelContainer: {
    flex: 1
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTopBottom: {
    position: 'absolute',
    alignSelf: "center",
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: "black",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999
  }
})

export default withCollapsibleContext(ProductDashboard)


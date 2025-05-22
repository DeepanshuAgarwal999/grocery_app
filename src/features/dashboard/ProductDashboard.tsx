import { View, Text, StyleSheet, Platform, TouchableOpacity, Animated as RNAnimated } from 'react-native'
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
// import { reverseGeocode } from 'services/map.service'
import { useAuthStore } from '@state/authStore'
import NoticeAnimation from './NoticeAnimation'
import Visuals from './Visuals'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomText from '@components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { Fonts } from '@utils/Constants'
import AnimatedHeader from './AnimatedHeader'
import Content from '@components/dashboard/Content'
import StickySearchBar from './StickySearchBar'

const NOTICE_HEIGHT = -(NoticeHeight + 12)

const ProductDashboard = () => {
  const { user, setUser } = useAuthStore()
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current

  const { scrollY, expand } = useCollapsibleContext()
  const prevScroll = useRef<number>(0)

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp = scrollY.value < prevScroll.current && scrollY.value > 0
    const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 })
    const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 })

    prevScroll.current = scrollY.value
    return {
      opacity,
      transform: [{ translateY }]
    }
  })

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NoticeHeight + 20,
      duration: 1200,
      useNativeDriver: false,
    }).start()
  }
  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start()
  }

  useEffect(() => {
    slideDown()
    const timoutId = setTimeout(() => {
      slideUp()
    }, 3500)
    return () => clearTimeout(timoutId)
  }, [])

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        {/* <CustomSafeAreaView> */}
        <Animated.View style={[styles.backToTopBottom, backToTopStyle]}>
          <Text style={{ color: 'white' }} onPress={slideUp}>
            <TouchableOpacity onPress={() => {
              scrollY.value = 0,
                expand()
            }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Icon name="arrow-up-circle-outline" color="white" size={RFValue(12)} />
              <CustomText variant='body2' style={{ color: "white" }} fontFamily={Fonts.SemiBold}>
                Back to top
              </CustomText>
            </TouchableOpacity>
          </Text>
        </Animated.View>

        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader showNotice={() => {
              slideDown()
              const timeoutId = setTimeout(() => {
                slideUp()
              }, 3500)
              return () => clearTimeout(timeoutId)
            }} />
            <StickySearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView nestedScrollEnabled style={styles.panelContainer} showsHorizontalScrollIndicator={false}>

            <Content />
            <View style={{ backgroundColor: "#f8f8f8", padding: 20 }}>
              <CustomText fontSize={RFValue(32)} fontFamily={Fonts.Bold} style={{ opacity: 0.2 }}>
                Grocery Delivery App
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
        {/* </CustomSafeAreaView> */}
      </>
    </NoticeAnimation>
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



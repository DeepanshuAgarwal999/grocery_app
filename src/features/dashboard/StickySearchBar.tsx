import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@utils/Constants'
import { StickyView, useCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import SearchBar from './SearchBar'

const StickySearchBar = () => {
    const { scrollY } = useCollapsibleContext()
    const animatedShadow = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, 140], [0, 1])
        return { opacity }
    })
    const backgroundColor = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, 180], [0, 1])
        return { backgroundColor: `rgba(255,255,255,${opacity})` }
    })
    return (
        <StickyView style={backgroundColor}>
            <SearchBar />
            <Animated.View style={[styles.shadow, animatedShadow]}>

            </Animated.View>
        </StickyView>
    )
}

const styles = StyleSheet.create({
    shadow: {
        height: 15,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: Colors.border
    }
})

export default StickySearchBar
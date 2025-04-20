import { View, Text, StyleSheet, Animated } from 'react-native'
import React from 'react'
import { NoticeHeight } from '@utils/Scaling'
import Notice from '@components/dashboard/Notice'
const NOTICE_HEIGHT = -(NoticeHeight + 12)

const NoticeAnimation = ({ noticePosition, children }: { noticePosition: any, children: React.ReactElement }) => {
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.noticeContainer, { transform: [{ translateY: noticePosition }] }]}>
                <Notice />
            </Animated.View>
            <Animated.View style={[styles.contentContainer, {
                paddingTop: noticePosition.interpolate({
                    inputRange: [NOTICE_HEIGHT, 0],
                    outputRange: [0, NOTICE_HEIGHT + 20]
                })
            }]}>
                {children}
            </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    noticeContainer: {
        width: '100%',
        position: 'absolute',
        zIndex: 999
    },
    contentContainer: {
        width: '100%',
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})
export default NoticeAnimation
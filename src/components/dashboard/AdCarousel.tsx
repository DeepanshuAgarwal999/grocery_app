import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { screenWidth } from '@utils/Scaling'
import Carousel from 'react-native-reanimated-carousel'
import ScalePress from '@components/ui/ScalePress'

const AdCarousel = ({ data }: { data: any[] }) => {
    const baseOptions = {
        vertical: false,
        width: screenWidth,
        height: screenWidth * 0.5
    }
    return (
        <View style={{ left: -20, marginVertical: 20 }}>
            <Carousel {...baseOptions} loop={false} autoPlay={true} pagingEnabled autoPlayInterval={3000} mode='parallax' data={data} modeConfig={{
                parallaxScrollingOffset: 0,
                parallaxScrollingScale: 0.94,
            }}
                renderItem={({ item }) => {
                    return (
                        <ScalePress style={styles.imageContainer}>
                            <Image source={item} style={styles.img} />
                        </ScalePress>
                    )
                }}
            >

            </Carousel>
        </View>
    )
}
const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: "100%"
    },
    img: {
        width: '100%',
        height: "100%",
        resizeMode: "cover",
        borderRadius: 20
    }
})
export default AdCarousel
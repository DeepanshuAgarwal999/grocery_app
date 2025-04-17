import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC, useMemo } from 'react'
import { imageData } from '@utils/dummyData'
import AutoScroll from '@homielab/react-native-auto-scroll'
import { screenWidth } from '@utils/Scaling'

const ProductSlider = () => {
    const rows = useMemo(() => {
        const result = []
        for (let i = 0; i < 4; i++) {
            result.push(imageData.slice(i, i + 4))
        }
        return result
    }, [])
    return (
        <View pointerEvents='none'>
            <AutoScroll duration={10000}  endPaddingWidth={0} style={styles.autoScroll}>
                <View style={styles.gridContainer}>
                    {rows?.map((row: any, idx) => {

                        return <MemoizedRow row={row} rowIndex={idx} key={idx} />
                    })}
                </View>
            </AutoScroll>
        </View>
    )
}
export default ProductSlider

const MemoizedRow: FC<{ row: typeof imageData, rowIndex: number }> = ({ row, rowIndex }) => {
    return (
        <View style={styles.row}>
            {
                row?.map((item, idx) => {
                    const horizontalShift = rowIndex % 2 === 0 ? -18 : 18
                    return (
                        <View key={idx} style={[styles.itemContainer, {
                            transform: [{
                                translateX: horizontalShift
                            }]
                        }]}>
                            <Image source={item} style={styles.itemImage} />
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    autoScroll: {
        position: 'absolute',
        zIndex: -2
    },
    gridContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 12,
        marginHorizontal: 10,
        width: screenWidth * 0.26,
        height: screenWidth * 0.26,
        backgroundColor: "#f2f2f2",
        justifyContent: 'center',
        borderRadius: 25,
        alignItems: 'center'

    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }

})
import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'

const CategoriesContainer = ({ data }: { data: any[] }) => {
    const renderItems = (items: any[]) => {
        return items.map((item, index) => {
            return (
                <ScalePress key={index} style={styles.item} onPress={() => navigate('ProductCategories')}>
                    <>
                        <View style={styles.imageContainer}>
                            <Image source={item?.image} style={styles.image} />
                        </View>
                        <CustomText style={styles.text} variant='body2' fontFamily={Fonts.Medium} >
                            {item?.name}
                        </CustomText>
                    </>
                </ScalePress>
            )
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {renderItems(data?.slice(0, 4))}
            </View>
            <View style={styles.row}>
                {renderItems(data?.slice(4))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    text: {
        textAlign: "center"
    },
    item: {
        width: "22%",
        justifyContent: "center",
        alignItems: 'center'
    },
    imageContainer: {
        width: '80%',
        height: 80,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        padding: 6,
        backgroundColor: "#E5F3F3",
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: "100%",
        resizeMode: "contain"
    }
})

export default CategoriesContainer
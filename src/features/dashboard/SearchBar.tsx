import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@utils/Constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import RollingBar from 'react-native-rolling-bar'
import CustomText from '@components/ui/CustomText'

const SEARCH_SUGGESTIONS = [
    'Search "sweets"',
    'Search "milk"',
    'Search "ata, dal, coke"',
    'Search "chips"',
    'Search "pooja thali"',
];

const SearchBar = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Icon name='search' color={Colors.text} size={RFValue(20)} />
            {/* @ts-ignore */}
            <RollingBar interval={3000} defaultStyle={false} customStyle={styles.textContainer} >
                {SEARCH_SUGGESTIONS.map((suggestion, index) => (
                    <CustomText
                        key={index}
                        variant='h6'
                        fontFamily={Fonts.Medium}
                    >
                        {suggestion}
                    </CustomText>
                ))}
            </RollingBar>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f4f7",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: Colors.border,
        marginTop: 15,
        overflow: "hidden",
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    textContainer: {
        width: "90%",
        paddingLeft: 10,
        height: 50,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: "#ddd",
        marginHorizontal: 10
    }
})
export default SearchBar
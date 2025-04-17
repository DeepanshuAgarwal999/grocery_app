import { Colors, Fonts } from '@utils/Constants'
import { Text, TextProps, TextStyle, StyleSheet } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

interface CustomTextProps extends TextProps {
    children: React.ReactNode
    numberOfLines?: number
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
    fontFamily?: Fonts
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body2'
    fontSize?: number
    style?: TextStyle | TextStyle[]
    onLayout?: (event: object) => void

}
const CustomText: React.FC<CustomTextProps> = ({ variant, style, children, fontFamily, fontSize, onLayout, numberOfLines, ...rest }) => {
    let computedFontSize: number
    switch (variant) {
        case 'h1':
            computedFontSize = RFValue(fontSize || 22)
            break
        case 'h2':
            computedFontSize = RFValue(fontSize || 20)
            break
        case 'h3':
            computedFontSize = RFValue(fontSize || 18)
            break
        case 'h4':
            computedFontSize = RFValue(fontSize || 16)
            break
        case 'h5':
            computedFontSize = RFValue(fontSize || 14)
            break
        case 'h6':
            computedFontSize = RFValue(fontSize || 12)
            break
        case 'body':
            computedFontSize = RFValue(fontSize || 14)
            break
        case 'body2':
            computedFontSize = RFValue(fontSize || 12)
            break
        default:
            computedFontSize = RFValue(fontSize || 16)
            break
    }
    const fontFamilyStyle = {
        fontFamily
    }

    return (
        <Text style={[styles.text, { fontFamily, fontSize: computedFontSize, color: Colors.text }, style]} {...rest}>
            {children}
        </Text>
    )



    return (
        <Text style={[styles.text, style]} {...rest} />
    )
}
export default CustomText

const styles = StyleSheet.create({
    text: {
        textAlign: "left"
    }
})
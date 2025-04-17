import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { ComponentProps, FC } from 'react'
import { Colors, Fonts } from '@utils/Constants'
import CustomText from './CustomText'
interface ButtonProps {
    title: string
    onPress: () => void,
    disabled: boolean
    loading: boolean
}
const CustomButton: FC<ButtonProps & ComponentProps<typeof Button>> = ({ title, onPress, disabled, loading, ...props }) => {
    return (
        <TouchableOpacity style={[styles.btn, {
            backgroundColor: disabled ? Colors.disabled : Colors.secondary
        }]} onPress={onPress} disabled={disabled} {...props}>
            {
                loading ? <ActivityIndicator size="small" color={'#fff'} /> : <CustomText variant='h6' fontFamily={Fonts.SemiBold} style={styles.text}>{title}</CustomText>
            }

        </TouchableOpacity>
    )
}

export default CustomButton
const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        marginVertical: 10,
        padding: 15
    },
    text: {
        color: '#fff',
    }
})
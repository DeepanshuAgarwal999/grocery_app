import { FC, ReactNode } from "react";
import { Platform, StatusBar, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface CustomSafeAreaViewProps {
    children: ReactNode;
    style?: ViewStyle;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({ children, style }: CustomSafeAreaViewProps) => {
    return (
        <SafeAreaView style={styles.container} >
            <View style={{ flex: 1 }}>
                {children}
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})
export default CustomSafeAreaView;
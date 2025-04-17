import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import React, { FC } from 'react'
import LottieView from 'lottie-react-native'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomInput from '@components/ui/CustomInput'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomButton from '@components/ui/CustomButton'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { screenHeight } from '@utils/Scaling'

const DeliveryLogin: FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
      })
      resetAndNavigate('DeliveryDashboard')
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <CustomSafeAreaView>
      <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag' >
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView autoPlay loop style={styles.lottieContainer} source={require('@assets/animations/delivery_man.json')}
              hardwareAccelerationAndroid
            />
            <CustomText variant='h3'  fontFamily={Fonts.Bold}>
              Delivery Partner Portal
            </CustomText>
            <CustomText variant='h6' style={{marginBottom:10}} fontFamily={Fonts.SemiBold}>
              Faster than flash🔥
            </CustomText>
            <CustomInput
              left={<Icon name="mail" color="#F8890E" style={{ marginLeft: 10 }} size={RFValue(18)} />}
              placeholder='Email'
              onChangeText={text => setEmail(text)}
              value={email}
              inputMode='email'
              right={false}
            />
            <CustomInput
              left={<Icon name="key-sharp" color="#F8890E" style={{ marginLeft: 10 }} size={20} />}
              placeholder='Password'
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={true}
              right={false}
            />
            <CustomText variant='h6' style={{marginTop:4, marginBottom:4}} fontFamily={Fonts.SemiBold}>
              By Continuing, you agree to our Terms of services & Privacy Policy
            </CustomText>
            <CustomButton title='Login' disabled={email.length < 5 || password.length < 5} onPress={handleLogin} loading={isLoading} />
          </View>


        </View>
      </ScrollView>
    </CustomSafeAreaView >
  )
}

export default DeliveryLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: "100%",
    width: "100%",
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: "100%",
    alignItems:'center'
  },
})
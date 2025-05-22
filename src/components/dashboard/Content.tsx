import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { adData, categories } from '@utils/dummyData'
import AdCarousel from './AdCarousel'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CategoriesContainer from './CategoriesContainer'

const Content = () => {
  return (
    <View style={styles.container}>
      <AdCarousel data={adData} />
      <CustomText variant='h5' fontFamily={Fonts.SemiBold} >
        Grocery & Kitchen
      </CustomText>
      <CategoriesContainer data={categories} />
      <CustomText variant='h5' fontFamily={Fonts.SemiBold} >
        BestSellers
      </CustomText>
      <CategoriesContainer data={categories} />
      <CustomText variant='h5' fontFamily={Fonts.SemiBold} >
        Snacks & drinks
      </CustomText>
      <CategoriesContainer data={categories} />
      <CustomText variant='h5' fontFamily={Fonts.SemiBold} >
        Home & Life
      </CustomText>
      <CategoriesContainer data={categories} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  }
})
export default Content
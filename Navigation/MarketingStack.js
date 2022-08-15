import * as  React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Marketing,{ScreenOptions as MarketingScreen} from '../Screen/Marketing and Sale';
import ProductDetail,{ScreenOptions as ProductDetailScreen} from '../Screen/ProductDetailScreen';
import Color from '../Constant/Color';

const Stack = createStackNavigator()

const DefaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android'? 'white':Color.primary
}

const MarketingStack = () => {
  return (
    <Stack.Navigator screenOptions={DefaultNavOption}>
      <Stack.Screen
        name="Marketing and Sale"
        component={Marketing}
        options={MarketingScreen}
      />
      <Stack.Screen
        name="Product Detail"
        component={ProductDetail}
        options={ProductDetailScreen}
      />
    </Stack.Navigator>
  )
}

export default MarketingStack;
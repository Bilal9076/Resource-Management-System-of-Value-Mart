import * as  React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Color from '../Constant/Color';
import PurchaseitemDetail,{ScreenOptions as PurchaseDetail} from '../Screen/PurchesItem'

const DefaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android'? 'white':Color.primary
}

const Stack = createStackNavigator()

const PurchaseStack = () => {
    return (
      <Stack.Navigator screenOptions={DefaultNavOption} >
        <Stack.Screen
          name="Purchase Detail Screen"
          component={PurchaseitemDetail}
          options={PurchaseDetail}
        />
       
      </Stack.Navigator>
    )
  }
  
  export default PurchaseStack;
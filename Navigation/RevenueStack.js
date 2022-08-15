import * as  React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Color from '../Constant/Color';
import Revenue from '../Screen/RevenueScreen';

const DefaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android'? 'white':Color.primary
}

const Stack = createStackNavigator()

const RevenueStack = () => {
    return (
      <Stack.Navigator screenOptions={DefaultNavOption} >
         <Stack.Screen
          name="Revenue Screen"
          component={Revenue}
        />
      </Stack.Navigator>
    )
  }
  
  export default RevenueStack;
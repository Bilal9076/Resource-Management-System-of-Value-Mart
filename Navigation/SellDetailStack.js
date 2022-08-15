import * as  React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Color from '../Constant/Color';
import SellItemDetail,{ScreenOptions as SellDetail} from '../Screen/Sellitem'

const DefaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android'? 'white':Color.primary
}

const Stack = createStackNavigator()

const SellStack = () => {
    return (
      <Stack.Navigator screenOptions={DefaultNavOption} >
        <Stack.Screen
          name="Sell Detail Screen"
          component={SellItemDetail}
          options={SellDetail}
        />
       
      </Stack.Navigator>
    )
  }
  
  export default SellStack;
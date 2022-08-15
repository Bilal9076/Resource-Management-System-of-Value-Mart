import * as  React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Accounting,{ScreenOptions as accounting} from '../Screen/Accounting and Finance';
import Color from '../Constant/Color';
import PurchesItem from '../Screen/PurchesItem'
import SellItem from '../Screen/Sellitem'
import Revenue from '../Screen/RevenueScreen';

const DefaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android'? 'white':Color.primary
}

const Stack = createStackNavigator()

const AccountingStack = () => {
    return (
      <Stack.Navigator screenOptions={DefaultNavOption} initialRouteName='Accounting and Finance'>
        <Stack.Screen
          name="Accounting and Finance"
          component={Accounting}
          options={accounting}
        />
        <Stack.Screen
          name="Purchase Detail"
          component={PurchesItem}
        />
        <Stack.Screen
          name="Sales Detail"
          component={SellItem}
        />
         <Stack.Screen
          name="Revenue Screen"
          component={Revenue}
        />
      </Stack.Navigator>
    )
  }
  
  export default AccountingStack;
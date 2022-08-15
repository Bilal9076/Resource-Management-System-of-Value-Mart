import * as  React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import SupplyChain ,{ScreenOptions as SupplyProduct} from '../Screen/Supply Chain Management';
import SupplyChainEdit,{ScreenOptions as SupplyChainOption} from '../Screen/SupplyChainEdit';
import Color from '../Constant/Color';
import ProductDetail,{ScreenOptions as ProductDetailScreen} from '../Screen/ProductDetailScreen';


const Stack = createStackNavigator()

const DefaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android'? 'white':Color.primary
}
const SupplyChainStack = () => {
    return (
      <Stack.Navigator screenOptions={DefaultNavOption}>
        <Stack.Screen
          name="Supply Chain Management"
          component={SupplyChain}
          options={SupplyProduct}
        />
        <Stack.Screen
          name="Edit Product"
          component={SupplyChainEdit}
          options={SupplyChainOption}
        />
       
      </Stack.Navigator>
    )
  }

  export default SupplyChainStack;
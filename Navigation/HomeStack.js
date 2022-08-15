import * as  React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screen/HomeScreen';
import Color from '../Constant/Color';

const Stack = createStackNavigator()

const DefaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android'? 'white':Color.primary
}

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={DefaultNavOption}>
      <Stack.Screen
      initialParams={HomeScreen}
        name="Home screen"
        component={HomeScreen}
        // options={MarketingScreen}
      />
    </Stack.Navigator>
  )
}

export default HomeStack;
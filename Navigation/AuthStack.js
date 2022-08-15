import * as  React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthScreen ,{ScreenOptions as AuthScreenOption} from '../Screen/AuthScreen'
import SplashScreen,{ScreenOptions as SplashScreenOption} from '../Screen/SplashScreen';
import SignUp,{ScreenOptions as SignUpScreenOption} from '../Screen/SignUp';
import Color from '../Constant/Color';

const Stack = createStackNavigator()

const DefaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android'? 'white':Color.primary
}

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={DefaultNavOption}>
      <Stack.Screen
        name="Splash screen"
        component={SplashScreen}
        options={SplashScreenOption}
      />
      <Stack.Screen
        name="Authenticate"
        component={AuthScreen}
        options={AuthScreenOption}
      />
      <Stack.Screen
        name="sign up"
        component={SignUp}
        options={SignUpScreenOption}
      />
       
    </Stack.Navigator>
  )
}

export default AuthStack;
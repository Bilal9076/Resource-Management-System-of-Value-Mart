import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AdminNavigator from './AdminNavigator'
import StartupScreen from '../Screen/StartupScreen'
import AuthStack from './AuthStack'
import {useSelector} from 'react-redux'

const  AppContainer = props =>{
    const isAuth = useSelector(state=>!!state.Auth.token) 
    const didTryAutoLogin = useSelector(state=>!!state.Auth.didTryAutoLogin) 
    return (
      <NavigationContainer>
        {isAuth &&<AdminNavigator/>}
        {!isAuth && didTryAutoLogin && <AuthStack/>}
        {!isAuth && !didTryAutoLogin && <StartupScreen/>}
      </NavigationContainer>
    )
  
  }
  
  export default AppContainer;
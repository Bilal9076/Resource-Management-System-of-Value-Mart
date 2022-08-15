import {createStore,combineReducers,applyMiddleware} from 'redux';
import React, { useEffect } from 'react'
import {Provider} from 'react-redux'
import {useFonts} from 'expo-font'
import ProductReducer from './store/reducers/Supplyproduct'
import AuthReducer from './store/reducers/Auth'
import PurchesProduct from './store/reducers/PurchesProduct';
import SellProduct from './store/reducers/Sell'
import TotalAmount from './store/reducers/TotalAmount'
import AppContainer from './Navigation/AppContainer';
import ReduxThunk from 'redux-thunk'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound:true
    }
  }
})

const rootReducer = combineReducers({
  products:ProductReducer,
  Auth:AuthReducer,
  PurchesItems:PurchesProduct,
  Sellitem:SellProduct,
  Amount:TotalAmount
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk))


export default function App() {
  const [loaded]= useFonts({
    RobotoBold: require('./assets/font/RobotoBold.ttf'),
    RobotoLight:require('./assets/font/RobotoLight.ttf'),
    RobotoRegular:require('./assets/font/RobotoRegular.ttf'),
    Bold:require('./assets/font/Bold.ttf'),
    Regular:require('./assets/font/Regular.ttf')
  })
  if(!loaded){
    return null
  }
  return (
    <Provider store={store}>
    <AppContainer/>
   </Provider>

  );
}

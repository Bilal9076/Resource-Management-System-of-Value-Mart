import * as  React from 'react';
import { Platform, View, Button, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, MaterialIcons,FontAwesome,AntDesign,Feather } from '@expo/vector-icons'
import Color from '../Constant/Color';
import * as AuthAction from '../store/actions/Auth'
import { useDispatch } from 'react-redux';
import {
  Text,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch
} from 'react-native-paper'
// Screen
import MarketingStack from './MarketingStack';
import SupplyChainStack from './SupplyChainStack';
import AccountingStack from './AccountingStack';
import HomeStack from './HomeStack';
// import RevenueStack from './RevenueStack';
import SellStack from './SellDetailStack';
import PurchaseStack from './PurchaseStack';
import MainButton from '../Components/MainButton'

const DrawerStackNavigator = createDrawerNavigator()

const AdminNavigator = () => {
  const dispatch = useDispatch();
  return (
    <DrawerStackNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={styles.drawerContent}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Avatar.Image
                    source={require('../assets/logo11.png')}
                    size={60}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Title style={styles.title}>Value Mart</Title>
                    <Caption style={styles.Caption}>Management System</Caption>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.section}>
                    <Paragraph style={styles.Paragraph}>20 </Paragraph>
                    <Caption style={styles.Caption}>Employee</Caption>
                  </View>
                  <View style={styles.section}>
                    <Paragraph style={styles.Paragraph}>5 </Paragraph>
                    <Caption style={styles.Caption}>Branch</Caption>
                  </View>
                </View>
              </View>
              <DrawerItemList {...props} />
              <MainButton style={styles.button} onPress={()=>{dispatch(AuthAction.Logout())}}>Logout</MainButton>
   
            </SafeAreaView>
          </View>
        )
      }
      }
    >
      <DrawerStackNavigator.Screen
        name="Home Screen"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons name={'home-sharp'} size={focused ? 25 : 20} color={focused ? 'white' : 'gray'} />
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />
      <DrawerStackNavigator.Screen
        name="Marketing"
        component={MarketingStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons name={'gift-sharp'} size={focused ? 25 : 20} color={focused ? 'white' : 'gray'} />
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />
      <DrawerStackNavigator.Screen
        name="Accounting"
        component={AccountingStack}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons name={'account-balance'} size={focused ? 25 : 20} color={focused ? 'white' : 'gray'} />
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />

      <DrawerStackNavigator.Screen
        name="Supply Chain"
        component={SupplyChainStack}
        options={{
          drawerIcon: ({ focused }) => (
            <AntDesign name="user" size={focused ? 25 : 20} color={focused ? 'white' : 'gray'}/>
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />

      <DrawerStackNavigator.Screen
        name="Sales Detail"
        component={SellStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons name="cash"size={focused ? 25 : 20} color={focused ? 'white' : 'gray'} />
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />
       <DrawerStackNavigator.Screen
        name="Purchase Detail"
        component={PurchaseStack}
        options={{
          drawerIcon: ({ focused }) => (
            <FontAwesome name="exchange" size={focused ? 25 : 20} color={focused ? 'white' : 'gray'}/>
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />

    </DrawerStackNavigator.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 30
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold'
  },
  Caption: {
    fontSize: 15,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  row1: {
    flexDirection: 'column',
    marginLeft: 10,
    alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  Paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
    marginTop: -4
  },
  drawerSection: {
    marginTop: 15
  },
  button:{
    borderRadius:5,
    marginTop:10,
    margin:5
    // height:60,
    // paddingVertical:15
  }
})

export default AdminNavigator;
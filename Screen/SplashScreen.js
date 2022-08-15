//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button,Image,Dimensions,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import Color from '../Constant/Color';
// create a component
const SplashScreen = (props) => {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            < Image
            source={require('../assets/logo11.png')} 
            style={styles.logo}
            resizeMode='stretch'
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.title}>Resources Management System</Text>
            <Text style={styles.text}>sign in with account</Text>
            <View style={styles.button}>
             <TouchableOpacity onPress={()=>{
                props.navigation.navigate('Authenticate')
             }}>
                <LinearGradient
                colors={['#289cde','#289cde']}
                style={styles.sigIn}
                >
                  <Text style={styles.textSign}>Get Started</Text> 
                  <MaterialIcons name="navigate-next" size={24} color="#fff" /> 
                </LinearGradient>
             </TouchableOpacity>
            </View>
          </View>
        </View>
    );
};

export const ScreenOptions= navdata => {
    return {
        headerTitle: '  Value Mart',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? '#4db8ff': 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
        
    }

}

// define your styles
const { height } = Dimensions.get('screen')
const height_logo = height * 0.28;

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: Color.primary,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: Color.primary,
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical:5,
    },
    text: {
        color: 'gray',
        marginTop: 5,
        fontSize:16,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    sigIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default SplashScreen;

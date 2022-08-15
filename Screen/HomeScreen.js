//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import Color from '../Constant/Color';
import { version } from 'react-dom';
import Card from '../Components/Card';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'

// create a component
const HomeScreen = (props) => {
    let TouchableTem = TouchableOpacity;
    if (Platform.OS == 'android' && version >= 21) {
        TouchableTem = TouchableNativeFeedback
    }
    return (
        <ImageBackground
            source={require('../assets/business14.jpg')}
            style={styles.container}
        >
            <Card style={styles.Screen}>
                <Image
                    source={require('../assets/logo11.png')}
                    style={styles.img}
                />
                {/* For marketing */}
                <Card style={styles.marketing}>
                    <TouchableTem style={styles.marketingContainer} onPress={() => { props.navigation.navigate('Marketing') }} >

                        <View style={styles.iconContainer}>
                            <Ionicons name={'gift-sharp'} size={25} color='#258491' onPress={() => {
                                props.navigation.navigate('Marketing')
                            }} />
                        </View>
                        <View style={styles.marketingTextContainer}>
                            <Text style={styles.screenText}>Marketing</Text>
                            <Text style={styles.screenText}>and sale</Text>
                        </View>

                    </TouchableTem>
                </Card>
                {/* for accounting */}
                <Card style={styles.accounting}>
                    <TouchableTem style={styles.accountingContainer} onPress={() => { props.navigation.navigate('Accounting') }} >
                        <View style={styles.iconContainer}>
                            <MaterialIcons name={'account-balance'} size={25} color='#a58abf' onPress={() => {
                                props.navigation.navigate('Accounting')
                            }} />
                        </View>
                        <View style={styles.accountingTextContainer}>
                            <Text style={styles.screenText}>Accounting</Text>
                            <Text style={styles.screenText}>and Finance</Text>
                        </View>

                    </TouchableTem>
                </Card>
                {/* for supply chain */}
                <Card style={styles.supply}>
                    <TouchableTem style={styles.supplyContainer} onPress={() => { props.navigation.navigate('Supply Chain') }} >
                        <View style={styles.iconContainer}>
                            <FontAwesome5 name="warehouse" size={25} color="#f99e4f" onPress={() => {
                                props.navigation.navigate('Supply Chain')
                            }} />
                        </View>
                        <View style={styles.supplyTextContainer}>
                            <Text style={styles.screenText}>Supply Chain</Text>
                            <Text style={styles.screenText}>Management</Text>
                        </View>

                    </TouchableTem>
                </Card>
            </Card>
             {/* for footer */}
            <Card style={styles.Card}>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Resource Management System</Text>
                    <Text style={styles.footerText2}>of Value mart</Text>
                </View>
            </Card>


        </ImageBackground>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
        // backgroundColor: '#2c3e50',
    },
    Screen: {
        width: '42%',
        height: '80%',
        marginLeft: 20,
        backgroundColor: '#eef7ff',
        opacity: 0.8,
        alignItems: 'center',
        marginTop: 25
        // backgroundColor:'#00000099'
    },
    img: {
        width: '100%',
        height: '20%',
    },
    marketingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    marketing: {
        width: '75%',
        height: '20%',
        marginVertical: 15,
        backgroundColor: '#d5f7f8'

    },
    iconContainer: {
        backgroundColor: 'white',
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        top: 12
    },
    marketingTextContainer: {
        marginTop: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenText: {
        color: 'black',
        fontFamily: 'Regular'
    },
    Card: {
        width: '100%',
        height: '13%',
        marginTop: '7%',
        backgroundColor: '#f7e2d6'
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        fontSize: 22,
        fontFamily: 'Bold',
        marginVertical: 2,
        color: '#5879bc'
    },
    footerText2: {
        fontSize: 22,
        fontFamily: 'Bold',
        color: '#737e94'
    },

    accountingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    accounting: {
        width: '75%',
        height: '20%',
        marginVertical: 15,
        backgroundColor: '#f7ebff'

    },
    accountingTextContainer: {
        marginTop: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },

    supplyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    supply: {
        width: '75%',
        height: '20%',
        marginVertical: 15,
        backgroundColor: '#ffefdf'

    },
    supplyTextContainer: {
        marginTop: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

//make this component available to the app
export default HomeScreen;

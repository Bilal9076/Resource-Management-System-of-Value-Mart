import React, { useState } from 'react';
import { version } from 'react-dom';
import { useSelector } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Modal,
    Pressable
} from 'react-native'
import Color from '../Constant/Color'
import Card from '../Components/Card'
import CustomButton from '../Components/CustomButton'
import MainButton from '../Components/MainButton'

const Productitem = props => {
    // const Quantity = useSelector(state=>state.PurchesItems.quantity)
    let TouchableTem = TouchableOpacity;
    if (Platform.OS == 'android' && version >= 21) {
        TouchableTem = TouchableNativeFeedback
    }

    // if (props.quantity === 5) {
    //     setalert(true)
    // }
    return (
        <TouchableTem onPress={props.OnviewDetail}>
            <Card style={styles.container}>
                <Image style={styles.image} source={{ uri: props.image }} />
                <View style={styles.badgeContainer}>
                    {props.Quantity===0 ?<Text style={styles.badgeText1}>X</Text>:<Text style={styles.badgeText}>{props.Quantity}</Text>}
                </View>
                <View style={styles.detail}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <View style={styles.button}>
                    <Text style={styles.price}>Rs.{props.price}</Text>
                    <MainButton style={styles.button1} onPress={props.SaleTo}>Sell Now</MainButton>
                </View>
                {/* <View style={styles.button}>
                        <Button
                            title="Sell"
                            onPress={props.SaleTo}
                            color={Color.primary}
                        />
                    </View> */}

            </Card>
        </TouchableTem>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: 187,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    image: {
        width: '100%',
        height: '60%',
    },
    detail: {
        alignItems: 'center',
        marginTop:14,
        height: '15%',
    },
    title: {
        fontSize: 16,
        marginVertical: 3,
        fontFamily:'Bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        marginTop:7,
        marginLeft:8,
        // fontFamily:'Bold'
    },
    button: {
        width: '100%',
        // borderWidth: 1,
        // borderColor: 'white',
        // borderRadius: 5,
        height: '25%',
        //  marginBottom:5
        flexDirection: 'row',
        justifyContent: 'space-around',
    
    },
    button1: {
        borderRadius: 0,
        height: 35,
        width: 130,
        paddingHorizontal: 7,
        paddingVertical: 7,
        marginLeft: 30,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25
    },
    badgeContainer: {
        backgroundColor: Color.primary,
        width: 30,
        height: 30,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0
    },
    badgeText: {
        color: 'white',
        fontSize: 12
    },
    badgeText1: {
        color: 'white',
        fontSize: 14,
        fontFamily:'Bold'
    },


});

export default Productitem
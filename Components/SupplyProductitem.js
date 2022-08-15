import React from 'react';
import { version } from 'react-dom';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native'
import Color from '../Constant/Color'
import Card from '../Components/Card'
import CustomButton from '../Components/CustomButton'

const SupplyProductitem = props => {
    let TouchableTem = TouchableOpacity;
    if (Platform.OS == 'android' && version >= 21) {
        TouchableTem = TouchableNativeFeedback
    }
    return (
        <TouchableTem onPress={props.EditProduct}>
            <Card style={styles.container}>
                <Image style={styles.image} source={{ uri: props.image }} />
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{props.Quantity}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <View style={styles.button}>
                    <Text style={styles.price}>Rs.{props.price}</Text>
                    <CustomButton style={styles.button1} onPress={props.AddToCart}>Send</CustomButton>
                </View>
                {/* <View style={styles.button}>
                    <Button
                        title="Edit"
                        onPress={props.EditProduct}
                        color={Color.primary}
                    />
                </View> */}
            </Card>
        </TouchableTem>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 175,
        width: 125,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    image: {
        width: '100%',
        height: '57%',
    },
    detail: {
        alignItems: 'center',
        marginTop:5,
        height: '18%',
    },
    title: {
        fontSize: 14,
        marginVertical: 3,
        fontFamily:'Bold'
    },
    price: {
        fontSize: 12,
        color: '#888',
        marginTop:6,
        marginLeft:15
    },
    button: {
        width: '100%',
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button1: {
        borderRadius:0,
        height: 30,
        width:90,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginLeft:30,
        borderBottomLeftRadius:25,
        borderTopLeftRadius:25
    },
    badgeContainer: {
        backgroundColor: Color.primary,
        width: 25,
        height: 25,
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

});

export default SupplyProductitem
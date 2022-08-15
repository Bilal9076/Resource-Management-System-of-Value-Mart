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

const ProductStock = props => {
    let TouchableTem = TouchableOpacity;
    if(Platform.OS=='android' && version >=21){
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
                <Text style={styles.price}>Rs.{props.price}</Text>
            </View>
            <View style={styles.action}>
                <View style={styles.button}>
                    <Button
                        title='Order Now'
                        onPress={props.AddToCart}
                        color={Color.primary}
                    />
                </View>
            </View>
            </Card>
        </TouchableTem>
    )
}

const styles = StyleSheet.create({
     container: {
        height: 300,
        margin: 15, 
    },
    image: {
        width: '100%',
        height: '60%',
    },
    detail: {
        alignItems: 'center',
        marginVertical: 5,
        height: '15%'
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '25%',
        marginVertical: 5,
        marginHorizontal: 5
    },
    button: {
        width: '36%',
        marginVertical:2,
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

});

export default ProductStock
import React from 'react';
import {View,StyleSheet} from 'react-native'

const Card = props =>{
    return(
    <View style={{...styles.card,...props.style}}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    card:{
        // flex: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        shadowOpacity: 0.26,
        shadowColor: 'black',
        elevation: 6,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor:'white'
    }
})

export default Card;

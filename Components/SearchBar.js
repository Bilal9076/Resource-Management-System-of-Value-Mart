//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ActivityIndicator,TextInput } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, EvilIcons } from '@expo/vector-icons'
// import propType from 'prop-types'
// create a component
const Searchbar = (props) => {
    return (
        <View style={styles.SearchContainer}>
            <EvilIcons style={{ marginLeft: '3%' }} name="search" size={24} color="black" />
             <TextInput
             style={styles.searchbar}
             value={props.value}
             placeholder={props.placeholder?props.placeholder:'start Searching...'}
             onChangeText={props.onChangeText}
             />
            {props.editing ?<TouchableOpacity 
            onPress={props.onclear}
            style={{ marginRight: '7%' }}
            > <Text style={styles.text}>Clear</Text>
            </TouchableOpacity>:null}
            {props.laoding ? <ActivityIndicator 
            style={styles.loading}
            size={'small'}
            animating={true}
            color={'#0078b0'}
            />:null}
        </View>
    );
};

// Searchbar.propType={
//     onChangeText:propType.func.isRequired,
//     placeholder:propType.string,
//     value:propType.value.isRequired,
//     editing:propType.bool.isRequired,
//     onclear:propType.func.isRequired
// }

// define your styles
const styles = StyleSheet.create({
    SearchContainer: {
        borderColor: '#909194',
        backgroundColor: '#fff',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 50,
        alignSelf: 'center',
        marginTop: 5,
    },
    searchbar:{
     flex:1,
     paddingTop:5,
     paddingBottom:5,
     paddingLeft:25,
     fontWeight:'300',
     backgroundColor:'#fff'
    },
    text: {
        color: 'blue'
    },
    loading:{
        marginRight:'5%',
    }
});

//make this component available to the app
export default Searchbar;

//import liraries
import React, { useEffect, useCallback, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Button, ActivityIndicator, TouchableOpacity,ScrollView } from 'react-native'
import Card from '../Components/Card'
import Color from '../Constant/Color'
import { useSelector, useDispatch } from 'react-redux'
import * as SellAction from '../store/actions/Sell'
import * as PurchesAction from '../store/actions/PurchesProduct'
// import * as Progress from 'expo-progress';
import { ProgressBar, Colors } from 'react-native-paper'

import  moment from 'moment'

// create a component
const Revenue = () => {

    
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Error, SetError] = useState()



    const Sellproduct = useCallback(async () => {
        SetError(null)
        try {
            SetIsloading(true)
            await dispatch(SellAction.fetchData());
            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
    }, [dispatch])

    useEffect(() => {
        Sellproduct();
    }, [dispatch, Sellproduct])

    const SellJune = useCallback(async () => {
        SetError(null)
        try {
            SetIsloading(true)
            await dispatch(JuneAction.fetchData());
            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
    }, [dispatch])

    useEffect(() => {
        SellJune();
    }, [dispatch, SellJune])

    const PurchesProduct = useCallback(async () => {
        SetError(null)
        try {
            SetIsloading(true)
            await dispatch(PurchesAction.fetchData());

            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
    }, [dispatch])

    useEffect(() => {
        PurchesProduct();
    }, [dispatch, PurchesProduct])

    
   let date =  moment().format('MMMM');
   let mint = moment().format('mm');
//    console.log(mint)
//    console.log(date)


   let arrOfObject = useSelector(state => state.Sellitem.Sell)
   let array = arrOfObject.map(a => a.price);
   
//    console.log('date', dateArray)



//    let JanRevenue = 0;
//    if(date === 'January'){
//     for (let j = 0; j < array.length; j++) {
//         JanRevenue += array[j];
//     }
// }

// let FebRevenue = 0; 
// if(mint === '20'){ 
//     let array1 = arrOfObject.map(a => a.price);
//     for (let i = 0; i < array1.length; i++) {
//         FebRevenue += array1[i];
//     }
// }
    

//     let MarchRevenue = 0;
//     if(date === 'March'){
//         for (let i = 0; i < array.length; i++ ) {
//             MarchRevenue += array[i];
//         }
//     }
   

//     let AprilRevenue = 0;
//     if(date === 'April'){
//         for (let i = 0; i < array.length; i++) {
//             AprilRevenue += array[i];
//         }
//     }
    

//     let MayRevenue = 0;
//     if(date === 'May'){
//         for (let i = 0; i < array.length; i++) {
//             MayRevenue += array[i];
//         }
//     }

    let JuneRevenue = totalJune;
    if(mint === '46'){ 
        let array = arr.map(a => a.price);
        // let dateArray = arrOfObject.map(a => a.Date);
        for (let i = 0; i < array.length; i++ ) {
            JuneRevenue += array[i];
        }
    }

    let totalJune = JuneRevenue
    

    let JulyRevenue = 0;
    if(date ==='July'){
    for (let i = 0; i < array.length; i++) {
         JulyRevenue += array[i];     
    }   
}
// let totalJuly = JulyRevenue 




//     let AugRevenue = 0;
//     if(date === 'August'){
//         for (let i = 0; i < array.length; i++) {
//             AugRevenue += array[i];
//         }
//     }
    
   
//     let SepRevenue = 0;
//     if(date === 'September'){
//         for (let i = 0; i < array.length; i++) {
//             SepRevenue += array[i];
//         }
//     }
    

//     let OctRevenue = 0;
//     if(date === 'October'){
//         for (let i = 0; i < array.length; i++ ) {
//             OctRevenue += array[i];
//         }
//     }
    

//     let NovRevenue = 0;
//     if(date === 'November'){
//         for (let i = 0; i < array.length; i++ ) {
//             NovRevenue += array[i];
//         }
//     }
   
// if(date === 'December'){
//     let DecRevenue = 0;
//     for (let i = 0; i < array.length; i++ ) {
//         DecRevenue += array[i];
//     }
// }
    
let Total = JulyRevenue/10000*1




    if (Error) {
        return (
            <View style={styles.Centered}>
                <Text style={styles.text}>{Error}</Text>
                <View style={styles.btnContainer2}>
                    <Button
                        color={Color.primary}
                        title="Try Again"
                        // onPress={Orderproduct}
                    />
                </View>
            </View>
        )
    }

    if (Isloading) {
        return (
            <View style={styles.Centered}>
                <ActivityIndicator
                    size='large'
                    color={Color.primary}
                />
            </View>
        )
    }


    return (
        //   <ProgressBar style={{marginTop: 200,height:'10%',width:'80%'}} progress={Total} color='blue' />
        <View style={styles.screen}>
            <View style={styles.Maintext}>
             <Text style={styles.Text}>Monthly Revenue</Text>
             </View>
          <ScrollView>  
        <View style={styles.TextContainer}>
            <Text style={styles.progressText}>January</Text>
            <Text style={styles.progressText}>{JulyRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.8} color='green'/>

            <View style={styles.TextContainer}>
            <Text style={styles.progressText}>February</Text>
            <Text style={styles.progressText}>{JulyRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.5} color='red'/>

            <View style={styles.TextContainer}>
            <Text style={styles.progressText}>March</Text>
            <Text style={styles.progressText}>{JulyRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.4} color='blue'/>

            <View style={styles.TextContainer}>
            <Text style={styles.progressText}>April</Text>
            <Text style={styles.progressText}>{JulyRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.6} color='red'/>


            <View style={styles.TextContainer}>
            <Text style={styles.progressText}>May</Text>
            <Text style={styles.progressText}>{JulyRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.6} color='red'/>

             <View style={styles.TextContainer}>
            <Text style={styles.progressText}>June</Text>
            <Text style={styles.progressText}>{JuneRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.6} color='red'/>

            <View style={styles.TextContainer}>
            <Text style={styles.progressText}>July</Text>
            <Text style={styles.progressText}>{JulyRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.6} color='red'/>

            <View style={styles.TextContainer}>
            <Text style={styles.progressText}>August</Text>
            <Text style={styles.progressText}>{JulyRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.6} color='red'/>

            <View style={styles.TextContainer}>
            <Text style={styles.progressText}>September</Text>
            <Text style={styles.progressText}>{JulyRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.6} color='red'/>

            <View style={styles.TextContainer}>
            <Text style={styles.progressText}>October</Text>
            <Text style={styles.progressText}>{JulyRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.6} color='red'/>

            <View style={styles.TextContainer}>
            <Text style={styles.progressText}>November</Text>
            <Text style={styles.progressText}>{JulyRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.6} color='red'/>

            <View style={styles.TextContainer}>
            <Text style={styles.progressText}>December</Text>
            <Text style={styles.progressText}>{JulyRevenue}</Text>
            </View>
            <ProgressBar style={styles.ProgressBar} progress={0.6} color='red'/>

        {/* <Button title='testing' onPress={()=>{console.log('date', array)}} /> */}
              {/* <Card style={styles.summary}>
              <Text style={styles.summaryText}>February:<Text style={styles.amount}>{FebRevenue}$</Text></Text>
              </Card>  
             <Card style={styles.summary}>
            <Text style={styles.summaryText}>March:<Text style={styles.amount}>{Revenue}$</Text></Text>
             </Card>
             <Card style={styles.summary}>
             <Text style={styles.summaryText}>April:<Text style={styles.amount}>{Revenue}$</Text></Text>
            </Card>
             <Card style={styles.summary}>
             <Text style={styles.summaryText}>May:<Text style={styles.amount}>{Revenue}$</Text></Text>
             </Card> */}
             {/* <Card style={styles.summary}>
             <Text style={styles.summaryText}>June:{date === 'June' ?<Text style={styles.amount}>{JuneRevenue}$</Text>:<Text style={styles.amount}>{JuneRevenue}$</Text>}</Text>
             </Card>
             <Card style={styles.summary}>
             <Text style={styles.summaryText}>July:{date==='July'?<Text style={styles.amount}>{JulyRevenue}$</Text>:<Text style={styles.amount}>{JulyRevenue}$</Text>}</Text>
              </Card>  */}
              </ScrollView> 
              </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    screen:{
      flex:1,
      flexDirection:'column',
    },
    Text:{
    fontSize:20,
    fontWeight:'200',
    color:'red'
    },
    Maintext:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        marginTop:10
    },
    TextContainer:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginTop:10
    },
    ProgressBar:{
     width:'90%',
      height:30,
     marginLeft:20,
     
    },
    progressText:{
    marginVertical:5,
    fontSize:16,
    fontWeight:'200',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        height: 60,
        padding: 15,
        justifyContent: 'space-around',
        width: '60%',
        marginVertical: 25,

    },
    summaryText: {
        fontFamily: 'Bold',
        fontSize: 14,
        color: Color.primary
    },
    amount: {
        fontFamily: 'Regular',
        fontSize: 14,
        color: '#888'
    },
});

//make this component available to the app
export default Revenue;

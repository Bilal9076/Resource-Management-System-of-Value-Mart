import React, { useEffect, useState, useCallback } from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as SellAction from '../store/actions/Sell'
import Color from '../Constant/Color';
import SellItem from '../Components/SellProduct';
import * as AmountAction from '../store/actions/TotalAmount'
import * as PurchesAction from '../store/actions/PurchesProduct'
import { LinearGradient } from 'expo-linear-gradient'
import Card from '../Components/Card'
import { Ionicons, FontAwesome5, MaterialIcons,AntDesign } from '@expo/vector-icons'

const Sellitem = (props) => {
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [Error, SetError] = useState()

    const Sellitem = useSelector(state=>state.Sellitem.Sell)

    const Sellproduct = useCallback(async () => {
        SetIsrefreshing(true)
        SetError(null)
        try {
            SetIsloading(true)
            await dispatch(SellAction.fetchData());
            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
        SetIsrefreshing(false)
    }, [dispatch])

    useEffect(() => {
        Sellproduct();
    }, [dispatch,Sellproduct])
     // total amount
     const AmountFetch = useCallback(async () => {
        SetError(null)
        try {
            SetIsloading(true)
            await dispatch(AmountAction.fetchAmount());
            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
    }, [dispatch])

    useEffect(() => {
        AmountFetch();
    }, [dispatch, AmountFetch])

    const totalAmount = useSelector(state => state.Amount.Amount)
    const budgets = totalAmount.map(a => a.amount)
    let bug = 0;
    for (let i = 0; i < budgets.length; i++) {

        bug += budgets[i];
    }

// Income
const Sellproducts = useCallback(async () => {
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
    Sellproducts();
}, [dispatch, Sellproducts])

const arrOfObject = useSelector(state => state.Sellitem.Sell)
    let array = arrOfObject.map(a => a.price);

    let Revenue = 0;
    for (let i = 0; i < array.length; i++) {
        Revenue += array[i];

    }

    // Expense
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

    const PurchaseData = useSelector(state => state.PurchesItems.purches)
    let Purchase = PurchaseData.map(a => a.price);

    let Expense = 0;
    for (let i = 0; i < Purchase.length; i++) {
        Expense += Purchase[i];

    }


    if (Error) {
        return (
            <View style={styles.Centered}>
                <Text style={styles.text}>{Error}</Text>
                <View style={styles.btnContainer}>
                    <Button
                        color={Color.primary}
                        title="Try Again"
                        onPress={Sellproducts}
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
    // if(!Isloading && Sellitem.length===0){
    //     return(
    //     <View style={styles.Centered}>
    //         <Text style={styles.text2}>No Orders Found. Maybe do some orders</Text>
    //     </View>
    //     )
    // }
    return (
        <View style={styles.screen}>
        <Card style={styles.accountingContainer}>
            <LinearGradient
                        colors={['#f205e2', '#777df2','#05aff2']}
                        start={{x:0.7,y:0}}
                        style={{width:'100%',height:'100%'}}
                    >
                <View style={styles.balancetextContainer}>
                    <Text style={styles.balancetext}>Total Balane</Text>
                    <Text style={styles.amount}>Rs.{bug}</Text>
                </View>
                {/* income */}
                <View style={styles.iconContainer}>
                <AntDesign name="arrowdown" size={24} color="#289cde" />
                        </View>
                  <View style={styles.incomeContainer}>
                 <Text style={styles.incomeText}>Income</Text>
                 <Text style={styles.income}>Rs.{Revenue}</Text>
                 <Text style={styles.expenseText}>Expense</Text>
                 <Text style={styles.expense}>Rs.{Expense}</Text>
                 </View>
                 
                {/* expense */}
                <View style={styles.iconContainerexpense}>
                <AntDesign name="arrowup" size={24} color="#289cde" />
                        </View>
                        {/* <View style={styles.expenseContainer}>
                        
                 </View> */}
                 </LinearGradient>  
            </Card>
            <View style={styles.TransationContainer}>
                    <Text style={styles.TransationText}>Recent Transations</Text>
                    <Text style={styles.ViewText}>View All</Text>
                 </View>
        <FlatList
        onRefresh={Sellproducts}
        refreshing={Isrefreshing}
        keyExtractor={item => item.id}
        data={Sellitem}
        renderItem={itemData => {
            return (
                <SellItem
                  title={itemData.item.title}
                  price={itemData.item.price}
                  name={itemData.item.name}
                  number={itemData.item.number}
                  Quantity={itemData.item.Quantity}
                  date={itemData.item.readableDate}
                  ImgUrl= {itemData.item.ImgUrl}
                //   time = {itemData.item.time}
                />
            )
        }}
    />
    </View>
    );
};



const styles = StyleSheet.create({
    screen:{
     flex:1
    },
    accountingContainer: {
        height: 200,
        width: '90%',
        marginTop: 30,
        marginLeft: 20,
        borderRadius: 20,
    
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'red',
        fontSize: 20,
        fontFamily: 'Bold'
    },
    text2:{
        color: 'red',
        fontSize: 16,
        fontFamily: 'Bold'
    },
    btnContainer: {
        width: 120,
        marginVertical: 10
    },
    balancetext: {
        color:'white',
        fontSize:16,
        marginBottom:8
      },
      balancetextContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:15,
      },
      amount: {
          fontFamily: 'Regular',
          fontSize: 18,
          color: 'white'
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
        left: 18,
        top: 123
    },
    incomeContainer:{
        marginLeft:70,
        marginTop:55
    },
    incomeText:{
       color:'white',

    },
    income:{
        fontFamily: 'Regular',
        fontSize: 16,
        color: 'white',
    },
    iconContainerexpense:{
        backgroundColor: 'white',
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 200,
        top: 123
    },
    expenseText:{
        color:'white',
        marginLeft:183,
        marginTop:-40
    },
    expense:{
        fontFamily: 'Regular',
        fontSize: 16,
        color: 'white',
        marginLeft:183,
    },
    expenseContainer:{
        marginLeft:250,
        marginTop:-10
    },
    TransationContainer:{
        marginTop:30,
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:10
    },
    TransationText:{
       color:'#888',
       fontSize:16,
       marginLeft:22,
       fontFamily:'Bold'
    },
    ViewText:{
        color:'#888',
        fontSize:14, 
        marginRight:22 
    }
});

export const ScreenOptions = NavData => {
    return {
        headerTitle: 'Sell Detail',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
    }
}

export default Sellitem;

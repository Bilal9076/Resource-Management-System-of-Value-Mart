import React, { useEffect, useCallback, useState, useReducer } from 'react'
import { View, Text, StyleSheet, ImageBackground, Button, ActivityIndicator, TouchableOpacity, TextInput, Modal, Pressable, ScrollView } from 'react-native'
import Card from '../Components/Card'
import Color from '../Constant/Color'
import MainButton from '../Components/MainButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import * as SellAction from '../store/actions/Sell'
import * as PurchesAction from '../store/actions/PurchesProduct'
import * as AmountAction from '../store/actions/TotalAmount'
import Input from '../Components/input'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const fromReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const UpdatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const UpdatedValidities = {
            ...state.inputValidities,
            [action.input]: action.IsValid
        }

        let fromIsValid = true;
        for (const key in UpdatedValidities) {
            fromIsValid = fromIsValid && UpdatedValidities[key]
        }
        return {
            inputValues: UpdatedValues,
            inputValidities: UpdatedValidities,
            fromIsValid: fromIsValid
        }
    };
    return state;
}


const Accounting = (props) => {
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Error, SetError] = useState()
    const [Isalert, setIsalert] = useState(false);
    const [alert, setalert] = useState(false);
    const [isloading, Setisloading] = useState(false);

    const Sellitem = () => {
        props.navigation.navigate('Sales Detail')
    }
    const Purchesitem = () => {
        props.navigation.navigate('Purchase Detail')
    }





    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            Amount: '',

        },
        inputValidities: {
            Amount: false
        },
        FormValiditity: {
            fromIsValid: false,
        }
    })
    const Changetext = useCallback((inputIdentifier, inputValue, inputValiditiy) => {
        DispatchstateFrom({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            IsValid: inputValiditiy,
            input: inputIdentifier,
        });

    }, [DispatchstateFrom]);

    const SubmitFunction = useCallback(async () => {
        if (!stateFrom.fromIsValid) {
            setalert(true)
            // setIsalert(false)
            return;
        }
        Setisloading(true)
        SetError(null)
        try {
            await dispatch(AmountAction.TotalAmount(
                +stateFrom.inputValues.Amount
            ))


        } catch (err) {
            SetError(err.message)
        }
        Setisloading(false)
        setIsalert(false)
    }, [stateFrom, dispatch]);
    useEffect(() => {
        if (Error) {
            setalert(true)
        }
    }, [Error])


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

    // Revenue
    const arrOfObject = useSelector(state => state.Sellitem.Sell)
    let array = arrOfObject.map(a => a.price);

    let Revenue = 0;
    for (let i = 0; i < array.length; i++) {
        Revenue += array[i];

    }

    // Profit

    const profits = useSelector(state => state.Sellitem.Sell)
    const profit = profits.map(a => a.profit)
    let ProfitsPrice = 0;
    for (let i = 0; i < profit.length; i++) {
        ProfitsPrice += profit[i];
    }

    // Total Amount

    const totalAmount = useSelector(state => state.Amount.Amount)
    const budgets = totalAmount.map(a => a.amount)
    let bug = 0;
    for (let i = 0; i < budgets.length; i++) {

        bug += budgets[i];
    }

    // let retail = profits.map(a => a.price); 

    // let profit = 0;
    // for (let i = 0; i < array.length; i++) {
    //     profit = retail[i]-PurchasePrice;

    // }
    // budget = budget + Revenue
    // budget = budget - PurchasePrice






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

    if (isloading) {
        return (
            <View style={styles.Centered}>
                <ActivityIndicator
                    size='large'
                    color={Color.primary}
                />
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
        <ImageBackground
            source={require('../assets/AF.jpg')}
            style={styles.screen}
        >
            <Modal visible={Isalert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setIsalert(false)
                }}
            >
                <View style={styles.centerView}>
                    <Card style={styles.AuthContainer}>
                        <View style={styles.useInfo}>
                            <Text style={styles.useInfoText}>Business Budget</Text>
                        </View>

                        <Input
                            id='Amount'
                            label="Amount"
                            warningText='please enter Amount!'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='please Enter Amount'
                            initialValue=''
                            onInputChange={Changetext}
                            required
                            min={5}
                        />
                        <View style={styles.btnContainerModal}>
                             <MainButton style={styles.button2} onPress={SubmitFunction}>Submit</MainButton>
                        </View>
                    </Card>
                </View>
            </Modal>
            <Modal visible={alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setalert(false)
                }}
            >
                <View style={styles.center_View}>
                    <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                            {Error ? <Text style={styles.text1}>'An error occured'</Text> : <Text style={styles.text1}>'Warning'</Text>}
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ? <Text style={styles.text}>'Something went wrong'</Text> : <Text style={styles.text}>'Please Check your form Enteries'</Text>}
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Color.primary }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text1}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            
            <View style={styles.Container}>
            <MainButton style={styles.button1} onPress={()=>{setIsalert(true)}}>Add Budget</MainButton>
    
                <Card style={styles.summary}>
                    <Text style={styles.summaryText}>Budget:  <Text style={styles.amount}> Rs.{bug}</Text></Text>
                </Card>
                <Card style={styles.summary}>
                    <Text style={styles.summaryText}>Profit:  <Text style={styles.amount}> Rs.{ProfitsPrice}</Text></Text>
                </Card>
                <Card style={styles.summary}>
                    <Text style={styles.summaryText}>Revenue:  <Text style={styles.amount}> Rs.{Revenue}</Text></Text>
                </Card>

                <View style={styles.btnContainer}>
                    <View style={styles.btn}>
                        <MainButton style={styles.button} onPress={Sellitem}>Sales item</MainButton>
                    </View>
                    <View style={styles.btn}>
                        <MainButton style={styles.button} onPress={Purchesitem}>Purchase item</MainButton>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'Bold',
        marginVertical: 8,
    },
    Container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 140
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        height: 60,
        padding: 15,
        justifyContent: 'space-around',
        width: '60%',
        marginVertical: 15,
        marginTop:30

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
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        height: 80,
        padding: 15,
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 30,
        borderRadius: 5,
        marginBottom: 10,

    },
    btn: {
        width: '40%',
        borderRadius: 5,
    },
    button: {
        borderRadius: 10,
    },
    button2: {
        borderRadius: 10,
        paddingVertical:5,
        marginTop:-20,
        height:35,
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
    btnContainer2: {
        width: 120,
        marginVertical: 10
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomColor: '#f2f2f2',
        // paddingBottom: 5,
        // height:60
    },
    AuthContainer: {
        width: 260,
        height: 260,
        padding: 40,
        marginTop: 100,
        backgroundColor: 'white'
    },
    useInfo: {
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: Color.primary,
        height: 40,
        justifyContent: 'center',
        borderRadius: 5,
        
    },
    useInfoText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Regular'
    },
    btnContainerModal: {
        flex: 1,
        marginTop: 45,
        width: 100,
        marginHorizontal: 60,
        marginLeft:42
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    warning_modal: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Color.primary,
        borderRadius: 20,
    },
    warning_title: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    center_View: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    warning_Message: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,

    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    text1: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',

    },
    reset: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    MainText: {
        fontFamily: 'Bold',
        fontSize: 20,
        color: Color.primary,
        marginVertical:5
    },
    button1:{
        borderRadius:10,
        width:150,
        marginTop:30,
        height:45
    }
})

export const ScreenOptions = NavData => {
    return {
        headerTitle: 'Accounting And Finance',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Menu"
                        iconName={Platform.OS === 'android' ? 'menu' : 'menu'}
                        onPress={() => {
                            NavData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        }
    }
}
export default Accounting;
import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet,  Platform,  Pressable, Modal,ActivityIndicator,Alert,ImageBackground } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButtons';
import { useSelector, useDispatch } from 'react-redux';
import SupplyInput from '../Components/SupplyInput';
import Color from '../Constant/Color';
import * as ProductAction from '../store/actions/Supplyproduct'
import * as AmountAction from '../store/actions/TotalAmount'
import Card from '../Components/Card';
import * as ProductionAction from '../store/actions/PurchesProduct'

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

const SupplyChainEdit = props => {
    const [alert, setalert] = useState(false);
    const [Alert,SetIsAlert]= useState(false)
    const [Isloading,Setisloading] = useState(false);
    const [Error,SetError]= useState();
    const dispatch = useDispatch();
    const prodId = props.route.params? props.route.params.productId:null;
    const prodQuantity= props.route.params? props.route.params.productQuantity:null;
    const editProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId));

    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            title: editProduct ? editProduct.title : '',
            image: editProduct ? editProduct.imageUrl : '',
            description: editProduct ? editProduct.description : '',
            price: '',
            Quantity: editProduct ? editProduct.Quantity : '',
            // UpdateQuantity:''
        },
        inputValidities: {
            title: editProduct ? true : false,
            image: editProduct ? true : false,
            description: editProduct ? true : false,
            price: editProduct ? true : false,
            Quantity:editProduct ? true :false,
            // UpdateQuantity:false,
        },
        FormValiditity: {
            fromIsValid: editProduct ? true : false,
        }
    })

    const AmountFetch = useCallback(async () => {
        SetError(null)
        try {
            await dispatch(AmountAction.fetchAmount());
        } catch (err) {
            SetError(err.message)
        }
    }, [dispatch])

    useEffect(() => {
        AmountFetch();
    }, [dispatch, AmountFetch])

     // Total Amount

     const totalAmount = useSelector(state => state.Amount.Amount)
     const budgets = totalAmount.map(a => a.amount)
     let bug = 0;
     for (let i = 0; i < budgets.length; i++) {
 
         bug += budgets[i];
     }

    const Changetext = useCallback((inputIdentifier, inputValue, inputValiditiy) => {
        DispatchstateFrom({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            IsValid: inputValiditiy,
            input: inputIdentifier,
        });

    }, [DispatchstateFrom]);

    const SubmitFunction = useCallback( async () => {
        if (!stateFrom.fromIsValid) {
            setalert(true)
            return;
        }
        if(bug < 10000){
            SetIsAlert(true)
            return
        }
        Setisloading(true)
        SetError(null)
        try{
           
            if (editProduct) {
            
               await dispatch(ProductAction.UpdateProduct(
                    prodId,
                    stateFrom.inputValues.title,
                    stateFrom.inputValues.image,
                    stateFrom.inputValues.description,
                    +stateFrom.inputValues.Quantity + +stateFrom.inputValues.UpdateQuantity,
                    stateFrom.inputValues.price))

                    await dispatch(AmountAction.TotalAmount(
                        (stateFrom.inputValues.price * stateFrom.inputValues.UpdateQuantity) * -1 ,    
                    ))
                    await dispatch(ProductionAction.Purchesitem(
                        prodId,
                        stateFrom.inputValues.title,
                        stateFrom.inputValues.price * stateFrom.inputValues.UpdateQuantity,
                        stateFrom.inputValues.UpdateQuantity,
                        stateFrom.inputValues.image,
                    ))
            }
            else {
               await dispatch(ProductAction.CreateProduct(
                    stateFrom.inputValues.title,
                    stateFrom.inputValues.image,
                    stateFrom.inputValues.description,
                    stateFrom.inputValues.price,
                    stateFrom.inputValues.Quantity,))

                    await dispatch(AmountAction.TotalAmount(
                        (stateFrom.inputValues.price * stateFrom.inputValues.Quantity) * -1 ,    
                    ))
                    await dispatch(ProductionAction.NewPurchesitem(
                        stateFrom.inputValues.title,
                        stateFrom.inputValues.price * stateFrom.inputValues.Quantity,
                        stateFrom.inputValues.Quantity,
                        stateFrom.inputValues.image,
                    ))
            }
            
            props.navigation.goBack();
        } catch(err){
          SetError(err.message)
        }
        Setisloading(false)
        
    }, [stateFrom, prodId, dispatch]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                            title='card'
                            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                            onPress={SubmitFunction}
                        />
                    </HeaderButtons>
                )
            }
        })
    }, [SubmitFunction])

    useEffect(()=>{
        if(Error){
           setalert(true)
        } 
    },[Error])

    if(Isloading){
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
        source={require('../assets/bg.jpg')}
        style={styles.container}
        >
            <View style={styles.textContainer1}>
                    <Text style={styles.text2}>Supply Chain Management</Text>
                    </View>
            
        <ScrollView>
            
              <View style={styles.textContainer}>
                    <Text style={styles.text1}>Order Product</Text>
                    </View>
                <ScrollView>       
                <SupplyInput
                    id='title'
                    label="Title"
                    warningText='please enter some title!'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='Please Enter Title'
                    initialValue={editProduct ? editProduct.title : ''}
                    initiallyValid={!!editProduct}
                    onInputChange={Changetext}
                    required
                />

                <SupplyInput
                    id='image'
                    label="imageUrl"
                    warningText='please enter some URL!'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    placeholder='Please Enter URL'
                    multiline
                    numberOfLines={3}
                    initialValue={editProduct ? editProduct.imageUrl : ''}
                    initiallyValid={!!editProduct}
                    onInputChange={Changetext}
                    required
                />

                {editProduct ?
                // null  
                  <SupplyInput
                        id='price'
                        label="price"
                        warningText='please enter some Price!'
                        keyboardType='decimal-pad'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        editable={false}
                        placeholder='Please Enter Price'
                        initialValue={editProduct.price}
                        initiallyValid={!!editProduct}
                        onInputChange={Changetext}
                        required
                        min={0.1}
                    /> 
                    : (
                    <SupplyInput
                        id='price'
                        label="price"
                        warningText='please enter some Price!'
                        keyboardType='decimal-pad'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        placeholder='Please Enter Price'
                        initialValue={''}
                        initiallyValid={!!editProduct}
                        onInputChange={Changetext}
                        required
                        // min={0.1}
                    />
                )
                }

                <SupplyInput
                    id='description'
                    label="Description"
                    warningText='Please enter some description!'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='Please Enter Description'
                    multiline
                    numberOfLines={3}
                    initialValue={editProduct ? editProduct.description : ''}
                    initiallyValid={!!editProduct}
                    onInputChange={Changetext}
                    required
                    minLength={3}
                />
                 {editProduct?
                 <SupplyInput
                        id='Quantity'
                        label="Quantity"
                        warningText='please enter some Quantity!'
                        keyboardType='decimal-pad'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        editable={false}
                        placeholder={prodQuantity.toString()}
                        initialValue={editProduct.Quantity}
                        initiallyValid={!!editProduct}
                        onInputChange={Changetext}
                        required
                        // min={5}
                    />
                    :<SupplyInput
                    id='Quantity'
                    label="Quantity"
                    warningText='please enter some Quantity!'
                    keyboardType='decimal-pad'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='Please Enter Quantity'
                    initialValue={''}
                    initiallyValid={!!editProduct}
                    onInputChange={Changetext}
                    required
                    // min={5}
                />
                }
                       {editProduct?
                       <SupplyInput
                        id='UpdateQuantity'
                        label="UpdateQuantity"
                        warningText='please Update Quantity!'
                        keyboardType='decimal-pad'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        placeholder='please enter some Quantity!'
                        initialValue=''
                        initiallyValid={false}
                        onInputChange={Changetext}
                        required
                        min={1}
                    />:null
                }
        
                    </ScrollView>
            
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
                        {Error ?  <Text style={styles.text3}>'An error occured'</Text>:<Text style={styles.text3}>'Warning'</Text>} 
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ?  <Text style={styles.text}>'Something went wrong'</Text>:<Text style={styles.text}>'Please Check your form Enteries'</Text>}  
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Color.primary }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text3}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal visible={Alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    SetIsAlert(false)
                }}
            >
                <View style={styles.center_View}>
                    <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                        <Text style={styles.text3}>'Budget Low'</Text> 
                        </View>
                        <View style={styles.warning_Message}>
                      <Text style={styles.text}>'Please contact with Accounting and Finanace'</Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                SetIsAlert(false)
                            }}
                            android_ripple={{ color: Color.primary }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text3}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ScrollView>
        </ImageBackground>
    )
}

export const ScreenOptions= navdata => {
    const routeParams = navdata.route.params ?navdata.route.params:{}
    return {
        headerTitle: 'Supply Chain',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary: 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
        
    }

}

const styles = StyleSheet.create({
    form: {
        height:620,
        width:'90%',
        // justifyContent:'center',
        // alignItems:'center',
        marginTop:25,
        marginLeft:20,
        elevation: 4,
        // backgroundColor:'#eef7ff',
        opacity:.7
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
        // backgroundColor: '#2c3e50',
    },
    textContainer:{
      marginTop:10,
      alignItems:'center',
      justifyContent:'center',
    },
    text1:{ 
        color:'white',
       fontSize:20,
       fontFamily:'Bold',
       marginVertical:5
    },
    textContainer1:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:15,
        
      },
      text2:{ 
          color:'white',
         fontSize:22,
         fontFamily:'Bold',
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
    text3: {
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
    Centered:{
        flex:1,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },

})
export default SupplyChainEdit;
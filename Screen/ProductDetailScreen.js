import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, Pressable, ScrollView, Button, ActivityIndicator, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Color from '../Constant/Color';
import Input from '../Components/input'
import Card from '../Components/Card'
import * as ProductionAction from '../store/actions/Sell'

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
const ProductDetail = (props) => {
    const [Isalert, setIsalert] = useState(false);
    const [Alert, SetAlert] = useState(false)
    const [alert, setalert] = useState(false);
    const [Isloading, Setisloading] = useState(false);
    const [Error, SetError] = useState();
    const dispatch = useDispatch();

    availableProducts = useSelector(state => state.products.availableProducts)
    let array = availableProducts.map(product => product);

    const productId = props.route.params.productId;
    const Selectedproduct = useSelector(state => state.products.availableProducts.find(prodId => prodId.id === productId))
    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            title: Selectedproduct.title,
            price: Selectedproduct.price,
            name: '',
            number: '',
            Quantity: '',
        },
        inputValidities: {
            title: true,
            price: true,
            name: false,
            number: false,
            Quantity: false,
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
            await dispatch(ProductionAction.Sellproduct(
                stateFrom.inputValues.title,
                +stateFrom.inputValues.price,
                stateFrom.inputValues.name,
                +stateFrom.inputValues.number,
                stateFrom.inputValues.description,
                +stateFrom.inputValues.price* stateFrom.inputValues.Quantity - Selectedproduct.SupplyPirce* stateFrom.inputValues.Quantity))
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
        <View style={styles.screen}>
            <Modal visible={Isalert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setIsalert(false)
                }}
            >
                <View style={styles.centerView}>
                    <ScrollView>
                        <Card style={styles.AuthContainer}>
                            <ScrollView>
                                <View style={styles.useInfo}>
                                    <Text style={styles.useInfoText}>Product Information</Text>
                                </View>
                                <Input
                                    id='title'
                                    label="Title"
                                    warningText='please enter some title!'
                                    keyboardType='default'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder={Selectedproduct.title}
                                    required
                                    onInputChange={Changetext}
                                    editable={false}
                                    initiallyValid={!!Selectedproduct}
                                    initialValue={Selectedproduct.title}
                                />
                                <Input
                                    id='price'
                                    label="price"
                                    warningText='please enter some Price!'
                                    keyboardType='decimal-pad'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder={Selectedproduct.price}
                                    onInputChange={Changetext}
                                    required
                                    min={0.1}
                                    editable={false}
                                    initiallyValid={!!Selectedproduct}
                                    initialValue={Selectedproduct.price}
                                />
                                <Input
                                    id='name'
                                    label="Customer Name"
                                    warningText='please enter Name!'
                                    keyboardType='default'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='Please Enter Name'
                                    required
                                    onInputChange={Changetext}
                                    maxLength={20}
                                />
                                <Input
                                    id='number'
                                    label="Phone Number"
                                    warningText='please enter  valid number!'
                                    keyboardType='decimal-pad'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='Please Enter Number'
                                    required
                                    onInputChange={Changetext}
                                    minLength={11}
                                />
                                <Input
                                    id='Quantity'
                                    label="Quantity"
                                    warningText='Please enter Quantity between 1 to 5'
                                    keyboardType='decimal-pad'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='Please Enter Quantity'
                                    initialValue=''
                                    onInputChange={Changetext}
                                    // required
                                    // minLength={5}
                                />
                                <View style={styles.btnContainer}>
                                    <Button
                                        title='Submit'
                                        color={Color.primary}
                                        onPress={SubmitFunction}
                                    />
                                </View>
                            </ScrollView>
                        </Card>
                    </ScrollView>
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
                            {Error ? <Text style={styles.text}>'An error occured'</Text> : <Text style={styles.text}>'Warning'</Text>}
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ? <Text style={styles.text}>'Something went wrong'</Text> : <Text style={styles.text}>'Please Check your form enteries</Text>}
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Color.primary }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal visible={Alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    SetAlert(false)
                }}
            >
                <View style={styles.center_View}>
                    <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                            <Text style={styles.text}>'Inventory Low'</Text>
                        </View>
                        <View style={styles.warning_Message}>
                            <Text style={styles.text}>'Please Contact with Supply Chain'</Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Color.primary }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ScrollView>
                <Image style={styles.image} source={{ uri: Selectedproduct.imageUrl }} />
                <View style={styles.badgeContainer}>
                    {Selectedproduct.Quantity===0 ?<Text style={styles.badgeText}>X</Text>:<Text style={styles.badgeText}>{Selectedproduct.Quantity}</Text>}
                </View>
                <View style={styles.btnContainer1}>

                    <Button 
                    color={Color.primary}
                     title="Sell Now" 
                     onPress={() => {
                         setIsalert(true)
                        if (Selectedproduct.Quantity === 0) {
                            SetAlert(true)
                            setIsalert(false)
                        }
                    }} />
                </View>
                <Text style={styles.title}>Product Price</Text>
                <Text style={styles.price}>${Selectedproduct.price}</Text>
                <Text style={styles.description}>{Selectedproduct.description}</Text>
            </ScrollView>
        </View>
    );
};

export const ScreenOptions = navData => {
    return {
    
        headerTitle: navData.route.params.productTitle,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 265,
    },
    btnContainer1: {
        alignItems: 'center',
        marginVertical: 10,
      
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: Color.primary,
        marginVertical: 5,
        fontFamily: 'Bold'
    },
    title1: {
        fontSize: 18,
        textAlign: 'center',
        color: Color.primary,
        marginVertical: 5,
        fontFamily: 'Bold'
    },
    price: {
        fontSize: 16,
        textAlign: 'center',
        color: '#888',
        fontFamily: 'Regular',
    },
    description: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize:16,
        fontFamily: 'RobotoLight',
        color:'black'
    },
    containerText: {
        alignItems: 'center',
        marginVertical: 10,
    },
    text1: {
        alignItems: 'center',
        fontSize: 20,
        fontFamily: 'Bold',
        color: Color.primary
    },

    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    AuthContainer: {
        width: 330,
        height: 600,
        padding: 40,
        marginTop: 100,
        backgroundColor: 'white'
    },
    useInfo: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: Color.primary,
        height: 40,
        justifyContent: 'center',
        borderRadius: 5
    },
    useInfoText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Regular'
    },
    btnContainer: {
        flex: 1,
        marginTop: 25,
        width: 100,
        marginHorizontal: 70
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
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
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
})
export default ProductDetail;

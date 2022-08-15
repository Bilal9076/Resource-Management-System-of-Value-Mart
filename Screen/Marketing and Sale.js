// All import
import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, Pressable, ScrollView, Button, ActivityIndicator, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Productitem from '../Components/Productitem';
import Color from '../Constant/Color';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton'
import Input from '../Components/input'
import Card from '../Components/Card'
import * as ProductionAction from '../store/actions/Sell'
import * as ProductAction from '../store/actions/Supplyproduct';
import Searchbar from '../Components/SearchBar';
import * as AmountAction from '../store/actions/TotalAmount'
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'

//  useReducer
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

//  Main Function

const Marketing = props => {

    const LoadedProduct = useCallback(async () => {
        // console.log('product')
        SetIsrefreshing(true)
        SetError(null)
        try {
            await dispatch(ProductAction.fetchMarketingData());
        } catch (err) {
            SetError(err.message)
        }
        SetIsrefreshing(false)

    }, [dispatch])

    useEffect(() => {
        Setisloading(true)
        LoadedProduct().then(() => {
            Setisloading(false)
        }); LoadedProduct
    }, [dispatch,])

    useEffect(() => {
        const unsubcribe = props.navigation.addListener(
            'focus',
            LoadedProduct
        );
        return () => {
            unsubcribe();
        };
    }, [LoadedProduct])

    availableProducts = useSelector(state => state.products.availableProducts)
    const [Isalert, setIsalert] = useState(false);
    const [Alert, SetAlert] = useState(false)
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [alert, setalert] = useState(false);
    const [Isloading, Setisloading] = useState(false);
    const [Error, SetError] = useState();
    const [itemSelected, SetitemSelected] = useState('')
    const [search, setSearch] = useState('')
    const [filteredDataSource, setFilteredDataSource] = useState(availableProducts)
    const dispatch = useDispatch();


    let array = availableProducts.map(product => product);
    const Selectedproduct = array.find(product => product.title === itemSelected.title)


    // fetch Product from database








    // Function of flatlist for display product

    const renderItems = ({ item }) => (
        <Productitem
            image={item.imageUrl}
            title={item.title}
            price={item.price}
            Quantity={item.Quantity}
            OnviewDetail={() => {
                props.navigation.navigate('Product Detail', {
                    productId: item.id,
                    productTitle: item.title,
                    productQuantity: item.Quantity,
                    productImage: item.image,
                    productPrice: item.price
                })
            }}
            SaleTo={() => {
                SetitemSelected(item)
                setIsalert(true)
                if (item.Quantity === 0) {
                    SetAlert(true)
                    setIsalert(false)
                }
            }}

        />
    )

    const searchFilterFunction = text => {
        if (text) {
            const newData = availableProducts.filter(
                function (item) {
                    const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1

                })
            setFilteredDataSource(newData)
            setSearch(text)
        }
        else {
            setFilteredDataSource(availableProducts)
            // setInputText(inputText)
            setSearch(text)
        }

        // setFilteredDataSource(PurchaseItem)
        // console.log(text)
    }

    //  useReducer code

    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            title: itemSelected.title,
            price: itemSelected.price,
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

    // Submit function of  sellform 


    const SubmitFunction = useCallback(async () => {
        if (!stateFrom.fromIsValid) {
            setalert(true)
            // setIsalert(false)
            return;
        }
        Setisloading(true)
        SetError(null)
        try {
            await dispatch(ProductAction.SellProduct(
                itemSelected.id,
                stateFrom.inputValues.title,
                stateFrom.inputValues.price,
                stateFrom.inputValues.name,
                stateFrom.inputValues.number,
                itemSelected.imageUrl,
                itemSelected.description,
                itemSelected.Quantity - stateFrom.inputValues.Quantity,
            ))
            await dispatch(ProductionAction.Sellproduct(
                stateFrom.inputValues.title,
                stateFrom.inputValues.price * stateFrom.inputValues.Quantity,
                stateFrom.inputValues.name,
                +stateFrom.inputValues.number,
                +stateFrom.inputValues.Quantity,
                +stateFrom.inputValues.price * stateFrom.inputValues.Quantity - Selectedproduct.SupplyPirce * stateFrom.inputValues.Quantity,
                itemSelected.imageUrl,
            ))
            await dispatch(AmountAction.TotalAmount(
                stateFrom.inputValues.price * stateFrom.inputValues.Quantity,
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


    const product = useSelector(state => state.products.availableProducts)
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

    // for Searching 

    return (
        <View style={styles.screen}>
            {/* Modal for sellForm */}
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
                                    <Text style={styles.useInfoText}>Customer Information</Text>
                                </View>

                                <Input
                                    id='title'
                                    label="Title"
                                    warningText='please enter some title!'
                                    keyboardType='default'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='please Enter title'
                                    initialValue={itemSelected.title}
                                    initiallyValid={!!itemSelected}
                                    editable={false}
                                    required
                                    onInputChange={Changetext}
                                />
                                <Input
                                    id='price'
                                    label="price"
                                    warningText='please enter some Price!'
                                    keyboardType='decimal-pad'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='please Enter price'
                                    initialValue={itemSelected.price}
                                    editable={false}
                                    onInputChange={Changetext}
                                    initiallyValid={!!itemSelected}
                                    required
                                    min={0.1}
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
                                    warningText='please enter Valid Number!'
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
            {/* Modal for error  alert */}
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
            {/* Modal for low inventory alert */}
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
                            <Text style={styles.text1}>'Inventory Low'</Text>
                        </View>
                        <View style={styles.warning_Message}>
                            <Text style={styles.text}>'Please Contact with Supply Chain'</Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                SetAlert(false)
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
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    onChangeText={text => searchFilterFunction(text)}
                    value={search}
                    placeholder='Search Here...'
                    placeholderTextColor='#289cde'
                    style={styles.TextInput}
                />
                <Ionicons onPress={() => { }} name="search" size={27} color="#289cde" style={styles.Icon} />
            </View>
            <View style={styles.containerText}>
                <Text style={styles.text2}>Products of Value Mart</Text>
            </View>
            {/* <Searchbar
            onclear={Onclear}
            onChangeText={Search}
            editing={search !==''}
            // value={search}
            /> */}
            <FlatList
                numColumns={2}
                onRefresh={LoadedProduct}
                refreshing={Isrefreshing}
                data={search ? filteredDataSource : availableProducts}
                keyExtractor={item => item.id}
                renderItem={renderItems}
                ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: '#dcdcdc' }} />}
            />
        </View>
    )
};

// Stylesheet for designing
export const ScreenOptions = navData => {
    return {
        headerTitle: 'Marketing and Sale',
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
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        },
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    containerText: {
        alignItems: 'center',
        marginVertical: 14,
    },
    text2: {
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
        height: 590,
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
        marginTop: 35,
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
    TextInput: {
        width: '90%',
        marginHorizontal: 20,
        borderWidth: 1.2,
        borderRadius: 20,
        borderColor: Color.primary,
        marginTop: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white'
    },
    Icon: {
        marginLeft: -70,
        marginTop: 15,
        height: 34,
        width: 39.5,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 3
    }
})
export default Marketing;


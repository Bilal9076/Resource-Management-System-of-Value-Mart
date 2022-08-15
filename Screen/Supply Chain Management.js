import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, Pressable, ScrollView, Button, ActivityIndicator,TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import SupplyProductitem from '../Components/SupplyProductitem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton'
import headerbutton from '../Components/HeaderButtons'
import Color from '../Constant/Color';
import Input from '../Components/input'
import Card from '../Components/Card'
import * as ProductAction from '../store/actions/Supplyproduct';
import * as Productaction from '../store/actions/Sell'
import * as AmountAction from '../store/actions/TotalAmount'
import { Ionicons } from '@expo/vector-icons'

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

const SupplyChain = props => {
    const userproducts = useSelector(state => state.products.userProducts)
    const [Isalert, setIsalert] = useState(false);
    const [Alert, SetAlert] = useState(false)
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [alert, setalert] = useState(false);
    const [Isloading, Setisloading] = useState(false);
    const [Error, SetError] = useState();
    const [itemSelected, SetitemSelected] = useState('')
    const [search, setSearch] = useState('')
    const [filteredDataSource, setFilteredDataSource] = useState(userproducts)
    const dispatch = useDispatch();

    

    const availableProducts = useSelector(state => state.products.availableProducts)
    let arr = availableProducts.map(product => product);
    const Selectedproduct = arr.find(product => product.title === itemSelected.title )
    const TotalAmount = useSelector(state => state.Sellitem.TotalAmount)

    const LoadedProduct = useCallback(async () => {
        // console.log('product')
        SetIsrefreshing(true)
        SetError(null)
        try {
            await dispatch(ProductAction.fetchData());
            // console.log(Selectedproduct)
        } catch (err) {
            SetError(err.message)
        }
        SetIsrefreshing(false)

    }, [dispatch])

    useEffect(() => {
        Setisloading(true)
        LoadedProduct().then(() => {
            Setisloading(false)
        });
    }, [dispatch, LoadedProduct])

    useEffect(() => {
        const unsubcribe = props.navigation.addListener(
            'focus',
            LoadedProduct
        );
        return () => {
            unsubcribe();
        };
    }, [LoadedProduct])


    const renderItems = ({ item }) => (
        <SupplyProductitem
            image={item.imageUrl}
            title={item.title}
            price={item.price}
            Quantity={item.Quantity}
            AddToCart={() => {
                SetitemSelected(item)
                console.log(Selectedproduct)
                setIsalert(true)
                // if (TotalAmount < 2650) {
                //     SetAlert(true)
                //     setIsalert(false)
                // }
            }}
            EditProduct={() => {
                props.navigation.navigate('Edit Product', {
                    productId: item.id,
                    productTitle: item.title,
                    productQuantity:item.Quantity
                })
            }}
        />
    )

    const searchFilterFunction = text => {
        if (text) {
            const newData = userproducts.filter(
                function (item) {
                    const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1

                })
            setFilteredDataSource(newData)
            setSearch(text)
        }
        else {
            setFilteredDataSource(userproducts)
            // setInputText(inputText)
            setSearch(text)
        }

        // setFilteredDataSource(PurchaseItem)
        // console.log(text)
    }

    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            title: itemSelected.title,
            price: itemSelected.price,
            Retail:'',
            Quantity: '',
        },
        inputValidities: {
            title: true,
            price: true,
            Retail:false,
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
            await dispatch(ProductAction.PurchesProduct(
                itemSelected.id,
                stateFrom.inputValues.title,
                stateFrom.inputValues.price,
                itemSelected.imageUrl,
                itemSelected.description,
                itemSelected.Quantity - stateFrom.inputValues.Quantity,
            ))
            if(Selectedproduct){
                await dispatch(ProductAction.UpdateMarketingProduct(
                    Selectedproduct.id,
                    stateFrom.inputValues.title,
                    itemSelected.imageUrl,
                    itemSelected.description,
                    stateFrom.inputValues.Retail,
                    +Selectedproduct.Quantity + +stateFrom.inputValues.Quantity,
                    stateFrom.inputValues.price
                ))
            }else{
                await dispatch(ProductAction.MarketingProduct(
                    stateFrom.inputValues.title,
                    itemSelected.imageUrl,
                    itemSelected.description,
                    stateFrom.inputValues.Retail,
                    stateFrom.inputValues.Quantity,
                    stateFrom.inputValues.price
                ))
            }
            // await dispatch(AmountAction.TotalAmount(
            //     (stateFrom.inputValues.price * stateFrom.inputValues.Quantity) * -1 ,    
            // ))

        }
        catch (err) {
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

    // if (!Isloading && userproducts.length === 0) {
    //     return (
    //         <View style={styles.centered}>
    //             <Text style={styles.text2}>No Product Found. Maybe Start Adding Some</Text>
    //         </View>
    //     )
    // }
    if (Error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errtext}>{Error}</Text>
                <View style={styles.btnContainer2}>
                    <Button
                        color={Color.primary}
                        title="Try Again"
                        onPress={LoadedProduct}
                    />
                </View>
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
                                    placeholder='please Enter title'
                                    initialValue={itemSelected.title}
                                    initiallyValid={!!itemSelected}
                                    editable={false}
                                    required
                                    onInputChange={Changetext}
                                    maxLength={20}
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
                                 id='Retail'
                                 label=" Retail price"
                                 warningText='please enter retail Price!'
                                 keyboardType='decimal-pad'
                                 autoCapitalize='sentences'
                                 returnKeyType='next'
                                 placeholder='please Enter Retail price'
                                 initialValue=''
                                 onInputChange={Changetext}
                                 initiallyValid={!!itemSelected}
                                 required
                                 min={0.1}
                                />
                                <Input
                                    id='Quantity'
                                    label="Quantity"
                                    warningText='Please enter Quantity between 1 to 50'
                                    keyboardType='decimal-pad'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='Please Enter Quantity'
                                    initialValue=''
                                    onInputChange={Changetext}
                                // required
                                // minLength={50}
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
            <View style={styles.useInfo1}>
                <Text style={styles.useInfoText1}>Products In WareHouse</Text>
            </View>
            <FlatList
            numColumns={3}
                onRefresh={LoadedProduct}
                refreshing={Isrefreshing}
                data={search ? filteredDataSource : userproducts}
                keyExtractor={item => item.id}
                renderItem={renderItems}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    containerText: {
        alignItems: 'center',
        marginVertical: 20,
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
        width: 320,
        height: 520,
        padding: 40,
        marginTop: 140,
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
    useInfo1: {
        // alignItems: 'center',
        // marginVertical:25,
        // height: 50,
        // justifyContent: 'center',
        // borderRadius: 5,
        // width:'80%',
        // marginLeft:35
        alignItems: 'center',
        marginVertical: 14,
    
    },
    useInfoText1: {
        alignItems: 'center',
        fontSize: 20,
        fontFamily: 'Bold',
        color: Color.primary
    },
    btnContainer: {
        flex: 1,
        width: 100,
        marginHorizontal: 60,
        marginTop: 35
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
    centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text2: {
        color: 'red',
        fontSize: 16,
        fontFamily: 'Bold'
    },
    btnContainer2: {
        width: 120,
        marginVertical: 10
    },
    errtext: {
        color: 'red',
        fontSize: 20,
        fontFamily: 'Bold'
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

export const ScreenOptions = NavData => {
    return {
        headerTitle: 'Ware House',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,

        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={headerbutton}>
                    <Item
                        title='Add'
                        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        onPress={() => {
                            NavData.navigation.navigate('Edit Product')
                        }}
                    />
                </HeaderButtons>
            )
        },
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

export default SupplyChain;
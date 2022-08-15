
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_MARKETING_PRODUCT='SET_MARKETING_PRODUCT'
export const PURCHES_PRODUCT = 'PURCHES_PRODUCT'
export const MARKETING_PRODUCT = 'MARKETING_PRODUCT'
export const UPDATE_MARKETING_PRODUCT = 'UPDATE_MARKETING_PRODUCT'
export const  SELL_PRODUCT = 'SELL_PRODUCT'
import Product from '../../models/product'
import * as Notifications from 'expo-notifications'

export const fetchData = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/Product.json');
            if (!response.ok) {
                throw new Error('Some thing Went Wrong');
            }
            const resData = await response.json();

            const LoadedData = []
            for (key in resData) {
                LoadedData.push(new Product(
                    key,
                    resData[key].onwerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price,
                    resData[key].Quantity
                ))
            }
            dispatch({
                type: SET_PRODUCT,
                userProduct: LoadedData
            })
        } catch (err) {
            throw err
        }
    };
};


export const CreateProduct = (title, imageUrl, description, price, Quantity,SupplyPirce) => {
    return async (dispatch) => {
        const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/Product.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                Quantity,
                onwerId: 'u1',
            })
        });
        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            ProductData: {
                id: resData.name,
                title,
                imageUrl,
                description,
                price,
                Quantity,
                onwerId: 'u1',
            }
        });
    };
};
export const UpdateProduct = (id, title, imageUrl, description, Quantity,price) => {
    return async (dispatch) => {
        const response = await fetch(`https://resource-management-syst-f1733-default-rtdb.firebaseio.com/Product/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                Quantity,
                price,
            })
        });
        if (!response.ok) {
            throw new Error('something went wrong')
        }
        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            ProductData: {
                title,
                imageUrl,
                description,
                Quantity,
                price, 
            }
        });
    }
}

export const PurchesProduct = (id, title, price, imageUrl, description, Quantity) => {
    return async dispatch => {
        let PushToken
        PushToken =  (await Notifications.getExpoPushTokenAsync()).data;
        const response = await fetch(`https://resource-management-syst-f1733-default-rtdb.firebaseio.com/Product/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description,
                    Quantity,
                    onwerPushToken:PushToken

                })
            }
        );
        const resData = await response.json();
        dispatch({
            type: PURCHES_PRODUCT,
            id,
            title,
            price,
            imageUrl,
            description,
            Quantity,
            PushToken,
        });
    };
};


export const fetchMarketingData = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/MarketingProduct.json');
            if (!response.ok) {
                throw new Error('Some thing Went Wrong');
            }
            const resData = await response.json();

            const LoadedMarketingData = []
            for (key in resData) {
                LoadedMarketingData.push(new Product(
                    key,
                    resData[key].onwerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price,
                    resData[key].Quantity,
                    resData[key].SupplyPirce
                ))
            }
            dispatch({
                type: SET_MARKETING_PRODUCT,
                availableProducts: LoadedMarketingData
            })
        } catch (err) {
            throw err
        }
    };
};


export const MarketingProduct = (title, imageUrl, description, price, Quantity,SupplyPirce) => {
    return async (dispatch) => {
        const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/MarketingProduct.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                Quantity,
                onwerId: 'u1',
                SupplyPirce
            })
        });
        const resData = await response.json();
        // console.log(resData)
        dispatch({
            type: MARKETING_PRODUCT,
            MarketingData: {
                id:resData.name,
                title,
                imageUrl,
                description,
                price,
                Quantity,
                onwerId: 'u1',
                SupplyPirce
            }
        });
    };
};

export const UpdateMarketingProduct = (id, title, imageUrl, description,price, Quantity,SupplyPirce) => {
    return async (dispatch) => {
        const response = await fetch(`https://resource-management-syst-f1733-default-rtdb.firebaseio.com/MarketingProduct/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                Quantity,
                SupplyPirce
            })
        });
        if (!response.ok) {
            throw new Error('something went wrong')
        }
        dispatch({
            type: UPDATE_MARKETING_PRODUCT,
            pid: id,
            MarketingitemData: {
                title,
                imageUrl,
                description,
                price,
                Quantity,
                SupplyPirce
            }
        });
    }
}

export const SellProduct = (id, title, price, name, number, imageUrl, description, Quantity) => {
    return async dispatch => {
        let PushToken
        PushToken =  (await Notifications.getExpoPushTokenAsync()).data;
        const response = await fetch(`https://resource-management-syst-f1733-default-rtdb.firebaseio.com/MarketingProduct/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description,
                    Quantity,
                    onwerPushToken:PushToken,

                })
            }
        );
        const resData = await response.json();
        dispatch({
            type: SELL_PRODUCT,
            id,
            title,
            price,
            name,
            number,
            imageUrl,
            description,
            Quantity,
            PushToken,
        });
    };
};
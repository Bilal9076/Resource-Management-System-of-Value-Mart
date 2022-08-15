export const PURCHES_ITEM = 'PURCHES_ITEM'
export const NEW_PURCHASE= 'NEW_PURCHASE'
export const SET_PURCHES_PRODUCT = 'SET_PURCHES_PRODUCT'
import * as Notifications from 'expo-notifications'
import Purches from '../../models/Purches'



 export const fetchData = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/PurchesProduct.json');
            if (!response.ok) {
                throw new Error('Some thing Went Wrong');
            }
            const resData = await response.json();

            const LoadedPurchesData = []
            for (key in resData) {
                LoadedPurchesData.push(new Purches(
                    key,
                    resData[key].title,
                    resData[key].price,
                    resData[key].Quantity,
                    new Date(resData[key].date),
                    resData[key].Img,
                ))
            }
            dispatch({
                type: SET_PURCHES_PRODUCT,
                PurchesProduct: LoadedPurchesData
            })
        } catch (err) {
            throw err
        }
    };
};



export const Purchesitem = (id,title, price, Quantity,Img) => {
    const date = new Date();
    return async dispatch => {
        let PushToken
        PushToken = (await Notifications.getExpoPushTokenAsync()).data;
        const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/PurchesProduct.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    title,
                    price,
                    Quantity,
                    date: date.toISOString(),
                    Img
                })
            }
        );
        const resData = await response.json();
        dispatch({
            type: PURCHES_ITEM,
            id:resData.name,
            id,
            title,
            price,
            Quantity,
            date,
            Img
        });

        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                host: 'exp.host',
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                to: PushToken,
                data: { extraData: 'some data' },
                title: 'Product was Purchesed',
                body: title
            })
        });
    };
};

export const NewPurchesitem = (title, price, Quantity,Img) => {
    const date = new Date();
    return async dispatch => {
        let PushToken
        PushToken = (await Notifications.getExpoPushTokenAsync()).data;
        const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/PurchesProduct.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    price,
                    Quantity,
                    date: date.toISOString(),
                    Img
                })
            }
        );
        const resData = await response.json();
        dispatch({
            type: NEW_PURCHASE,
            id:resData.name,
            title,
            price,
            Quantity,
            date,
            Img
        });

        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                host: 'exp.host',
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                to: PushToken,
                data: { extraData: 'some data' },
                title: 'Product was Purchesed',
                body: title
            })
        });
    };
};

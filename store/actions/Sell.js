export const SELL_NOW = 'SELL_NOW'
export const SET_SELL_PRODUCT = 'SET_SELL_PRODUCT'
import * as Notifications from 'expo-notifications'
import Sell from '../../models/Sell'
import  moment from 'moment'


export const fetchData = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/Sellproduct.json');
            if (!response.ok) {
                throw new Error('Some thing Went Wrong');
            }
            const resData = await response.json();

            const LoadedSellData = []
            for (key in resData) {
                LoadedSellData.push(new Sell(
                    key,
                    resData[key].title,
                    resData[key].price,
                    resData[key].name,
                    resData[key].number,
                    resData[key].Quantity, 
                    new Date(resData[key].date),
                    resData[key].profit,
                    resData[key].ImgUrl,
                    // moment().startOf('month').fromNow()
                ))
            }
            dispatch({
                type: SET_SELL_PRODUCT,
                sellProduct: LoadedSellData
            })
        } catch (err) {
            throw err
        }
    };
};

export const Sellproduct = (title, price, name, number, Quantity,profit,ImgUrl) => {
    const date = new Date();
//    const time = moment().startOf('month').fromNow();
    return async dispatch => {
        try {
            let PushToken
            PushToken = (await Notifications.getExpoPushTokenAsync()).data;
            const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/Sellproduct.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
                        price,
                        name,
                        number,
                        Quantity,
                        date: date,
                        profit,
                        ImgUrl,
                        // time
                        // Month:Month.toISOString()
                    })
                }
            );
            const resData = await response.json();
            dispatch({
                type: SELL_NOW,
                id: resData.name,
                title,
                price,
                name,
                number,
                Quantity,
                date: date,
                profit,
                ImgUrl,
                // time
                // Month:Month
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
                    title: 'Product was sell',
                    body: title
                })
            });
        } catch (err) {
            console.log(err)
        }
    };
};


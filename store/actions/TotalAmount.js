export const AMOUNT = 'AMOUNT'
export const SET_AMOUNT = 'SET_AMOUNT'
import Amount from '../../models/Amount'



export const fetchAmount = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/Amount.json');
            if (!response.ok) {
                throw new Error('Some thing Went Wrong');
            }
            const resData = await response.json();
            // console.log(resData)

            const LoadedAmount = []
            for (key in resData) {
                LoadedAmount.push(new Amount(
                    key,
                    resData[key].amount,
                ))
            }
            dispatch({
                type: SET_AMOUNT,
                Totalamount: LoadedAmount
            })
        } catch (err) {
            throw err
        }
    };
};

export const TotalAmount = (amount) => {
    // let Month =  moment().format('MMMM');
    return async dispatch => {
        try {
            const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/Amount.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount
                    })
                }
            );
            const resData = await response.json();
            dispatch({
                type: AMOUNT,
                id:resData.name,
               amount
            });

        } catch (err) {
            console.log(err)
        }
    };
};


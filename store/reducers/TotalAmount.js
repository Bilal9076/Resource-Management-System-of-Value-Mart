import { SET_AMOUNT,AMOUNT } from '../actions/TotalAmount'
import Amount from '../../models/Amount'

const initialState = {
    Amount: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AMOUNT:
            return {
                ...state,
                Amount: action.Totalamount,
            }

        case AMOUNT:
            const totalAmount = new Amount(
                action.id,
                action.amount
            )
            return {
                ...state,
                Amount: state.Amount.concat(totalAmount),
            }     
    }


    return state;
}
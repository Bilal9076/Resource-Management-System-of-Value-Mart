import { SELL_NOW, SET_SELL_PRODUCT,  } from '../actions/Sell'
import Sell from '../../models/Sell'
const initialState = {
    Sell: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SELL_PRODUCT:
            return {
                ...state,
                Sell: action.sellProduct
            }

        case SELL_NOW:
            const Sellitems = new Sell(
                action.id,
                action.title,
                action.price,
                action.name,
                action.number,
                action.Quantity,
                 action.date,
                 action.profit,
                 action.ImgUrl,
                //  action.time,
            )
            return {
                ...state,
                Sell: state.Sell.concat(Sellitems),
            }
            
    }


    return state;
}
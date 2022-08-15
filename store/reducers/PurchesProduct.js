import { PURCHES_ITEM, SET_PURCHES_PRODUCT,NEW_PURCHASE} from '../actions/PurchesProduct'
import Purches from '../../models/Purches'

const initialState = {
    purches: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PURCHES_PRODUCT:
            return {
                ...state,
                purches: action.PurchesProduct
            }

        case PURCHES_ITEM:
            const purchesitems = new Purches(
                action.id,
                action.title,
                action.price,
                action.Quantity,
                action.date,
                action.Img
            )
            return {
                ...state,
                purches: state.purches.concat(purchesitems),   
            }
            case NEW_PURCHASE:
                const Newpurchesitems = new Purches(
                    action.id,
                    action.title,
                    action.price,
                    action.Quantity,
                    action.date,
                    action.Img
                )
                return {
                    ...state,
                    purches: state.purches.concat(Newpurchesitems),   
                }
    }
    


    return state;
}
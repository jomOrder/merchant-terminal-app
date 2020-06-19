import {
    CANCEL_TRANSACTION,
    CANCEL_TRANSACTION_ERROR,
    CANCEL_INTERNAL_SERVER_ERR
} from '../actions';
export default (state = [], action) => {
    switch (action.type) {
        case CANCEL_TRANSACTION:
            return action.payload;
        case CANCEL_TRANSACTION_ERROR:
            return action.payload;
        case CANCEL_INTERNAL_SERVER_ERR:
            return action.payload;
        default:
            return state;
    }
}
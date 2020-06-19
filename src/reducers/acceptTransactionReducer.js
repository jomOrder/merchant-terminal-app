import {
    ACCEPT_TRANSACTION,
    ACCEPT_TRANSACTION_ERROR,
    INTERNAL_SERVER_ERR
} from '../actions/acceptTransactionAction';
export default (state = [], action) => {
    switch (action.type) {
        case ACCEPT_TRANSACTION:
            return action.payload;
        case ACCEPT_TRANSACTION_ERROR:
            return action.payload;
        case INTERNAL_SERVER_ERR:
            return action.payload;
        default:
            return state;
    }
}
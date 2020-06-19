import {
    BRANCH_TRANSACTION_CANCELLED,
    BRANCH_TRANSACTION_CANCELLED_NOT_FOUND
} from '../actions/transactionHistoryAction';
export default (state = [], action) => {
    switch (action.type) {
        case BRANCH_TRANSACTION_CANCELLED:
            return action.payload;
        case BRANCH_TRANSACTION_CANCELLED_NOT_FOUND:
            return action.payload;
        default:
            return state;
    }
}
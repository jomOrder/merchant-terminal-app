import {
    BRANCH_TRANSACTION_ACCEPTED,
    BRANCH_TRANSACTION_ACCEPTED_NOT_FOUND
} from '../actions/transactionHistoryAction';
export default (state = [], action) => {
    switch (action.type) {
        case BRANCH_TRANSACTION_ACCEPTED:
            return action.payload;
        case BRANCH_TRANSACTION_ACCEPTED_NOT_FOUND:
            return action.payload;
        default:
            return state;
    }
}
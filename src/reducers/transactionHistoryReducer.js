import {
    BRANCH_Transactio_HISTORY,
    BRANCH_Transactio_HISTORY_NOT_FOUND
} from '../actions/transactionHistoryAction';
export default (state = [], action) => {
    switch (action.type) {
        case BRANCH_Transactio_HISTORY:
            return action.payload;
        case BRANCH_Transactio_HISTORY_NOT_FOUND:
            return action.payload;
        default:
            return state;
    }
}
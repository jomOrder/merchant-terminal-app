import {
    UPDATE_BRANCH_BALANCE,
    UPDATE_BRANCH_BALANCE_ERR,
} from '../actions/acceptTransactionAction';
export default (state = [], action) => {
    switch (action.type) {
        case UPDATE_BRANCH_BALANCE:
            return action.payload;
        case UPDATE_BRANCH_BALANCE_ERR:
            return action.payload;
        default:
            return state;
    }
}
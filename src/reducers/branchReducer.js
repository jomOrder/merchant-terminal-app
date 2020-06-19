import {
    MERCHANT_BRANCHES,
    MERCHANT_BRANCHES_NOT_FOUND,
} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case MERCHANT_BRANCHES:
            return action.payload;
        case MERCHANT_BRANCHES_NOT_FOUND:
            return action.payload;
        default:
            return state;
    }
}
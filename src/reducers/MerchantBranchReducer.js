import {
    VIEW_MERCHANT_BRANCH,
    VIEW_MERCHANT_BRANCH_NOT_FOUND,
} from '../actions';
export default (state = [], action) => {
    switch (action.type) {
        case VIEW_MERCHANT_BRANCH:
            return action.payload;
        case VIEW_MERCHANT_BRANCH_NOT_FOUND:
            return action.payload;
        default:
            return state;
    }
}
import { MERCHANT_BRANCH_UPDATED } from '../actions'
export default (state = [], action) => {
    switch (action.type) {
        case MERCHANT_BRANCH_UPDATED:
            return action.payload
        default:
            return state;
    }
}
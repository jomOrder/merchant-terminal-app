import { BRANCH_ORDERS, BRANCH_ORDERS_NOT_FOUND } from '../actions/orderAction'
export default (state = [], action) => {
    switch (action.type) {
        case BRANCH_ORDERS:
            return action.payload
        case BRANCH_ORDERS_NOT_FOUND:
            return action.payload
        default:
            return state;
    }
}
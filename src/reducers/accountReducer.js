import {
    VIEW_MERCHANT,
    MERCHANT_INTERNAL_SERVER_ERROR
} from '../actions';
export default (state = [], action) => {
    switch (action.type) {
        case VIEW_MERCHANT:
            return action.payload;
        case MERCHANT_INTERNAL_SERVER_ERROR:
            return action.payload;
        default:
            return state;
    }
}
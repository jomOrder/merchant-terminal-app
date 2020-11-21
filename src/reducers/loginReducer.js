import { USER_LOGIN, USER_ERR, USER_CHECK, INTERNAL_SERVER_ERROR, CLEAR_USER } from '../actions/userAction'
export default (state = [], action) => {
    switch (action.type) {
        case USER_LOGIN:
            return action.payload
        case USER_CHECK:
            return action.payload
        case USER_ERR:
            return action.payload
        case INTERNAL_SERVER_ERROR:
            return action.payload
        case CLEAR_USER:
            return []
        default:
            return state;
    }
}
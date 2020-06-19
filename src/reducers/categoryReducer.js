import {  BRANCH_CATEGORY_AND_ITEM, BRANCH_CATEGORY_AND_ITEM_NOT_FOUND } from '../actions/categoryAction'
export default (state = [], action) => {
    switch (action.type) {
        case BRANCH_CATEGORY_AND_ITEM:
            return action.payload
        case BRANCH_CATEGORY_AND_ITEM_NOT_FOUND:
            return action.payload
        default:
            return state;
    }
}
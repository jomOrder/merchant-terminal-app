import API from "../services/API";

export const BRANCH_ORDERS = 'BRANCH_ORDERS';
export const BRANCH_ORDERS_NOT_FOUND = 'BRANCH_ORDERS_NOT_FOUND';

export const getBranchOrders = (branchID) => async dispatch => {
    
    const response = await API.viewBranchOrdersTransaction(branchID, 0);
    const { data } = response;
    const { message, result, err } = data;
    if(err === 0) return dispatch({
        type: BRANCH_ORDERS,
        payload: result[0].transactions
    });

    if(err === 25) return dispatch({
        type: BRANCH_ORDERS_NOT_FOUND,
        payload: []
    });
};
import API from "../services/API";

export const BRANCH_Transactio_HISTORY = 'BRANCH_Transactio_HISTORY';
export const BRANCH_Transactio_HISTORY_NOT_FOUND = 'BRANCH_Transactio_HISTORY_NOT_FOUND';

export const BRANCH_TRANSACTION_ACCEPTED = 'BRANCH_TRANSACTION_ACCEPTED';
export const BRANCH_TRANSACTION_ACCEPTED_NOT_FOUND = 'BRANCH_TRANSACTION_ACCEPTED_NOT_FOUND';

export const BRANCH_TRANSACTION_CANCELLED = 'BRANCH_TRANSACTION_CANCELLED';
export const BRANCH_TRANSACTION_CANCELLED_NOT_FOUND = 'BRANCH_TRANSACTION_CANCELLED_NOT_FOUND';


export const getTransactionHistory = (branchID) => async dispatch => {
    
    const response = await API.viewBranchOrdersTransactionHistoy(branchID);
    const { data } = response;
    const { message, result, err } = data;
    if(err === 0) return dispatch({
        type: BRANCH_Transactio_HISTORY,
        payload: result[0].transactions
    });

    if(err === 25) return dispatch({
        type: BRANCH_Transactio_HISTORY_NOT_FOUND,
        payload: []
    });
};



export const getTransactionAccepted = (branchID) => async dispatch => {
    
    const response = await API.viewBranchOrdersTransactionAccepted(branchID);
    const { data } = response;
    const { message, result, err } = data;
    if(err === 0) return dispatch({
        type: BRANCH_TRANSACTION_ACCEPTED,
        payload: result[0].transactions
    });

    if(err === 25) return dispatch({
        type: BRANCH_TRANSACTION_ACCEPTED_NOT_FOUND,
        payload: []
    });
};


export const getTransactionCancelled = (branchID) => async dispatch => {
    
    const response = await API.viewBranchOrdersTransactionCancelled(branchID);
    const { data } = response;
    const { message, result, err } = data;
    if(err === 0) return dispatch({
        type: BRANCH_TRANSACTION_CANCELLED,
        payload: result[0].transactions
    });

    if(err === 25) return dispatch({
        type: BRANCH_TRANSACTION_CANCELLED_NOT_FOUND,
        payload: []
    });
};
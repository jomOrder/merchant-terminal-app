import API from "../services/API";

export const ACCEPT_TRANSACTION = 'ACCEPT_TRANSACTION';
export const ACCEPT_TRANSACTION_ERROR = 'ACCEPT_TRANSACTION_ERROR';
export const INTERNAL_SERVER_ERR = 'INTERNAL_SERVER_ERR';

export const UPDATE_BRANCH_BALANCE = 'UPDATE_BRANCH_BALANCE';
export const UPDATE_BRANCH_BALANCE_ERR = 'UPDATE_BRANCH_BALANCE_ERR';


export const acceptOrderTransaction = (branch_key, transactionID) => async dispatch => {

    const response = await API.acceptTransaction(branch_key, transactionID);
    const { data } = response;
    const { err, message } = data;
    try {
        if (err === 0) dispatch({
            type: ACCEPT_TRANSACTION,
            payload: [{ err: 0, message }]
        });

        if (data.err === 25) dispatch({
            type: ACCEPT_TRANSACTION_ERROR,
            payload: { err: 25, message }
        });

    } catch (e) {
        dispatch({
            type: INTERNAL_SERVER_ERR,
            payload: { err: 500, message: e.message }
        });
    }

};


export const updateBranchStatusBalance = (branch_key, transactionID) => async dispatch => {

    const response = await API.updateBranchBalance(branch_key, transactionID);
    const { data } = response;
    const { err, message } = data;
    console.log("data: ", data);
    try {
        if (err === 0) dispatch({
            type: UPDATE_BRANCH_BALANCE,
            payload: [{ err: 0, message }]
        });

    } catch (e) {
        console.log(e.message)
        dispatch({
            type: UPDATE_BRANCH_BALANCE_ERR,
            payload: { err: 500, message: e.message }
        });
    }

};
import API from "../services/API";

export const CANCEL_TRANSACTION = 'CANCEL_TRANSACTION';
export const CANCEL_TRANSACTION_ERROR = 'CANCEL_TRANSACTION_ERROR';
export const CANCEL_INTERNAL_SERVER_ERR = 'CANCEL_INTERNAL_SERVER_ERR';

export const cancelOrderTransaction = (branch_key, transactionID) => async dispatch => {
    
    const response = await API.cancelTransaction(branch_key, transactionID);
    const { data } = response;
    const { err, message } = data;
    try {
        if (err === 0) dispatch({
            type: CANCEL_TRANSACTION,
            payload: [{ err: 0, message }]
        });

        if (data.err === 25) dispatch({
            type: CANCEL_TRANSACTION_ERROR,
            payload: { err: 25, message }
        });

    } catch (e) {
        dispatch({
            type: CANCEL_INTERNAL_SERVER_ERR,
            payload: { err: 500, message: e.message }
        });
    }

};
import API from "../services/API";

export const VIEW_MERCHANT = 'VIEW_MERCHANT';
export const MERCHANT_NOT_FOUND = 'MERCHANT_NOT_FOUND';
export const MERCHANT_INTERNAL_SERVER_ERROR = 'MERCHANT_INTERNAL_SERVER_ERROR';


export const accountDetails = (branch_key) => async dispatch => {
    const response = await API.viewMerchant(branch_key);
    const { data } = response;
    const { err, result, message } = data;
    try {
        if (err === 0) {
            dispatch({
                type: VIEW_MERCHANT,
                payload: [result]
            });
        }
        if (err === 25) dispatch({
            type: MERCHANT_NOT_FOUND,
            payload: { err, message }
        });

    } catch (e) {
        dispatch({
            type: MERCHANT_INTERNAL_SERVER_ERROR,
            payload: { err: 500, message: e.message }
        });
    }
};
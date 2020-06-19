import API from "../services/API";

export const MERCHANT_BRANCHES = 'MERCHANT_BRANCHES';
export const MERCHANT_BRANCHES_NOT_FOUND = 'MERCHANT_BRANCHES_NOT_FOUND';

export const VIEW_MERCHANT_BRANCH = 'VIEW_MERCHANT_BRANCH';
export const VIEW_MERCHANT_BRANCH_NOT_FOUND = 'VIEW_MERCHANT_BRANCH_NOT_FOUND';


export const getMerchantBranches = () => async dispatch => {
    
    const response = await API.getMerchantBranches(0);
    const { data } = response;
    const { message, result } = data;
    if(data.err === 0) dispatch({
        type: MERCHANT_BRANCHES,
        payload: result[0].branches
    });

    if(data.err === 25) dispatch({
        type: MERCHANT_BRANCHES_NOT_FOUND,
        payload: { err: 25, message }
    });
};




export const viewMerchantBranch = (branch_key) => async dispatch => {
    
    const response = await API.viewSingleBranch(branch_key);
    const { data } = response;
    const { message, result, err } = data;
    if(err === 0) dispatch({
        type: VIEW_MERCHANT_BRANCH,
        payload: result
    });

    if(err === 25) dispatch({
        type: VIEW_MERCHANT_BRANCH_NOT_FOUND,
        payload: { err: 25, message }
    });
};
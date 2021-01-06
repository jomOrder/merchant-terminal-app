import API from "../services/API";

export const BRANCH_CATEGORY_AND_ITEM = 'BRANCH_CATEGORY_AND_ITEM';
export const BRANCH_CATEGORY_AND_ITEM_NOT_FOUND = 'BRANCH_CATEGORY_AND_ITEM_NOT_FOUND';

export const viewBranchCategory = (branchID) => async dispatch => {
    
    const response = await API.viewBranchCategoryAndItems(branchID);
    const { data } = response;
    const { message, result, err } = data;
    if(err === 0) return dispatch({
        type: BRANCH_CATEGORY_AND_ITEM,
        payload: result[0].categories
    });

    if(err === 25) return dispatch({
        type: BRANCH_CATEGORY_AND_ITEM_NOT_FOUND,
        payload: []
    });
};
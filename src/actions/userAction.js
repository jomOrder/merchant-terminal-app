import API from '../services/API';
export const USER_LOGIN = 'USER_LOGIN'
export const USER_ERR = 'USER_ERR'
export const USER_CHECK = 'USER_CHECK'
export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'

export const userLogin = (credentials) => async dispatch => {
    const response = await API.loginUser(credentials);
    const { data } = response;

    try {   

        if (data.err === 10) {
            dispatch({
                type: USER_LOGIN,
                payload: { err: 10, token: data.token }
            });
        }
        if (data.err === 13 || data.err === 11 || data.err === 14) dispatch({
            type: USER_ERR,
            payload: { err: 13, message: data.message }
        });

    } catch (e) {
        dispatch({
            type: INTERNAL_SERVER_ERROR,
            payload: { err: 500 }
        });
    }
};
import axios from 'axios'

import {
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_FAIL,


    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,


    CLEAR_ERRORS,

} from "../constants/UserConstant";


export const UsersAction = () => async (dispatch) => {
    try {
        dispatch({ type: USERS_REQUEST });

        const { data } = await axios.get(`/api/admin/user`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: USERS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USERS_FAIL,
            payload: error.response.data,
        })

    }
}




export const DeleteUserAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`/api/admin/user/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data,
        })

    }
}



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
import axios from 'axios'

import {
    SUPPORTS_REQUEST,
    SUPPORTS_SUCCESS,
    SUPPORTS_FAIL,


    DELETE_SUPPORT_REQUEST,
    DELETE_SUPPORT_SUCCESS,
    DELETE_SUPPORT_FAIL,


    CLEAR_ERRORS,

} from "../constants/SupportConstant";


export const SupportsAction = () => async (dispatch) => {
    try {
        dispatch({ type: SUPPORTS_REQUEST });

        const { data } = await axios.get(`/api/admin/support`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: SUPPORTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SUPPORTS_FAIL,
            payload: error.response.data,
        })

    }
}


export const DeleteSupportAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SUPPORT_REQUEST });

        const { data } = await axios.delete(`/api/admin/support/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: DELETE_SUPPORT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_SUPPORT_FAIL,
            payload: error.response.data,
        })

    }
}



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
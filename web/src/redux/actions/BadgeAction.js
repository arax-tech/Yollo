import axios from 'axios'

import {
    BADGES_REQUEST,
    BADGES_SUCCESS,
    BADGES_FAIL,


    CREATE_BADGE_REQUEST,
    CREATE_BADGE_SUCCESS,
    CREATE_BADGE_FAIL,


    DELETE_BADGE_REQUEST,
    DELETE_BADGE_SUCCESS,
    DELETE_BADGE_FAIL,


    CLEAR_ERRORS,

} from "../constants/BadgeConstant";


export const BadgesAction = () => async (dispatch) => {
    try {
        dispatch({ type: BADGES_REQUEST });

        const { data } = await axios.get(`/api/admin/badge`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: BADGES_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: BADGES_FAIL,
            payload: error.response.data,
        })

    }
}


export const CreateBadgeAction = (name, icon) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_BADGE_REQUEST });

        const { data } = await axios.post(`/api/admin/badge/store`, {
            name, icon,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: CREATE_BADGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CREATE_BADGE_FAIL,
            payload: error.response.data,
        })

    }
}



export const DeleteBadgeAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BADGE_REQUEST });

        const { data } = await axios.delete(`/api/admin/badge/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: DELETE_BADGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_BADGE_FAIL,
            payload: error.response.data,
        })

    }
}



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
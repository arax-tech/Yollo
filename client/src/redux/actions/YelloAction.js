import axios from 'axios'
import { APP_URL } from '../constants/App';

import {
    SUGGESSION_REQUEST,
    SUGGESSION_SUCCESS,
    SUGGESSION_FAIL,

    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,

    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAIL,

    CLEAR_ERRORS,
} from "../constants/YelloConstant";


export const AllSuggessionAction = () => async (dispatch) => {
    try {
        dispatch({ type: SUGGESSION_REQUEST });

        const { data } = await axios.get(`${APP_URL}/user/suggession`);
        dispatch({
            type: SUGGESSION_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SUGGESSION_FAIL,
            payload: error.response.data,
        })

    }
}

export const FollowAction = (follow_user_id) => async (dispatch) => {
    try {
        dispatch({ type: FOLLOW_REQUEST });
        const { data } = await axios.put(`${APP_URL}/user/follow`, {
            follow_user_id,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: FOLLOW_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FOLLOW_FAIL,
            payload: error.response.data
        })
    }
}


export const UnFollowAction = (unfollow_user_id) => async (dispatch) => {
    try {
        dispatch({ type: UNFOLLOW_REQUEST });
        const { data } = await axios.put(`${APP_URL}/user/unfollow`, {
            unfollow_user_id,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: UNFOLLOW_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UNFOLLOW_FAIL,
            payload: error.response.data
        })
    }
}





export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
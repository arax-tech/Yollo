import axios from 'axios'
import { APP_URL } from '../constants/App';

import {
    VIEW_POST_REQUEST,
    VIEW_POST_SUCCESS,
    VIEW_POST_FAIL,

    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL,

    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAIL,

    CLEAR_ERRORS,

} from "../constants/ReactionConstant";



export const PostViewAction = (post_id) => async (dispatch) => {
    try {
        dispatch({ type: VIEW_POST_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/post/view/${post_id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: VIEW_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: VIEW_POST_FAIL,
            payload: error.response.data,
        })

    }
}


export const PostLkeAction = (post_id) => async (dispatch) => {
    try {
        dispatch({ type: LIKE_POST_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/post/like/${post_id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: LIKE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: LIKE_POST_FAIL,
            payload: error.response.data,
        })

    }
}


export const PostUnLkeAction = (post_id) => async (dispatch) => {
    try {
        dispatch({ type: UNLIKE_POST_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/post/unlike/${post_id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UNLIKE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UNLIKE_POST_FAIL,
            payload: error.response.data,
        })

    }
}



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
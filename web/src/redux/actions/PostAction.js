import axios from 'axios'

import {
    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAIL,

    SINGLE_POST_REQUEST,
    SINGLE_POST_SUCCESS,
    SINGLE_POST_FAIL,

    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,


    CLEAR_ERRORS,

} from "../constants/PostConstant";


export const PostsAction = () => async (dispatch) => {
    try {
        dispatch({ type: POSTS_REQUEST });

        const { data } = await axios.get(`/api/admin/post`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: POSTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: POSTS_FAIL,
            payload: error.response.data,
        })

    }
}

export const SinglePostAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_POST_REQUEST });

        const { data } = await axios.get(`/api/admin/post/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: SINGLE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SINGLE_POST_FAIL,
            payload: error.response.data,
        })

    }
}


export const DeletePostAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_POST_REQUEST });

        const { data } = await axios.delete(`/api/admin/post/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: DELETE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_POST_FAIL,
            payload: error.response.data,
        })

    }
}



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
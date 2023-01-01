import axios from 'axios'
import { APP_URL } from '../constants/App';

import {
    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAIL,

    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,

    VIEW_POST_REQUEST,
    VIEW_POST_SUCCESS,
    VIEW_POST_FAIL,

    CLEAR_ERRORS,

} from "../constants/PostConstant";


export const PostsAction = () => async (dispatch) => {
    try {
        dispatch({ type: POSTS_REQUEST });

        const { data } = await axios.get(`${APP_URL}/user/post`, {
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

export const CreatePostAction = (caption, image, who_can_see, allow_comments, allow_reactions, allow_high_quality, diamonds) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_POST_REQUEST });

        const { data } = await axios.post(`${APP_URL}/user/post/store`, {
            caption, image, who_can_see, allow_comments, allow_reactions, allow_high_quality, diamonds,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: CREATE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CREATE_POST_FAIL,
            payload: error.response.data,
        })

    }
}





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



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
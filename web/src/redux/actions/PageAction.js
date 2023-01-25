import axios from 'axios'

import {
    PAGES_REQUEST,
    PAGES_SUCCESS,
    PAGES_FAIL,

    SINGLE_PAGE_REQUEST,
    SINGLE_PAGE_SUCCESS,
    SINGLE_PAGE_FAIL,

    CREATE_PAGE_REQUEST,
    CREATE_PAGE_SUCCESS,
    CREATE_PAGE_FAIL,

    UPDATE_PAGE_REQUEST,
    UPDATE_PAGE_SUCCESS,
    UPDATE_PAGE_FAIL,

    DELETE_PAGE_REQUEST,
    DELETE_PAGE_SUCCESS,
    DELETE_PAGE_FAIL,


    CLEAR_ERRORS,

} from "../constants/PageConstant";


export const PagesAction = () => async (dispatch) => {
    try {
        dispatch({ type: PAGES_REQUEST });

        const { data } = await axios.get(`/api/admin/page`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: PAGES_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: PAGES_FAIL,
            payload: error.response.data,
        })

    }
}

export const SinglePageAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_PAGE_REQUEST });

        const { data } = await axios.get(`/api/admin/page/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: SINGLE_PAGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SINGLE_PAGE_FAIL,
            payload: error.response.data,
        })

    }
}

export const SinglePageByNameAction = (slug) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_PAGE_REQUEST });

        const { data } = await axios.get(`/api/admin/page/single/by/${slug}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: SINGLE_PAGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SINGLE_PAGE_FAIL,
            payload: error.response.data,
        })

    }
}


export const CreatePageAction = (name, slug, description) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PAGE_REQUEST });

        const { data } = await axios.post(`/api/admin/page/store`, {
            name, slug, description,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: CREATE_PAGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CREATE_PAGE_FAIL,
            payload: error.response.data,
        })

    }
}

export const UpdatePageAction = (id, name, slug, description) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PAGE_REQUEST });

        const { data } = await axios.put(`/api/admin/page/update/${id}`, {
            name, slug, description,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UPDATE_PAGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PAGE_FAIL,
            payload: error.response.data,
        })

    }
}



export const DeletePageAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PAGE_REQUEST });

        const { data } = await axios.delete(`/api/admin/page/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: DELETE_PAGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_PAGE_FAIL,
            payload: error.response.data,
        })

    }
}



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
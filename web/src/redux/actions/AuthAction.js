import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,

    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAIL,



    CLEAR_ERRORS,
} from '../constants/AuthConstant'

export const LoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const { data } = await axios.post("/api/admin/login", {
            email, password,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data

        })
    }
}




export const AuthUser = () => async (dispatch) => {
    try {

        dispatch({ type: AUTH_USER_REQUEST });

        const { data } = await axios.get(`/api/admin/profile`)
        dispatch({
            type: AUTH_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTH_USER_FAIL,
            payload: error.response.data
        })

    }
}


export const ProfileUpdateFunction = (form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const { data } = await axios.patch(`/api/admin/profile`, form);
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data
        })
    }
}


export const PasswordUpdateFunction = (current_password, new_password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const { data } = await axios.patch(`/api/admin/password/update`, {
            current_password, new_password,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data
        })
    }
}

export const AuthLogoutAction = () => async (dispatch) => {
    try {

        const { data } = await axios.get("/api/admin/logout");
        dispatch({
            type: AUTH_LOGOUT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTH_LOGOUT_FAIL,
            payload: error.response.data
        })
    }
}




export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
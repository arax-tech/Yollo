import axios from 'axios'
import { APP_URL } from '../constants/App';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    VERIFY_FAIL,

    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,

    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    UPDATE_ACCOUNT_REQUEST,
    UPDATE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_FAIL,

    UPDATE_NOTIFICATION_SETTING_REQUEST,
    UPDATE_NOTIFICATION_SETTING_SUCCESS,
    UPDATE_NOTIFICATION_SETTING_FAIL,


    CLEAR_ERRORS,
} from "../constants/AuthConstant";


export const LoginAction = (phone, email, type) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await axios.post(`${APP_URL}/auth/login`, {
            phone, email, type,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data,
        })

    }
}



export const VerificationAction = (otp, email, phone, type) => async (dispatch) => {
    try {
        dispatch({ type: VERIFY_REQUEST });

        const { data } = await axios.post(`${APP_URL}/auth/verify`, {
            otp, email, phone, type,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: VERIFY_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: VERIFY_FAIL,
            payload: error.response.data,
        })

    }
}


export const AuthUserAction = () => async (dispatch) => {
    try {
        dispatch({ type: AUTH_USER_REQUEST });

        const { data } = await axios.get(`${APP_URL}/user/profile`);
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



export const AuthLogoutAction = () => async (dispatch) => {
    try {

        const { data } = await axios.get(`${APP_URL}/auth/logout`);
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

export const ProfileUpdateAction = (first_name, last_name, username, email, phone, gender, birthday, country, city, bio, new_user) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/profile`, {
            first_name, last_name, username, email, phone, gender, birthday, country, city, bio, new_user,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data,
        })

    }
}



export const AccountUpdateAction = (email, recovery_email, phone, profile_visibility) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ACCOUNT_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/account/update`, {
            email, recovery_email, phone, profile_visibility,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UPDATE_ACCOUNT_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: UPDATE_ACCOUNT_FAIL,
            payload: error.response.data,
        })

    }
}


export const NotificationSettingUpdateAction = (notification_settings) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_NOTIFICATION_SETTING_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/account/update/notification/settings`, {
            notification_settings,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UPDATE_NOTIFICATION_SETTING_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: UPDATE_NOTIFICATION_SETTING_FAIL,
            payload: error.response.data,
        })

    }
}



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
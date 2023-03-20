import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_RESET,

    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,


    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,


    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAIL,

    CLEAR_ERRORS,
} from '../constants/AuthConstant'


export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case AUTH_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                message: action.payload.message,
                status: action.payload.status,
                user: action.payload.user,
                isLoggedIn: true
            };


        case AUTH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
            };

        case AUTH_LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                message: action.payload.message,
                status: action.payload.status,
                user: null,
            };



        case LOGIN_FAIL:
        case AUTH_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };
        case AUTH_LOGOUT_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                errors: action.payload,
            };
        case LOGIN_RESET:
            return {
                isLoggedIn: false
            };



        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null

            }

        default:
            return state;
    }
}

export const updateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isUpdated: true,
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                status: null
            };

        default:
            return state;
    }
}




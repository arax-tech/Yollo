import {
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_FAIL,
    USERS_RESET,



    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,


    CLEAR_ERRORS,

} from "../constants/UserConstant";





export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case USERS_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };




        case USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users,
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
            };




        case USERS_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };




        case USERS_RESET:
        case DELETE_USER_RESET:
            return {
                ...state,
                errors: null,
                status: null,
                message: null
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





import {
    SUPPORTS_REQUEST,
    SUPPORTS_SUCCESS,
    SUPPORTS_FAIL,
    SUPPORTS_RESET,

    DELETE_SUPPORT_REQUEST,
    DELETE_SUPPORT_SUCCESS,
    DELETE_SUPPORT_FAIL,
    DELETE_SUPPORT_RESET,


    CLEAR_ERRORS,

} from "../constants/SupportConstant";





export const supportReducer = (state = {}, action) => {
    switch (action.type) {
        case SUPPORTS_REQUEST:
        case DELETE_SUPPORT_REQUEST:
            return {
                ...state,
                loading: true,
            };




        case SUPPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                supports: action.payload.supports,
            };
        case DELETE_SUPPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                IsDeleted: true,
                message: action.payload.message,
            };




        case SUPPORTS_FAIL:
        case DELETE_SUPPORT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };




        case SUPPORTS_RESET:
        case DELETE_SUPPORT_RESET:
            return {
                ...state,
                errors: null,
                status: null,
                message: null,
                IsDeleted: false,
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





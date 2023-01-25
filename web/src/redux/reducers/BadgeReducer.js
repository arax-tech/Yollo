import {
    BADGES_REQUEST,
    BADGES_SUCCESS,
    BADGES_FAIL,
    BADGES_RESET,


    CREATE_BADGE_REQUEST,
    CREATE_BADGE_SUCCESS,
    CREATE_BADGE_FAIL,
    CREATE_BADGE_RESET,


    DELETE_BADGE_REQUEST,
    DELETE_BADGE_SUCCESS,
    DELETE_BADGE_FAIL,
    DELETE_BADGE_RESET,


    CLEAR_ERRORS,

} from "../constants/BadgeConstant";





export const badgeReducer = (state = {}, action) => {
    switch (action.type) {
        case BADGES_REQUEST:
        case CREATE_BADGE_REQUEST:
        case DELETE_BADGE_REQUEST:
            return {
                ...state,
                loading: true,
            };




        case BADGES_SUCCESS:
            return {
                ...state,
                loading: false,
                badges: action.payload.badges,
            };

        case CREATE_BADGE_SUCCESS:
        case DELETE_BADGE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
            };




        case BADGES_FAIL:
        case CREATE_BADGE_FAIL:
        case DELETE_BADGE_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };




        case BADGES_RESET:
        case CREATE_BADGE_RESET:
        case DELETE_BADGE_RESET:
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





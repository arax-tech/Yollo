import {
    SUGGESSION_FAIL,
    SUGGESSION_REQUEST,
    SUGGESSION_RESET,
    SUGGESSION_SUCCESS,

    FOLLOW_FAIL,
    FOLLOW_REQUEST,
    FOLLOW_RESET,
    FOLLOW_SUCCESS,

    UNFOLLOW_FAIL,
    UNFOLLOW_REQUEST,
    UNFOLLOW_RESET,
    UNFOLLOW_SUCCESS,

    CLEAR_ERRORS,

} from "../constants/YelloConstant";





export const yelloReducer = (state = {}, action) => {
    switch (action.type) {
        case SUGGESSION_REQUEST:
        case FOLLOW_REQUEST:
        case UNFOLLOW_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case SUGGESSION_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                users: action.payload.users
            };

        case FOLLOW_SUCCESS:
        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
            };
        case SUGGESSION_FAIL:
        case FOLLOW_FAIL:
        case UNFOLLOW_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };
        case SUGGESSION_RESET:
        case FOLLOW_RESET:
        case UNFOLLOW_RESET:
            return {
                ...state,
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

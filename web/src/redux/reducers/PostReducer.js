import {
    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAIL,
    POSTS_RESET,

    SINGLE_POST_REQUEST,
    SINGLE_POST_SUCCESS,
    SINGLE_POST_FAIL,
    SINGLE_POST_RESET,

    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
    DELETE_POST_RESET,


    CLEAR_ERRORS,

} from "../constants/PostConstant";





export const postReducer = (state = {}, action) => {
    switch (action.type) {
        case POSTS_REQUEST:
        case SINGLE_POST_REQUEST:
        case DELETE_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };




        case POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload.posts,
            };

        case SINGLE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                post: action.payload.post,
            };

        case DELETE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
            };




        case POSTS_FAIL:
        case SINGLE_POST_FAIL:
        case DELETE_POST_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };




        case POSTS_RESET:
        case SINGLE_POST_RESET:
        case DELETE_POST_RESET:
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





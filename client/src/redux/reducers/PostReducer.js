import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    CREATE_POST_RESET,

    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAIL,
    POSTS_RESET,

    VIEW_POST_REQUEST,
    VIEW_POST_SUCCESS,
    VIEW_POST_FAIL,
    VIEW_POST_RESET,

    CLEAR_ERRORS,

} from "../constants/PostConstant";





export const postReducer = (state = {}, action) => {
    switch (action.type) {
        case POSTS_REQUEST:
        case CREATE_POST_REQUEST:
        case VIEW_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };





        case CREATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isCreated: true,
            };
        case POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload.posts,
            };
        case VIEW_POST_SUCCESS:
            return {
                ...state,
                loading: false,
            };





        case CREATE_POST_FAIL:
        case VIEW_POST_FAIL:
        case POSTS_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };




        case CREATE_POST_RESET:
        case VIEW_POST_RESET:
        case POSTS_RESET:
            return {
                ...state,
                isCreated: false,
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

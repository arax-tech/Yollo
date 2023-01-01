import {
    VIEW_POST_REQUEST,
    VIEW_POST_SUCCESS,
    VIEW_POST_FAIL,
    VIEW_POST_RESET,

    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL,
    LIKE_POST_RESET,

    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAIL,
    UNLIKE_POST_RESET,

    CLEAR_ERRORS,

} from "../constants/ReactionConstant";





export const reactionReducer = (state = {}, action) => {
    switch (action.type) {
        case VIEW_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case UNLIKE_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };


        case VIEW_POST_SUCCESS:
        case LIKE_POST_SUCCESS:
        case UNLIKE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                post_id: action.payload.post_id,
                newPosts: action.payload.newPosts,
                status: action.payload.status,
                status: action.payload.status,
            };





        case VIEW_POST_FAIL:
        case LIKE_POST_FAIL:
        case UNLIKE_POST_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };




        case VIEW_POST_RESET:
        case LIKE_POST_RESET:
        case UNLIKE_POST_RESET:
            return {
                ...state,
                status: null,
                message: null,
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

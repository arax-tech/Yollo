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


    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,
    CREATE_COMMENT_RESET,

    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    DELETE_COMMENT_RESET,

    ONE_MINUT_REWARD_REQUEST,
    ONE_MINUT_REWARD_SUCCESS,
    ONE_MINUT_REWARD_FAIL,
    ONE_MINUT_REWARD_RESET,

    SHEET_OPEN,
    SHEET_CLOSE,

    CLEAR_ERRORS,

} from "../constants/ReactionConstant";





export const reactionReducer = (state = {}, action) => {
    switch (action.type) {
        case VIEW_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case UNLIKE_POST_REQUEST:
        case CREATE_COMMENT_REQUEST:
        case DELETE_COMMENT_REQUEST:

        case ONE_MINUT_REWARD_REQUEST:
            return {
                ...state,
            };


        case VIEW_POST_SUCCESS:
        case LIKE_POST_SUCCESS:
        case UNLIKE_POST_SUCCESS:
        case ONE_MINUT_REWARD_SUCCESS:

            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
            };

        case CREATE_COMMENT_SUCCESS:
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                updatedComments: action.payload.updatedComments,
            };

        case VIEW_POST_FAIL:
        case LIKE_POST_FAIL:
        case UNLIKE_POST_FAIL:
        case CREATE_COMMENT_FAIL:
        case DELETE_COMMENT_FAIL:
        case ONE_MINUT_REWARD_FAIL:
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
        case CREATE_COMMENT_RESET:
        case DELETE_COMMENT_RESET:
        case ONE_MINUT_REWARD_RESET:
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



const initialState = {
    open: false,
    post: null,
    modelType: -1
}
export const commentModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHEET_OPEN:
            return {
                ...state,
                open: action.open,
                post: action.post,
                modelType: action.modelType,
            };

        case SHEET_CLOSE:
            return {
                ...state,
                open: false,
                post: null,
                modelType: -1
            };

        default:
            return state;
    }
}
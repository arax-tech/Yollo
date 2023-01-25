import {
    PAGES_REQUEST,
    PAGES_SUCCESS,
    PAGES_FAIL,
    PAGES_RESET,

    SINGLE_PAGE_REQUEST,
    SINGLE_PAGE_SUCCESS,
    SINGLE_PAGE_FAIL,
    SINGLE_PAGE_RESET,

    CREATE_PAGE_REQUEST,
    CREATE_PAGE_SUCCESS,
    CREATE_PAGE_FAIL,
    CREATE_PAGE_RESET,

    UPDATE_PAGE_REQUEST,
    UPDATE_PAGE_SUCCESS,
    UPDATE_PAGE_FAIL,
    UPDATE_PAGE_RESET,

    DELETE_PAGE_REQUEST,
    DELETE_PAGE_SUCCESS,
    DELETE_PAGE_FAIL,
    DELETE_PAGE_RESET,


    CLEAR_ERRORS,

} from "../constants/PageConstant";





export const pageReducer = (state = {}, action) => {
    switch (action.type) {
        case PAGES_REQUEST:
        case SINGLE_PAGE_REQUEST:
        case CREATE_PAGE_REQUEST:
        case UPDATE_PAGE_REQUEST:
        case DELETE_PAGE_REQUEST:
            return {
                ...state,
                loading: true,
            };




        case PAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                pages: action.payload.pages,
            };
        case SINGLE_PAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                page: action.payload.page,
            };

        case CREATE_PAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isCreated: true,
            };

        case UPDATE_PAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isUpdated: true,
            };
        case DELETE_PAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
            };




        case PAGES_FAIL:
        case CREATE_PAGE_FAIL:
        case DELETE_PAGE_FAIL:
        case UPDATE_PAGE_FAIL:
        case SINGLE_PAGE_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };




        case PAGES_RESET:
        case CREATE_PAGE_RESET:
        case DELETE_PAGE_RESET:
        case UPDATE_PAGE_RESET:
        case SINGLE_PAGE_RESET:
            return {
                ...state,
                errors: null,
                status: null,
                message: null,
                isCreated: null,
                isUpdated: null,
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





import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AuthReducer, updateProfileReducer } from './reducers/AuthReducer';
import { postReducer } from './reducers/PostReducer';
import { commentModeReducer, reactionReducer } from './reducers/ReactionReducer';
import { supportReducer } from './reducers/SupportReducer';
import { yelloReducer } from './reducers/YelloReducer';



const reducer = combineReducers({
    auth: AuthReducer,
    updateProfile: updateProfileReducer,
    support: supportReducer,
    yello: yelloReducer,

    post: postReducer,
    reaction: reactionReducer,
    commentModel: commentModeReducer
});

let initialState = {};

const middleware = [thunk];

const Store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
);

export default Store;
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer, updateProfileReducer } from './reducers/AuthReducer';
import { postReducer } from './reducers/PostReducer';
import { userReducer } from './reducers/UserReducer';
import { badgeReducer } from './reducers/BadgeReducer';
import { pageReducer } from './reducers/PageReducer';
import { supportReducer } from './reducers/SupportReducer';



const reducer = combineReducers({

    // Auth
    auth: authReducer,
    profile: updateProfileReducer,

    // Admin
    post: postReducer,
    user: userReducer,
    badge: badgeReducer,
    page: pageReducer,
    support: supportReducer,

});

let initialState = {};

const middleware = [thunk];

const Store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
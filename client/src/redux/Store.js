import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AuthReducer, updateProfileReducer } from './reducers/AuthReducer';
import { supportReducer } from './reducers/SupportReducer';



const reducer = combineReducers({
    auth: AuthReducer,
    updateProfile: updateProfileReducer,
    support: supportReducer,
});

let initialState = {};

const middleware = [thunk];

const Store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
);

export default Store;
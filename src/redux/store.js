import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import userReducer from '../components/login-register/login-register.reducer';
import allUsersReducer from '../components/users/users.reducer';

const rootReducer = combineReducers({

    currentUser: userReducer,
    allUsers: allUsersReducer,

});

const store = createStore(
    rootReducer,
    compose(
        // applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
export default store;
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import homePageReducer from '../components/homePage/homePage.reducer';
import userReducer from '../components/login-register/user.reducer';
import allUsersReducer from '../components/users/users.reducer';
import chosenProfileReducer from '../components/chosenProfile/chosenProfile.reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({

    currentUser: userReducer,
    allUsers: allUsersReducer,
    alreadyRemoved: homePageReducer,
    chosenProfile: chosenProfileReducer,
});

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
export default store;
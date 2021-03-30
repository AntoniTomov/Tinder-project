import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reducer from '../components/login-register/login-register.reducer'
const rootReducer = combineReducers({

    currentUser: reducer,

});

const store = createStore(
    rootReducer,
    compose(
        // applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      ));
export default store;
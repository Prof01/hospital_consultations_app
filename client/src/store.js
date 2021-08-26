import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./reducers/index";


// const intialState = {};

// const middleware = [thunk];

// const store = createStore(rootReducer, intialState, compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ));


//DEPLOYMENT CODE

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(
rootReducer,
initialState,
enhancer
);

export default store;
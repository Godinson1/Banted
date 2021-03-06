import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
//import createSagaMiddleware from 'redux-saga';

const initialState = {};
//const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk];

const store = createStore(rootReducer, 
    initialState, 
    compose(
        applyMiddleware(...middleware),  
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
);

//sagaMiddleware.run(rootSaga);

export default store;
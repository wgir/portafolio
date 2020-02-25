import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import esTranslations from './locales/es.json';


const initialState = {
    intl: esTranslations
};

const middleware = [thunk];
/*
const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) );
*/
const enhancers = [];
//console.log( process.env.REACT_APP_ENVIRONMENT.trim());

const store = process.env.REACT_APP_ENVIRONMENT.trim()==='local' ? createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) )
:createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));


//const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) );
//const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));

//const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers))

export default store;
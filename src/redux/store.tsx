import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'remote-redux-devtools';
import {rootReducer} from './reducers';

// if (__DEV__ === true) {
// const store = createStore(
// 	rootReducer,
// 	composeWithDevTools({ realtime: true, port: 8000 })(applyMiddleware(thunk))
// );
// }

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export default store;

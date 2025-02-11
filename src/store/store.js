import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { rootReducer } from './root-reducer';

const middleWares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['cart']
};

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));
const persistedReducer = persistReducer(persistConfig, rootReducer, composeEnhancers);

export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);

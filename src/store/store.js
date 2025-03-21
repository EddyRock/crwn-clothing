import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));
const persistedReducer = persistReducer(persistConfig, rootReducer, composeEnhancers);

export const store = createStore(persistedReducer, undefined, composeEnhancers);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

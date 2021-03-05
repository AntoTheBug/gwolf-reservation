import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import moodCounterReducer from './moodCounterSlice';
import timerReducer from './timerSlice';
import allHelloSaga from '../sagas/HelloSagas';
import logger from 'redux-logger';


const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, logger];

export default configureStore({
    reducer: {
        moodMap: moodCounterReducer,
        timer: timerReducer
    },
    middleware: [...getDefaultMiddleware({thunk: false}), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
});


sagaMiddleware.run(allHelloSaga);

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import moodCounterReducer from './moodCounterSlice';
import timerReducer from './timerSlice';
import fireSliceReducer from './fireSlice';
import allHelloSaga from 'sagas/HelloSagas';
import fierySaga from 'sagas/FirebaseSagas';
import logger from 'redux-logger';


const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, logger];

const store = configureStore({
    reducer: {
        moodMap: moodCounterReducer,
        timer: timerReducer,
        fire: fireSliceReducer
    },
    middleware: [...getDefaultMiddleware({thunk: false}), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
});
export default store;


sagaMiddleware.run(allHelloSaga);
sagaMiddleware.run(fierySaga);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import  moodCounterReducer  from './moodCounterSlice';

export default configureStore({
    reducer: {
        moodMap: moodCounterReducer,
    },
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoodCounters } from './moodCounterSlice';

interface History  { [day: string]: MoodCounters }

interface FireSlice {
    today: OneMood[],
    history: History
}

const initialState: FireSlice = {
    today: [],
    history: {}
}

export const fireSlice = createSlice({
    name: 'fire',
    initialState,
    reducers: {
        initializeDetail: (state, action: PayloadAction<OneMood[]>) => {
            state.today = action.payload
        },
        initializeHistory: (state, action: PayloadAction<History>) => {
            state.history = action.payload
        },
        read: (state) => {},
        write: (state) => {},
    },
});

export const {initializeDetail, initializeHistory, read, write} = fireSlice.actions;

// @ts-ignore
export const selectFirebase = state => state.fire;
// @ts-ignore
export const selectHistory = state => selectFirebase(state).history

export default fireSlice.reducer;

export interface OneMood {
    day: string,
    mood: string,
    user: string
}

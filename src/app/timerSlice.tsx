import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        timer: 0
    },
    reducers: {
        prepare: (state, action: PayloadAction<number>) => {
            state.timer = action.payload
        },
        countup: (state) => {
            state.timer += 1;
        }
    },
});

export const {prepare, countup} = timerSlice.actions;

// @ts-ignore
export const selectTimer = state => state.timer;

export default timerSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// @ts-ignore
export const fireSlice = createSlice({
    name: 'fire',
    initialState: {
        today: [{}].slice(0, 0)
    },
    reducers: {
        initializeDetail: (state, action: PayloadAction<OneMood[]>) => {
            state.today = action.payload
        },
        read: (state) => {},
        write: (state) => {}
    },
});

export const { initializeDetail, read, write } = fireSlice.actions;

// @ts-ignore
export const selectFirebase = state => state.firebase;

export default fireSlice.reducer;

export interface OneMood {
    day: string,
    mood: string,
    user: string
}

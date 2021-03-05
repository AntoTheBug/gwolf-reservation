import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum MoodEnum {
    Happy = '😁',
    Sad = '😣',
    Angry = '🤬',
    Confused = '😵',
}

export const Moods: { [idx: string]: MoodEnum; } = MoodEnum;

export const moodCounterSlice = createSlice({
    name: 'moodCounter',
    initialState: {
        moodMap: {
            [MoodEnum.Happy]: 0,
            [MoodEnum.Sad]: 0,
            [MoodEnum.Angry]: 0,
            [MoodEnum.Confused]: 0,
        }
    },
    reducers: {
        increment: (state, action: PayloadAction<MoodEnum>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.moodMap[action.payload] += 1;
        },
        decrement: (state, action: PayloadAction<MoodEnum>) => {
            state.moodMap[action.payload] -= 1;
        },
        clear: state => {
            // @ts-ignore
            Object.keys(state.moodMap).forEach(k => state.moodMap[k] = 0)
        },
    },
});

export const {increment, decrement, clear} = moodCounterSlice.actions;

/*
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount));
    }, 1000);
};
*/

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// @ts-ignore
export const selectMoodMap = state => state.moodMap;

export default moodCounterSlice.reducer;

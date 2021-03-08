import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum MoodEnum {
    Happy = '😁',
    Sad = '😭',
    Angry = '🤬',
    Confused = '😵',
    Super = '🤩',
    Beer = '🍻'
}

interface MoodCounters {
    [idx: string]: number
}

export const Moods: { [idx: string]: MoodEnum; } = MoodEnum;

const initialMoodMap: MoodCounters = {
    [MoodEnum.Happy]: 0,
    [MoodEnum.Sad]: 0,
    [MoodEnum.Angry]: 0,
    [MoodEnum.Confused]: 0,
    [MoodEnum.Super]: 0,
    [MoodEnum.Beer]: 0,
};

export const moodCounterSlice = createSlice({
    name: 'moodCounter',
    initialState: {
        moodMap: initialMoodMap
    },
    reducers: {
        initialize: (state, action: PayloadAction<MoodCounters>) => {
            state.moodMap = {...initialMoodMap, ...action.payload}
        },
        increment: (state, action: PayloadAction<{mood:MoodEnum,user:string}>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            const {mood} = action.payload;
            state.moodMap[mood] = +1 + (state.moodMap[mood] || 0);
        },
        decrement: (state, action: PayloadAction<MoodEnum>) => {
            state.moodMap[action.payload] = -1 + (state.moodMap[action.payload] || 0);
        },
        clear: state => {
            // @ts-ignore
            Object.keys(state.moodMap).forEach(k => state.moodMap[k] = 0)
        },
    },
});

export const {increment, decrement, clear, initialize} = moodCounterSlice.actions;

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

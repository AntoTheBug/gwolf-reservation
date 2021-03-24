import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export enum MoodEnum {
    Sad = '😭',
    Confused = '😵',
    Angry = '🤬',
    Happy = '😁',
    Super = '🤩',
    Beer = '🍻'
}

export interface MoodCounters {
    [idx: string]: number
}

export const Moods: { [idx: string]: MoodEnum; } = MoodEnum;

export const moodColors = {
    [MoodEnum.Beer]: 'hsla(48,100%,50%,0.9)',
    [MoodEnum.Super]: 'hsla(303,100%,50%,0.9)',
    [MoodEnum.Happy]: 'hsla(122,100%,50%,0.9)',
    [MoodEnum.Angry]: 'hsla(355,60%,50%,0.5)',
    [MoodEnum.Confused]: 'hsla(0,0%,50%,0.5)',
    [MoodEnum.Sad]: 'hsla(209,59%,50%,0.5)',
}

const initialMoodMap: MoodCounters = {
    [MoodEnum.Sad]: 0,
    [MoodEnum.Confused]: 0,
    [MoodEnum.Angry]: 0,
    [MoodEnum.Happy]: 0,
    [MoodEnum.Super]: 0,
    [MoodEnum.Beer]: 0,
};

export const moodCounterSlice = createSlice({
    name: 'moodCounter',
    initialState: initialMoodMap,
    reducers: {
        initialize: (state, action: PayloadAction<MoodCounters>) => {
            Object.assign(state, initialMoodMap, action.payload);
        },
        increment: (state, {payload: {mood}}: PayloadAction<{ mood: MoodEnum, user: string }>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state[mood] = +1 + (state[mood] || 0);
        },
        decrement: (state, {payload: {mood}}: PayloadAction<{ mood: MoodEnum }>) => {
            state[mood] = -1 + (state[mood] || 0);
        },
        clear: state => {
            Object.keys(state).forEach(k => state[k] = 0)
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

export const selectMoodMap = (state: RootState) => state.moodMap;

export default moodCounterSlice.reducer;


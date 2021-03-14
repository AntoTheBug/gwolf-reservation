import { all, put, takeEvery } from 'redux-saga/effects'
import { initializeDetail, OneMood, read } from '../app/fireSlice';
import { increment, initialize, MoodEnum } from '../app/moodCounterSlice';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { PayloadAction } from '@reduxjs/toolkit';

const firebaseConfig = {
    apiKey: 'AIzaSyBXNpTOw1rI6Qnx__T5fFVJHIOzU4mesIo',
    authDomain: 'yoga-mood.firebaseapp.com',
    projectId: 'yoga-mood',
    storageBucket: 'yoga-mood.appspot.com',
    messagingSenderId: '700826247687',
    appId: '1:700826247687:web:0c61728ab4d6698916c0a2'
};

const today = () => new Date().toLocaleDateString('IT-it')

const db = () => firebase.firestore();

function* fireUpSaga(): Generator<any, void, any> {
    // Initialize firebase instance
    yield firebase.initializeApp(firebaseConfig)

    // Initialize other services on firebase instance
    yield firebase.firestore() // <- needed if using firestore
    // firebase.functions() // <- needed if using httpsCallable

    yield put(read())
}

function* workFireReadAsync(): Generator<any, void, any> {
    try {
        const queryResult = yield db().collection('moods').where('day', '==', today()).get()

        const todayMoods: OneMood[] = []

        // @ts-ignore
        queryResult.forEach(doc => todayMoods.push(doc.data()))

        const initMap: { [idx: string]: number } = {}
        for (const m of todayMoods) {
            initMap[m.mood] = (initMap[m.mood] || 0) + 1
        }

        yield put(initialize(initMap))
        yield put(initializeDetail(todayMoods))
    } catch (err) {
        console.log('Error in saga!:', err)
    }
}

function* workFireWriteAsync(action: PayloadAction<{ mood: MoodEnum, user: string }>): Generator<any, void, any> {
    try {
        const {mood, user} = action.payload

        const current = yield db().collection('moods')
            .where('day', '==', today())
            .where('user', '==', user)
            .get();

        const toDelete: firebase.firestore.DocumentReference[] = []
        // @ts-ignore
        current.forEach(d => toDelete.push(d.ref))
        for (const doc of toDelete) {
            yield doc.delete()
        }

        const added = yield db().collection('moods').add({
            day: today(),
            mood,
            user
        })
        console.log('ADDED!! ', added);

        yield put(read())
    } catch (err) {
        console.log('Error in saga!:', err)
    }
}

function* watchFireReadAsync() {
    yield takeEvery(read.type, workFireReadAsync)
}

function* watchFireWriteAsync() {
    yield takeEvery(increment.type, workFireWriteAsync)
}

export default function* rootSaga() {
    yield all([
        fireUpSaga(),
        watchFireReadAsync(),
        watchFireWriteAsync(),
    ])
}

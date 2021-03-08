import { all, put, takeEvery } from 'redux-saga/effects'
import { initialized, OneMood, read, write } from '../app/fireSlice';
import { increment, MoodEnum, Moods } from '../app/moodCounterSlice';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

type OneDoc = Promise<firebase.firestore.DocumentReference>;

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

        for (const m of todayMoods) {
            yield put(increment(m.mood as MoodEnum))
        }

        yield put(initialized(todayMoods))
    } catch (err) {
        console.log('Error in saga!:', err)
    }
}
//FIXME DAMIANO correggi questo
function* workFireWriteAsync(): Generator<OneDoc, void, any> {
    try {
        const db = firebase.firestore();

        const added = yield db.collection('moods').add({
            day: today(),
            mood: Object.values(Moods)[Math.floor(Math.random() * 4)],
            user: ['Tim', 'Tom', 'Jim'][Math.floor(Math.random() * 3)]
        })
        console.log('ADDED!! ', added);
    } catch (err) {
        console.log('Error in saga!:', err)
    }
}

function* watchFireReadAsync() {
    yield takeEvery(read.type, workFireReadAsync)
}

function* watchFireWriteAsync() {
    yield takeEvery(write.type, workFireWriteAsync)
}

export default function* rootSaga() {
    yield all([
        fireUpSaga(),
        watchFireReadAsync(),
        watchFireWriteAsync(),
    ])
}

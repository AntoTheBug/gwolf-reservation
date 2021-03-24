import { all, put, select, takeLatest } from 'redux-saga/effects'
import { countup, prepare, selectTimer } from 'app/timerSlice';

function* helloSaga() {
    console.log('Hello Sagas! - This runs just once.')
    yield '👍'
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

// Our worker Saga: will perform the async task
function* workExampleAsync() {
    while (true) {
        yield delay(1000)
        // @ts-ignore
        const {timer} = yield select(selectTimer)

        if (timer >= 60)
            break;
        yield put(countup())
    }
}

// Our watcher Saga: spawn a new task on each matching action
function* watchExampleAsync() {
    yield takeLatest(prepare.type, workExampleAsync)
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchExampleAsync()
    ])
}

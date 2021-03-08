import { all, put, select, takeEvery } from 'redux-saga/effects'
import { countup, prepare, selectTimer } from '../app/timerSlice';

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

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchExampleAsync() {
    // FIXME with multiple calls, we will start multiple workers
    yield takeEvery(prepare.type, workExampleAsync)
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchExampleAsync()
    ])
}

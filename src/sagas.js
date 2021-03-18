import { takeLatest, fork, call, put } from 'redux-saga/effects';
import axios from 'axios';


function* likeBanter(action) {
    try {
        const res = yield call(axios.get, `/banters/${action.payload}/like`);
        console.log(res.data);
        yield put({
            type: 'LIKED_BANTER',
            payload: res.data
        })
    } catch(e) {
          console.log('something went wrong..');
          console.log(e.response);
    }
}

function* unlikeBanter(action) {
    try {
        const res = yield call(axios.get, `/banters/${action.payload}/unlike`);
        console.log(res.data);
        yield put({
            type: 'UNLIKED_BANTER',
            payload: res.data
        })
    } catch(e) {
          console.log('something went wrong..');
          console.log(e.response);
    }
}

function* watchLikeAction() {
    yield takeLatest( 'LIKE_BANTER' , likeBanter );
}

function* watchUnLikeAction() {
    yield takeLatest( 'UNLIKE_BANTER' , unlikeBanter );
}

export default function* rootSaga() {
    yield fork(watchLikeAction);
    yield fork(watchUnLikeAction);
}
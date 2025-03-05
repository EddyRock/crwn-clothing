import { takeLatest, put, all, call } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.types';
import { signInSuccess, signInFailed, toggleSignUpLoading } from './user.action';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup)
    yield call(getSnapshotFromUseAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUseAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUpWithEmail({ payload: { password = '', confirmPassword = '', email = '', displayName = '' } }) {
  if (!Boolean(password === confirmPassword)) {
    alert('Wrong password or Confirm password');
    return;
  }
  yield put(toggleSignUpLoading())
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUseAuth, user, { displayName });
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Can not create email. Email already in user.');
    }
    console.error(error);
  } finally {
    yield put(toggleSignUpLoading())
  }
}

export function* getSnapshotFromUseAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
    yield put(signInSuccess({  id: userSnapshot.id, ...userSnapshot.data }))
  } catch(error) {
    yield put(signInFailed(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN, signInWithGoogle);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;

    yield call(getSnapshotFromUseAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,  isUserAuthenticated)
} {}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN, signInWithEmail);
}

export function* onEmailSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP, signUpWithEmail);
}

export function* userSaga() {
  yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onEmailSignUpStart)])
}
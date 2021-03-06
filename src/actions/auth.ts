import { firebaseApp } from '../firebase/firebase';

export interface ReduxAction {
  type: string;
  [key: string]: any;
}

export interface AppState {
  isLoggingIn?: boolean;
  isLoggingOut?: boolean;
  isVerifying?: boolean;
  loginError?: boolean;
  logoutError?: boolean;
  isAuthenticated?: boolean;
}

export interface AppProps extends AppState {
  auth?: AppState;
  dispatch?: Function;
  [key: string]: any;
}

export interface LoginState {
  email: string;
  password: string;
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';

const requestLogin = (): ReduxAction => {
  return { type: LOGIN_REQUEST };
};
const receiveLogin = (user: any): ReduxAction => {
  return { type: LOGIN_SUCCESS, user };
};
const loginError = (e: any): ReduxAction => {
  return { type: LOGIN_FAILURE, e };
};

const requestLogout = (): ReduxAction => {
  return { type: LOGOUT_REQUEST };
};
const receiveLogout = (): ReduxAction => {
  return { type: LOGOUT_SUCCESS };
};
const logoutError = (e: any): ReduxAction => {
  return { type: LOGOUT_FAILURE, e };
};

export const verifyRequest = (): ReduxAction => {
  return {
    type: VERIFY_REQUEST
  };
};
const verifySuccess = (): ReduxAction => {
  return {
    type: VERIFY_SUCCESS
  };
};

export const loginUser = (email: string, password: string) => (
  dispatch: Function
) => {
  dispatch(requestLogin());
  firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => dispatch(receiveLogin(user)))
    .catch(e => dispatch(loginError(e)));
};

export const logoutUser = () => (dispatch: Function) => {
  dispatch(requestLogout());
  firebaseApp
    .auth()
    .signOut()
    .then(() => setTimeout(() => dispatch(receiveLogout()), 1000))
    .catch(e => dispatch(logoutError(e)));
};

export const verifyAuth = () => (dispatch: Function) => {
  dispatch(verifyRequest());
  firebaseApp.auth().onAuthStateChanged(user => {
    if (user) dispatch(receiveLogin(user));
    dispatch(verifySuccess());
  });
  return verifyRequest();
};

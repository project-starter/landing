import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAE0cNGa96KNhHzbd4QAn3Lr_Dc61fgBzk',
  authDomain: 'landing-a9903.firebaseapp.com',
  databaseURL: 'https://landing-a9903.firebaseio.com',
  projectId: 'landing-a9903',
  storageBucket: 'landing-a9903.appspot.com',
  messagingSenderId: '131718079573',
  appId: '1:131718079573:web:88568ddcfba291c1e360dc',
  measurementId: 'G-2CTMG5MWVV'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const baseDb = firebaseApp.firestore();
export const db = baseDb;

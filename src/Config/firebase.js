// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const REACT_APP_FIREBASE_APIKEY='AIzaSyCbNIhf_wgx0lHxRXAh6CyKheg9gNBeeC4'
const REACT_APP_FIREBASE_AUTHDOMAIN='kinodb-1cc81.firebaseapp.com'
const REACT_APP_FIREBASE_DATABASEURL='https://kinodb-1cc81-default-rtdb.firebaseio.com'
const REACT_APP_FIREBASE_PROJECTID='kinodb-1cc81'
const REACT_APP_FIREBASE_STORAGEBUCKET='kinodb-1cc81.appspot.com'
const REACT_APP_FIREBASE_MESSAGINGSENDERID='998785139151'
const REACT_APP_FIREBASE_APPID='1:998785139151:web:06b87edaf0d5f4bbc2d2ba'
const REACT_APP_FIREBASE_MEASUREMENTID='G-S70HZQGWKV'

// Your web app's Firebase configuration
/**  apiKey: "AIzaSyCbNIhf_wgx0lHxRXAh6CyKheg9gNBeeC4",
  authDomain: "kinodb-1cc81.firebaseapp.com",
  databaseURL: "https://kinodb-1cc81-default-rtdb.firebaseio.com",
  projectId: "kinodb-1cc81",
  storageBucket: "kinodb-1cc81.appspot.com",
  messagingSenderId: "998785139151",
  appId: "1:998785139151:web:06b87edaf0d5f4bbc2d2ba",
  measurementId: "G-S70HZQGWKV" */
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APIKEY,
  authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASEURL,
  projectId: REACT_APP_FIREBASE_PROJECTID,
  storageBucket: REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: REACT_APP_FIREBASE_APPID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export const storage = getStorage(app)

export default db;


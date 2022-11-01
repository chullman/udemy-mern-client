// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPzTRdcqxxgp0W2DW3m6E1f00ncHtG-qg",
  authDomain: "udemy-booking-app.firebaseapp.com",
  projectId: "udemy-booking-app",
  storageBucket: "udemy-booking-app.appspot.com",
  messagingSenderId: "49424165569",
  appId: "1:49424165569:web:f900229f0c7d0adb340240",
};

// Initialize Firebase
let firebaseApp;
let firebaseAuth;
if (!getApps.length) {
  firebaseApp = initializeApp(firebaseConfig);
  firebaseAuth = getAuth(firebaseApp);
}

export {
  firebaseAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
};

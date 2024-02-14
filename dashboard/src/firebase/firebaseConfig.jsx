// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBvzR1O-WTaWc9E92An7DnEChUcGGIAxpE",
  authDomain: "skillety-7fe26.firebaseapp.com",
  projectId: "skillety-7fe26",
  storageBucket: "skillety-7fe26.appspot.com",
  messagingSenderId: "946590455985",
  appId: "1:946590455985:web:639c456c175098d16d6a90",
  measurementId: "G-4WS824VP7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
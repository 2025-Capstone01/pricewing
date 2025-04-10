// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firbase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoNn8AdZGA70uTkMEfraT82shYSg3ijQ0",
    authDomain: "pricetracker-login-cf250.firebaseapp.com",
    projectId: "pricetracker-login-cf250",
    storageBucket: "pricetracker-login-cf250.firebasestorage.app",
    messagingSenderId: "828852376062",
    appId: "1:828852376062:web:6e8fc90c65b1db6c5870af",
    measurementId: "G-R6CDT0D857"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provide = new GoogleAuthProvider();
//const analytics = getAnalytics(app);
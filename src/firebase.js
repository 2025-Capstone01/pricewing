// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBoNn8AdZGA70uTkMEfraT82shYSg3ijQ0",
    authDomain: "pricetracker-login-cf250.firebaseapp.com",
    projectId: "pricetracker-login-cf250",
    storageBucket: "pricetracker-login-cf250.appspot.com",
    messagingSenderId: "828852376062",
    appId: "1:828852376062:web:6e8fc90c65b1db6c5870af",
    measurementId: "G-R6CDT0D857"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

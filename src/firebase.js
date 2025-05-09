// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
<<<<<<< HEAD
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVwzGzZpxecGxrsuhp7K6FZkTqZ90I5X8",
    authDomain: "pricewing-5822c.firebaseapp.com",
    projectId: "pricewing-5822c",
    storageBucket: "pricewing-5822c.firebasestorage.app",
    messagingSenderId: "59638899351",
    appId: "1:59638899351:web:c078908ca4803fb41d3fd2",
    measurementId: "G-3K241Y40ZN"
=======

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBoNn8AdZGA70uTkMEfraT82shYSg3ijQ0",
    authDomain: "pricetracker-login-cf250.firebaseapp.com",
    projectId: "pricetracker-login-cf250",
    storageBucket: "pricetracker-login-cf250.appspot.com",
    messagingSenderId: "828852376062",
    appId: "1:828852376062:web:6e8fc90c65b1db6c5870af",
    measurementId: "G-R6CDT0D857"
>>>>>>> 4f9c277796341e61d5583a2e1013c50e27746a5d
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
<<<<<<< HEAD

const provider = new GoogleAuthProvider();

export { auth, provider };

=======
const provider = new GoogleAuthProvider();

export { auth, provider };
>>>>>>> 4f9c277796341e61d5583a2e1013c50e27746a5d

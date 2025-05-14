// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };

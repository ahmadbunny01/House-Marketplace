import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase-firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAPnUgCw_KyqpqWWietwIR7izEDg-v4ZZg",
    authDomain: "house-marketplace-c6bcc.firebaseapp.com",
    projectId: "house-marketplace-c6bcc",
    storageBucket: "house-marketplace-c6bcc.appspot.com",
    messagingSenderId: "771064101912",
    appId: "1:771064101912:web:90ca2dcc76601c6444176d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0Ii9rW0R9MluZ5YdMlge3HBy9JXRrqjs",
  authDomain: "delivery-app-8fe25.firebaseapp.com",
  projectId: "delivery-app-8fe25",
  storageBucket: "delivery-app-8fe25.appspot.com",
  messagingSenderId: "554701058495",
  appId: "1:554701058495:web:1224cf8f25b5ea247cf10a",
  measurementId: "G-J0NC2C6DC6"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)
const analytics = getAnalytics(firebaseApp);

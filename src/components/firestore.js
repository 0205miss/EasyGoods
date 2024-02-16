// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRESTORE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIRESTORE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRESTORE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIRESTORE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRESTORE_SENDERID,
  appId: process.env.NEXT_PUBLIC_FIRESTORE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIRESTORE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth_firebase = getAuth(app);

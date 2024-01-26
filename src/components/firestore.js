// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnXisFrVmqgfxBLlLlwKIFLw4yoXm6NPc",
  authDomain: "easygoods-823a0.firebaseapp.com",
  projectId: "easygoods-823a0",
  storageBucket: "easygoods-823a0.appspot.com",
  messagingSenderId: "877767861878",
  appId: "1:877767861878:web:5278c713cd7afa30c1e157",
  measurementId: "G-9FKF2J6JWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
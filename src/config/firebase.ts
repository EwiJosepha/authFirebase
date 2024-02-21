// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTHq41OhjP6Ttl46tlWLG6xvQTcs-1cZk",
  authDomain: "react-project-dae47.firebaseapp.com",
  projectId: "react-project-dae47",
  storageBucket: "react-project-dae47.appspot.com",
  messagingSenderId: "691580334049",
  appId: "1:691580334049:web:578b4da8dbd5ea8048eca0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
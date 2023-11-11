// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbxiIWZGNZCP9z58dCJmjuoT2RtRJnzeg",
  authDomain: "mynetflixgpt-f4872.firebaseapp.com",
  projectId: "mynetflixgpt-f4872",
  storageBucket: "mynetflixgpt-f4872.appspot.com",
  messagingSenderId: "866100277003",
  appId: "1:866100277003:web:2cc71448dd9781e2b63c0e",
  measurementId: "G-K9PJ6X44PY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
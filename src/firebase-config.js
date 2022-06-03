
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAawMnC6vfUa40ZNFsLN-ov7Pa4DjcUrM",
  authDomain: "dotdelivery-fbd89.firebaseapp.com",
  databaseURL: "https://dotdelivery-fbd89-default-rtdb.firebaseio.com",
  projectId: "dotdelivery-fbd89",
  storageBucket: "dotdelivery-fbd89.appspot.com",
  messagingSenderId: "612704185157",
  appId: "1:612704185157:web:11398ea2f7c7e27b532c2c",
  measurementId: "G-70L8BS287Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
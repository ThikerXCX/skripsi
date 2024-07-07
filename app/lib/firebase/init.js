// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwWj7EQH5tEjOK3S-uIMC_Yb3XsEZlFvk",
  authDomain: "ec-com-6a476.firebaseapp.com",
  databaseURL: "https://ec-com-6a476-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ec-com-6a476",
  storageBucket: "ec-com-6a476.appspot.com",
  messagingSenderId: "252170464504",
  appId: "1:252170464504:web:7b56b4e47549f2b02f1f0d",
  measurementId: "G-WGFZWW842E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app,storage}

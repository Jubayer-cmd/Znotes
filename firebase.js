// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgAM6dyl15okXBK0WTx_XaPfJcufurqW8",
  authDomain: "znotes-1d0d4.firebaseapp.com",
  projectId: "znotes-1d0d4",
  storageBucket: "znotes-1d0d4.appspot.com",
  messagingSenderId: "217160099964",
  appId: "1:217160099964:web:2dbd46abcb5d25136081f9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };

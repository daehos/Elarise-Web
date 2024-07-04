import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSW3satPV_KLhJp8tl4ZIVq4kUZ1h940o",
  authDomain: "elarise-1d057.firebaseapp.com",
  projectId: "elarise-1d057",
  storageBucket: "elarise-1d057.appspot.com",
  messagingSenderId: "183294169354",
  appId: "1:183294169354:web:0a5e4c0a9fcc46014faaf3",
  measurementId: "G-7245KNEC8E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

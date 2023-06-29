// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-bsfUsGxqq1zGY6o-hEOJhS6iwG6ipiE",
  authDomain: "filmy-verse-1b53a.firebaseapp.com",
  projectId: "filmy-verse-1b53a",
  storageBucket: "filmy-verse-1b53a.appspot.com",
  messagingSenderId: "980818012091",
  appId: "1:980818012091:web:65a38929cfc4c0f81b869e",
};

// Initialize Firebase\
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const movieRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");
export default app;

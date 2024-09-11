import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your Firebase configuration (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDr3V-5H5nGkon7hL0nL49U8bnvo5NbeIE",
  authDomain: "fbsk-be39a.firebaseapp.com",
  projectId: "fbsk-be39a",
  storageBucket: "fbsk-be39a.appspot.com",
  messagingSenderId: "815280949402",
  appId: "1:815280949402:web:776cec1705348fd370b723",
  measurementId: "G-P26RM5HRWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth
const googleProvider = new GoogleAuthProvider(); // Create a Google Auth Provider instance
const db = getFirestore(app); // Initialize Firestore

export { auth, googleProvider, db }; // Export the instances


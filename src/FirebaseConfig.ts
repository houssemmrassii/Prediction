// Import Firebase services
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";      // Firestore
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";          // Storage
import { getAnalytics } from "firebase/analytics";      // Analytics

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMMnQ57P8xvCAZfI2RcduzcFxyZ7bLA2A",
  authDomain: "telecom-5a619.firebaseapp.com",
  projectId: "telecom-5a619",
  storageBucket: "telecom-5a619.appspot.com",
  messagingSenderId: "953979180500",
  appId: "1:953979180500:web:23d28b956e8ec2ac7ff241",
  measurementId: "G-06VSZSTT6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const db = getFirestore(app);        // Firestore
const auth = getAuth(app);           // Authentication
const storage = getStorage(app);     // Storage

// Now you can export the initialized services if needed
export { db, auth, storage, analytics };
export const googleProvider = new GoogleAuthProvider();


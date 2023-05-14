import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD-VqjpIS9gVh_Mrva0fErKCToYcf0VOWQ",
  authDomain: "glory-mix.firebaseapp.com",
  projectId: "glory-mix",
  storageBucket: "glory-mix.appspot.com",
  messagingSenderId: "569663025057",
  appId: "1:569663025057:web:07fb5f4ac747dcd27fa5e0",
  measurementId: "G-M1K33QKLLT"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const google = new GoogleAuthProvider();
export const db = getFirestore(app);
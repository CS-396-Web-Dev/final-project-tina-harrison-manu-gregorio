import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm8qzuuJUAe1RgSOMKQYxrR1DdrdeJ96U",
  authDomain: "my-pet-app-e2418.firebaseapp.com",
  projectId: "my-pet-app-e2418",
  storageBucket: "my-pet-app-e2418.firebasestorage.app",
  messagingSenderId: "1048436087480",
  appId: "1:1048436087480:web:11d22b9c4ea8a96987324d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
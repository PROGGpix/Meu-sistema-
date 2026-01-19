import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQyycXXcwTkG0ig0XROqxz0z_yDYLOh7E",
  authDomain: "meu-sistema-rpg.firebaseapp.com",
  projectId: "meu-sistema-rpg",
  storageBucket: "meu-sistema-rpg.firebasestorage.app",
  messagingSenderId: "551356562986",
  appId: "1:551356562986:web:fbb0138d57f71580290d53",
  measurementId: "G-X9LJRM45ZK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
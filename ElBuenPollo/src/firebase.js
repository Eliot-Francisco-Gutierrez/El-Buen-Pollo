import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAbWsen0JaL1C6V1TEdaYp9D0zfPu34BPY",
  authDomain: "elbuenpollorio4.firebaseapp.com",
  projectId: "elbuenpollorio4",
  storageBucket: "elbuenpollorio4.firebasestorage.app",
  messagingSenderId: "301257378740",
  appId: "1:301257378740:web:b68ad0b7853b1a525d40e1"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
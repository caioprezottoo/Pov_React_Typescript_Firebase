// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANuRFP7MTp_3i1I8UJMLanFLFKmixDgAw",
    authDomain: "point-of-view-f0117.firebaseapp.com",
    projectId: "point-of-view-f0117",
    storageBucket: "point-of-view-f0117.firebasestorage.app",
    messagingSenderId: "796523963207",
    appId: "1:796523963207:web:fa2b33eb9427881deb6262"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app)
export default app
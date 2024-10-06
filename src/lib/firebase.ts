import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpA4WnhWYqwa_RopdfDMQiKt8OYDc_xv0",
  authDomain: "drivernovara.firebaseapp.com",
  projectId: "drivernovara",
  storageBucket: "drivernovara.appspot.com",
  messagingSenderId: "167387548146",
  appId: "1:167387548146:web:44bc370ff413f2d4e1036b",
  measurementId: "G-V7P8B793QZ",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firestore = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});
const app = initializeApp(firebaseConfig);

// Ініціалізація Firestore
export const db = getFirestore(app);

// Ініціалізація автентифікації (якщо потрібно)
export const authFirebase = getAuth(app);

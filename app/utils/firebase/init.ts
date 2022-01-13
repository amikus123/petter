// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3-aoh_4MMIaMcD8UmzSRQItThg8zpNm8",
  authDomain: "petter-13c07.firebaseapp.com",
  projectId: "petter-13c07",
  storageBucket: "petter-13c07.appspot.com",
  messagingSenderId: "698225927096",
  appId: "1:698225927096:web:9b1ef4cf92923ac74a254d",
  measurementId: "G-89GDPXC0J5",
};
let app = !getApps().length? initializeApp(firebaseConfig) : getApp()
 
const myDb = getFirestore()
const myAuth = getAuth()
const myStorage = getStorage()

export {myDb,myAuth,myStorage}

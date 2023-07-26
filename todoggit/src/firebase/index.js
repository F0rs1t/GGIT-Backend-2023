// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD1RVqKugmKyZ1iUmE-Zj2T6tVV9TnrS6Y',
  authDomain: 'test-ggsc.firebaseapp.com',
  projectId: 'test-ggsc',
  storageBucket: 'test-ggsc.appspot.com',
  messagingSenderId: '239008133966',
  appId: '1:239008133966:web:f4043b5b425b3bec00241f',
  measurementId: 'G-JRT9TZSMX3'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

export {
    db
}

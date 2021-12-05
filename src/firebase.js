import { initializeApp } from "firebase/app";
import apiKey from '../apiKey'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain: "mgch-calc.firebaseapp.com",
  projectId: "mgch-calc",
  storageBucket: "mgch-calc.appspot.com",
  messagingSenderId: "25810727339",
  appId: "1:25810727339:web:7f290561e8c4eeed19e2ee"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig)

export default fireApp

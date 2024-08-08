
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyl7kL2NcRxHemxT7D3fJA5hG3ova6WsI",
  authDomain: "platvent-acff9.firebaseapp.com",
  projectId: "platvent-acff9",
  storageBucket: "platvent-acff9.appspot.com",
  messagingSenderId: "717105434586",
  appId: "1:717105434586:web:6eb022bd0baad8ab51bae3",
  measurementId: "G-WBPVBD2FCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app,analytics};
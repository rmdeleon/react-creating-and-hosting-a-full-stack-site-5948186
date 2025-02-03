import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZQhuwjgcvBVDu8ind_YNmtmp9YlmmrRQ",
  authDomain: "full-stack-react-40326.firebaseapp.com",
  projectId: "full-stack-react-40326",
  storageBucket: "full-stack-react-40326.firebasestorage.app",
  messagingSenderId: "420036025539",
  appId: "1:420036025539:web:f1185d493f2daf04209676"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

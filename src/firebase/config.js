// Import the functions you need from the SDKs you need          npm install firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";         // Firebase Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

//utilizar variables de entorno, npm install dotenv, pq voy a subir este proyecto a gitGub y las credenciales no pueden estar aqui en este archivo     firebaseConfig
// Initialize Firebase
const app = initializeApp(firebaseConfig);

let auth = getAuth(app) //llamar funcion getAuth, necesita un parametro de la app q acabo de crear
// ya estamos conectados a bd
let db = getFirestore(app) //IMPORTANTE
export {auth, db} 
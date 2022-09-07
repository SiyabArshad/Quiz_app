// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj4ffrbCtk4idIRfM07t-FGSEqZcN2Cgw",
  authDomain: "carta-de-cacador.firebaseapp.com",
  projectId: "carta-de-cacador",
  storageBucket: "carta-de-cacador.appspot.com",
  messagingSenderId: "563322354230",
  appId: "1:563322354230:web:5fcfc4dca1c6f42dbef697",
  measurementId: "G-9XLSMS0YJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app
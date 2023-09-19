// import { getFirestore, /* connectFirestoreEmulator*/ } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  }
  
//   // Initialize Firebase
//   const firebaseApp = initializeApp(firebaseConfig);
//   const db = getFirestore(firebaseApp);
// //   connectFirestoreEmulator(db, 'localhost', 8080);
//   export {db};
const firebaseApp = firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const db = firebaseApp.firestore()

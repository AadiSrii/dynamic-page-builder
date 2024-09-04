import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-5XKezjFISY0-dZr9k6WlNIXtORc4-CQ",
    authDomain: "my-first-project-b13af.firebaseapp.com",
    databaseURL: "https://my-first-project-b13af-default-rtdb.firebaseio.com",
    projectId: "my-first-project-b13af",
    storageBucket: "my-first-project-b13af.appspot.com",
    messagingSenderId: "811882618050",
    appId: "1:811882618050:web:bf65d10689c0b2fc716f5b",
    measurementId: "G-KHMNKE6TY0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAU_qDG9me2Pxi7PeK2L576lDX6WaB7MEo",
    authDomain: "nother-tracker.firebaseapp.com",
    databaseURL: "https://nother-tracker.firebaseio.com",
    projectId: "nother-tracker",
    storageBucket: "nother-tracker.appspot.com",
    messagingSenderId: "529311583440",
    appId: "1:529311583440:web:307f12f3ddcdfd8893a2d5"
 };

app.initializeApp(config);

export const database = app.database();

export const auth = app.auth();

export const googleProvider = new app.auth.GoogleAuthProvider();
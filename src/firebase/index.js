import React, {useEffect, useState} from 'react';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAU_qDG9me2Pxi7PeK2L576lDX6WaB7MEo",
    authDomain: "nother-tracker.firebaseapp.com",
    databaseURL: "https://nother-tracker.firebaseio.com",
    projectId: "nother-tracker",
    storageBucket: "nother-tracker.appspot.com",
    messagingSenderId: "529311583440",
    appId: "1:529311583440:web:307f12f3ddcdfd8893a2d5"
 };

firebase.initializeApp(config);

export const database = firebase.database();

export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
    .then(result => {
        console.log('sign in successful: ');
    })
    .catch(error => {
        console.log('error in sign in: ');
        console.log(error);
    })
}

export const signOut = () => {
    auth.signOut()
    .then(() => {
        console.log('sign out successful')
    })
    .catch((err) => {
        console.log('error is sign out: ')
        console.log(err);
    })
}


export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('auth state change use effect called');

        const listener = auth.onAuthStateChanged(authUserNew => {
            setUser(authUserNew);
        })
    
        return () => listener();
      }, []);

      return user;
}
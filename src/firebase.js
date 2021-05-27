import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "your api key",
    authDomain: "your firebase domain",
    projectId: "your project id",
    storageBucket: "your storage bucket",
    messagingSenderId: "your Id",
    appId: "your app id"
  };



  // initialize firebase app
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

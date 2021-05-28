import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCc3JiQejU9XD7g1G9sFsvm_xVaw2PsLTw",
  authDomain: "ecommerce-3337b.firebaseapp.com",
  projectId: "ecommerce-3337b",
  storageBucket: "ecommerce-3337b.appspot.com",
  messagingSenderId: "103382981245",
  appId: "1:103382981245:web:5648f2b985d46ed3b2af14",
};

// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

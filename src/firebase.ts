// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword  } from "firebase/auth";
import firebaseConfig from "./services/firebaseConfig"

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');

const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

const signInWithFacebook = () => {
  return signInWithPopup(auth, facebookProvider);
};

const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export { auth, signInWithGoogle, signInWithFacebook, signInWithEmail };

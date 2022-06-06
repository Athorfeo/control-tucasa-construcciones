import { firebaseConfig } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut as signOutFirebase } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  let pathname = window.location.pathname;
 
  if (user) {
    console.log("Fisebase user logged!");
 
    switch(pathname) {
      case  '/':
      case '/login':
        window.location.replace("./auth");
      break;

      default:
    }
  } else {
    console.log("Fisebase user is not logged!");

    switch(pathname) {
      case '/login':
      break;

      default:
        window.location.replace("./login");
    }
  }
});

export function signIn(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("SignIn success!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("SignIn failed!: [" + errorCode + "]:" + errorMessage);
    });
}

export function signOut(){
  signOutFirebase(auth)
  .then(() => {
    console.log("SignOut success!");
    
    window.location.replace("./login");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("SignOut failed!: [" + errorCode + "]:" + errorMessage);
  });
}

window.signIn = signIn;
window.signOut = signOut;
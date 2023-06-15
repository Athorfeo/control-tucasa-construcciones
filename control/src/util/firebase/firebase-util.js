import { firebaseConfig } from "./firebase-config";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
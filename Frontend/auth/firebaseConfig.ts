

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBIvTPaf76N54885xjvene531wgBW2-AAQ",
    authDomain: "crowdfunding-d093e.firebaseapp.com",
    projectId: "crowdfunding-d093e",
    storageBucket: "crowdfunding-d093e.firebasestorage.app",
    messagingSenderId: "246319464084",
    appId: "1:246319464084:web:7c928c9a0074c215d1fe81",
    measurementId: "G-86Q51BBSQD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
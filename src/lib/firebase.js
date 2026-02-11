import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCz5PI_77ltxEJruTGZyFQ57Tpwx0SlejM",
    authDomain: "antigravity-portfolio-999.firebaseapp.com",
    projectId: "antigravity-portfolio-999",
    storageBucket: "antigravity-portfolio-999.firebasestorage.app",
    messagingSenderId: "797613052833",
    appId: "1:797613052833:web:cf881ccb6dacb60b0131e0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

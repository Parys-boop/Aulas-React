import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqr3OrhG5OrSs45C-DXnWZ5S6I28Ozy5c",
  authDomain: "projeto-web-6f23b.firebaseapp.com",
  projectId: "projeto-web-6f23b",
  storageBucket: "projeto-web-6f23b.firebasestorage.app",
  messagingSenderId: "243357545884",
  appId: "1:243357545884:web:6b4e62f293c7f527e78459"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyXXXXXX",
  authDomain: "inventory-app.firebaseapp.com",
  databaseURL: "https://inventory-app-default-rtdb.firebaseio.com",
  projectId: "inventory-app",
  storageBucket: "inventory-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Realtime Database
export const db = getDatabase(app);

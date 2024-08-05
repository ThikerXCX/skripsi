import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuvFaGuqyZREwqUuR-5ejqiUVCUy3UHiU",
  authDomain: "ec-app-76b95.firebaseapp.com",
  projectId: "ec-app-76b95",
  storageBucket: "ec-app-76b95.appspot.com",
  messagingSenderId: "852402960322",
  appId: "1:852402960322:web:8460b586631cfa27b9085b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };

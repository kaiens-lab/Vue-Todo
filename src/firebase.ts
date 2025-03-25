import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCc3qCsm2jKQ14XT82ktb7PsVTkwXWOAs",
  authDomain: "vue-todo-55101.firebaseapp.com",
  projectId: "vue-todo-55101",
  storageBucket: "vue-todo-55101.firebasestorage.app",
  messagingSenderId: "600930054502",
  appId: "1:600930054502:web:fe5fd0a2d9d09cb7c658a7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

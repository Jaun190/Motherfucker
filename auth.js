import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyA1nAnkncIJMK-BNPVUNDgJ33yphCcQs2w",
  authDomain: "growempire-880f9.firebaseapp.com",
  projectId: "growempire-880f9",
  storageBucket: "growempire-880f9.appspot.com",
  messagingSenderId: "706198931644",
  appId: "1:706198931644:web:04dd773d807fabe0c868b9",
  measurementId: "G-DSH4X18TS5"
};

// Initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      document.getElementById("error-msg").textContent = "Fehler: " + error.message;
    }
  });
}

// Registrierung
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      document.getElementById("error-msg").textContent = "Passwörter stimmen nicht überein.";
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      document.getElementById("error-msg").textContent = "Fehler: " + error.message;
    }
  });
}

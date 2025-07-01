import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyAnkmrcLJMK-BNPvPLNDpJ3sypHCcQs2w",
  authDomain: "growempire-880f9.firebaseapp.com",
  projectId: "growempire-880f9",
  storageBucket: "growempire-880f9.appspot.com",
  messagingSenderId: "706139316444",
  appId: "1:706139316444:web:04dd773d807fabe0c868b9",
  measurementId: "G-D5H1AX18T5"
};

// Initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // 🔐 Login merken im LocalStorage
      const username = email.split("@")[0];
      localStorage.setItem("user", username);

      window.location.href = "dashboard.html";
    } catch (error) {
      document.getElementById("error-msg").textContent = "Fehler: " + error.message;
    }
  });
}

// ✅ REGISTRIERUNG
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

      // 🔐 Nach Registrierung sofort einloggen
      const username = email.split("@")[0];
      localStorage.setItem("user", username);

      window.location.href = "dashboard.html";
    } catch (error) {
      document.getElementById("error-msg").textContent = "Fehler: " + error.message;
    }
  });
}

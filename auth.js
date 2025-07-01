import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔧 KORREKTE Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyC7i9q4MnzBwuu2BtLii5gGt3DO-oGdlRw",
  authDomain: "ruedi-aebcb.firebaseapp.com",
  projectId: "ruedi-aebcb",
  storageBucket: "ruedi-aebcb.appspot.com", // ✅ Korrekt ersetzt!
  messagingSenderId: "784338413167",
  appId: "1:784338413167:web:13687c8f7825da1e168f9a"
};

// 🔌 Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const username = email.split("@")[0];
      localStorage.setItem("user", username);
      window.location.href = "dashboard.html";
    } catch (error) {
      document.getElementById("error-msg").textContent = "Fehler: " + error.message;
    }
  });
}

// 📝 REGISTRIERUNG
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
      const username = email.split("@")[0];
      localStorage.setItem("user", username);
      window.location.href = "dashboard.html";
    } catch (error) {
      document.getElementById("error-msg").textContent = "Fehler: " + error.message;
    }
  });
}

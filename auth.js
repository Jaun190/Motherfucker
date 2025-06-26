const SUPABASE_URL = 'https://ghfzdgaunxblpudkmxmy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZnpkZ2F1bnhibHB1ZGtteG15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDI5NTksImV4cCI6MjA2NjI3ODk1OX0.J8ni4SszaI33ljthdEjqXf8ZKFCs4uWnRZZDyU0IlUU';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert('Login fehlgeschlagen: ' + error.message);
  } else {
    window.location.href = 'dashboard.html';
  }
}

async function register() {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    alert('Registrierung fehlgeschlagen: ' + error.message);
  } else {
    alert('Erfolgreich registriert! Jetzt einloggen.');
    window.location.href = 'login.html';
  }
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}

window.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (window.location.pathname.includes('dashboard') && !session) {
    window.location.href = 'login.html';
  } else if (session && window.location.pathname.includes('dashboard')) {
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
      welcomeText.innerText = `Willkommen, ${session.user.email}!`;
    }
  }
});

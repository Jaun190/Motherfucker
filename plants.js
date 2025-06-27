// Supabase Setup
const supabaseUrl = 'https://ghfzdgaunxblpudkmxmy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZnpkZ2F1bnhibHB1ZGtteG15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDI5NTksImV4cCI6MjA2NjI3ODk1OX0.J8ni4SszaI33ljthdEjqXf8ZKFCs4uWnRZZDyU0IlUU';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Menü Toggle
function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
}

// Fake-Kauf-Funktion
function fakeBuy(name, price) {
  alert(`✅ Du hast ${name} für CHF ${price}.– gekauft!`);
}

// Pflanzen dynamisch laden
async function loadPlants() {
  const { data, error } = await supabase.from('plants').select('*');
  if (error) {
    console.error('Fehler beim Laden:', error);
    return;
  }

  const container = document.getElementById('plant-container');
  container.innerHTML = '';

  data.forEach(plant => {
    const card = document.createElement('div');
    card.className = 'plant-card';

    card.innerHTML = `
      <img src="assets/${plant.image}" alt="${plant.name}" />
      <h2>${plant.name}</h2>
      <p>CHF ${plant.price}.– | ${plant.days} Tage</p>
      <button onclick="fakeBuy('${plant.name}', ${plant.price})">Kaufen</button>
    `;

    container.appendChild(card);
  });
}

loadPlants();

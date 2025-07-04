let currentUser = { id: 'demo-user' };

// Bereits gekaufte Pflanzen laden
function getBoughtPlants() {
  const data = localStorage.getItem('user_plants');
  return data ? JSON.parse(data) : [];
}

// Neue Pflanze kaufen
function savePlant(name) {
  const bought = getBoughtPlants();
  if (!bought.includes(name)) {
    bought.push(name);
    localStorage.setItem('user_plants', JSON.stringify(bought));
  }
}

// Buttons aktivieren
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const plantName = btn.closest('.plant-card').dataset.name;
    savePlant(plantName);
    btn.textContent = "Gekauft";
    btn.disabled = true;
  });
});

// Bereits gekaufte Buttons deaktivieren
const bought = getBoughtPlants();
document.querySelectorAll('.plant-card').forEach(card => {
  const name = card.dataset.name;
  if (bought.includes(name)) {
    const btn = card.querySelector('button');
    btn.textContent = "Gekauft";
    btn.disabled = true;
  }
});

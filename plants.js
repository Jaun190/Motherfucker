const supabase = supabase.createClient(
  'https://bopvgxzmmlpewbanfmdg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcHZneHptbWxwZXdiYW5mbWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NzQzMDQsImV4cCI6MjA2NjE1MDMwNH0.AM7buv9L-MBG1BGqj0T-pI1x_t2jRZdgeyfxo3g15qQ'
);

let currentUser = null;

supabase.auth.getUser().then(({ data, error }) => {
  if (error || !data.user) {
    alert("Bitte zuerst einloggen.");
    window.location.href = "index.html";
  } else {
    currentUser = data.user;
    markBoughtPlants();
  }
});

document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const plantName = btn.closest('.plant-card').dataset.name;

    const { error } = await supabase.from('user_plants').insert({
      user_id: currentUser.id,
      plant_name: plantName
    });

    if (error) {
      alert("Fehler beim Kauf: " + error.message);
    } else {
      alert("Gekauft: " + plantName);
      btn.textContent = "Gekauft";
      btn.disabled = true;
    }
  });
});

async function markBoughtPlants() {
  const { data, error } = await supabase
    .from('user_plants')
    .select('plant_name')
    .eq('user_id', currentUser.id);

  if (!error && data) {
    const bought = data.map(p => p.plant_name);
    document.querySelectorAll('.plant-card').forEach(card => {
      const name = card.dataset.name;
      if (bought.includes(name)) {
        const btn = card.querySelector('button');
        btn.textContent = "Gekauft";
        btn.disabled = true;
      }
    });
  }
}

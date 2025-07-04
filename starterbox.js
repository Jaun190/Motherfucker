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
    checkExistingBox();
  }
});

document.querySelectorAll(".buy-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const boxType = btn.textContent.includes("Premium") ? "premium" : "pro";

    const { error } = await supabase.from("user_starterbox").insert({
      user_id: currentUser.id,
      starterbox: boxType,
    });

    if (error) {
      alert("Fehler beim Kauf: " + error.message);
    } else {
      alert("Box erfolgreich gekauft!");
      window.location.href = "starterboxseite.html";
    }
  });
});

async function checkExistingBox() {
  const { data, error } = await supabase
    .from("user_starterbox")
    .select("starterbox")
    .eq("user_id", currentUser.id);

  if (error) return;

  const bought = data.map(d => d.starterbox);

  document.querySelectorAll(".buy-btn").forEach(btn => {
    const type = btn.textContent.includes("Premium") ? "premium" : "pro";
    if (bought.includes(type)) {
      btn.textContent = "Gekauft";
      btn.disabled = true;
    }
  });
}

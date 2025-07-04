document.addEventListener("DOMContentLoaded", () => {
  function getBoughtBoxes() {
    return JSON.parse(localStorage.getItem("user_boxes")) || [];
  }

  function saveBox(name) {
    const bought = getBoughtBoxes();
    if (!bought.includes(name)) {
      bought.push(name);
      localStorage.setItem("user_boxes", JSON.stringify(bought));
    }
  }

  // Button-Click
  document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const box = btn.closest(".box").dataset.box;
      saveBox(box);
      btn.textContent = "Gekauft";
      btn.classList.add("disabled");
      btn.disabled = true;
    });
  });

  // Beim Laden prüfen
  const bought = getBoughtBoxes();
  document.querySelectorAll(".box").forEach(box => {
    const name = box.dataset.box;
    if (bought.includes(name)) {
      const btn = box.querySelector(".buy-btn");
      btn.textContent = "Gekauft";
      btn.classList.add("disabled");
      btn.disabled = true;
    }
  });
});

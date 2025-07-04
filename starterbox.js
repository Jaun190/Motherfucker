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

  // Button-Klick aktivieren
  document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const box = btn.closest(".box");
      const boxType = box.getAttribute("data-box");
      saveBox(boxType);
      btn.textContent = "Gekauft";
      btn.classList.add("disabled");
      btn.disabled = true;
    });
  });

  // Bereits gekaufte markieren
  const bought = getBoughtBoxes();
  document.querySelectorAll(".box").forEach(box => {
    const boxType = box.getAttribute("data-box");
    if (bought.includes(boxType)) {
      const btn = box.querySelector(".buy-btn");
      btn.textContent = "Gekauft";
      btn.classList.add("disabled");
      btn.disabled = true;
    }
  });
});

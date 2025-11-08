// ✅ Envoi vers Google Sheets via SheetDB
async function sendAnswers(formSelector, stepName) {
  const form = document.querySelector(formSelector);
  const inputs = form.querySelectorAll("input[type='text']");
  const data = {};

  inputs.forEach(input => {
    data[input.name] = input.value;
  });

  data.step = stepName;

  try {
    const response = await fetch("https://sheetdb.io/api/v1/evlx8d0u1ftnh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    });

    const result = await response.json();
    console.log("Réponse enregistrée :", result);
  } catch (error) {
    console.error("Erreur d'envoi :", error);
  }
}

// ✅ Affichage des templates
function showTemplate(index) {
  const container = document.querySelector('.container');
  const template = document.getElementById(index.toString());
  const clone = template.content.cloneNode(true);
  container.innerHTML = '';
  container.appendChild(clone);

  if (index === 1) {
    const bonusBtn = document.getElementById('bonus-btn');
    bonusBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      sendAnswers("#form-step2", "step2");
      window.location.href = "bonus.html"; // 🔁 redirection vers une autre page
    });
  }
}

// ✅ Bouton du premier formulaire
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn1');
  btn?.addEventListener('click', (e) => {
    e.preventDefault();
    sendAnswers("#form-step1", "step1");
    document.body.classList.toggle('active');
    document.querySelector('footer').classList.toggle('active');
    showTemplate(1);
  });
});

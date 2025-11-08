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
      alert("Merci pour ta réponse 💍");
    } catch (error) {
      console.error("Erreur d'envoi :", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
const finalBtn = document.getElementById('btn');
finalBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    sendAnswers("#form-marriage", "marriage");
});
});
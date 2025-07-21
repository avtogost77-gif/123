// Simple freight cost estimator v1.0
// Uses flat rates just for lead generation; not a public offer.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#freight-calc-form");
  const resultEl = document.querySelector("#freight-calc-result");

  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const type = form.elements["type"].value; // FTL or LTL
    const distance = parseFloat(form.elements["distance"].value) || 0;
    const weight = parseFloat(form.elements["weight"].value) || 0;

    let price = 0;
    if (type === "FTL") {
      // Full truck load — фиксированный тариф за км
      const RATE_PER_KM = 95; // ₽/км (пример)
      price = distance * RATE_PER_KM;
    } else {
      // LTL — тариф за кг*км
      const RATE_PER_KG_KM = 6.5; // ₽
      price = distance * weight * RATE_PER_KG_KM;
    }

    if (isNaN(price) || price <= 0) {
      resultEl.textContent = "Пожалуйста, заполните данные корректно.";
      return;
    }

    const formatted = price.toLocaleString("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0
    });

    resultEl.innerHTML = `Ориентировочная стоимость: <strong>${formatted}</strong><br/><small>* Цена не является публичной офертой</small>`;
  });
});
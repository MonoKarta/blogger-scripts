(function () {
  const allowedPages = [
    "https://www.monokarta.pp.ua/2025/01/kurs-valyut-monobank.html",
    "https://www.monokarta.pp.ua/2025/01/kurs-usd-monobank.html",
    "https://www.monokarta.pp.ua/2025/01/kurs-eur-monobank.html",
    "https://www.monokarta.pp.ua/2025/01/kurs-pln-monobank.html",
    "https://www.monokarta.pp.ua/2025/01/kurs-gbp-monobank.html",
    "https://www.monokarta.pp.ua/2025/01/kurs-czk-monobank.html",
    "https://www.monokarta.pp.ua/2025/01/kurs-bgn-monobank.html",
    "https://www.monokarta.pp.ua/2025/01/kurs-try-monobank.html",
    "https://www.monokarta.pp.ua/2025/01/kurs-chf-monobank.html",
    "https://www.monokarta.pp.ua/2025/01/kurs-gel-monobank.html"
  ];

  // Перевірка, чи поточна сторінка є дозволеною
  const currentUrl = window.location.href.split('?')[0];
  if (!allowedPages.includes(currentUrl)) {
    console.log("Скрипт не виконується на цій сторінці.");
    return;
  }

  console.log("Скрипт запущено на дозволеній сторінці:", currentUrl);

  const currencyNames = {
    840: "USD", // Долар
    978: "EUR", // Євро
    985: "PLN", // Злотий
    826: "GBP", // Фунт
    203: "CZK", // Крона
    975: "BGN", // Лев
    949: "TRY", // Ліра
    756: "CHF", // Франк
    981: "GEL", // Ларі
    980: "UAH", // Гривня
  };

  async function fetchCurrencyRates() {
    const API_URL = "https://api.monobank.ua/bank/currency";

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Помилка завантаження даних з API.");

      const data = await response.json();
      const rates = {};

      data.forEach((item) => {
        const baseCurrency = currencyNames[item.currencyCodeA];
        const targetCurrency = currencyNames[item.currencyCodeB];

        if (baseCurrency && targetCurrency) {
          if (targetCurrency === "UAH") {
            rates[`${baseCurrency}_UAH_BUY`] = item.rateBuy
              ? item.rateBuy.toFixed(2)
              : null;
            rates[`${baseCurrency}_UAH_SELL`] = item.rateSell
              ? item.rateSell.toFixed(2)
              : null;
          }
          if (targetCurrency === "USD") {
            rates[`${baseCurrency}_USD_SELL`] = item.rateCross
              ? item.rateCross.toFixed(2)
              : null;
          }
        }
      });

      // Збереження курсів у глобальному об'єкті
      window.currencyRates = rates;

      // Оновлення значень у таблиці
      replaceShortcodes();
    } catch (error) {
      console.error("Помилка:", error);
    }
  }

  function replaceShortcodes() {
    const elements = document.querySelectorAll("[data-shortcode]");
    const rates = window.currencyRates;

    elements.forEach((element) => {
      const shortcode = element.dataset.shortcode;

      if (rates && rates[shortcode]) {
        element.textContent = rates[shortcode]; // Якщо значення існує
      } else {
        element.textContent = "—"; // Якщо даних немає
      }
    });
  }

  // Запуск оновлення кожні 10 хвилин
  function startCurrencyUpdates() {
    fetchCurrencyRates(); // Перше завантаження
    setInterval(fetchCurrencyRates, 10 * 60 * 1000); // Оновлення кожні 10 хвилин
  }

  // Запуск оновлень
  startCurrencyUpdates();
})();

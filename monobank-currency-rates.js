(function () {
  const currencyNames = {
    840: 'USD', // Долар
    978: 'EUR', // Євро
    985: 'PLN', // Злотий
    826: 'GBP', // Фунт
    203: 'CZK', // Крона
    975: 'BGN', // Лев
    949: 'TRY', // Ліра
    756: 'CHF', // Франк
    981: 'GEL', // Ларі
    980: 'UAH', // Гривня
  };

  async function fetchCurrencyRates() {
    const API_URL = 'https://api.monobank.ua/bank/currency';

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Помилка завантаження даних з API.');

      const data = await response.json();
      const rates = {};

      data.forEach(item => {
        const baseCurrency = currencyNames[item.currencyCodeA];
        const targetCurrency = currencyNames[item.currencyCodeB];

        if (baseCurrency && targetCurrency) {
          // Курс до гривні
          if (targetCurrency === 'UAH') {
            rates[`${baseCurrency}_UAH_BUY`] = item.rateBuy ? item.rateBuy.toFixed(2) : null;
            rates[`${baseCurrency}_UAH_SELL`] = item.rateSell ? item.rateSell.toFixed(2) : null;
          }
          // Курс до долара
          if (targetCurrency === 'USD') {
            rates[`${baseCurrency}_USD_BUY`] = item.rateBuy ? item.rateBuy.toFixed(2) : null;
            rates[`${baseCurrency}_USD_SELL`] = item.rateSell ? item.rateSell.toFixed(2) : null;
          }
          // Курс євро до долара
          if (baseCurrency === 'EUR' && targetCurrency === 'USD') {
            rates['EUR_USD_SELL'] = item.rateSell ? item.rateSell.toFixed(2) : null;
          }
        }
      });

      // Збереження курсів у глобальному об'єкті
      window.currencyRates = rates;

      // Оновлення значень у таблиці
      replaceShortcodes();
    } catch (error) {
      console.error('Помилка:', error);
    }
  }

  function replaceShortcodes() {
    const elements = document.querySelectorAll('[data-shortcode]');
    const rates = window.currencyRates;

    elements.forEach(element => {
      const shortcode = element.dataset.shortcode;

      if (rates && rates[shortcode]) {
        element.textContent = rates[shortcode]; // Якщо значення існує
      } else {
        element.textContent = '—'; // Якщо даних немає
      }
    });
  }

  // Завантаження даних кожні 30 хвилин
  setInterval(fetchCurrencyRates, 30 * 60 * 1000);

  // Початкове завантаження даних
  fetchCurrencyRates();
})();

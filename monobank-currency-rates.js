(async function () {
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

  const API_URL = 'https://api.monobank.ua/bank/currency';
  const CACHE_TIME = 5 * 60 * 1000; // 5 хвилин у мілісекундах
  const allowedPages = [
    'https://www.monokarta.pp.ua/2025/01/kurs-valyut-monobank.html',
    // Додайте інші дозволені сторінки
  ];

  const currentPage = window.location.href.split('?')[0];
  if (!allowedPages.includes(currentPage)) {
    console.log(`Скрипт не запущено: ${currentPage}`);
    return;
  }

  async function fetchCurrencyRates() {
    const lastUpdate = localStorage.getItem('lastUpdate');
    const now = Date.now();

    if (lastUpdate && now - new Date(lastUpdate).getTime() < CACHE_TIME) {
      console.log('Дані кешуються. Використовуються збережені дані.');
      return JSON.parse(localStorage.getItem('currencyRates'));
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Помилка завантаження даних з API.');

      const data = await response.json();
      const rates = {};

      data.forEach(item => {
        const baseCurrency = currencyNames[item.currencyCodeA];
        const targetCurrency = currencyNames[item.currencyCodeB];

        if (baseCurrency && targetCurrency && targetCurrency === 'UAH') {
          rates[`${baseCurrency}_UAH_BUY`] = item.rateBuy ? item.rateBuy.toFixed(2) : '—';
          rates[`${baseCurrency}_UAH_SELL`] = item.rateSell ? item.rateSell.toFixed(2) : '—';
        }
      });

      localStorage.setItem('currencyRates', JSON.stringify(rates));
      localStorage.setItem('lastUpdate', new Date().toISOString());

      return rates;
    } catch (error) {
      console.error('Помилка:', error);

      const savedRates = localStorage.getItem('currencyRates');
      if (savedRates) {
        console.warn('Використовуються збережені дані.');
        return JSON.parse(savedRates);
      }

      throw new Error('Неможливо завантажити дані та немає збережених даних.');
    }
  }

  function replaceShortcodes(rates) {
    const elements = document.querySelectorAll('[data-shortcode]');
    elements.forEach(element => {
      const shortcode = element.dataset.shortcode;
      element.textContent = rates[shortcode] || '—';
    });
  }

  async function startCurrencyUpdates() {
    try {
      const rates = await fetchCurrencyRates();
      replaceShortcodes(rates);
    } catch (error) {
      console.error('Помилка оновлення курсів:', error);
    }
  }

  await startCurrencyUpdates();
  setInterval(startCurrencyUpdates, CACHE_TIME); // Оновлення кожні 5 хвилин
})();

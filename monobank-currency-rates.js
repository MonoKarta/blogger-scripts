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
  const allowedPages = [
    'https://www.monokarta.pp.ua/2025/01/kurs-valyut-monobank.html',
    'https://www.monokarta.pp.ua/2025/01/kurs-usd-monobank.html',
    'https://www.monokarta.pp.ua/2025/01/kurs-eur-monobank.html',
    'https://www.monokarta.pp.ua/2025/01/kurs-pln-monobank.html',
    'https://www.monokarta.pp.ua/2025/01/kurs-gbp-monobank.html',
    'https://www.monokarta.pp.ua/2025/01/kurs-czk-monobank.html',
    'https://www.monokarta.pp.ua/2025/01/kurs-bgn-monobank.html',
    'https://www.monokarta.pp.ua/2025/01/kurs-try-monobank.html',
    'https://www.monokarta.pp.ua/2025/01/kurs-chf-monobank.html',
    'https://www.monokarta.pp.ua/2025/01/kurs-gel-monobank.html',
  ];

  // Перевірка сторінки
  const currentPage = window.location.href.split('?')[0];
  if (!allowedPages.includes(currentPage)) {
    console.log(`Скрипт не запущено: ${currentPage}`);
    return;
  }

  console.log(`Скрипт запущено на дозволеній сторінці: ${currentPage}`);

  async function fetchCurrencyRates() {
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

      // Зберігаємо дані в localStorage
      localStorage.setItem('currencyRates', JSON.stringify(rates));
      localStorage.setItem('lastUpdate', new Date().toISOString());

      return rates;
    } catch (error) {
      console.error('Помилка:', error);

      // Повертаємо збережені дані, якщо вони є
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

  // Оновлення кожні 10 хвилин
  setInterval(startCurrencyUpdates, 10 * 60 * 1000); // 10 хвилин
  await startCurrencyUpdates();
})();

window.onload = function () {
    const now = new Date(),
          monthsUA = ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"];

    // Шорткод для року
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = now.getFullYear();
    } else {
        console.error("Елемент #current-year не знайдено");
    }

    // Шорткод для місяця і року
    const monthYearEl = document.getElementById("current-month-year");
    if (monthYearEl) {
        monthYearEl.textContent = `${monthsUA[now.getMonth()]} ${now.getFullYear()}`;
    } else {
        console.error("Елемент #current-month-year не знайдено");
    }

    // Шорткод для повної дати
    const dateEl = document.getElementById("current-date");
    if (dateEl) {
        dateEl.textContent = [
            String(now.getDate()).padStart(2, "0"),
            String(now.getMonth() + 1).padStart(2, "0"),
            now.getFullYear()
        ].join(".");
    } else {
        console.error("Елемент #current-date не знайдено");
    }
};

window.onload = function () {
    console.log("Скрипт завантажено");
    const now = new Date(),
        monthsUA = [
            "січень", "лютий", "березень", "квітень", "травень", "червень",
            "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"
        ];

    // Рік
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = now.getFullYear();
    } else {
        console.error("Елемент #current-year не знайдено");
    }

    // Місяць і рік
    const monthYearEl = document.getElementById("current-month-year");
    if (monthYearEl) {
        monthYearEl.textContent = `${monthsUA[now.getMonth()]} ${now.getFullYear()}`;
    } else {
        console.error("Елемент #current-month-year не знайдено");
    }

    // Повна дата
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

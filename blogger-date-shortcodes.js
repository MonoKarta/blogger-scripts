document.addEventListener("DOMContentLoaded", function retryShortcodes() {
    const now = new Date(),
        monthsUA = [
            "січень", "лютий", "березень", "квітень", "травень", "червень",
            "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"
        ];

    // Спробуємо знайти всі елементи
    const yearEl = document.getElementById("current-year");
    const monthYearEl = document.getElementById("current-month-year");
    const dateEl = document.getElementById("current-date");

    if (yearEl && monthYearEl && dateEl) {
        console.log("Елементи знайдено. Завантажуємо дати...");
        yearEl.textContent = now.getFullYear();
        monthYearEl.textContent = `${monthsUA[now.getMonth()]} ${now.getFullYear()}`;
        dateEl.textContent = [
            String(now.getDate()).padStart(2, "0"),
            String(now.getMonth() + 1).padStart(2, "0"),
            now.getFullYear()
        ].join(".");
    } else {
        console.warn("Елементи не знайдено. Повторна спроба через 200 мс.");
        setTimeout(retryShortcodes, 200); // Повторіть через 200 мс
    }
});

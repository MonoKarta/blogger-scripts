document.addEventListener("DOMContentLoaded", function updateShortcodes() {
    const now = new Date();
    const monthsUA = [
        "січень", "лютий", "березень", "квітень", "травень", "червень",
        "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"
    ];
    const monthsGenitiveUA = [
        "січня", "лютого", "березня", "квітня", "травня", "червня",
        "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
    ];

    // Перевірка останнього оновлення
    const lastUpdate = localStorage.getItem("lastDateUpdate");
    const currentDateKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

    // Якщо дата не змінювалася, виходимо
    if (lastUpdate === currentDateKey) {
        console.log("Дати вже оновлені сьогодні. Пропускаємо...");
        return;
    }

    // Оновлюємо дати
    const yearEl = document.getElementById("current-year");
    const monthYearEl = document.getElementById("current-month-year");
    const dateEl = document.getElementById("current-date");
    const monthGenitiveEl = document.getElementById("current-month-genitive");

    if (yearEl) {
        yearEl.textContent = now.getFullYear();
    }
    if (monthYearEl) {
        monthYearEl.textContent = `${monthsUA[now.getMonth()]} ${now.getFullYear()}`;
    }
    if (dateEl) {
        dateEl.textContent = [
            String(now.getDate()).padStart(2, "0"),
            String(now.getMonth() + 1).padStart(2, "0"),
            now.getFullYear()
        ].join(".");
    }
    if (monthGenitiveEl) {
        monthGenitiveEl.textContent = monthsGenitiveUA[now.getMonth()];
    }

    // Зберігаємо оновлення дати в localStorage
    localStorage.setItem("lastDateUpdate", currentDateKey);

    console.log("Дати оновлено:", {
        year: now.getFullYear(),
        monthYear: `${monthsUA[now.getMonth()]} ${now.getFullYear()}`,
        date: `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`,
        monthGenitive: monthsGenitiveUA[now.getMonth()]
    });
});

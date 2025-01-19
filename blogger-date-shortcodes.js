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

    // Оновлюємо всі шорткоди
    function updateElements(selector, value) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.textContent = value);
    }

    // Рік
    updateElements("#current-year", now.getFullYear());

    // Місяць і рік
    updateElements("#current-month-year", `${monthsUA[now.getMonth()]} ${now.getFullYear()}`);

    // Повна дата
    updateElements("#current-date", [
        String(now.getDate()).padStart(2, "0"),
        String(now.getMonth() + 1).padStart(2, "0"),
        now.getFullYear()
    ].join("."));

    // Місяць у родовому відмінку
    updateElements("#current-month-genitive", monthsGenitiveUA[now.getMonth()]);

    // Зберігаємо оновлення дати в localStorage
    localStorage.setItem("lastDateUpdate", currentDateKey);

    console.log("Дати оновлено:", {
        year: now.getFullYear(),
        monthYear: `${monthsUA[now.getMonth()]} ${now.getFullYear()}`,
        date: `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`,
        monthGenitive: monthsGenitiveUA[now.getMonth()]
    });
});

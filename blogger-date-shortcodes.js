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

    // Функція для оновлення елементів на сторінці
    function updateElements(selector, value) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.textContent = value; // Вставка тексту у span
        });
    }

    // Оновлюємо значення шорткодів
    updateElements("#current-year", now.getFullYear()); // Рік
    updateElements("#current-month-year", `${monthsUA[now.getMonth()]} ${now.getFullYear()}`); // Місяць і рік
    updateElements("#current-date", [
        String(now.getDate()).padStart(2, "0"),
        String(now.getMonth() + 1).padStart(2, "0"),
        now.getFullYear()
    ].join(".")); // Повна дата
    updateElements("#current-month-genitive", monthsGenitiveUA[now.getMonth()]); // Місяць у родовому відмінку

    // Оновлення вмісту тега <title> (якщо потрібно)
    const titleElement = document.querySelector("title");
    if (titleElement) {
        const updatedTitle = titleElement.textContent.replace(
            /<span id="current-date"><\/span>/g,
            `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`
        );
        titleElement.textContent = updatedTitle; // Заміна дати у <title>
    }

    console.log("Дати оновлено.");
});

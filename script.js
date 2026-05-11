const form = document.querySelector("#request-form");
const note = document.querySelector("#form-note");
const fallbackRecipient = "request@hexcore-materials.com";

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const company = String(data.get("company") || "").trim();
  const contact = String(data.get("contact") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();

  const subject = encodeURIComponent(`Запрос на подбор сырья: ${company}`);
  const body = encodeURIComponent(
    [
      `Компания: ${company}`,
      `Контакт: ${contact}`,
      `Email: ${email}`,
      "",
      "Задача:",
      message,
      "",
      "Дополнительно можно приложить TDS, SDS, COA, базовую рецептуру и ограничения производства.",
    ].join("\n"),
  );

  const recipient = form.dataset.recipient || fallbackRecipient;

  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

  if (note) {
    note.textContent =
      "Письмо сформировано в почтовом клиенте. При необходимости приложите технические документы к запросу.";
  }
});

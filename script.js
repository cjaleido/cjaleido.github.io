const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector("#navLinks");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const chatWindow = document.querySelector("#chatWindow");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const promptButtons = document.querySelectorAll("[data-prompt]");

const answers = [
  {
    keys: ["service", "offer", "do"],
    answer:
      "CJ can help with graphic design, virtual assistance, customer support, research, admin tasks, and clean website presentation."
  },
  {
    keys: ["process", "how", "work"],
    answer:
      "The process is simple: understand the problem, organize the content, create a clean first version, review what feels unclear, then improve it step by step."
  },
  {
    keys: ["experience", "background"],
    answer:
      "CJ has experience across customer service, design support, admin work, content review, and practical business support."
  },
  {
    keys: ["contact", "email", "hire"],
    answer:
      "You can contact CJ through the email button in the contact section. Replace it later with a full contact form when ready."
  }
];

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getAnswer(question) {
  const lowerQuestion = question.toLowerCase();
  const match = answers.find((item) =>
    item.keys.some((key) => lowerQuestion.includes(key))
  );

  if (match) return match.answer;

  return "Good question. This starter portfolio can be expanded with more project details, case studies, testimonials, and real client examples.";
}

function sendQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addMessage(cleanQuestion, "user");
  chatInput.value = "";

  window.setTimeout(() => {
    addMessage(getAnswer(cleanQuestion), "bot");
  }, 360);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendQuestion(chatInput.value);
});

promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sendQuestion(button.dataset.prompt);
  });
});
